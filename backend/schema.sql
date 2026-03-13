-- ============================================
-- Autonomous Developer Onboarding Agent
-- PostgreSQL Schema with pgvector
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
-- CREATE EXTENSION IF NOT EXISTS "vector";  -- Commented out for now, will add pgvector later

-- ============================================
-- ENUM TYPES
-- ============================================
CREATE TYPE task_status AS ENUM ('not_started', 'in_progress', 'verified', 'completed');
CREATE TYPE ticket_status AS ENUM ('assigned', 'in_progress', 'completed');

-- ============================================
-- PERSONAS — Predefined developer role profiles
-- ============================================
CREATE TABLE personas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    experience_level TEXT NOT NULL,
    tech_stack JSONB NOT NULL DEFAULT '[]',
    onboarding_focus TEXT,
    learning_objectives TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- USERS — Developer and manager accounts
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'developer',
    experience_level TEXT,
    tech_stack JSONB DEFAULT '[]',
    team TEXT,
    persona_id UUID REFERENCES personas(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_persona_id ON users(persona_id);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- TASKS — Reusable onboarding task templates
-- ============================================
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    verification_type TEXT,
    verification_params JSONB DEFAULT '{}',
    pitfall_warning TEXT,
    estimated_minutes INTEGER DEFAULT 30,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tasks_category ON tasks(category);
CREATE INDEX idx_tasks_order ON tasks(order_index);

-- ============================================
-- PERSONA_TASKS — Many-to-many mapping
-- ============================================
CREATE TABLE persona_tasks (
    persona_id UUID NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (persona_id, task_id)
);

CREATE INDEX idx_persona_tasks_persona ON persona_tasks(persona_id);
CREATE INDEX idx_persona_tasks_task ON persona_tasks(task_id);

-- ============================================
-- TASK_INSTANCES — Per-user task progress
-- ============================================
CREATE TABLE task_instances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    status task_status NOT NULL DEFAULT 'not_started',
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    evidence TEXT,
    verification_result BOOLEAN,
    attempt_count INTEGER DEFAULT 0,
    order_index INTEGER DEFAULT 0
);

CREATE INDEX idx_task_instances_user ON task_instances(user_id);
CREATE INDEX idx_task_instances_task ON task_instances(task_id);
CREATE INDEX idx_task_instances_status ON task_instances(status);

-- ============================================
-- DOCUMENTS — Internal knowledge base with embeddings
-- ============================================
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    embedding TEXT,  -- Storing as TEXT for now (will use pgvector VECTOR(1536) when extension is available)
    tags TEXT[] DEFAULT '{}',
    category TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_documents_category ON documents(category);

-- ============================================
-- PITFALLS — Known issues per task
-- ============================================
CREATE TABLE pitfalls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    warning_message TEXT NOT NULL,
    condition JSONB DEFAULT '{}'
);

CREATE INDEX idx_pitfalls_task ON pitfalls(task_id);

-- ============================================
-- TICKETS — Starter development tickets
-- ============================================
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    repository TEXT,
    acceptance_criteria TEXT,
    difficulty TEXT NOT NULL DEFAULT 'easy',
    persona_id UUID REFERENCES personas(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    status ticket_status NOT NULL DEFAULT 'assigned',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tickets_persona ON tickets(persona_id);
CREATE INDEX idx_tickets_assigned ON tickets(assigned_to);

-- ============================================
-- PROGRESS_LOGS — Full event stream for analytics
-- ============================================
CREATE TABLE progress_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_progress_logs_user ON progress_logs(user_id);
CREATE INDEX idx_progress_logs_event ON progress_logs(event_type);
CREATE INDEX idx_progress_logs_timestamp ON progress_logs(timestamp);

-- ============================================
-- RISK_SCORES — Cached risk assessments
-- ============================================
CREATE TABLE risk_scores (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    score FLOAT NOT NULL DEFAULT 0.0,
    factors JSONB DEFAULT '{}',
    flag_for_manager BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- CHAT_HISTORY — Conversation memory per user
-- ============================================
CREATE TABLE chat_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    sources JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_chat_history_user ON chat_history(user_id);
CREATE INDEX idx_chat_history_created ON chat_history(created_at);
