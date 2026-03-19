/**
 * @module services/ragService
 * @description Hybrid onboarding assistant powered by local docs, with optional online LLM responses.
 */

const Anthropic = require('@anthropic-ai/sdk');
const localStore = require('../data/localStore');
const embeddingService = require('./embeddingService');

let anthropicClient = null;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';
const DEFAULT_OLLAMA_BASE_URL = 'https://ollama.com/api';
const DEFAULT_OLLAMA_MODEL = 'gpt-oss:120b';

function isRealApiKey(value, placeholderPrefixes = []) {
  const key = String(value || '').trim();
  if (!key) {
    return false;
  }

  if (placeholderPrefixes.some((prefix) => key.startsWith(prefix))) {
    return false;
  }

  return key.startsWith('sk-') || key.length > 20;
}

function hasAnthropicAccess() {
  return isRealApiKey(process.env.ANTHROPIC_API_KEY, ['sk-ant-placeholder']);
}

function hasOllamaAccess() {
  return isRealApiKey(process.env.OLLAMA_API_KEY, ['your_ollama_api_key_here', 'ollama-placeholder']);
}

function hasGeminiAccess() {
  return isRealApiKey(process.env.GEMINI_API_KEY, ['your_gemini_api_key_here', 'gemini-placeholder']);
}

function getAnthropicClient() {
  if (!hasAnthropicAccess()) {
    return null;
  }

  if (!anthropicClient) {
    anthropicClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }

  return anthropicClient;
}

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'about',
  'at',
  'be',
  'by',
  'can',
  'do',
  'for',
  'from',
  'how',
  'i',
  'if',
  'in',
  'is',
  'it',
  'me',
  'my',
  'of',
  'on',
  'or',
  'please',
  'tell',
  'the',
  'to',
  'what',
  'when',
  'where',
  'who',
  'why',
  'you',
  'your',
]);

function tokenize(value) {
  return String(value || '')
    .toLowerCase()
    .split(/[^a-z0-9.+#-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function expandQueryTokens(message) {
  const normalized = String(message || '').toLowerCase();
  const tokens = [...tokenize(message)];

  const intentRules = [
    {
      test: /(code|coding|style|standards?|lint|format|review|pull request|pr\b|eslint|prettier|typescript|javascript)/,
      tokens: ['engineering', 'standards', 'guidelines', 'style', 'code'],
    },
    {
      test: /(setup|environment|env\b|install|run|start|node|docker|pnpm|frontend|backend|vite)/,
      tokens: ['setup', 'environment', 'frontend', 'backend'],
    },
    {
      test: /(architecture|system|service|microservice|gateway|workflow|analytics|infrastructure|eks|aws)/,
      tokens: ['architecture', 'services', 'infrastructure', 'data'],
    },
    {
      test: /(policy|security|mfa|leave|benefits|holiday|compliance|access|vpn)/,
      tokens: ['policy', 'security', 'leave', 'compliance'],
    },
    {
      test: /(contact|manager|mentor|buddy|hr\b|it\b|dx\b|team|org|organization|slack)/,
      tokens: ['contacts', 'teams', 'org', 'support'],
    },
    {
      test: /(onboarding|first day|timeline|faq|how long)/,
      tokens: ['faq', 'onboarding', 'process', 'support'],
    },
  ];

  for (const rule of intentRules) {
    if (rule.test.test(normalized)) {
      tokens.push(...rule.tokens);
    }
  }

  return [...new Set(tokens)];
}

function stripMarkdown(line) {
  return String(line || '')
    .replace(/^#{1,6}\s+/, '')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/^\-\s+/, '')
    .replace(/^\d+\.\s+/, '')
    .trim();
}

function parseSections(content) {
  const sections = [];
  let topHeading = 'Overview';
  let subHeading = null;
  let buffer = [];

  function flush() {
    const usefulLines = buffer.filter((line) => String(line).trim());
    if (usefulLines.length === 0) {
      buffer = [];
      return;
    }

    sections.push({
      heading: subHeading ? `${topHeading} - ${subHeading}` : topHeading,
      lines: usefulLines,
    });
    buffer = [];
  }

  for (const rawLine of String(content || '').split(/\r?\n/)) {
    const line = rawLine.trimEnd();

    if (/^##\s+/.test(line)) {
      flush();
      topHeading = stripMarkdown(line);
      subHeading = null;
      continue;
    }

    if (/^###\s+/.test(line)) {
      flush();
      subHeading = stripMarkdown(line);
      continue;
    }

    buffer.push(line);
  }

  flush();

  return sections;
}

function scoreText(text, queryTokens) {
  const tokens = tokenize(text);
  let score = 0;

  for (const token of queryTokens) {
    const matches = tokens.filter((item) => item === token).length;
    score += matches;
  }

  return score;
}

function getRelevantSection(document, message) {
  const queryTokens = expandQueryTokens(message);
  const intent = detectIntent(message);
  const sections = parseSections(document.content);
  const normalized = String(message || '').toLowerCase();

  const scoredSections = sections.map((section) => {
    const headingScore = scoreText(section.heading, queryTokens) * 3;
    const lineScore = scoreText(section.lines.join(' '), queryTokens);
    const intentBoost = intent.preferredHeadings.some((heading) =>
      section.heading.toLowerCase().includes(heading.toLowerCase())
    )
      ? 10
      : 0;
    const hasReadableProse = section.lines.some((line) => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('|') && !trimmed.startsWith('```') && !/^[┌└│─]/.test(trimmed);
    });
    const proseBoost = hasReadableProse ? 2 : 0;
    const diagramPenalty = !/diagram/.test(normalized) && /diagram/i.test(section.heading) ? -8 : 0;
    return {
      ...section,
      score: headingScore + lineScore + intentBoost + proseBoost + diagramPenalty,
    };
  });

  scoredSections.sort((a, b) => b.score - a.score);
  return scoredSections[0] || { heading: 'Overview', lines: [] };
}

function parseTableRows(lines) {
  const tableLines = lines.filter((line) => /^\|/.test(line.trim()));
  if (tableLines.length < 3) {
    return null;
  }

  const splitRow = (line) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => stripMarkdown(cell).trim());

  const headers = splitRow(tableLines[0]);
  const rows = tableLines.slice(2).map((line) => splitRow(line));

  return { headers, rows };
}

function summarizeTable(section, message) {
  const parsed = parseTableRows(section.lines);
  if (!parsed) {
    return '';
  }

  const queryTokens = expandQueryTokens(message);
  let bestRow = null;
  let bestScore = 0;

  for (const row of parsed.rows) {
    const rowText = row.join(' ');
    const score = scoreText(rowText, queryTokens);
    if (score > bestScore) {
      bestScore = score;
      bestRow = row;
    }
  }

  if (!bestRow) {
    return '';
  }

  const labelled = parsed.headers
    .map((header, index) => `${header}: ${bestRow[index]}`)
    .filter((entry) => !entry.endsWith(': ') && !entry.includes(': ---'));

  return labelled.join(' | ');
}

function summarizeSection(section, message) {
  const tableSummary = summarizeTable(section, message);
  if (tableSummary) {
    return tableSummary;
  }

  const queryTokens = expandQueryTokens(message);
  const answerIndex = section.lines.findIndex((line) => /^\*\*a:\*\*/i.test(line.trim()) || /^a:\s*/i.test(line.trim()));
  if (answerIndex >= 0) {
    const answerLine = stripMarkdown(section.lines[answerIndex]).replace(/^A:\s*/i, '').trim();
    const followUps = section.lines
      .slice(answerIndex + 1)
      .filter((line) => rawLooksLikeBullet(line))
      .map(stripMarkdown)
      .filter(Boolean)
      .slice(0, 2);
    return [answerLine, ...followUps].filter(Boolean).join(' ');
  }

  const rawBulletLines = section.lines
    .filter((line) => rawLooksLikeBullet(line))
    .map((line) => ({
      line,
      clean: stripMarkdown(line),
      score: scoreText(line, queryTokens),
    }))
    .filter((item) => item.clean);
  const usefulBullets = rawBulletLines
    .sort((a, b) => b.score - a.score)
    .filter((item, index) => item.score > 0 || index === 0)
    .slice(0, 3)
    .map((item) => item.clean);

  if (usefulBullets.length === 1 && rawBulletLines.length > 1) {
    return rawBulletLines
      .slice(0, 3)
      .map((item) => item.clean)
      .join(' ');
  }

  if (usefulBullets.length > 0) {
    return usefulBullets.join(' ');
  }

  const cleanedLines = section.lines
    .map(stripMarkdown)
    .filter((line) => line && line !== '---');

  const proseLines = cleanedLines
    .filter((line) => !/^q\d+:/i.test(line))
    .map((line) => ({
      line,
      score: scoreText(line, queryTokens),
    }))
    .sort((a, b) => b.score - a.score)
    .filter((item, index) => item.score > 0 || index === 0)
    .slice(0, 3)
    .map((item) => item.line);

  return proseLines.join(' ').trim();
}

function rawLooksLikeBullet(line) {
  return /^[-*•]\s+/.test(line.trim()) || /^\d+\.\s+/.test(line.trim());
}

function detectIntent(message) {
  const normalized = String(message || '').toLowerCase();

  if (/(how many approvals|approvals? do i need|pull request|pr\b|code review|reviewers?)/.test(normalized)) {
    return {
      preferredDocs: ['Onboarding FAQ', 'Engineering Standards & Guidelines'],
      preferredHeadings: ['Q18: How many approvals do I need for a PR?', 'PR Requirements', 'Code Review Expectations'],
    };
  }

  if (/(how long|timeline|onboarding take)/.test(normalized)) {
    return {
      preferredDocs: ['Onboarding FAQ'],
      preferredHeadings: ['Q1: How long does onboarding take?'],
    };
  }

  if (/(first day)/.test(normalized)) {
    return {
      preferredDocs: ['Onboarding FAQ'],
      preferredHeadings: ['Q3: What should I do on my first day?'],
    };
  }

  if (/(remote|remote-friendly)/.test(normalized)) {
    return {
      preferredDocs: ['Onboarding FAQ'],
      preferredHeadings: ['Q5: Is onboarding remote-friendly?'],
    };
  }

  if (/(contact|manager|mentor|buddy|hr\b|it\b|dx\b|payroll|benefits)/.test(normalized)) {
    return {
      preferredDocs: ['Company Structure & Engineering Organization', 'Onboarding FAQ'],
      preferredHeadings: ['Key Contacts', 'Q2: Who is my main point of contact during onboarding?'],
    };
  }

  if (/(coding|code style|standards?|lint|format|eslint|prettier|typescript|javascript)/.test(normalized)) {
    return {
      preferredDocs: ['Engineering Standards & Guidelines'],
      preferredHeadings: ['Code Style', 'General Principles', 'JavaScript / TypeScript', 'Python'],
    };
  }

  if (/(setup|environment|env\b|install|docker|pnpm|run|local|vite|frontend|backend)/.test(normalized)) {
    if (/(frontend|react|vite)/.test(normalized)) {
      return {
        preferredDocs: ['Development Environment Setup Guides', 'Onboarding FAQ'],
        preferredHeadings: ['Guide 3', 'Run Development Server', 'Set Up Environment'],
      };
    }

    if (/(python|poetry|uvicorn)/.test(normalized)) {
      return {
        preferredDocs: ['Development Environment Setup Guides', 'Onboarding FAQ'],
        preferredHeadings: ['Guide 2', 'Set Up Local Environment', 'Run the Service'],
      };
    }

    if (/(docker|dependencies)/.test(normalized)) {
      return {
        preferredDocs: ['Development Environment Setup Guides', 'Onboarding FAQ'],
        preferredHeadings: ['Start Local Dependencies', 'Common Issues', 'Q13'],
      };
    }

    return {
      preferredDocs: ['Development Environment Setup Guides', 'Onboarding FAQ'],
      preferredHeadings: ['Set Up Local Environment', 'Run the Service', 'Run Development Server', 'Common Issues', 'Q16'],
    };
  }

  if (/(architecture|system|microservices|service|kafka|redis|gateway|frontend architecture|data flow|infrastructure)/.test(normalized)) {
    if (/(data flow)/.test(normalized)) {
      return {
        preferredDocs: ['System Architecture Documentation'],
        preferredHeadings: ['Data Flow'],
      };
    }

    if (/(frontend architecture|ui-kit|admin dashboard)/.test(normalized)) {
      return {
        preferredDocs: ['System Architecture Documentation'],
        preferredHeadings: ['Frontend Architecture', 'FlowEngine Web', 'Design System'],
      };
    }

    if (/(backend architecture|gateway|auth service|workflow|connector|notification)/.test(normalized)) {
      return {
        preferredDocs: ['System Architecture Documentation'],
        preferredHeadings: ['Backend Architecture', 'Workflow Core Service', 'Gateway Service', 'Auth Service', 'Connector Runtime'],
      };
    }

    return {
      preferredDocs: ['System Architecture Documentation', 'Company Overview'],
      preferredHeadings: ['High-Level Architecture', 'Domain Breakdown'],
    };
  }

  return { preferredDocs: [], preferredHeadings: [] };
}

function replyFromDoc(document, message) {
  const section = getRelevantSection(document, message);
  const summary = summarizeSection(section, message);

  if (!summary) {
    return `I found "${document.title}", but I could not extract a concise answer from it yet.`;
  }

  if (section.heading && section.heading !== 'Overview') {
    return `From "${document.title}" under "${section.heading}": ${summary}`;
  }

  return `From "${document.title}": ${summary}`;
}

function rerankDocs(retrievedDocs, message) {
  const intent = detectIntent(message);
  if (intent.preferredDocs.length === 0) {
    return retrievedDocs;
  }

  return [...retrievedDocs].sort((a, b) => {
    const aIndex = intent.preferredDocs.findIndex((title) => a.title.includes(title));
    const bIndex = intent.preferredDocs.findIndex((title) => b.title.includes(title));
    const aMatched = aIndex !== -1;
    const bMatched = bIndex !== -1;

    if (aMatched !== bMatched) {
      return aMatched ? -1 : 1;
    }

    if (aMatched && bMatched && aIndex !== bIndex) {
      return aIndex - bIndex;
    }

    return (b.similarity || 0) - (a.similarity || 0);
  });
}

function buildDocContext(retrievedDocs, message) {
  if (retrievedDocs.length === 0) {
    return 'No matching internal documentation found.';
  }

  return retrievedDocs
    .slice(0, 3)
    .map((doc, index) => {
      const section = getRelevantSection(doc, message);
      const excerpt = section.lines
        .filter((line) => line.trim())
        .slice(0, 18)
        .join('\n');

      return [
        `Document ${index + 1}: ${doc.title}`,
        `Category: ${doc.category}`,
        `Relevance: ${(doc.similarity || 0).toFixed(3)}`,
        `Most relevant section: ${section.heading}`,
        'Section content:',
        excerpt,
      ].join('\n');
    })
    .join('\n\n');
}

function buildSystemPrompt(userContext, retrievedDocs, nextTask, message) {
  const docsText = retrievedDocs.length > 0
    ? buildDocContext(retrievedDocs, message)
    : 'No matching internal documentation found.';

  return [
    'You are Axiom, a helpful onboarding assistant for NovaByte.',
    'Use a natural, friendly, human tone.',
    'Answer using only the provided NovaByte documentation and the user context.',
    'If the documentation is incomplete, say that clearly instead of inventing details.',
    'Format answers for a chat UI so they are easy to scan quickly.',
    'Prefer concise answers, but give steps when the question is procedural.',
    'Use short sections, numbered steps, and bullet points when helpful.',
    'Do not use markdown tables, HTML tags, or long wall-of-text paragraphs.',
    'Keep each step focused and practical.',
    'If the question asks for a person/contact, include name, role, and channel/email if present.',
    'If the question asks about setup, give the concrete commands or steps from the docs.',
    '',
    'User context:',
    `- Name: ${userContext.userName}`,
    `- Role: ${userContext.userRole}`,
    `- Persona: ${userContext.personaName}`,
    `- Experience: ${userContext.experienceLevel}`,
    `- Tasks completed: ${userContext.completedCount}/${userContext.totalCount}`,
    `- Current task: ${userContext.currentTaskTitle || 'None active'}`,
    `- Next task: ${nextTask?.title || 'Unknown'}`,
    '',
    'Internal documentation:',
    docsText,
  ].join('\n');
}

function buildGeminiContents(history, message) {
  const contents = history
    .filter((entry) => entry.content && entry.content.trim())
    .slice(-6)
    .map((entry) => ({
      role: entry.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: entry.content }],
    }));

  contents.push({
    role: 'user',
    parts: [{ text: message }],
  });

  return contents;
}

function buildOllamaMessages(history, message, systemPrompt) {
  const messages = [
    {
      role: 'system',
      content: systemPrompt,
    },
  ];

  history
    .filter((entry) => entry.content && entry.content.trim())
    .slice(-6)
    .forEach((entry) => {
      messages.push({
        role: entry.role === 'assistant' ? 'assistant' : 'user',
        content: entry.content,
      });
    });

  messages.push({
    role: 'user',
    content: message,
  });

  return messages;
}

function extractGeminiText(responseBody) {
  const candidate = responseBody?.candidates?.[0];
  if (!candidate?.content?.parts) {
    return null;
  }

  return candidate.content.parts
    .map((part) => part.text)
    .filter(Boolean)
    .join('\n')
    .trim();
}

async function buildGeminiReply(userId, message, userContext, retrievedDocs, nextTask) {
  if (!hasGeminiAccess()) {
    return null;
  }

  const _geminiCtrl = new AbortController();
  const _geminiTimer = setTimeout(() => _geminiCtrl.abort(), 15000);
  let response;
  try {
    response = await fetch(
      `${GEMINI_API_URL}/${encodeURIComponent(process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: buildSystemPrompt(userContext, retrievedDocs, nextTask, message),
              },
            ],
          },
          contents: buildGeminiContents(await getChatHistory(userId, 6), message),
          generationConfig: {
            temperature: 0.5,
            topP: 0.9,
            maxOutputTokens: 700,
          },
        }),
        signal: _geminiCtrl.signal,
      }
    );
  } catch (fetchErr) {
    clearTimeout(_geminiTimer);
    if (fetchErr.name === 'AbortError') throw new Error('Gemini request timed out after 15s.');
    throw fetchErr;
  }
  clearTimeout(_geminiTimer);

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody?.error?.message || 'Gemini request failed.');
  }

  return extractGeminiText(responseBody);
}

function extractOllamaText(responseBody) {
  const messageContent = responseBody?.message?.content;
  if (messageContent && String(messageContent).trim()) {
    return String(messageContent).trim();
  }

  const generatedText = responseBody?.response;
  if (generatedText && String(generatedText).trim()) {
    return String(generatedText).trim();
  }

  return null;
}

async function buildOllamaReply(userId, message, userContext, retrievedDocs, nextTask) {
  if (!hasOllamaAccess()) {
    return null;
  }

  const baseUrl = String(process.env.OLLAMA_BASE_URL || DEFAULT_OLLAMA_BASE_URL).replace(/\/+$/, '');
  const _ollamaCtrl = new AbortController();
  const _ollamaTimer = setTimeout(() => _ollamaCtrl.abort(), 15000);
  let response;
  try {
    response = await fetch(`${baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || DEFAULT_OLLAMA_MODEL,
        stream: false,
        messages: buildOllamaMessages(
          await getChatHistory(userId, 6),
          message,
          buildSystemPrompt(userContext, retrievedDocs, nextTask, message)
        ),
        options: {
          temperature: 0.5,
          top_p: 0.9,
        },
      }),
      signal: _ollamaCtrl.signal,
    });
  } catch (fetchErr) {
    clearTimeout(_ollamaTimer);
    if (fetchErr.name === 'AbortError') throw new Error('Ollama request timed out after 15s.');
    throw fetchErr;
  }
  clearTimeout(_ollamaTimer);

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody?.error || responseBody?.message || 'Ollama request failed.');
  }

  return extractOllamaText(responseBody);
}

async function buildAnthropicReply(message, userContext, retrievedDocs, nextTask) {
  const client = getAnthropicClient();
  if (!client) {
    return null;
  }

  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
    max_tokens: 700,
    system: buildSystemPrompt(userContext, retrievedDocs, nextTask, message),
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
  });

  return response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n')
    .trim();
}

async function buildOnlineReply(userId, message, userContext, retrievedDocs, nextTask) {
  const ollamaReply = await buildOllamaReply(userId, message, userContext, retrievedDocs, nextTask);
  if (ollamaReply) {
    return ollamaReply;
  }

  const geminiReply = await buildGeminiReply(userId, message, userContext, retrievedDocs, nextTask);
  if (geminiReply) {
    return geminiReply;
  }

  const anthropicReply = await buildAnthropicReply(message, userContext, retrievedDocs, nextTask);
  return anthropicReply || null;
}

function buildOfflineReply(message, userContext, retrievedDocs, nextTask) {
  const normalized = String(message || '').trim().toLowerCase();

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(normalized)) {
    return `Hi ${userContext.userName.split(' ')[0]}. I can help with setup, architecture, coding standards, tickets, company contacts, or your current onboarding tasks.`;
  }

  if (/^(thanks|thank you|ok|okay)\b/.test(normalized)) {
    return `You’re welcome. If you want, I can also help with your next task, coding standards, or setup steps.`;
  }

  if (normalized.includes('current task') || normalized.includes('what should i do next') || normalized.includes('next task')) {
    if (userContext.currentTaskTitle) {
      return `You are currently working on "${userContext.currentTaskTitle}". Finish that first, then your next likely step is "${nextTask?.title || 'the next checklist item'}".`;
    }

    if (nextTask) {
      return `Your next onboarding task is "${nextTask.title}". Open it from the checklist and start with the verification notes in the task description.`;
    }
  }

  if (normalized.includes('progress')) {
    return `You have completed ${userContext.completedCount} of ${userContext.totalCount} onboarding tasks. ${userContext.currentTaskTitle ? `Your active task is "${userContext.currentTaskTitle}".` : 'You do not have an active task yet.'}`;
  }

  if (retrievedDocs.length > 0) {
    const topDoc = retrievedDocs[0];
    const primary = replyFromDoc(topDoc, message);
    const secondDoc = retrievedDocs[1];
    const extra = secondDoc ? ` Related doc: "${secondDoc.title}".` : '';
    return `${primary}${extra}`;
  }

  return `I do not have a matching knowledge-base answer for that yet. Your current onboarding context is ${userContext.completedCount}/${userContext.totalCount} tasks completed${userContext.currentTaskTitle ? `, and your active task is "${userContext.currentTaskTitle}"` : ''}.`;
}

async function getUserContext(userId) {
  const profile = localStore.getUserProfile(userId);

  if (!profile) {
    throw new Error('User not found.');
  }

  const tasks = localStore.listTasksForUser(userId);
  const currentTask = tasks.find((task) => task.status === 'in_progress');
  const completedCount = tasks.filter((task) => task.status === 'completed' || task.status === 'verified').length;

  return {
    userName: profile.name,
    userRole: profile.role,
    experienceLevel: profile.experienceLevel,
    personaName: profile.persona?.name || 'Unassigned',
    currentTaskTitle: currentTask?.title || null,
    completedCount,
    totalCount: tasks.length,
  };
}

async function getChatHistory(userId, limit = 10) {
  return localStore.getChatHistory(userId, limit).map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

function hasOnlineModelAccess() {
  return hasOllamaAccess() || hasGeminiAccess() || hasAnthropicAccess();
}

async function chat(userId, message) {
  try {
    const retrievedDocs = rerankDocs(await embeddingService.searchDocuments(message, 5), message);
    const userContext = await getUserContext(userId);
    const tasks = localStore.listTasksForUser(userId);
    const nextTask = tasks.find((task) => task.status === 'not_started');
    let reply = null;

    try {
      reply = await buildOnlineReply(userId, message, userContext, retrievedDocs, nextTask);
    } catch (onlineError) {
      console.warn('[RAGService] Falling back to offline reply:', onlineError.message);
    }

    if (!reply) {
      reply = buildOfflineReply(message, userContext, retrievedDocs, nextTask);
    }

    const sources = retrievedDocs
      .filter((doc) => (doc.similarity || 0) > 0.2)
      .map((doc) => ({
        id: doc.id,
        title: doc.title,
        category: doc.category,
        similarity: parseFloat((doc.similarity || 0).toFixed(3)),
      }));
    const maxSimilarity = retrievedDocs.length > 0
      ? Math.max(...retrievedDocs.map((doc) => doc.similarity || 0))
      : 0;
    const confidence = hasOnlineModelAccess()
      ? (maxSimilarity > 0.5 ? 'high' : 'medium')
      : maxSimilarity > 0.7 ? 'high' : maxSimilarity > 0.4 ? 'medium' : 'low';

    localStore.addChatMessage(userId, 'user', message, []);
    localStore.addChatMessage(userId, 'assistant', reply, sources);
    localStore.logProgress(userId, 'chat_message', {
      confidence,
      source_count: sources.length,
    });

    return { reply, sources, confidence };
  } catch (err) {
    console.error('[RAGService] Error processing chat:', err.message);
    throw new Error('Failed to process chat message.');
  }
}

async function sendPitfallWarning(userId, taskId) {
  try {
    const task = localStore.getTaskById(taskId);
    const pitfalls = localStore.listPitfallsByTask(taskId);

    if (!task || pitfalls.length === 0) {
      return null;
    }

    const warnings = pitfalls
      .map((pitfall) => `- ${pitfall.title}: ${pitfall.warningMessage}`)
      .join('\n');

    const proactiveMessage = `Heads up before you start "${task.title}". Watch out for:\n\n${warnings}`;
    localStore.addChatMessage(userId, 'assistant', proactiveMessage, []);

    return { reply: proactiveMessage, sources: [] };
  } catch (err) {
    console.error('[RAGService] Error sending pitfall warning:', err.message);
    return null;
  }
}

async function generateDiagnostic(userId, taskTitle, evidence, failureMessage) {
  try {
    const diagnostic = [
      `Verification failed for "${taskTitle}".`,
      `Reason: ${failureMessage}`,
      'Next steps:',
      '- Compare your evidence with the task instructions exactly.',
      '- Re-run the command and paste the full output, not a screenshot summary.',
      evidence ? `- Review the evidence you submitted: "${String(evidence).slice(0, 140)}"` : '- Capture a clearer verification output.',
    ].join('\n');

    localStore.addChatMessage(
      userId,
      'assistant',
      `Verification Failed - Diagnostic Report\n\n${diagnostic}`,
      []
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
