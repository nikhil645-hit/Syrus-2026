const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { loadPs03Data, stableUuid } = require('../../scripts/generatePs03Seed');

const STORE_VERSION = 'ps03-local-demo-v2';
const DATA_DIR = path.resolve(__dirname, '..', '..', '.data');
const STORE_FILE = path.join(DATA_DIR, 'local-demo-store.json');

let state = null;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function tokenize(value) {
  return String(value || '')
    .toLowerCase()
    .split(/[^a-z0-9.+#-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1);
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
  'local',
  'me',
  'my',
  'of',
  'on',
  'or',
  'say',
  'should',
  'tell',
  'the',
  'their',
  'there',
  'to',
  'up',
  'we',
  'what',
  'when',
  'where',
  'who',
  'why',
  'you',
  'your',
]);

function unique(values) {
  return [...new Set(values)];
}

function extractHeadings(content) {
  return String(content || '')
    .split(/\r?\n/)
    .filter((line) => /^#{1,4}\s+/.test(line.trim()))
    .map((line) => line.replace(/^#{1,4}\s+/, '').trim());
}

function expandQueryTokens(queryText) {
  const normalized = String(queryText || '').toLowerCase();
  const tokens = tokenize(queryText).filter((token) => !STOP_WORDS.has(token));
  const expanded = [...tokens];

  const intentRules = [
    {
      test: /(code|coding|style|standards?|lint|format|review|pull request|pr\b|eslint|prettier|typescript|javascript)/,
      tokens: ['engineering', 'standards', 'guidelines', 'pr', 'api'],
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
      test: /(onboarding|first day|timeline|faq|long does onboarding|support session)/,
      tokens: ['faq', 'onboarding', 'process', 'support'],
    },
  ];

  for (const rule of intentRules) {
    if (rule.test.test(normalized)) {
      expanded.push(...rule.tokens);
    }
  }

  return unique(expanded);
}

function nowIso() {
  return new Date().toISOString();
}

function hoursAgo(hours) {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

function minutesAgo(minutes) {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString();
}

function ensureDataDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function createFallbackData() {
  const backendPersonaId = stableUuid('fallback:persona:backend');
  const managerId = stableUuid('fallback:user:manager');
  const developerId = stableUuid('fallback:user:developer');

  return {
    personas: [
      {
        id: backendPersonaId,
        key: 'fallback-backend',
        name: 'Backend Intern (Node.js)',
        role: 'backend',
        experienceLevel: 'junior',
        techStack: ['Node.js', 'JavaScript', 'Docker'],
        onboardingFocus: 'Set up the local backend, understand the codebase, and ship the first task.',
        learningObjectives: 'Meet the team, learn the repo layout, and verify your local environment.',
      },
    ],
    tasks: [
      {
        id: stableUuid('fallback:task:1'),
        code: 'F-01',
        title: '[F-01] Set up Node.js',
        description: 'Install Node.js and verify the version with `node --version`.',
        category: 'Environment',
        verificationType: 'node_version',
        verificationParams: { minVersion: '18.0.0' },
        estimatedMinutes: 15,
      },
      {
        id: stableUuid('fallback:task:2'),
        code: 'F-02',
        title: '[F-02] Clone the repository',
        description: 'Clone the project locally and inspect the folder structure.',
        category: 'Setup',
        verificationType: 'repo_cloned',
        verificationParams: {},
        estimatedMinutes: 20,
      },
      {
        id: stableUuid('fallback:task:3'),
        code: 'F-03',
        title: '[F-03] Start the local services',
        description: 'Run the backend and frontend locally and verify both are reachable.',
        category: 'Verification',
        verificationType: 'service_running',
        verificationParams: { expectedPort: 3000 },
        estimatedMinutes: 20,
      },
    ],
    personaTasks: [
      { personaId: backendPersonaId, taskId: stableUuid('fallback:task:1'), orderIndex: 1 },
      { personaId: backendPersonaId, taskId: stableUuid('fallback:task:2'), orderIndex: 2 },
      { personaId: backendPersonaId, taskId: stableUuid('fallback:task:3'), orderIndex: 3 },
    ],
    tickets: [
      {
        id: stableUuid('fallback:ticket:1'),
        title: 'ONB-001: Update the welcome copy',
        description: 'Adjust the onboarding welcome copy to match the current team voice.',
        repository: 'frontend',
        acceptanceCriteria: 'Welcome copy updated and visible on the landing screen.',
        difficulty: 'easy',
        personaId: backendPersonaId,
      },
    ],
    documents: [
      {
        id: stableUuid('fallback:doc:1'),
        title: 'Setup Guide',
        content: '# Setup Guide\n\nInstall Node.js 18+, run `npm install`, then start the backend and frontend dev servers.',
        category: 'Setup',
        tags: ['setup', 'node', 'frontend', 'backend'],
      },
      {
        id: stableUuid('fallback:doc:2'),
        title: 'Engineering Standards',
        content: '# Engineering Standards\n\nOpen small PRs, keep changes focused, and make sure linting passes before review.',
        category: 'Engineering',
        tags: ['engineering', 'pr', 'review'],
      },
    ],
    sampleUsers: [
      {
        id: developerId,
        email: 'riya.sharma@novabyte.dev',
        name: 'Riya Sharma',
        role: 'developer',
        experienceLevel: 'junior',
        techStack: ['Node.js', 'JavaScript', 'Docker'],
        team: 'Backend',
        personaId: backendPersonaId,
      },
    ],
    managerUser: {
      id: managerId,
      email: 'manager@novabyte.dev',
      name: 'Tanvi Shah',
      role: 'manager',
      experienceLevel: 'senior',
      techStack: ['Leadership', 'Developer Experience'],
      team: 'Developer Experience',
      personaId: null,
    },
    passwordHash: '$2a$10$J8op36C7toLHjxha5qix6.sH.g9/c0Tvy8GxegLHaPrcZlHkwe5au',
    demoProgress: {
      'fallback-backend': { completed: 1, active: 1 },
    },
  };
}

function loadSeedData() {
  try {
    return loadPs03Data();
  } catch (error) {
    console.warn('[LocalStore] Falling back to embedded demo data:', error.message);
    return createFallbackData();
  }
}

function createPitfalls(tasks) {
  const pitfalls = [];

  for (const task of tasks) {
    const title = task.title.toLowerCase();
    let warning = null;
    let headline = null;

    if (task.verificationType === 'env_configured') {
      headline = 'Environment variables drift';
      warning = 'Double-check the variable names and restart the relevant dev server after editing `.env` files.';
    } else if (task.verificationType === 'docker_running') {
      headline = 'Docker not actually running';
      warning = 'Docker Desktop must be open before service checks and compose commands will pass.';
    } else if (task.verificationType === 'repo_cloned') {
      headline = 'Wrong repository or branch';
      warning = 'Confirm you cloned the correct NovaByte repository and that your GitHub access is active.';
    } else if (title.includes('mfa')) {
      headline = 'Recovery codes missed';
      warning = 'Save recovery codes in the company password manager before leaving the setup flow.';
    } else if (title.includes('pull request') || title.includes('submit pr') || title.includes('merged')) {
      headline = 'PR flow mismatch';
      warning = 'Use the expected branch naming and request review only after checks and screenshots are ready.';
    }

    if (warning) {
      pitfalls.push({
        id: stableUuid(`pitfall:${task.id}`),
        taskId: task.id,
        title: headline,
        description: warning,
        warningMessage: warning,
        condition: {},
      });
    }
  }

  return pitfalls;
}

function createTaskInstancesForUser(userId, personaId, personaTasks, demoProgress, personaKeyById, existingByTaskId = new Map()) {
  const progress = demoProgress[personaKeyById.get(personaId)] || { completed: 0, active: 0 };
  const mappings = personaTasks
    .filter((entry) => entry.personaId === personaId)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  return mappings.map((entry) => {
    const existing = existingByTaskId.get(entry.taskId);
    if (existing) {
      return {
        ...existing,
        orderIndex: entry.orderIndex,
      };
    }

    const status = entry.orderIndex <= progress.completed
      ? 'completed'
      : entry.orderIndex <= progress.completed + progress.active
        ? 'in_progress'
        : 'not_started';

    return {
      id: stableUuid(`task-instance:${userId}:${entry.taskId}`),
      userId,
      taskId: entry.taskId,
      status,
      startedAt: status === 'not_started' ? null : status === 'in_progress' ? minutesAgo(20) : hoursAgo(6),
      completedAt: status === 'completed' ? hoursAgo(5) : null,
      evidence: status === 'completed' ? 'Seeded demo completion' : null,
      verificationResult: status === 'completed' ? true : null,
      attemptCount: status === 'completed' ? 1 : 0,
      orderIndex: entry.orderIndex,
    };
  });
}

function buildInitialState() {
  const seed = loadSeedData();
  const personaKeyById = new Map(seed.personas.map((persona) => [persona.id, persona.key]));
  const pitfalls = createPitfalls(seed.tasks);
  const users = [...seed.sampleUsers, seed.managerUser].map((user, index) => ({
    ...user,
    passwordHash: seed.passwordHash,
    createdAt: hoursAgo((index + 1) * 2),
  }));
  const taskInstances = seed.sampleUsers.flatMap((user) =>
    createTaskInstancesForUser(
      user.id,
      user.personaId,
      seed.personaTasks,
      seed.demoProgress,
      personaKeyById
    )
  );
  const tickets = seed.tickets.map((ticket) => ({
    ...ticket,
    assignedTo: null,
    status: 'assigned',
    createdAt: hoursAgo(24),
  }));
  const progressLogs = seed.sampleUsers.map((user) => {
    const persona = seed.personas.find((item) => item.id === user.personaId);
    const totalTasks = seed.personaTasks.filter((entry) => entry.personaId === user.personaId).length;
    return {
      id: crypto.randomUUID(),
      userId: user.id,
      eventType: 'onboarding_started',
      metadata: { persona: persona?.name || 'Unassigned', total_tasks: totalTasks },
      timestamp: hoursAgo(2),
    };
  });
  const riskScores = seed.sampleUsers.map((user) => ({
    userId: user.id,
    score: 0.12,
    factors: {
      stuck_tasks: { count: 0, signal_score: 0 },
      verification_failures: { max_attempts: 0, high_fail_tasks: 0, signal_score: 0 },
      inactive_24h: { recent_events: 1, signal_score: 0 },
      low_completion: { completion_pct: 20, hours_since_start: 6, signal_score: 0 },
      no_chat_activity: { total_messages: 0, signal_score: 1 },
    },
    flagForManager: false,
    updatedAt: nowIso(),
  }));
  const chatHistory = users
    .filter((user) => user.role !== 'manager')
    .map((user) => ({
      id: crypto.randomUUID(),
      userId: user.id,
      role: 'assistant',
      content: `Welcome to Axiom, ${user.name.split(' ')[0]}. I can help with setup, onboarding tasks, tickets, and NovaByte docs.`,
      sources: [],
      createdAt: hoursAgo(1),
    }));

  return {
    version: STORE_VERSION,
    createdAt: nowIso(),
    mode: 'local-demo',
    passwordHash: seed.passwordHash,
    personas: seed.personas.map((persona) => ({
      id: persona.id,
      key: persona.key,
      name: persona.name,
      role: persona.role,
      experienceLevel: persona.experienceLevel,
      techStack: persona.techStack,
      onboardingFocus: persona.onboardingFocus,
      learningObjectives: persona.learningObjectives,
    })),
    tasks: seed.tasks.map((task, index) => ({
      id: task.id,
      code: task.code || `T-${index + 1}`,
      title: task.title,
      description: task.description,
      category: task.category,
      orderIndex: index + 1,
      verificationType: task.verificationType,
      verificationParams: task.verificationParams || {},
      pitfallWarning: null,
      estimatedMinutes: task.estimatedMinutes || 15,
    })),
    personaTasks: seed.personaTasks.map((entry) => ({
      personaId: entry.personaId,
      taskId: entry.taskId,
      orderIndex: entry.orderIndex,
    })),
    documents: seed.documents.map((doc) => ({
      id: doc.id,
      title: doc.title,
      content: doc.content,
      category: doc.category,
      tags: doc.tags || [],
    })),
    pitfalls,
    users,
    taskInstances,
    tickets,
    progressLogs,
    riskScores,
    chatHistory,
  };
}

function loadState() {
  ensureDataDir();

  if (!fs.existsSync(STORE_FILE)) {
    const freshState = buildInitialState();
    fs.writeFileSync(STORE_FILE, JSON.stringify(freshState, null, 2));
    return freshState;
  }

  try {
    const file = JSON.parse(fs.readFileSync(STORE_FILE, 'utf8'));
    if (file.version !== STORE_VERSION) {
      const freshState = buildInitialState();
      fs.writeFileSync(STORE_FILE, JSON.stringify(freshState, null, 2));
      return freshState;
    }
    return file;
  } catch (error) {
    console.warn('[LocalStore] Rebuilding local store:', error.message);
    const freshState = buildInitialState();
    fs.writeFileSync(STORE_FILE, JSON.stringify(freshState, null, 2));
    return freshState;
  }
}

function getState() {
  if (!state) {
    state = loadState();
  }
  return state;
}

function persist() {
  ensureDataDir();
  fs.writeFileSync(STORE_FILE, JSON.stringify(state, null, 2));
}

function listPersonas() {
  return clone(getState().personas);
}

function getPersonaById(personaId) {
  const persona = getState().personas.find((item) => item.id === personaId);
  return persona ? clone(persona) : null;
}

function listUsers() {
  return clone(getState().users);
}

function getUserById(userId) {
  const user = getState().users.find((item) => item.id === userId);
  return user ? clone(user) : null;
}

function getUserByEmail(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const user = getState().users.find((item) => item.email.toLowerCase() === normalizedEmail);
  return user ? clone(user) : null;
}

function getTaskById(taskId) {
  const task = getState().tasks.find((item) => item.id === taskId);
  return task ? clone(task) : null;
}

function getUserTaskInstances(userId) {
  return clone(
    getState().taskInstances
      .filter((item) => item.userId === userId)
      .sort((a, b) => a.orderIndex - b.orderIndex)
  );
}

function getProgressLogs(userId) {
  return clone(
    getState().progressLogs
      .filter((item) => item.userId === userId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  );
}

function logProgress(userId, eventType, metadata = {}) {
  const current = getState();
  current.progressLogs.push({
    id: crypto.randomUUID(),
    userId,
    eventType,
    metadata,
    timestamp: nowIso(),
  });
  persist();
}

function assignPersonaTasks(userId, personaId) {
  const current = getState();
  const existingByTaskId = new Map(
    current.taskInstances
      .filter((item) => item.userId === userId)
      .map((item) => [item.taskId, item])
  );
  const personaKeyById = new Map(current.personas.map((persona) => [persona.id, persona.key]));
  const replacement = createTaskInstancesForUser(
    userId,
    personaId,
    current.personaTasks,
    {},
    personaKeyById,
    existingByTaskId
  );

  current.taskInstances = current.taskInstances.filter((item) => item.userId !== userId).concat(replacement);
}

function createUser({ email, name, passwordHash, role, experienceLevel, techStack, team, personaId }) {
  const current = getState();
  const user = {
    id: crypto.randomUUID(),
    email: String(email).trim().toLowerCase(),
    name: String(name).trim(),
    passwordHash,
    role: role || 'developer',
    experienceLevel: experienceLevel || 'junior',
    techStack: Array.isArray(techStack) ? techStack : [],
    team: team || null,
    personaId: personaId || null,
    createdAt: nowIso(),
  };

  current.users.push(user);
  if (user.personaId) {
    assignPersonaTasks(user.id, user.personaId);
  }

  current.riskScores.push({
    userId: user.id,
    score: 0.1,
    factors: {
      stuck_tasks: { count: 0, signal_score: 0 },
      verification_failures: { max_attempts: 0, high_fail_tasks: 0, signal_score: 0 },
      inactive_24h: { recent_events: 1, signal_score: 0 },
      low_completion: { completion_pct: 0, hours_since_start: 0, signal_score: 0 },
      no_chat_activity: { total_messages: 0, signal_score: 1 },
    },
    flagForManager: false,
    updatedAt: nowIso(),
  });

  current.progressLogs.push({
    id: crypto.randomUUID(),
    userId: user.id,
    eventType: 'onboarding_started',
    metadata: {
      persona: getPersonaById(user.personaId)?.name || 'Unassigned',
      total_tasks: current.taskInstances.filter((item) => item.userId === user.id).length,
    },
    timestamp: nowIso(),
  });

  current.chatHistory.push({
    id: crypto.randomUUID(),
    userId: user.id,
    role: 'assistant',
    content: `Welcome to Axiom, ${user.name.split(' ')[0]}. Your onboarding workspace is ready locally.`,
    sources: [],
    createdAt: nowIso(),
  });

  persist();
  return clone(user);
}

function updateUserPersona(userId, personaId) {
  const current = getState();
  const user = current.users.find((item) => item.id === userId);
  if (!user) {
    return null;
  }

  user.personaId = personaId;
  assignPersonaTasks(userId, personaId);
  persist();
  return clone(user);
}

function getUserProfile(userId) {
  const user = getUserById(userId);
  if (!user) {
    return null;
  }

  const persona = user.personaId ? getPersonaById(user.personaId) : null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    experienceLevel: user.experienceLevel,
    techStack: user.techStack,
    team: user.team,
    createdAt: user.createdAt,
    persona: persona
      ? {
          id: persona.id,
          name: persona.name,
          role: persona.role,
          experienceLevel: persona.experienceLevel,
          techStack: persona.techStack,
          onboardingFocus: persona.onboardingFocus,
          learningObjectives: persona.learningObjectives,
        }
      : null,
  };
}

function listPitfallsByTask(taskId) {
  return clone(getState().pitfalls.filter((item) => item.taskId === taskId));
}

function listTasksForUser(userId) {
  const current = getState();
  const tasksById = new Map(current.tasks.map((task) => [task.id, task]));
  return clone(
    current.taskInstances
      .filter((item) => item.userId === userId)
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((instance) => {
        const task = tasksById.get(instance.taskId);
        const pitfalls = current.pitfalls
          .filter((pitfall) => pitfall.taskId === instance.taskId)
          .map((pitfall) => ({
            id: pitfall.id,
            title: pitfall.title,
            description: pitfall.description,
            warningMessage: pitfall.warningMessage,
          }));

        return {
          id: instance.id,
          taskId: task.id,
          title: task.title,
          description: task.description,
          category: task.category,
          status: instance.status,
          orderIndex: instance.orderIndex,
          verificationType: task.verificationType,
          verificationParams: task.verificationParams,
          pitfallWarning: task.pitfallWarning,
          estimatedMinutes: task.estimatedMinutes,
          startedAt: instance.startedAt,
          completedAt: instance.completedAt,
          evidence: instance.evidence,
          verificationResult: instance.verificationResult,
          attemptCount: instance.attemptCount,
          pitfalls,
        };
      })
  );
}

function getTaskDetailForUser(userId, taskInstanceId) {
  const task = listTasksForUser(userId).find((item) => item.id === taskInstanceId);
  return task || null;
}

function startTask(userId, taskInstanceId) {
  const current = getState();
  const taskInstance = current.taskInstances.find((item) => item.id === taskInstanceId && item.userId === userId);
  if (!taskInstance) {
    return null;
  }

  taskInstance.status = 'in_progress';
  taskInstance.startedAt = taskInstance.startedAt || nowIso();
  persist();
  return getTaskDetailForUser(userId, taskInstanceId);
}

function updateTaskVerification(userId, taskInstanceId, result, evidence) {
  const current = getState();
  const taskInstance = current.taskInstances.find((item) => item.id === taskInstanceId && item.userId === userId);
  if (!taskInstance) {
    return null;
  }

  taskInstance.evidence = evidence;
  taskInstance.verificationResult = result.success;
  taskInstance.attemptCount += 1;
  if (result.success) {
    taskInstance.status = 'verified';
    taskInstance.completedAt = nowIso();
  }
  persist();
  return getTaskDetailForUser(userId, taskInstanceId);
}

function completeTask(userId, taskInstanceId) {
  const current = getState();
  const taskInstance = current.taskInstances.find((item) => item.id === taskInstanceId && item.userId === userId);
  if (!taskInstance) {
    return null;
  }

  taskInstance.status = 'completed';
  taskInstance.completedAt = nowIso();
  taskInstance.startedAt = taskInstance.startedAt || nowIso();
  taskInstance.verificationResult = taskInstance.verificationResult ?? true;
  persist();
  return getTaskDetailForUser(userId, taskInstanceId);
}

function listTicketsForUser(user) {
  const current = getState();
  return clone(
    current.tickets
      .filter((ticket) => ticket.assignedTo === user.id || (!ticket.assignedTo && ticket.personaId === user.personaId))
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map((ticket) => ({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        repository: ticket.repository,
        acceptanceCriteria: ticket.acceptanceCriteria,
        difficulty: ticket.difficulty,
        status: ticket.status,
        personaName: getPersonaById(ticket.personaId)?.name || null,
        createdAt: ticket.createdAt,
      }))
  );
}

function updateTicketStatus(userId, ticketId, status) {
  const current = getState();
  const user = current.users.find((item) => item.id === userId);
  const ticket = current.tickets.find((item) => item.id === ticketId);

  if (!user || !ticket) {
    return null;
  }

  if (ticket.assignedTo && ticket.assignedTo !== userId) {
    return null;
  }

  if (!ticket.assignedTo && ticket.personaId && ticket.personaId !== user.personaId) {
    return null;
  }

  ticket.assignedTo = userId;
  ticket.status = status;
  persist();
  return clone(ticket);
}

function getChatHistory(userId, limit = 50) {
  return clone(
    getState().chatHistory
      .filter((item) => item.userId === userId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(-limit)
  );
}

function addChatMessage(userId, role, content, sources = []) {
  const current = getState();
  const message = {
    id: crypto.randomUUID(),
    userId,
    role,
    content,
    sources,
    createdAt: nowIso(),
  };
  current.chatHistory.push(message);
  persist();
  return clone(message);
}

function searchDocuments(queryText, limit = 5) {
  const queryTokens = expandQueryTokens(queryText);
  if (queryTokens.length === 0) {
    return [];
  }

  const scored = getState().documents.map((document) => {
    const titleTokens = tokenize(document.title);
    const contentTokens = tokenize(document.content);
    const tagTokens = (document.tags || []).flatMap((tag) => tokenize(tag));
    const headingTokens = extractHeadings(document.content).flatMap((heading) => tokenize(heading));
    const normalizedTitle = document.title.toLowerCase();
    const normalizedContent = document.content.toLowerCase();
    const normalizedQuery = String(queryText || '').toLowerCase().trim();

    let score = 0;
    for (const token of queryTokens) {
      if (titleTokens.includes(token)) score += 5;
      if (headingTokens.includes(token)) score += 4;
      if (tagTokens.includes(token)) score += 4;
      if (contentTokens.includes(token)) score += 1.5;
    }

    if (normalizedQuery && normalizedTitle.includes(normalizedQuery)) {
      score += 8;
    }

    for (const heading of extractHeadings(document.content)) {
      if (normalizedQuery && heading.toLowerCase().includes(normalizedQuery)) {
        score += 6;
      }
    }

    if (normalizedQuery) {
      const phrases = [
        'coding standards',
        'engineering standards',
        'local env',
        'local environment',
        'setup guide',
        'system architecture',
        'onboarding faq',
        'first day',
        'point of contact',
      ].filter((phrase) => normalizedQuery.includes(phrase));

      for (const phrase of phrases) {
        if (normalizedTitle.includes(phrase) || normalizedContent.includes(phrase)) {
          score += 5;
        }
      }
    }

    return {
      ...document,
      similarity: queryTokens.length > 0 ? Math.min(1, score / (queryTokens.length * 6)) : 0,
    };
  });

  return clone(
    scored
      .filter((item) => item.similarity > 0)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
  );
}

function getDocuments() {
  return clone(getState().documents);
}

function getRiskScore(userId) {
  const risk = getState().riskScores.find((item) => item.userId === userId);
  return risk ? clone(risk) : null;
}

function setRiskScore(userId, riskData) {
  const current = getState();
  const existing = current.riskScores.find((item) => item.userId === userId);
  const payload = {
    userId,
    score: riskData.score,
    factors: riskData.factors,
    flagForManager: riskData.flagForManager,
    updatedAt: nowIso(),
  };

  if (existing) {
    Object.assign(existing, payload);
  } else {
    current.riskScores.push(payload);
  }

  persist();
  return clone(payload);
}

function listDevelopers() {
  return clone(getState().users.filter((user) => user.role !== 'manager'));
}

function getMode() {
  return getState().mode;
}

module.exports = {
  getMode,
  listPersonas,
  getPersonaById,
  listUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUserPersona,
  getUserProfile,
  listTasksForUser,
  getTaskDetailForUser,
  startTask,
  updateTaskVerification,
  completeTask,
  listPitfallsByTask,
  listTicketsForUser,
  updateTicketStatus,
  getChatHistory,
  addChatMessage,
  searchDocuments,
  getDocuments,
  logProgress,
  getProgressLogs,
  getUserTaskInstances,
  getTaskById,
  getRiskScore,
  setRiskScore,
  listDevelopers,
};
