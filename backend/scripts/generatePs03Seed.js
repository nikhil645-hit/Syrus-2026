const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const DATASET_CANDIDATE_DIRS = [
  path.join(ROOT_DIR, 'backend', 'resources', 'PS03'),
  path.join(ROOT_DIR, 'external_resources', 'PS03'),
];
const OUTPUT_FILE = path.join(ROOT_DIR, 'backend', 'seed.sql');
const PASSWORD_HASH = '$2a$10$J8op36C7toLHjxha5qix6.sH.g9/c0Tvy8GxegLHaPrcZlHkwe5au';
let resolvedDatasetDir = null;

const DOCUMENT_SPECS = [
  {
    filename: 'company_overview.md',
    category: 'General',
    tags: ['company', 'overview', 'products', 'tech-stack'],
  },
  {
    filename: 'engineering_standards.md',
    category: 'Engineering',
    tags: ['engineering', 'standards', 'pr', 'api'],
  },
  {
    filename: 'architecture_documentation.md',
    category: 'Engineering',
    tags: ['architecture', 'services', 'infrastructure', 'data'],
  },
  {
    filename: 'setup_guides.md',
    category: 'Setup',
    tags: ['setup', 'environment', 'frontend', 'backend'],
  },
  {
    filename: 'policies.md',
    category: 'Compliance',
    tags: ['policy', 'security', 'leave', 'compliance'],
  },
  {
    filename: 'org_structure.md',
    category: 'General',
    tags: ['org', 'teams', 'contacts', 'slack'],
  },
  {
    filename: 'onboarding_faq.md',
    category: 'General',
    tags: ['faq', 'onboarding', 'support', 'process'],
  },
];

const CHECKLIST_PERSONA_MAP = {
  'Backend Intern Checklist (Node.js)': 'backend-intern-nodejs',
  'Junior Backend Checklist (Python)': 'junior-backend-python',
  'Junior Frontend Checklist (React)': 'junior-frontend-react',
  'Senior Backend Checklist (Node.js)': 'senior-backend-nodejs',
  'Senior DevOps / Platform Checklist': 'senior-devops',
  'Junior Full-Stack Checklist (Node.js + React)': 'junior-fullstack-node-react',
};

const TICKET_PERSONA_MAP = {
  'Backend Intern Tickets (Node.js)': 'backend-intern-nodejs',
  'Junior Backend Tickets (Python)': 'junior-backend-python',
  'Junior Frontend Tickets (React)': 'junior-frontend-react',
  'Full-Stack Tickets (Node.js + React)': 'junior-fullstack-node-react',
  'Senior Backend Tickets (Node.js)': 'senior-backend-nodejs',
  'Senior DevOps Tickets': 'senior-devops',
};

const DEMO_PROGRESS = {
  'backend-intern-nodejs': { completed: 4, active: 1 },
  'junior-backend-python': { completed: 6, active: 1 },
  'junior-frontend-react': { completed: 5, active: 1 },
  'senior-backend-nodejs': { completed: 8, active: 1 },
  'senior-devops': { completed: 7, active: 1 },
  'junior-fullstack-node-react': { completed: 5, active: 1 },
};

function getDatasetDir() {
  if (resolvedDatasetDir) {
    return resolvedDatasetDir;
  }

  resolvedDatasetDir = DATASET_CANDIDATE_DIRS.find((dir) => fs.existsSync(dir)) || null;
  if (resolvedDatasetDir) {
    return resolvedDatasetDir;
  }

  throw new Error(
    `Dataset folder not found. Expected one of: ${DATASET_CANDIDATE_DIRS.map((dir) => path.relative(ROOT_DIR, dir)).join(', ')}.`
  );
}

function ensureDatasetExists() {
  getDatasetDir();
}

function readDatasetFile(filename) {
  return fs.readFileSync(path.join(getDatasetDir(), filename), 'utf8').replace(/\r\n/g, '\n');
}

function stableUuid(key) {
  const hex = crypto.createHash('md5').update(key).digest('hex');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

function sqlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function sqlValue(value) {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
  if (typeof value === 'object' && value.__raw) return value.value;
  return sqlString(value);
}

function rawSql(value) {
  return { __raw: true, value };
}

function sqlJson(value) {
  return rawSql(`${sqlString(JSON.stringify(value))}::jsonb`);
}

function sqlTextArray(values) {
  return rawSql(`ARRAY[${values.map((value) => sqlString(value)).join(', ')}]`);
}

function cleanCell(value) {
  return value
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .trim();
}

function splitMarkdownRow(row) {
  return row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cleanCell(cell));
}

function parseMarkdownTable(lines) {
  const tableLines = lines.filter((line) => line.trim().startsWith('|'));
  if (tableLines.length < 3) {
    return [];
  }

  const headers = splitMarkdownRow(tableLines[0]);
  return tableLines.slice(2).map((rowLine) => {
    const values = splitMarkdownRow(rowLine);
    return headers.reduce((row, header, index) => {
      row[header] = values[index] || '';
      return row;
    }, {});
  });
}

function parseSections(content, headingPrefix = '## ') {
  const sections = [];
  let current = null;

  for (const line of content.split('\n')) {
    if (line.startsWith(headingPrefix)) {
      if (current) sections.push(current);
      current = { heading: line.slice(headingPrefix.length).trim(), lines: [] };
      continue;
    }

    if (current) {
      current.lines.push(line);
    }
  }

  if (current) sections.push(current);
  return sections;
}

function parseSubsections(lines, headingPrefix = '### ') {
  const sections = [];
  let current = null;

  for (const line of lines) {
    if (line.startsWith(headingPrefix)) {
      if (current) sections.push(current);
      current = { heading: line.slice(headingPrefix.length).trim(), lines: [] };
      continue;
    }

    if (current) {
      current.lines.push(line);
    }
  }

  if (current) sections.push(current);
  return sections;
}

function inferPersonaKey(personaName) {
  const lower = personaName.toLowerCase();
  if (lower.includes('backend intern')) return 'backend-intern-nodejs';
  if (lower.includes('junior backend')) return 'junior-backend-python';
  if (lower.includes('junior frontend')) return 'junior-frontend-react';
  if (lower.includes('senior backend')) return 'senior-backend-nodejs';
  if (lower.includes('senior devops')) return 'senior-devops';
  if (lower.includes('full-stack') || lower.includes('full stack')) return 'junior-fullstack-node-react';
  throw new Error(`Unsupported persona name: ${personaName}`);
}

function inferRole(personaName) {
  const lower = personaName.toLowerCase();
  if (lower.includes('frontend')) return 'frontend';
  if (lower.includes('full-stack') || lower.includes('full stack')) return 'fullstack';
  if (lower.includes('devops') || lower.includes('platform')) return 'devops';
  return 'backend';
}

function inferExperience(personaName) {
  const lower = personaName.toLowerCase();
  if (lower.includes('intern')) return 'intern';
  if (lower.includes('junior')) return 'junior';
  if (lower.includes('senior')) return 'senior';
  return 'mid';
}

function normalizeTechStack(value) {
  return value
    .split(',')
    .map((item) => item.trim().replace(/^basic\s+/i, ''))
    .filter(Boolean)
    .map((item) => {
      if (/^react query$/i.test(item)) return 'React Query';
      if (/^github actions$/i.test(item)) return 'GitHub Actions';
      return item;
    });
}

function getPersonaSummary(fields) {
  const mentorOrBuddy = fields.Mentor || fields.Buddy;
  return [
    `Department: ${fields.Department}`,
    `Manager: ${fields.Manager}`,
    mentorOrBuddy ? `Mentor/Buddy: ${mentorOrBuddy}` : null,
    `Background: ${fields.Background}`,
  ]
    .filter(Boolean)
    .join(' | ');
}

function parsePersonas() {
  const content = readDatasetFile('employee_personas.md');
  const sections = parseSections(content);

  return sections
    .filter((section) => /^Persona \d+:/.test(section.heading))
    .map((section) => {
      const title = section.heading.replace(/^Persona \d+:\s*/, '');
      const nameParts = title.split(/\s+[—–]\s+/);
      const employeeName = nameParts[0].trim();
      const personaName = nameParts[1].trim();
      const focusIndex = section.lines.findIndex((line) => line.startsWith('### Expected Onboarding Focus'));
      const tableRows = parseMarkdownTable(section.lines.slice(0, focusIndex));
      const fields = tableRows.reduce((acc, row) => {
        acc[row.Field] = row.Value;
        return acc;
      }, {});
      const onboardingFocus = section.lines
        .slice(focusIndex + 1)
        .filter((line) => line.trim().startsWith('- '))
        .map((line) => line.replace(/^- /, '').trim())
        .join('; ');
      const key = inferPersonaKey(personaName);
      const techStack = normalizeTechStack(fields['Tech Stack']);

      return {
        key,
        id: stableUuid(`persona:${key}`),
        name: personaName,
        role: inferRole(personaName),
        experienceLevel: inferExperience(personaName),
        techStack,
        onboardingFocus,
        learningObjectives: getPersonaSummary(fields),
        sampleUser: {
          id: stableUuid(`user:${fields.Email}`),
          name: employeeName,
          email: fields.Email,
          role: 'developer',
          experienceLevel: inferExperience(personaName),
          techStack,
          team: fields.Department.split(/\s+[—–]\s+/).pop().trim(),
          personaId: stableUuid(`persona:${key}`),
        },
      };
    });
}

function guessVerificationConfig(taskName, personaKey) {
  const lower = taskName.toLowerCase();

  if (lower.includes('install node.js 20 via nvm') || lower.includes('self-serve environment setup (node.js')) {
    return { type: 'node_version', params: { minVersion: '20.0.0' } };
  }

  if (lower.includes('install python 3.11 via pyenv')) {
    return { type: 'python_version', params: { minVersion: '3.11.0' } };
  }

  if (
    lower.includes('install docker desktop') ||
    lower.includes('run docker compose') ||
    lower.includes('start local dependencies')
  ) {
    return { type: 'docker_running', params: {} };
  }

  if (lower.includes('install pnpm')) {
    return { type: 'pnpm_installed', params: {} };
  }

  if (
    lower.includes('clone assigned repository') ||
    lower.includes('clone flowengine-web repository') ||
    lower.includes('clone connector-runtime') ||
    lower.includes('clone infrastructure repository') ||
    lower.includes('clone all backend squad beta repositories') ||
    lower.includes('clone connector-runtime (backend) and flowengine-web (frontend) repositories')
  ) {
    return { type: 'repo_cloned', params: {} };
  }

  if (
    lower.includes('set up local environment') ||
    lower.includes('.env configuration') ||
    lower.includes('.env.local') ||
    lower.includes('configure aws cli')
  ) {
    if (personaKey === 'junior-frontend-react' || lower.includes('.env.local')) {
      return {
        type: 'env_configured',
        params: { requiredKeys: ['VITE_API_BASE_URL', 'VITE_WS_URL'] },
      };
    }

    if (personaKey === 'senior-devops' || lower.includes('aws cli')) {
      return {
        type: 'env_configured',
        params: { requiredKeys: ['AWS_PROFILE'] },
      };
    }

    if (personaKey === 'junior-backend-python') {
      return {
        type: 'env_configured',
        params: { requiredKeys: ['DATABASE_URL', 'REDIS_URL', 'KAFKA_BROKERS'] },
      };
    }

    return {
      type: 'env_configured',
      params: { requiredKeys: ['DATABASE_URL', 'REDIS_URL', 'JWT_SECRET', 'KAFKA_BROKERS'] },
    };
  }

  if (
    lower.includes('successfully start the service locally') ||
    lower.includes('verify swagger ui loads') ||
    lower.includes('verify it loads') ||
    lower.includes('verify backend service starts') ||
    lower.includes('verify frontend dev server starts') ||
    lower.includes('set up and run all services locally')
  ) {
    if (personaKey === 'junior-frontend-react' || lower.includes('frontend dev server')) {
      return { type: 'service_running', params: { expectedPort: 3000 } };
    }

    if (personaKey === 'junior-backend-python' || lower.includes('swagger')) {
      return { type: 'service_running', params: { expectedPort: 8000 } };
    }

    return { type: 'service_running', params: { expectedPort: 3001 } };
  }

  if (lower.includes('run unit tests') || lower.includes('run full pytest suite') || lower.includes('run test suite')) {
    return { type: 'tests_passing', params: {} };
  }

  return { type: 'text_confirmation', params: {} };
}

function estimateMinutes(category, taskName) {
  const lowerCategory = category.toLowerCase();
  const lowerName = taskName.toLowerCase();

  if (lowerCategory.includes('first task') || lowerName.includes('submit pr') || lowerName.includes('get pr approved') || lowerName.includes('get pr merged')) {
    return 90;
  }

  if (lowerCategory.includes('compliance') || lowerName.includes('training')) {
    return 45;
  }

  if (lowerCategory.includes('onboarding') || lowerName.includes('meet ') || lowerName.includes('attend ')) {
    return 30;
  }

  if (lowerCategory.includes('knowledge') || lowerName.startsWith('read ')) {
    return 20;
  }

  if (lowerCategory.includes('verification') || lowerName.includes('tests')) {
    return 20;
  }

  if (lowerCategory.includes('environment') || lowerCategory.includes('network') || lowerCategory.includes('access') || lowerCategory.includes('security')) {
    return 15;
  }

  return 15;
}

function buildTaskDescription({ code, title, category, owner, deadline, sectionHeading }) {
  const lines = [
    title,
    '',
    `Checklist Item: ${code}`,
    `Checklist Section: ${sectionHeading}`,
    `Category: ${category}`,
  ];

  if (owner) {
    lines.push(`Owner: ${owner}`);
  }

  lines.push(`Deadline: ${deadline}`);
  lines.push('');
  lines.push('Verification: Paste the requested evidence or confirm completion in the task modal.');

  return lines.join('\n');
}

function parseChecklists(personaLookup) {
  const content = readDatasetFile('onboarding_checklists.md');
  const sections = parseSections(content);
  const taskMap = new Map();
  const commonTaskCodes = [];
  const personaTaskCodes = new Map();

  for (const section of sections) {
    const heading = section.heading;

    if (
      heading === 'Checklist Status Definitions' ||
      heading === 'Onboarding Completion Criteria'
    ) {
      continue;
    }

    const rows = parseMarkdownTable(section.lines);
    if (rows.length === 0) {
      continue;
    }

    const personaKey = CHECKLIST_PERSONA_MAP[heading] || null;
    const targetList = personaKey ? (personaTaskCodes.get(personaKey) || []) : commonTaskCodes;

    for (const row of rows) {
      const code = row['#'];
      const title = row.Task;
      const category = row.Category;
      const owner = row.Owner || null;
      const deadline = row.Deadline;
      const verification = guessVerificationConfig(title, personaKey);

      if (!taskMap.has(code)) {
        taskMap.set(code, {
          id: stableUuid(`task:${code}`),
          code,
          title: `[${code}] ${title}`,
          description: buildTaskDescription({ code, title, category, owner, deadline, sectionHeading: heading }),
          category,
          verificationType: verification.type,
          verificationParams: verification.params,
          estimatedMinutes: estimateMinutes(category, title),
        });
      }

      targetList.push(code);
    }

    if (personaKey) {
      personaTaskCodes.set(personaKey, targetList);
    }
  }

  const personaTasks = Array.from(personaLookup.keys()).flatMap((personaKey) => {
    const orderedCodes = [...commonTaskCodes, ...(personaTaskCodes.get(personaKey) || [])];
    return orderedCodes.map((code, index) => ({
      personaId: personaLookup.get(personaKey).id,
      taskId: taskMap.get(code).id,
      orderIndex: index + 1,
    }));
  });

  return {
    tasks: Array.from(taskMap.values()),
    personaTasks,
  };
}

function parseNamedBlocks(lines) {
  const blocks = {};
  let currentLabel = null;

  for (const line of lines) {
    const match = line.match(/^\*\*(.+?):\*\*\s*(.*)$/);
    if (match) {
      currentLabel = match[1];
      blocks[currentLabel] = match[2] ? [match[2]] : [];
      continue;
    }

    if (currentLabel) {
      blocks[currentLabel].push(line);
    }
  }

  return Object.fromEntries(
    Object.entries(blocks).map(([label, valueLines]) => [label, valueLines.join('\n').trim()])
  );
}

function mapDifficulty(storyPoints) {
  if (storyPoints >= 5) return 'hard';
  if (storyPoints >= 3) return 'medium';
  return 'easy';
}

function buildTicketDescription(title, blocks) {
  const lines = [];
  if (blocks.Project) lines.push(`Project: ${cleanCell(blocks.Project)}`);
  if (blocks.Type) lines.push(`Type: ${cleanCell(blocks.Type)}`);
  if (blocks.Priority) lines.push(`Priority: ${cleanCell(blocks.Priority)}`);
  if (blocks['Story Points']) lines.push(`Story Points: ${cleanCell(blocks['Story Points'])}`);
  if (lines.length > 0) lines.push('');
  if (blocks.Description) lines.push(blocks.Description.trim());
  if (blocks['Files to Modify']) {
    lines.push('');
    lines.push('Files to Modify:');
    lines.push(blocks['Files to Modify'].trim());
  }
  if (blocks['Helpful Resources']) {
    lines.push('');
    lines.push('Helpful Resources:');
    lines.push(blocks['Helpful Resources'].trim());
  }
  return lines.join('\n').trim() || title;
}

function parseTickets(personaLookup) {
  const content = readDatasetFile('starter_tickets.md');
  const sections = parseSections(content);
  const tickets = [];
  const ticketsByCode = new Map();

  for (const section of sections) {
    const personaKey = TICKET_PERSONA_MAP[section.heading];
    if (!personaKey) continue;

    for (const subsection of parseSubsections(section.lines)) {
      const separator = subsection.heading.indexOf(':');
      const code = subsection.heading.slice(0, separator).trim();
      const title = subsection.heading.slice(separator + 1).trim();
      const blocks = parseNamedBlocks(subsection.lines);
      const storyPoints = parseInt(cleanCell(blocks['Story Points'] || '2'), 10) || 2;

      const ticket = {
        id: stableUuid(`ticket:${code}`),
        code,
        title: `${code}: ${title}`,
        description: buildTicketDescription(title, blocks),
        repository: cleanCell(blocks.Repository || '').replace(/`/g, ''),
        acceptanceCriteria: (blocks['Acceptance Criteria'] || '').trim(),
        difficulty: mapDifficulty(storyPoints),
        personaId: personaLookup.get(personaKey).id,
      };

      tickets.push(ticket);
      ticketsByCode.set(code, ticket);
    }
  }

  const sharedFrontendTicket = ticketsByCode.get('FLOW-FE-001');
  const sharedFullstackTicket = ticketsByCode.get('FLOW-FS-002');

  if (sharedFrontendTicket && sharedFullstackTicket && sharedFullstackTicket.description.includes('Same as FLOW-FE-001')) {
    sharedFullstackTicket.description = sharedFrontendTicket.description;
    sharedFullstackTicket.acceptanceCriteria = sharedFrontendTicket.acceptanceCriteria;
    sharedFullstackTicket.repository = sharedFrontendTicket.repository;
    sharedFullstackTicket.difficulty = sharedFrontendTicket.difficulty;
  }

  return tickets;
}

function parseDocuments() {
  return DOCUMENT_SPECS.map((spec) => {
    const content = readDatasetFile(spec.filename);
    const title = content
      .split('\n')
      .find((line) => line.startsWith('# '))
      .replace(/^# /, '')
      .trim();

    return {
      id: stableUuid(`document:${spec.filename}`),
      title,
      content,
      category: spec.category,
      tags: spec.tags,
    };
  });
}

function buildDemoUsers(personas) {
  const sampleUsers = personas.map((persona) => persona.sampleUser);
  const managerUser = {
    id: stableUuid('user:manager@novabyte.dev'),
    email: 'manager@novabyte.dev',
    name: 'Tanvi Shah',
    role: 'manager',
    experienceLevel: 'senior',
    techStack: ['Leadership', 'Developer Experience', 'Process'],
    team: 'Developer Experience',
    personaId: null,
  };

  return { sampleUsers, managerUser };
}

function loadPs03Data() {
  ensureDatasetExists();

  const personas = parsePersonas();
  const personaLookup = new Map(personas.map((persona) => [persona.key, persona]));
  const { tasks, personaTasks } = parseChecklists(personaLookup);
  const tickets = parseTickets(personaLookup);
  const documents = parseDocuments();
  const { sampleUsers, managerUser } = buildDemoUsers(personas);

  return {
    personas,
    tasks,
    personaTasks,
    tickets,
    documents,
    sampleUsers,
    managerUser,
    passwordHash: PASSWORD_HASH,
    demoProgress: DEMO_PROGRESS,
  };
}

function buildSeedSql({ personas, tasks, personaTasks, tickets, documents }) {
  const lines = [];
  const { sampleUsers, managerUser } = buildDemoUsers(personas);

  lines.push('-- ============================================');
  lines.push('-- NovaByte PS03 Seed Data');
  lines.push(`-- Generated from ${path.relative(ROOT_DIR, getDatasetDir())}`);
  lines.push('-- ============================================');
  lines.push('');
  lines.push('BEGIN;');
  lines.push('');
  lines.push("TRUNCATE TABLE chat_history, progress_logs, risk_scores, tickets, pitfalls, documents, task_instances, persona_tasks, tasks, users, personas CASCADE;");
  lines.push('');

  lines.push('-- PERSONAS');
  lines.push('INSERT INTO personas (id, name, role, experience_level, tech_stack, onboarding_focus, learning_objectives)');
  lines.push('VALUES');
  lines.push(
    personas
      .map((persona) =>
        `  (${[
          persona.id,
          persona.name,
          persona.role,
          persona.experienceLevel,
          sqlJson(persona.techStack),
          persona.onboardingFocus,
          persona.learningObjectives,
        ]
          .map(sqlValue)
          .join(', ')})`
      )
      .join(',\n')
  );
  lines.push(';');
  lines.push('');

  lines.push('-- TASKS');
  lines.push('INSERT INTO tasks (id, title, description, category, order_index, verification_type, verification_params, pitfall_warning, estimated_minutes)');
  lines.push('VALUES');
  lines.push(
    tasks
      .map((task, index) =>
        `  (${[
          task.id,
          task.title,
          task.description,
          task.category,
          index + 1,
          task.verificationType,
          sqlJson(task.verificationParams),
          null,
          task.estimatedMinutes,
        ]
          .map(sqlValue)
          .join(', ')})`
      )
      .join(',\n')
  );
  lines.push(';');
  lines.push('');

  lines.push('-- PERSONA TASK MAPPINGS');
  lines.push('INSERT INTO persona_tasks (persona_id, task_id, order_index)');
  lines.push('VALUES');
  lines.push(
    personaTasks
      .map((entry) => `  (${[entry.personaId, entry.taskId, entry.orderIndex].map(sqlValue).join(', ')})`)
      .join(',\n')
  );
  lines.push(';');
  lines.push('');

  lines.push('-- KNOWLEDGE BASE DOCUMENTS');
  lines.push('INSERT INTO documents (id, title, content, tags, category)');
  lines.push('VALUES');
  lines.push(
    documents
      .map((doc) =>
        `  (${[
          doc.id,
          doc.title,
          doc.content,
          sqlTextArray(doc.tags),
          doc.category,
        ]
          .map(sqlValue)
          .join(', ')})`
      )
      .join(',\n')
  );
  lines.push(';');
  lines.push('');

  lines.push('-- STARTER TICKETS');
  lines.push('INSERT INTO tickets (id, title, description, repository, acceptance_criteria, difficulty, persona_id, status)');
  lines.push('VALUES');
  lines.push(
    tickets
      .map((ticket) =>
        `  (${[
          ticket.id,
          ticket.title,
          ticket.description,
          ticket.repository,
          ticket.acceptanceCriteria,
          ticket.difficulty,
          ticket.personaId,
          'assigned',
        ]
          .map(sqlValue)
          .join(', ')})`
      )
      .join(',\n')
  );
  lines.push(';');
  lines.push('');

  lines.push('-- SAMPLE USERS');
  lines.push('INSERT INTO users (id, email, name, password_hash, role, experience_level, tech_stack, team, persona_id, created_at)');
  lines.push('VALUES');
  lines.push(
    [
      ...sampleUsers.map((user, index) => ({
        ...user,
        createdAt: rawSql(`NOW() - INTERVAL '${(index + 1) * 2} hours'`),
      })),
      {
        ...managerUser,
        personaId: null,
        createdAt: rawSql("NOW() - INTERVAL '12 hours'"),
      },
    ]
      .map((user) =>
        `  (${[
          user.id,
          user.email,
          user.name,
          PASSWORD_HASH,
          user.role,
          user.experienceLevel,
          sqlJson(user.techStack),
          user.team,
          user.personaId,
          user.createdAt,
        ]
          .map(sqlValue)
          .join(', ')})`
      )
      .join(',\n')
  );
  lines.push(';');
  lines.push('');

  lines.push('-- TASK INSTANCES');
  for (const user of sampleUsers) {
    lines.push(
      `INSERT INTO task_instances (id, user_id, task_id, status, order_index)
SELECT gen_random_uuid(), ${sqlValue(user.id)}, pt.task_id, 'not_started', pt.order_index
FROM persona_tasks pt
WHERE pt.persona_id = ${sqlValue(user.personaId)};`
    );
  }
  lines.push('');

  lines.push('-- DEMO PROGRESS STATES');
  for (const user of sampleUsers) {
    const persona = personas.find((item) => item.sampleUser.id === user.id);
    const progress = DEMO_PROGRESS[persona.key];
    if (!progress) continue;

    if (progress.completed > 0) {
      lines.push(
        `UPDATE task_instances
SET status = 'completed',
    started_at = NOW() - INTERVAL '6 hours',
    completed_at = NOW() - INTERVAL '5 hours',
    evidence = 'Seeded demo completion',
    verification_result = TRUE,
    attempt_count = 1
WHERE user_id = ${sqlValue(user.id)}
  AND order_index BETWEEN 1 AND ${progress.completed};`
      );
    }

    if (progress.active > 0) {
      const activeStart = progress.completed + 1;
      const activeEnd = progress.completed + progress.active;
      lines.push(
        `UPDATE task_instances
SET status = 'in_progress',
    started_at = NOW() - INTERVAL '20 minutes'
WHERE user_id = ${sqlValue(user.id)}
  AND order_index BETWEEN ${activeStart} AND ${activeEnd};`
      );
    }
  }
  lines.push('');

  lines.push('-- RISK SNAPSHOTS');
  lines.push('INSERT INTO risk_scores (user_id, score, factors, flag_for_manager, updated_at)');
  lines.push('VALUES');
  lines.push(
    sampleUsers
      .map((user) =>
        `  (${[
          user.id,
          0.12,
          sqlJson({
            stuck_tasks: { count: 0, signal_score: 0 },
            verification_failures: { max_attempts: 1, high_fail_tasks: 0, signal_score: 0 },
            inactive_24h: { recent_events: 1, signal_score: 0 },
            low_completion: { completion_pct: 20, hours_since_start: 12, signal_score: 0 },
            no_chat_activity: { total_messages: 0, signal_score: 1 },
          }),
          false,
          rawSql('NOW()'),
        ]
          .map(sqlValue)
          .join(', ')})`
      )
      .join(',\n')
  );
  lines.push(';');
  lines.push('');

  lines.push('-- ONBOARDING START EVENTS');
  for (const user of sampleUsers) {
    const persona = personas.find((item) => item.sampleUser.id === user.id);
    const totalTasks = personaTasks.filter((entry) => entry.personaId === persona.id).length;
    lines.push(
      `INSERT INTO progress_logs (user_id, event_type, metadata, timestamp)
VALUES (
  ${sqlValue(user.id)},
  'onboarding_started',
  ${sqlValue(JSON.stringify({ persona: persona.name, total_tasks: totalTasks }))}::jsonb,
  NOW() - INTERVAL '2 hours'
);`
    );
  }
  lines.push('');

  lines.push('COMMIT;');
  lines.push('');

  return lines.join('\n');
}

function main() {
  const { personas, tasks, personaTasks, tickets, documents } = loadPs03Data();
  const sql = buildSeedSql({ personas, tasks, personaTasks, tickets, documents });

  fs.writeFileSync(OUTPUT_FILE, sql, 'utf8');
  console.log(`Generated ${path.relative(ROOT_DIR, OUTPUT_FILE)} from ${path.relative(ROOT_DIR, getDatasetDir())}.`);
}

if (require.main === module) {
  main();
}

module.exports = {
  loadPs03Data,
  stableUuid,
};
