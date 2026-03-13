/**
 * @module services/ragService
 * @description RAG (Retrieval-Augmented Generation) chat service powered by
 * Google Gemini. Retrieves relevant docs, builds a grounded
 * system prompt with user context, and maintains conversational memory.
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const db = require('../config/database');
const embeddingService = require('./embeddingService');

let _genAI = null;
function getGemini() {
  if (!_genAI) {
    _genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'sk-placeholder');
  }
  return _genAI;
}

/**
 * Build the system prompt with user context and retrieved documentation.
 * @param {Object} userContext - Current user's onboarding state
 * @param {Array} retrievedDocs - Documents from vector search
 * @returns {string} Formatted system prompt
 */
function buildSystemPrompt(userContext, retrievedDocs) {
  const docsText = retrievedDocs.length > 0
    ? retrievedDocs
        .map((doc, i) => {
          // Replace escaped newlines with actual newlines
          const unescapedContent = doc.content.replace(/\\n/g, '\n');
          return `--- Document ${i + 1}: ${doc.title} (${doc.category}) ---\n${unescapedContent}`;
        })
        .join('\n\n')
    : 'No relevant documentation found for this query.';

  return `You are Axiom, an intelligent developer onboarding assistant for TechCorp.
Your job is to help new developers get set up, answer questions about the codebase, 
and guide them through their onboarding journey.

STRICT RULES:
1. Answer ONLY using the provided documentation context below.
2. If the answer is not in the documentation, say: "I don't have documentation on that yet. Please ask your team lead or check the internal wiki."
3. Be concise, friendly, and technically precise.
4. When relevant, mention which onboarding task this relates to.
5. Format code blocks with triple backticks and the language name.
6. Always end setup instructions with a verification command the developer can run.
7. If you reference specific documentation, mention the document name so the user can look it up.

DEVELOPER CONTEXT:
- Name: ${userContext.userName}
- Role: ${userContext.userRole}
- Persona: ${userContext.personaName}
- Current Task: ${userContext.currentTaskTitle || 'None active'}
- Tasks Completed: ${userContext.completedCount}/${userContext.totalCount}
- Experience Level: ${userContext.experienceLevel || 'Not specified'}

RETRIEVED DOCUMENTATION:
${docsText}

Answer the developer's question using only the above documentation. If you cannot find the answer in the documentation, clearly state that.`;
}

/**
 * Get the current onboarding context for a user.
 * @param {string} userId - User's UUID
 * @returns {Promise<Object>} User context object
 */
async function getUserContext(userId) {
  // Get user profile with persona
  const userResult = await db.query(
    `SELECT u.name, u.role, u.experience_level, p.name AS persona_name
     FROM users u
     LEFT JOIN personas p ON u.persona_id = p.id
     WHERE u.id = $1`,
    [userId]
  );

  if (userResult.rows.length === 0) {
    throw new Error('User not found.');
  }

  const user = userResult.rows[0];

  // Get task progress
  const taskStats = await db.query(
    `SELECT
       COUNT(*) AS total,
       COUNT(*) FILTER (WHERE ti.status = 'completed' OR ti.status = 'verified') AS completed,
       (SELECT t.title FROM task_instances ti2
        JOIN tasks t ON ti2.task_id = t.id
        WHERE ti2.user_id = $1 AND ti2.status = 'in_progress'
        LIMIT 1) AS current_task_title
     FROM task_instances ti
     WHERE ti.user_id = $1`,
    [userId]
  );

  const stats = taskStats.rows[0];

  return {
    userName: user.name,
    userRole: user.role,
    experienceLevel: user.experience_level,
    personaName: user.persona_name || 'Unassigned',
    currentTaskTitle: stats.current_task_title,
    completedCount: parseInt(stats.completed) || 0,
    totalCount: parseInt(stats.total) || 0,
  };
}

/**
 * Get recent chat history for maintaining conversation context.
 * @param {string} userId - User's UUID
 * @param {number} [limit=10] - Number of recent messages to retrieve
 * @returns {Promise<Array<{role: string, content: string}>>}
 */
async function getChatHistory(userId, limit = 10) {
  const result = await db.query(
    `SELECT role, content FROM chat_history
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT $2`,
    [userId, limit]
  );
  return result.rows.reverse(); // Oldest first for Claude
}

/**
 * Process a user message through the RAG pipeline.
 * 1. Embed the message and search for relevant docs
 * 2. Build context-aware system prompt
 * 3. Call Claude with full conversation history
 * 4. Save both messages to chat_history
 * 5. Return reply with sources and confidence
 *
 * @param {string} userId - User's UUID
 * @param {string} message - User's chat message
 * @returns {Promise<{reply: string, sources: Array, confidence: string}>}
 */
async function chat(userId, message) {
  try {
    // 1. Search for relevant documentation
    const retrievedDocs = await embeddingService.searchDocuments(message, 5);

    // 2. Get user context
    const userContext = await getUserContext(userId);

    // 3. Build system prompt
    const systemPrompt = buildSystemPrompt(userContext, retrievedDocs);

    // 4. Get recent chat history
    const chatHistory = await getChatHistory(userId, 10);

    // Build messages array for Gemini
    const messages = chatHistory.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // 5. Call Gemini API
    const model = getGemini().getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const chat = model.startChat({
      history: messages,
      generationConfig: {
        maxOutputTokens: 2048,
      },
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    // Determine confidence based on document relevance
    const maxSimilarity = retrievedDocs.length > 0
      ? Math.max(...retrievedDocs.map((d) => d.similarity || 0))
      : 0;
    const confidence = maxSimilarity > 0.7 ? 'high' : maxSimilarity > 0.4 ? 'medium' : 'low';

    // Format sources
    const sources = retrievedDocs
      .filter((d) => (d.similarity || 0) > 0.3)
      .map((d) => ({
        id: d.id,
        title: d.title,
        category: d.category,
        similarity: parseFloat((d.similarity || 0).toFixed(3)),
      }));

    // 6. Save messages to chat_history
    await db.query(
      'INSERT INTO chat_history (user_id, role, content, sources) VALUES ($1, $2, $3, $4)',
      [userId, 'user', message, JSON.stringify([])]
    );

    await db.query(
      'INSERT INTO chat_history (user_id, role, content, sources) VALUES ($1, $2, $3, $4)',
      [userId, 'assistant', reply, JSON.stringify(sources)]
    );

    // 7. Log chat event
    await db.query(
      `INSERT INTO progress_logs (user_id, event_type, metadata)
       VALUES ($1, 'chat_message', $2)`,
      [userId, JSON.stringify({ confidence, source_count: sources.length })]
    );

    return { reply, sources, confidence };
  } catch (err) {
    console.error('[RAGService] Error processing chat:', err.message);
    throw new Error('Failed to process chat message.');
  }
}

/**
 * Send a proactive pitfall warning message when a task is started.
 * @param {string} userId - User's UUID
 * @param {string} taskId - Task UUID that was started
 * @returns {Promise<{reply: string, sources: Array}|null>}
 */
async function sendPitfallWarning(userId, taskId) {
  try {
    // Get pitfalls for this task
    const pitfalls = await db.query(
      `SELECT p.title, p.warning_message, t.title AS task_title
       FROM pitfalls p
       JOIN tasks t ON p.task_id = t.id
       WHERE p.task_id = $1`,
      [taskId]
    );

    if (pitfalls.rows.length === 0) return null;

    const warnings = pitfalls.rows
      .map((p) => `• **${p.title}**: ${p.warning_message}`)
      .join('\n');

    const taskTitle = pitfalls.rows[0].task_title;

    const proactiveMessage = `🚨 **Heads up before you start "${taskTitle}"!**\n\nHere are common pitfalls other developers have encountered with this task:\n\n${warnings}\n\nKeep these in mind as you work through the task. If you run into any issues, just ask me for help!`;

    // Save as assistant message
    await db.query(
      'INSERT INTO chat_history (user_id, role, content, sources) VALUES ($1, $2, $3, $4)',
      [userId, 'assistant', proactiveMessage, JSON.stringify([])]
    );

    return { reply: proactiveMessage, sources: [] };
  } catch (err) {
    console.error('[RAGService] Error sending pitfall warning:', err.message);
    return null;
  }
}

/**
 * Generate a diagnostic message when task verification fails.
 * Uses Claude to analyze the submitted evidence and suggest fixes.
 * @param {string} userId - User's UUID
 * @param {string} taskTitle - Title of the failed task
 * @param {string} evidence - Evidence that was submitted
 * @param {string} failureMessage - Why verification failed
 * @returns {Promise<string>} Diagnostic suggestion message
 */
async function generateDiagnostic(userId, taskTitle, evidence, failureMessage) {
  try {
    const response = await getAnthropic().messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: `You are Axiom, a developer onboarding assistant. A developer's task verification just failed. Analyze their evidence and the failure reason, then provide a concise, actionable diagnostic. Be specific about what went wrong and what they should try next. Format your response clearly with steps.`,
      messages: [
        {
          role: 'user',
          content: `Task: ${taskTitle}\nEvidence submitted: ${evidence}\nFailure reason: ${failureMessage}\n\nPlease diagnose what went wrong and suggest how to fix it.`,
        },
      ],
    });

    const diagnostic = response.content[0].text;

    // Save the diagnostic as a chat message
    await db.query(
      'INSERT INTO chat_history (user_id, role, content, sources) VALUES ($1, $2, $3, $4)',
      [userId, 'assistant', `🔍 **Verification Failed — Diagnostic Report**\n\n${diagnostic}`, JSON.stringify([])]
    );

    return diagnostic;
  } catch (err) {
    console.error('[RAGService] Error generating diagnostic:', err.message);
    return 'I was unable to generate a diagnostic. Please review the task requirements and try again.';
  }
}

module.exports = {
  chat,
  sendPitfallWarning,
  generateDiagnostic,
  getUserContext,
  getChatHistory,
};
