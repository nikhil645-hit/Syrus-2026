-- ============================================
-- NovaByte PS03 Seed Data
-- Generated from backend\resources\PS03
-- ============================================

BEGIN;

TRUNCATE TABLE chat_history, progress_logs, risk_scores, tickets, pitfalls, documents, task_instances, persona_tasks, tasks, users, personas CASCADE;

-- PERSONAS
INSERT INTO personas (id, name, role, experience_level, tech_stack, onboarding_focus, learning_objectives)
VALUES
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'Backend Intern (Node.js)', 'backend', 'intern', '["Node.js","JavaScript","TypeScript"]'::jsonb, 'Environment setup from scratch (Node.js, pnpm, Docker); Git workflow training (branching, PRs, conventional commits); Understanding the connector-runtime service; API standards walkthrough; Complete a starter bug fix task; Compliance training; Pair programming sessions with mentor', 'Department: Engineering — Backend Squad Beta | Manager: Arjun Mehta (Squad Lead, Backend Beta) | Mentor/Buddy: Priya Nair (Senior Backend Engineer) | Background: Built 2 personal projects in Express.js. Basic understanding of REST APIs. No professional experience. Familiar with Git basics.'),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'Junior Backend Engineer (Python)', 'backend', 'junior', '["Python","FastAPI","PostgreSQL","Docker"]'::jsonb, 'Python environment setup (pyenv, Poetry); Workflow Core service deep dive; Database schema walkthrough; API standards and testing standards; First feature task (small enhancement); CI/CD pipeline overview; Compliance training', 'Department: Engineering — Backend Squad Alpha | Manager: Sneha Kulkarni (Squad Lead, Backend Alpha) | Mentor/Buddy: Rahul Verma (Staff Backend Engineer) | Background: Solid Python fundamentals. Experience with Django, migrating to FastAPI. Familiar with PostgreSQL. Basic Kafka knowledge. Needs to learn company-specific architecture.'),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'Junior Frontend Engineer (React)', 'frontend', 'junior', '["React","JavaScript","CSS","TypeScript"]'::jsonb, 'Frontend dev setup (Node.js, pnpm, Vite); FlowEngine Web codebase walkthrough; Design system (@novabyte/ui-kit) introduction; Storybook setup and usage; State management (Zustand, React Query) overview; First UI task (component enhancement); PR process and code review etiquette; Compliance training', 'Department: Engineering — Frontend Team | Manager: Kavitha Rajan (Frontend Lead) | Mentor/Buddy: Deepak Menon (Senior Frontend Engineer) | Background: Comfortable with React hooks and functional components. Basic TypeScript. No experience with Zustand or React Query. Familiar with CSS but not Tailwind.'),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'Senior Backend Engineer (Node.js)', 'backend', 'senior', '["Node.js","TypeScript","PostgreSQL","Redis","Kafka","Docker","Kubernetes"]'::jsonb, 'Skip basic environment setup (self-serve); Architecture deep dive (full system overview); Service ownership and SLA review; On-call process and incident response training; Deployment pipeline walkthrough; Meet key stakeholders (Product, QA, DevOps); Review active projects and roadmap; Take ownership of a medium-complexity project within 2 weeks; Compliance training', 'Department: Engineering — Backend Squad Beta | Manager: Arjun Mehta (Squad Lead, Backend Beta) | Mentor/Buddy: Sanjay Rao (Staff Engineer, Platform) | Background: Strong Node.js and system design experience. Led a team of 4 at Razorpay. Deep experience with Kafka, Redis, and microservices. Familiar with K8s. Expects minimal hand-holding on tech setup.'),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'Senior DevOps Engineer', 'devops', 'senior', '["AWS","Terraform","Kubernetes","Helm","GitHub Actions","ArgoCD","Prometheus","Grafana"]'::jsonb, 'AWS account access and VPN setup; Infrastructure repository walkthrough; Kubernetes cluster architecture review; CI/CD pipeline deep dive (GitHub Actions + ArgoCD); Monitoring stack review (Datadog, PagerDuty); Terraform module structure and conventions; Review active infrastructure projects and tech debt; On-call rotation and incident response; Meet stakeholders across all squads; Compliance training', 'Department: Engineering — Platform Team | Manager: Rohan Saxena (Platform Engineering Lead) | Mentor/Buddy: Nikhil Gupta (Staff Platform Engineer) | Background: Extensive AWS and Kubernetes experience. Led infrastructure for a 500-developer org at Zomato. Expert in Terraform and IaC. Familiar with GitOps (ArgoCD). Expects to contribute immediately.'),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'Junior Full-Stack Engineer (Node.js + React)', 'fullstack', 'junior', '["Node.js","React","JavaScript","MongoDB","TypeScript"]'::jsonb, 'Both backend and frontend environment setup; Node.js backend (connector-runtime or notification-service); Frontend (flowengine-web) codebase orientation; PostgreSQL basics (migration from MongoDB background); Design system introduction; Complete one backend task + one frontend task in first 2 weeks; Compliance training', 'Department: Engineering — Backend Squad Beta + Frontend Team (rotational) | Manager: Arjun Mehta (Squad Lead, Backend Beta) | Mentor/Buddy: Priya Nair (Senior Backend Engineer) | Background: Comfortable with both Node.js and React. Experience with MongoDB (will need PostgreSQL training). Basic Express.js experience. Has used React Router and Redux (will need Zustand migration).')
;

-- TASKS
INSERT INTO tasks (id, title, description, category, order_index, verification_type, verification_params, pitfall_warning, estimated_minutes)
VALUES
  ('f57445d9-7e43-9953-60b6-577b2ac56221', '[C-01] Receive and set up company laptop', 'Receive and set up company laptop

Checklist Item: C-01
Checklist Section: Common Checklist (All Roles & Levels)
Category: IT Setup
Owner: IT Team
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'IT Setup', 1, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('2e98d147-ec04-8077-ca3b-4f99eb532a57', '[C-02] Activate NovaByte Google Workspace account (email, calendar, drive)', 'Activate NovaByte Google Workspace account (email, calendar, drive)

Checklist Item: C-02
Checklist Section: Common Checklist (All Roles & Levels)
Category: Account Setup
Owner: IT Team
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Account Setup', 2, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('6d2f7a8e-e85d-b48c-6d84-36b7b0196f6f', '[C-03] Set up Slack and join mandatory channels (#engineering-general, #new-joiners, #team-{squad})', 'Set up Slack and join mandatory channels (#engineering-general, #new-joiners, #team-{squad})

Checklist Item: C-03
Checklist Section: Common Checklist (All Roles & Levels)
Category: Communication
Owner: Employee
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Communication', 3, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('c3927b9e-070a-0a30-0e0a-a5693e29600e', '[C-04] Set up 1Password (company password manager)', 'Set up 1Password (company password manager)

Checklist Item: C-04
Checklist Section: Common Checklist (All Roles & Levels)
Category: Security
Owner: Employee
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Security', 4, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('d0ae3073-8af0-550f-58df-9735b16dce50', '[C-05] Enable MFA on Google Workspace', 'Enable MFA on Google Workspace

Checklist Item: C-05
Checklist Section: Common Checklist (All Roles & Levels)
Category: Security
Owner: Employee
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Security', 5, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('cbdc97c4-a60d-9c80-1bd3-352a473192aa', '[C-06] Enable MFA on GitHub', 'Enable MFA on GitHub

Checklist Item: C-06
Checklist Section: Common Checklist (All Roles & Levels)
Category: Security
Owner: Employee
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Security', 6, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('4881d388-930e-cc48-f3f6-8d18084ec4c7', '[C-07] Accept GitHub organization invite (novabyte org)', 'Accept GitHub organization invite (novabyte org)

Checklist Item: C-07
Checklist Section: Common Checklist (All Roles & Levels)
Category: Access
Owner: Employee
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Access', 7, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('cc5159ac-2880-6afd-ddbc-5773a0a6095d', '[C-08] Accept Jira workspace invite', 'Accept Jira workspace invite

Checklist Item: C-08
Checklist Section: Common Checklist (All Roles & Levels)
Category: Access
Owner: Employee
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Access', 8, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('96bada91-18a4-4045-2b76-5a96bf52b504', '[C-09] Join Notion workspace and bookmark Engineering space', 'Join Notion workspace and bookmark Engineering space

Checklist Item: C-09
Checklist Section: Common Checklist (All Roles & Levels)
Category: Knowledge
Owner: Employee
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 9, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('b256484f-0160-0e7d-4c7b-d75cc2ad8a00', '[C-10] Install and configure VPN (WireGuard)', 'Install and configure VPN (WireGuard)

Checklist Item: C-10
Checklist Section: Common Checklist (All Roles & Levels)
Category: Network
Owner: Employee
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Network', 10, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('4f46bf16-717f-fa13-71f1-a6a6959308bc', '[C-11] Read Company Overview document (KB-001)', 'Read Company Overview document (KB-001)

Checklist Item: C-11
Checklist Section: Common Checklist (All Roles & Levels)
Category: Knowledge
Owner: Employee
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 11, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('4a2a43d2-07ed-7cd0-f751-cdc330776981', '[C-12] Read Engineering Standards document (KB-002)', 'Read Engineering Standards document (KB-002)

Checklist Item: C-12
Checklist Section: Common Checklist (All Roles & Levels)
Category: Knowledge
Owner: Employee
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 12, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('27c28067-261c-0617-3af0-ee5e903fcc37', '[C-13] Read Company Policies document (KB-005)', 'Read Company Policies document (KB-005)

Checklist Item: C-13
Checklist Section: Common Checklist (All Roles & Levels)
Category: Knowledge
Owner: Employee
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 13, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('dfe4dfbb-68a9-ff28-c391-fbe7d65f3e02', '[C-14] Complete Security Awareness training (LMS)', 'Complete Security Awareness training (LMS)

Checklist Item: C-14
Checklist Section: Common Checklist (All Roles & Levels)
Category: Compliance
Owner: Employee
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Compliance', 14, 'text_confirmation', '{}'::jsonb, NULL, 45),
  ('7ffb3391-244e-e029-564d-980613dd589a', '[C-15] Complete Data Privacy & GDPR training (LMS)', 'Complete Data Privacy & GDPR training (LMS)

Checklist Item: C-15
Checklist Section: Common Checklist (All Roles & Levels)
Category: Compliance
Owner: Employee
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Compliance', 15, 'text_confirmation', '{}'::jsonb, NULL, 45),
  ('1b2b3e38-3ec9-a007-8b5a-aef76b34991c', '[C-16] Complete Code of Conduct training (LMS)', 'Complete Code of Conduct training (LMS)

Checklist Item: C-16
Checklist Section: Common Checklist (All Roles & Levels)
Category: Compliance
Owner: Employee
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Compliance', 16, 'text_confirmation', '{}'::jsonb, NULL, 45),
  ('a4e19cc1-c5c9-b459-6f1e-2877354483c4', '[C-17] Complete Anti-Harassment training (LMS)', 'Complete Anti-Harassment training (LMS)

Checklist Item: C-17
Checklist Section: Common Checklist (All Roles & Levels)
Category: Compliance
Owner: Employee
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Compliance', 17, 'text_confirmation', '{}'::jsonb, NULL, 45),
  ('d534455e-540e-d7f3-1f1e-bb7e37f3a7fb', '[C-18] Complete Insider Threat Awareness training (LMS)', 'Complete Insider Threat Awareness training (LMS)

Checklist Item: C-18
Checklist Section: Common Checklist (All Roles & Levels)
Category: Compliance
Owner: Employee
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Compliance', 18, 'text_confirmation', '{}'::jsonb, NULL, 45),
  ('90505e36-1cc0-bf23-1583-24cacabbc16a', '[C-19] Sign Employee Handbook Acknowledgment (DocuSign)', 'Sign Employee Handbook Acknowledgment (DocuSign)

Checklist Item: C-19
Checklist Section: Common Checklist (All Roles & Levels)
Category: Compliance
Owner: Employee
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Compliance', 19, 'text_confirmation', '{}'::jsonb, NULL, 45),
  ('6119c15e-d747-2299-9cdf-bce9feab4054', '[C-20] Sign NDA (DocuSign)', 'Sign NDA (DocuSign)

Checklist Item: C-20
Checklist Section: Common Checklist (All Roles & Levels)
Category: Compliance
Owner: Employee
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Compliance', 20, 'text_confirmation', '{}'::jsonb, NULL, 45),
  ('14a94abb-30a7-d849-9696-3e9fa9b59762', '[C-21] Sign Acceptable Use Policy (DocuSign)', 'Sign Acceptable Use Policy (DocuSign)

Checklist Item: C-21
Checklist Section: Common Checklist (All Roles & Levels)
Category: Compliance
Owner: Employee
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Compliance', 21, 'text_confirmation', '{}'::jsonb, NULL, 45),
  ('2a00e233-d24a-0bc0-b42a-b644770f51e0', '[C-22] Sign IP Assignment Agreement (DocuSign)', 'Sign IP Assignment Agreement (DocuSign)

Checklist Item: C-22
Checklist Section: Common Checklist (All Roles & Levels)
Category: Compliance
Owner: Employee
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Compliance', 22, 'text_confirmation', '{}'::jsonb, NULL, 45),
  ('b64da6f3-286a-ab0a-13de-a8476e964e30', '[C-23] Attend welcome call with HR', 'Attend welcome call with HR

Checklist Item: C-23
Checklist Section: Common Checklist (All Roles & Levels)
Category: Onboarding
Owner: HR
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Onboarding', 23, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('82804176-dab0-fe68-2372-e3e1e8f7e77a', '[C-24] Meet your manager (1:1 intro call)', 'Meet your manager (1:1 intro call)

Checklist Item: C-24
Checklist Section: Common Checklist (All Roles & Levels)
Category: Onboarding
Owner: Manager
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Onboarding', 24, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('9a324812-659a-d2f8-e5ed-19f8a4db8d69', '[C-25] Meet your mentor/buddy (intro call)', 'Meet your mentor/buddy (intro call)

Checklist Item: C-25
Checklist Section: Common Checklist (All Roles & Levels)
Category: Onboarding
Owner: Mentor
Deadline: Day 1-2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Onboarding', 25, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('20b1a010-b6f0-9c42-4c5a-719bc9bec9ca', '[C-26] Attend team standup', 'Attend team standup

Checklist Item: C-26
Checklist Section: Common Checklist (All Roles & Levels)
Category: Onboarding
Owner: Employee
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Onboarding', 26, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('b5dd8b68-f008-61b5-5f29-4890003ae221', '[C-27] Set up BambooHR profile (personal details, emergency contacts)', 'Set up BambooHR profile (personal details, emergency contacts)

Checklist Item: C-27
Checklist Section: Common Checklist (All Roles & Levels)
Category: HR
Owner: Employee
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'HR', 27, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('94caf452-62de-006d-e872-d74175a55612', '[C-28] Set up Expensify account', 'Set up Expensify account

Checklist Item: C-28
Checklist Section: Common Checklist (All Roles & Levels)
Category: Finance
Owner: Employee
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Finance', 28, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('65139bae-b7cf-724a-32ad-0d26c8a328f6', '[BI-01] Install Node.js 20 via nvm', 'Install Node.js 20 via nvm

Checklist Item: BI-01
Checklist Section: Backend Intern Checklist (Node.js)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 29, 'node_version', '{"minVersion":"20.0.0"}'::jsonb, NULL, 15),
  ('302de346-faec-1b55-84ff-d8b40b262969', '[BI-02] Install pnpm and global tools (TypeScript, nodemon)', 'Install pnpm and global tools (TypeScript, nodemon)

Checklist Item: BI-02
Checklist Section: Backend Intern Checklist (Node.js)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 30, 'pnpm_installed', '{}'::jsonb, NULL, 15),
  ('28ec1a38-8cb0-1805-0a68-0bba1d7770c5', '[BI-03] Install Docker Desktop', 'Install Docker Desktop

Checklist Item: BI-03
Checklist Section: Backend Intern Checklist (Node.js)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 31, 'docker_running', '{}'::jsonb, NULL, 15),
  ('8fae1e94-dd53-408e-55e0-453d413931ce', '[BI-04] Install VS Code with mandatory extensions', 'Install VS Code with mandatory extensions

Checklist Item: BI-04
Checklist Section: Backend Intern Checklist (Node.js)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 32, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('b873e210-c314-2ece-db2c-ba0f72a1d244', '[BI-05] Clone assigned repository (connector-runtime)', 'Clone assigned repository (connector-runtime)

Checklist Item: BI-05
Checklist Section: Backend Intern Checklist (Node.js)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 33, 'repo_cloned', '{}'::jsonb, NULL, 15),
  ('3258958c-7afe-b2a7-1047-38f6af4d0640', '[BI-06] Set up local environment (.env configuration)', 'Set up local environment (.env configuration)

Checklist Item: BI-06
Checklist Section: Backend Intern Checklist (Node.js)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 34, 'env_configured', '{"requiredKeys":["DATABASE_URL","REDIS_URL","JWT_SECRET","KAFKA_BROKERS"]}'::jsonb, NULL, 15),
  ('94455e67-70fe-4907-1620-9858365a85e2', '[BI-07] Run Docker Compose for local dependencies', 'Run Docker Compose for local dependencies

Checklist Item: BI-07
Checklist Section: Backend Intern Checklist (Node.js)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 35, 'docker_running', '{}'::jsonb, NULL, 15),
  ('b28f5648-0cca-99f7-76f9-92ffa8b81cec', '[BI-08] Run database migrations and seed data', 'Run database migrations and seed data

Checklist Item: BI-08
Checklist Section: Backend Intern Checklist (Node.js)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 36, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('fbe96400-9217-ac08-c1a6-d505248ec624', '[BI-09] Successfully start the service locally', 'Successfully start the service locally

Checklist Item: BI-09
Checklist Section: Backend Intern Checklist (Node.js)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 37, 'service_running', '{"expectedPort":3001}'::jsonb, NULL, 15),
  ('52a59f1d-5a05-175c-0678-b1a5e7fd851e', '[BI-10] Run unit tests and verify all pass', 'Run unit tests and verify all pass

Checklist Item: BI-10
Checklist Section: Backend Intern Checklist (Node.js)
Category: Verification
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Verification', 38, 'tests_passing', '{}'::jsonb, NULL, 20),
  ('cf12b599-1fee-0758-a190-7432f3d0740b', '[BI-11] Read Architecture Documentation — Backend section (KB-003)', 'Read Architecture Documentation — Backend section (KB-003)

Checklist Item: BI-11
Checklist Section: Backend Intern Checklist (Node.js)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 39, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('dbea7cad-3009-d818-bf63-5e6e528a0a14', '[BI-12] Read API Standards section of Engineering Standards (KB-002)', 'Read API Standards section of Engineering Standards (KB-002)

Checklist Item: BI-12
Checklist Section: Backend Intern Checklist (Node.js)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 40, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('305c8fa1-d30f-e13b-bf39-384c8afaae1d', '[BI-13] Read Git & Branching Strategy section (KB-002)', 'Read Git & Branching Strategy section (KB-002)

Checklist Item: BI-13
Checklist Section: Backend Intern Checklist (Node.js)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 41, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('5291258c-9712-a759-81cb-bdb084bb4063', '[BI-14] Read PR Guidelines section (KB-002)', 'Read PR Guidelines section (KB-002)

Checklist Item: BI-14
Checklist Section: Backend Intern Checklist (Node.js)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 42, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('b9601f3c-a81d-b355-077e-65aeb613a14c', '[BI-15] Complete Git workflow practice (create branch, make commit, open PR)', 'Complete Git workflow practice (create branch, make commit, open PR)

Checklist Item: BI-15
Checklist Section: Backend Intern Checklist (Node.js)
Category: Skill Building
Deadline: Day 4

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Skill Building', 43, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('50311f45-87dc-da94-22fa-498c6c6043f2', '[BI-16] Attend codebase walkthrough with mentor', 'Attend codebase walkthrough with mentor

Checklist Item: BI-16
Checklist Section: Backend Intern Checklist (Node.js)
Category: Knowledge
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 44, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('a8300b3d-74b6-8959-e1a5-443a1b115a4e', '[BI-17] Attend pair programming session with mentor', 'Attend pair programming session with mentor

Checklist Item: BI-17
Checklist Section: Backend Intern Checklist (Node.js)
Category: Skill Building
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Skill Building', 45, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('7b7bed15-3902-d143-a3a0-2d646f5f34bc', '[BI-18] Pick up starter ticket (FLOW-INTERN-001: Fix validation bug)', 'Pick up starter ticket (FLOW-INTERN-001: Fix validation bug)

Checklist Item: BI-18
Checklist Section: Backend Intern Checklist (Node.js)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 46, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('3dd01535-014a-3db0-5f44-0446546b3190', '[BI-19] Submit PR for starter ticket', 'Submit PR for starter ticket

Checklist Item: BI-19
Checklist Section: Backend Intern Checklist (Node.js)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 47, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('c1db83e9-d474-e058-016a-292a92e8d99d', '[BI-20] Get PR approved and merged', 'Get PR approved and merged

Checklist Item: BI-20
Checklist Section: Backend Intern Checklist (Node.js)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 48, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('8bc6913a-e53d-b3b4-888d-22177c7e6d03', '[JBP-01] Install Python 3.11 via pyenv', 'Install Python 3.11 via pyenv

Checklist Item: JBP-01
Checklist Section: Junior Backend Checklist (Python)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 49, 'python_version', '{"minVersion":"3.11.0"}'::jsonb, NULL, 15),
  ('96ae0cf3-21e0-ebd1-6fe5-5559938b6034', '[JBP-02] Install Poetry (package manager)', 'Install Poetry (package manager)

Checklist Item: JBP-02
Checklist Section: Junior Backend Checklist (Python)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 50, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('c5b87fa6-1540-6ae8-6fa3-57686fef496b', '[JBP-03] Install Docker Desktop', 'Install Docker Desktop

Checklist Item: JBP-03
Checklist Section: Junior Backend Checklist (Python)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 51, 'docker_running', '{}'::jsonb, NULL, 15),
  ('d753360a-f109-43a1-0c3f-69c46f4c7016', '[JBP-04] Install VS Code with Python, Pylance, and mandatory extensions', 'Install VS Code with Python, Pylance, and mandatory extensions

Checklist Item: JBP-04
Checklist Section: Junior Backend Checklist (Python)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 52, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('cdc48e75-094d-023a-9fdc-3bbca3db1d75', '[JBP-05] Clone assigned repository (workflow-core)', 'Clone assigned repository (workflow-core)

Checklist Item: JBP-05
Checklist Section: Junior Backend Checklist (Python)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 53, 'repo_cloned', '{}'::jsonb, NULL, 15),
  ('0741ce70-6a4d-b424-8567-99465650c147', '[JBP-06] Run poetry install and activate virtual environment', 'Run poetry install and activate virtual environment

Checklist Item: JBP-06
Checklist Section: Junior Backend Checklist (Python)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 54, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('21124f05-b529-e6e5-d975-038c839ea9a2', '[JBP-07] Set up local environment (.env configuration)', 'Set up local environment (.env configuration)

Checklist Item: JBP-07
Checklist Section: Junior Backend Checklist (Python)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 55, 'env_configured', '{"requiredKeys":["DATABASE_URL","REDIS_URL","KAFKA_BROKERS"]}'::jsonb, NULL, 15),
  ('9d472e72-7c8e-ec5d-cb03-6f2520458ca2', '[JBP-08] Run Docker Compose for local dependencies (PostgreSQL, Redis, Kafka)', 'Run Docker Compose for local dependencies (PostgreSQL, Redis, Kafka)

Checklist Item: JBP-08
Checklist Section: Junior Backend Checklist (Python)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 56, 'docker_running', '{}'::jsonb, NULL, 15),
  ('aef74fba-f13b-da3a-80ed-e99305ce4b32', '[JBP-09] Run Alembic database migrations', 'Run Alembic database migrations

Checklist Item: JBP-09
Checklist Section: Junior Backend Checklist (Python)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 57, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('ad35fb47-47e5-e4f6-9bb1-40a108ff1cca', '[JBP-10] Seed test data using python scripts/seed_data.py', 'Seed test data using python scripts/seed_data.py

Checklist Item: JBP-10
Checklist Section: Junior Backend Checklist (Python)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 58, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('6a3b9dfc-2073-8260-a959-74557098fee7', '[JBP-11] Start the service locally with uvicorn and verify Swagger UI loads', 'Start the service locally with uvicorn and verify Swagger UI loads

Checklist Item: JBP-11
Checklist Section: Junior Backend Checklist (Python)
Category: Verification
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Verification', 59, 'service_running', '{"expectedPort":8000}'::jsonb, NULL, 20),
  ('6dc8bf1a-c2d3-6f09-dd1e-a4084a006a83', '[JBP-12] Run full pytest suite and verify all tests pass', 'Run full pytest suite and verify all tests pass

Checklist Item: JBP-12
Checklist Section: Junior Backend Checklist (Python)
Category: Verification
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Verification', 60, 'tests_passing', '{}'::jsonb, NULL, 20),
  ('bb9c4132-0217-cb72-979a-b9a318988040', '[JBP-13] Read Architecture Documentation — Backend & Data sections (KB-003)', 'Read Architecture Documentation — Backend & Data sections (KB-003)

Checklist Item: JBP-13
Checklist Section: Junior Backend Checklist (Python)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 61, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('cd422767-5459-c7f5-a183-43cc6308cf74', '[JBP-14] Read API Standards and Testing Standards (KB-002)', 'Read API Standards and Testing Standards (KB-002)

Checklist Item: JBP-14
Checklist Section: Junior Backend Checklist (Python)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 62, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('6b780163-bcb3-fdc3-1c68-5d8c7ef68600', '[JBP-15] Read Git & Branching Strategy and PR Guidelines (KB-002)', 'Read Git & Branching Strategy and PR Guidelines (KB-002)

Checklist Item: JBP-15
Checklist Section: Junior Backend Checklist (Python)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 63, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('1f35c88e-d062-1ebf-b299-294d3571c419', '[JBP-16] Review database schema walkthrough with mentor', 'Review database schema walkthrough with mentor

Checklist Item: JBP-16
Checklist Section: Junior Backend Checklist (Python)
Category: Knowledge
Deadline: Day 4

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 64, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('ce3197fd-52c9-2e05-5751-38beca843631', '[JBP-17] Attend codebase walkthrough with mentor (workflow-core deep dive)', 'Attend codebase walkthrough with mentor (workflow-core deep dive)

Checklist Item: JBP-17
Checklist Section: Junior Backend Checklist (Python)
Category: Knowledge
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 65, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('94466a48-5a2c-142b-adc4-b5e9d70729a3', '[JBP-18] Review CI/CD pipeline (GitHub Actions workflow files)', 'Review CI/CD pipeline (GitHub Actions workflow files)

Checklist Item: JBP-18
Checklist Section: Junior Backend Checklist (Python)
Category: Knowledge
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 66, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('aa459c3c-5bfe-1677-ed2f-17ae17bb6a02', '[JBP-19] Pick up starter ticket (FLOW-JR-001: Add validation to workflow endpoint)', 'Pick up starter ticket (FLOW-JR-001: Add validation to workflow endpoint)

Checklist Item: JBP-19
Checklist Section: Junior Backend Checklist (Python)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 67, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('4659dbfd-2f59-4758-0f3d-ec1e9a714641', '[JBP-20] Write unit tests for starter ticket (minimum 80% coverage)', 'Write unit tests for starter ticket (minimum 80% coverage)

Checklist Item: JBP-20
Checklist Section: Junior Backend Checklist (Python)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 68, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('9f21ed09-e6b1-a064-f500-d121df24fd85', '[JBP-21] Submit PR for starter ticket with proper description', 'Submit PR for starter ticket with proper description

Checklist Item: JBP-21
Checklist Section: Junior Backend Checklist (Python)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 69, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('6598dd3a-bd88-9fbe-2ddc-009890631fbb', '[JBP-22] Address code review feedback and get PR merged', 'Address code review feedback and get PR merged

Checklist Item: JBP-22
Checklist Section: Junior Backend Checklist (Python)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 70, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('b82c0b04-2750-69f8-8fe5-dc9c8a8fa444', '[JFR-01] Install Node.js 20 via nvm', 'Install Node.js 20 via nvm

Checklist Item: JFR-01
Checklist Section: Junior Frontend Checklist (React)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 71, 'node_version', '{"minVersion":"20.0.0"}'::jsonb, NULL, 15),
  ('43d078fe-9339-483c-d250-84229e8c985e', '[JFR-02] Install pnpm', 'Install pnpm

Checklist Item: JFR-02
Checklist Section: Junior Frontend Checklist (React)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 72, 'pnpm_installed', '{}'::jsonb, NULL, 15),
  ('b2db1fe7-8291-8fa1-6d4c-7c8126d8e45f', '[JFR-03] Install VS Code with Tailwind CSS IntelliSense, ESLint, Prettier extensions', 'Install VS Code with Tailwind CSS IntelliSense, ESLint, Prettier extensions

Checklist Item: JFR-03
Checklist Section: Junior Frontend Checklist (React)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 73, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('95ba72cf-1554-62c2-378c-a4d8015ffc93', '[JFR-04] Clone flowengine-web repository', 'Clone flowengine-web repository

Checklist Item: JFR-04
Checklist Section: Junior Frontend Checklist (React)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 74, 'repo_cloned', '{}'::jsonb, NULL, 15),
  ('f9666602-eca8-ed5d-8f37-156e39821b1f', '[JFR-05] Run pnpm install and set up .env.local', 'Run pnpm install and set up .env.local

Checklist Item: JFR-05
Checklist Section: Junior Frontend Checklist (React)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 75, 'env_configured', '{"requiredKeys":["VITE_API_BASE_URL","VITE_WS_URL"]}'::jsonb, NULL, 15),
  ('5ffcb3c4-7676-c4ad-d88a-aa6877d566d1', '[JFR-06] Start development server (pnpm dev) and verify it loads', 'Start development server (pnpm dev) and verify it loads

Checklist Item: JFR-06
Checklist Section: Junior Frontend Checklist (React)
Category: Verification
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Verification', 76, 'service_running', '{"expectedPort":3000}'::jsonb, NULL, 20),
  ('885dea7b-e8b9-c48e-54c2-b4ffb6fef465', '[JFR-07] Run test suite (pnpm test) and verify all pass', 'Run test suite (pnpm test) and verify all pass

Checklist Item: JFR-07
Checklist Section: Junior Frontend Checklist (React)
Category: Verification
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Verification', 77, 'tests_passing', '{}'::jsonb, NULL, 20),
  ('f7a19692-098c-9053-a93d-15edec41ed3a', '[JFR-08] Start Storybook (pnpm storybook) and browse existing components', 'Start Storybook (pnpm storybook) and browse existing components

Checklist Item: JFR-08
Checklist Section: Junior Frontend Checklist (React)
Category: Exploration
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Exploration', 78, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('71d0e41c-3064-8722-9c64-4c44fb645882', '[JFR-09] Read Architecture Documentation — Frontend section (KB-003)', 'Read Architecture Documentation — Frontend section (KB-003)

Checklist Item: JFR-09
Checklist Section: Junior Frontend Checklist (React)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 79, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('b4c8eb2e-7706-6180-15e4-47794b85994c', '[JFR-10] Read project structure guide in setup docs (KB-004)', 'Read project structure guide in setup docs (KB-004)

Checklist Item: JFR-10
Checklist Section: Junior Frontend Checklist (React)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 80, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('267f97ed-2238-05f2-c27f-bb8ccdd19925', '[JFR-11] Read Engineering Standards — Code Style (TS/React sections) (KB-002)', 'Read Engineering Standards — Code Style (TS/React sections) (KB-002)

Checklist Item: JFR-11
Checklist Section: Junior Frontend Checklist (React)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 81, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('6735efde-1d3c-5591-332b-cb3144012379', '[JFR-12] Read PR Guidelines and Code Review expectations (KB-002)', 'Read PR Guidelines and Code Review expectations (KB-002)

Checklist Item: JFR-12
Checklist Section: Junior Frontend Checklist (React)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 82, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('40061d37-d3f8-1408-34ec-3b221ad2726e', '[JFR-13] Explore @novabyte/ui-kit design system components in Storybook', 'Explore @novabyte/ui-kit design system components in Storybook

Checklist Item: JFR-13
Checklist Section: Junior Frontend Checklist (React)
Category: Knowledge
Deadline: Day 4

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 83, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('79d22445-b82b-1d52-442b-9b775112c532', '[JFR-14] Review Zustand store patterns used in codebase', 'Review Zustand store patterns used in codebase

Checklist Item: JFR-14
Checklist Section: Junior Frontend Checklist (React)
Category: Knowledge
Deadline: Day 4

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 84, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('659221c1-7eee-12a2-c047-68f8cee0768e', '[JFR-15] Review React Query usage patterns in services/ directory', 'Review React Query usage patterns in services/ directory

Checklist Item: JFR-15
Checklist Section: Junior Frontend Checklist (React)
Category: Knowledge
Deadline: Day 4

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 85, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('77b60bdf-5def-3c7a-78e7-0a8cb8782ebf', '[JFR-16] Attend codebase walkthrough with mentor (flowengine-web deep dive)', 'Attend codebase walkthrough with mentor (flowengine-web deep dive)

Checklist Item: JFR-16
Checklist Section: Junior Frontend Checklist (React)
Category: Knowledge
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 86, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('95e9408d-1af5-1d10-d191-f407d369bd60', '[JFR-17] Attend design system walkthrough with Frontend Lead', 'Attend design system walkthrough with Frontend Lead

Checklist Item: JFR-17
Checklist Section: Junior Frontend Checklist (React)
Category: Knowledge
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 87, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('3be06e28-87f6-4c17-4725-9a08156ff0c4', '[JFR-18] Pick up starter ticket (FLOW-FE-001: Enhance table component styling)', 'Pick up starter ticket (FLOW-FE-001: Enhance table component styling)

Checklist Item: JFR-18
Checklist Section: Junior Frontend Checklist (React)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 88, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('0687ec7c-3ebd-f7b9-a562-ebfb62ea3fc0', '[JFR-19] Write component tests using React Testing Library', 'Write component tests using React Testing Library

Checklist Item: JFR-19
Checklist Section: Junior Frontend Checklist (React)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 89, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('15acb042-094b-cf1d-b3ca-fc9379dac2ef', '[JFR-20] Submit PR with screenshots for UI changes', 'Submit PR with screenshots for UI changes

Checklist Item: JFR-20
Checklist Section: Junior Frontend Checklist (React)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 90, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('5db4ab2d-c40a-8832-acd4-d0ee59446318', '[JFR-21] Address code review feedback and get PR merged', 'Address code review feedback and get PR merged

Checklist Item: JFR-21
Checklist Section: Junior Frontend Checklist (React)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 91, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('b2a1d7ca-d021-456a-fd8a-6b1207096f42', '[SBN-01] Self-serve environment setup (Node.js, pnpm, Docker, VS Code)', 'Self-serve environment setup (Node.js, pnpm, Docker, VS Code)

Checklist Item: SBN-01
Checklist Section: Senior Backend Checklist (Node.js)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 92, 'node_version', '{"minVersion":"20.0.0"}'::jsonb, NULL, 15),
  ('7ece636d-f525-e20d-38c4-6df822eb58e3', '[SBN-02] Clone all Backend Squad Beta repositories (connector-runtime, notification-service)', 'Clone all Backend Squad Beta repositories (connector-runtime, notification-service)

Checklist Item: SBN-02
Checklist Section: Senior Backend Checklist (Node.js)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 93, 'repo_cloned', '{}'::jsonb, NULL, 15),
  ('551c3a2a-d5a2-2611-b7d3-5e24d097e4e9', '[SBN-03] Set up and run all services locally', 'Set up and run all services locally

Checklist Item: SBN-03
Checklist Section: Senior Backend Checklist (Node.js)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 94, 'service_running', '{"expectedPort":3001}'::jsonb, NULL, 15),
  ('edebd1cd-2d43-512b-8bb3-37eeac345610', '[SBN-04] Read full Architecture Documentation (KB-003) — all sections', 'Read full Architecture Documentation (KB-003) — all sections

Checklist Item: SBN-04
Checklist Section: Senior Backend Checklist (Node.js)
Category: Knowledge
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 95, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('6aee8c2e-cce2-bc81-8eee-0a8145047d93', '[SBN-05] Read Engineering Standards (KB-002) — all sections', 'Read Engineering Standards (KB-002) — all sections

Checklist Item: SBN-05
Checklist Section: Senior Backend Checklist (Node.js)
Category: Knowledge
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 96, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('b13f1e53-af3d-3019-adbb-44f2aa01c71d', '[SBN-06] Deep dive into connector-runtime plugin architecture with buddy', 'Deep dive into connector-runtime plugin architecture with buddy

Checklist Item: SBN-06
Checklist Section: Senior Backend Checklist (Node.js)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 97, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('cf4eb674-8295-c462-a4b1-9cf899e60b83', '[SBN-07] Review notification-service Kafka consumer patterns', 'Review notification-service Kafka consumer patterns

Checklist Item: SBN-07
Checklist Section: Senior Backend Checklist (Node.js)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 98, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('b24d9aa6-03a6-7085-c3f1-602a249749d6', '[SBN-08] Review service SLAs, error budgets, and Datadog dashboards', 'Review service SLAs, error budgets, and Datadog dashboards

Checklist Item: SBN-08
Checklist Section: Senior Backend Checklist (Node.js)
Category: Operations
Deadline: Day 4

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Operations', 99, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('d6739888-4419-b791-df87-0dce8bffed50', '[SBN-09] Review on-call runbooks and incident response playbooks', 'Review on-call runbooks and incident response playbooks

Checklist Item: SBN-09
Checklist Section: Senior Backend Checklist (Node.js)
Category: Operations
Deadline: Day 4

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Operations', 100, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('7113b58c-a5eb-c788-1b57-baf5eea492a6', '[SBN-10] Attend on-call and incident response training session', 'Attend on-call and incident response training session

Checklist Item: SBN-10
Checklist Section: Senior Backend Checklist (Node.js)
Category: Operations
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Operations', 101, 'text_confirmation', '{}'::jsonb, NULL, 45),
  ('76e464c7-9e28-5ae9-ad54-8318d267bdda', '[SBN-11] Review active Jira epics and current sprint board', 'Review active Jira epics and current sprint board

Checklist Item: SBN-11
Checklist Section: Senior Backend Checklist (Node.js)
Category: Planning
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Planning', 102, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('675c8d6b-fafc-9f43-0ef6-26cefd962ff7', '[SBN-12] Review product roadmap with Squad Lead', 'Review product roadmap with Squad Lead

Checklist Item: SBN-12
Checklist Section: Senior Backend Checklist (Node.js)
Category: Planning
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Planning', 103, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('405b86a2-ad7a-2662-8607-6184d3c73eba', '[SBN-13] Meet Product Manager (1:1 introduction)', 'Meet Product Manager (1:1 introduction)

Checklist Item: SBN-13
Checklist Section: Senior Backend Checklist (Node.js)
Category: Stakeholders
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Stakeholders', 104, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('a05089f3-d108-cb47-454e-4a52fad3fefb', '[SBN-14] Meet QA Lead (1:1 introduction)', 'Meet QA Lead (1:1 introduction)

Checklist Item: SBN-14
Checklist Section: Senior Backend Checklist (Node.js)
Category: Stakeholders
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Stakeholders', 105, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('cf7b0b90-d183-f45c-8df9-0721461a7c21', '[SBN-15] Meet DevOps/Platform team contact (1:1 introduction)', 'Meet DevOps/Platform team contact (1:1 introduction)

Checklist Item: SBN-15
Checklist Section: Senior Backend Checklist (Node.js)
Category: Stakeholders
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Stakeholders', 106, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('4010cfa5-96a5-5081-c986-845718b8f490', '[SBN-16] Review deployment pipeline end-to-end (GitHub Actions → ArgoCD → Production)', 'Review deployment pipeline end-to-end (GitHub Actions → ArgoCD → Production)

Checklist Item: SBN-16
Checklist Section: Senior Backend Checklist (Node.js)
Category: Operations
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Operations', 107, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('e637fd3c-1233-7eee-37a9-00daab4fc52f', '[SBN-17] Shadow an on-call shift with current on-call engineer', 'Shadow an on-call shift with current on-call engineer

Checklist Item: SBN-17
Checklist Section: Senior Backend Checklist (Node.js)
Category: Operations
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Operations', 108, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('1bfe0142-092c-1145-8e9e-5383aebb315a', '[SBN-18] Pick up medium-complexity task from sprint backlog', 'Pick up medium-complexity task from sprint backlog

Checklist Item: SBN-18
Checklist Section: Senior Backend Checklist (Node.js)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 109, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('3e1d1603-9386-63cb-6bf8-8ddcc265ff5a', '[SBN-19] Submit PR, lead code review discussion', 'Submit PR, lead code review discussion

Checklist Item: SBN-19
Checklist Section: Senior Backend Checklist (Node.js)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 110, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('dfe5f2fc-d859-35cf-15c1-edb0ee3c6bb1', '[SBN-20] Deploy change to staging and verify', 'Deploy change to staging and verify

Checklist Item: SBN-20
Checklist Section: Senior Backend Checklist (Node.js)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 111, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('fb3b6dd1-f5bf-26d6-7bb4-8ed3b7663684', '[SDO-01] Request and receive AWS IAM credentials from Platform Lead', 'Request and receive AWS IAM credentials from Platform Lead

Checklist Item: SDO-01
Checklist Section: Senior DevOps / Platform Checklist
Category: Access
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Access', 112, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('64863ae0-bd8e-d03e-7b30-c6f342b99984', '[SDO-02] Configure AWS CLI with NovaByte profile', 'Configure AWS CLI with NovaByte profile

Checklist Item: SDO-02
Checklist Section: Senior DevOps / Platform Checklist
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 113, 'env_configured', '{"requiredKeys":["AWS_PROFILE"]}'::jsonb, NULL, 15),
  ('9280e28a-697c-2b65-b876-ffd72a810f55', '[SDO-03] Install required tools: Terraform, kubectl, Helm, ArgoCD CLI, k9s', 'Install required tools: Terraform, kubectl, Helm, ArgoCD CLI, k9s

Checklist Item: SDO-03
Checklist Section: Senior DevOps / Platform Checklist
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 114, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('5403eb1f-fa25-842d-db0a-831efedf3058', '[SDO-04] Set up VPN and verify connectivity to internal services', 'Set up VPN and verify connectivity to internal services

Checklist Item: SDO-04
Checklist Section: Senior DevOps / Platform Checklist
Category: Network
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Network', 115, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('d5384023-d641-24e8-f658-41903ba1ab94', '[SDO-05] Connect to dev and staging EKS clusters via kubectl', 'Connect to dev and staging EKS clusters via kubectl

Checklist Item: SDO-05
Checklist Section: Senior DevOps / Platform Checklist
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 116, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('f3e11b03-9419-b844-7a5a-532d5ac9bac3', '[SDO-06] Clone infrastructure repository', 'Clone infrastructure repository

Checklist Item: SDO-06
Checklist Section: Senior DevOps / Platform Checklist
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 117, 'repo_cloned', '{}'::jsonb, NULL, 15),
  ('56ab369f-46bf-cc39-886c-73340e057990', '[SDO-07] Read full Architecture Documentation (KB-003) — all sections, focus on Infrastructure', 'Read full Architecture Documentation (KB-003) — all sections, focus on Infrastructure

Checklist Item: SDO-07
Checklist Section: Senior DevOps / Platform Checklist
Category: Knowledge
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 118, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('555530b5-f714-e488-18d8-344c58d4cfdc', '[SDO-08] Read Engineering Standards — Deployment Standards section (KB-002)', 'Read Engineering Standards — Deployment Standards section (KB-002)

Checklist Item: SDO-08
Checklist Section: Senior DevOps / Platform Checklist
Category: Knowledge
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 119, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('f143c55d-8d66-f0d8-113a-538af8f9df14', '[SDO-09] Review Terraform module structure and conventions with buddy', 'Review Terraform module structure and conventions with buddy

Checklist Item: SDO-09
Checklist Section: Senior DevOps / Platform Checklist
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 120, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('af5b7242-d729-45f1-ce29-6ed6e3f4f8d6', '[SDO-10] Review Helm chart structure for all services', 'Review Helm chart structure for all services

Checklist Item: SDO-10
Checklist Section: Senior DevOps / Platform Checklist
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 121, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('504bfa16-c783-da98-a7d1-5d8c396b540c', '[SDO-11] Walkthrough Kubernetes cluster layout (namespaces, deployments, services)', 'Walkthrough Kubernetes cluster layout (namespaces, deployments, services)

Checklist Item: SDO-11
Checklist Section: Senior DevOps / Platform Checklist
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 122, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('cf66f75b-a402-0167-6d53-d3fe2c4e0c24', '[SDO-12] Review CI/CD pipeline deep dive (GitHub Actions workflows + ArgoCD sync)', 'Review CI/CD pipeline deep dive (GitHub Actions workflows + ArgoCD sync)

Checklist Item: SDO-12
Checklist Section: Senior DevOps / Platform Checklist
Category: Knowledge
Deadline: Day 4

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 123, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('4624f86a-5ca4-1b22-5da1-9686d533e4c3', '[SDO-13] Review Datadog dashboards, alerts, and SLOs', 'Review Datadog dashboards, alerts, and SLOs

Checklist Item: SDO-13
Checklist Section: Senior DevOps / Platform Checklist
Category: Operations
Deadline: Day 4

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Operations', 124, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('11103919-3621-30ad-94c1-eccbaed659a6', '[SDO-14] Review PagerDuty integration and on-call rotation setup', 'Review PagerDuty integration and on-call rotation setup

Checklist Item: SDO-14
Checklist Section: Senior DevOps / Platform Checklist
Category: Operations
Deadline: Day 4

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Operations', 125, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('c41c0aaf-f6ff-0bf4-ad7b-2b8439e0107f', '[SDO-15] Review active infrastructure Jira tickets and tech debt backlog', 'Review active infrastructure Jira tickets and tech debt backlog

Checklist Item: SDO-15
Checklist Section: Senior DevOps / Platform Checklist
Category: Planning
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Planning', 126, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('d7155e77-b4b1-6f0c-3621-ca95986b0223', '[SDO-16] Meet all Squad Leads (1:1 introductions to understand their infra needs)', 'Meet all Squad Leads (1:1 introductions to understand their infra needs)

Checklist Item: SDO-16
Checklist Section: Senior DevOps / Platform Checklist
Category: Stakeholders
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Stakeholders', 127, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('3413d84d-b84a-1180-40f1-f3c91dd92c02', '[SDO-17] Meet Security team contact (1:1 introduction)', 'Meet Security team contact (1:1 introduction)

Checklist Item: SDO-17
Checklist Section: Senior DevOps / Platform Checklist
Category: Stakeholders
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Stakeholders', 128, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('2208aab5-27e2-2e38-b75e-b2bf27118436', '[SDO-18] Review disaster recovery and backup procedures', 'Review disaster recovery and backup procedures

Checklist Item: SDO-18
Checklist Section: Senior DevOps / Platform Checklist
Category: Operations
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Operations', 129, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('41c84aa2-89e5-12d3-becd-796ce10658f8', '[SDO-19] Review cost optimization dashboards (AWS Cost Explorer)', 'Review cost optimization dashboards (AWS Cost Explorer)

Checklist Item: SDO-19
Checklist Section: Senior DevOps / Platform Checklist
Category: Operations
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Operations', 130, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('64f09707-7e91-1b03-5248-03ca22fc6e22', '[SDO-20] Shadow on-call shift with current Platform on-call engineer', 'Shadow on-call shift with current Platform on-call engineer

Checklist Item: SDO-20
Checklist Section: Senior DevOps / Platform Checklist
Category: Operations
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Operations', 131, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('f1f97f26-4a9c-11c9-ba2d-6d71dbea28a8', '[SDO-21] Pick up infrastructure improvement task from backlog', 'Pick up infrastructure improvement task from backlog

Checklist Item: SDO-21
Checklist Section: Senior DevOps / Platform Checklist
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 132, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('5ed7ad2a-e687-f5d4-cef0-46db3d31b69d', '[SDO-22] Submit Terraform PR, get reviewed by Platform Lead', 'Submit Terraform PR, get reviewed by Platform Lead

Checklist Item: SDO-22
Checklist Section: Senior DevOps / Platform Checklist
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 133, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('f64b87b0-da0d-7a65-d47e-180315cd6039', '[SDO-23] Apply change to dev environment and verify', 'Apply change to dev environment and verify

Checklist Item: SDO-23
Checklist Section: Senior DevOps / Platform Checklist
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 134, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('8c270915-5d18-d6f7-e1f9-74f6fdb6963f', '[JFS-01] Install Node.js 20 via nvm', 'Install Node.js 20 via nvm

Checklist Item: JFS-01
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 135, 'node_version', '{"minVersion":"20.0.0"}'::jsonb, NULL, 15),
  ('b0e3efc3-1aae-db63-cdb9-bf292d891dd8', '[JFS-02] Install pnpm and global tools (TypeScript, nodemon)', 'Install pnpm and global tools (TypeScript, nodemon)

Checklist Item: JFS-02
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 136, 'pnpm_installed', '{}'::jsonb, NULL, 15),
  ('cd7492d8-4f6f-3b9d-98dc-a2a233403273', '[JFS-03] Install Docker Desktop', 'Install Docker Desktop

Checklist Item: JFS-03
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 137, 'docker_running', '{}'::jsonb, NULL, 15),
  ('5b96e730-2db4-811a-fbcc-94e1f5e0c337', '[JFS-04] Install VS Code with all mandatory + frontend-specific extensions', 'Install VS Code with all mandatory + frontend-specific extensions

Checklist Item: JFS-04
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Environment Setup
Deadline: Day 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 138, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('97753cb9-c7d9-b260-5885-1cdb606b9682', '[JFS-05] Clone connector-runtime (backend) and flowengine-web (frontend) repositories', 'Clone connector-runtime (backend) and flowengine-web (frontend) repositories

Checklist Item: JFS-05
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 139, 'repo_cloned', '{}'::jsonb, NULL, 15),
  ('852aa339-9029-9f5d-1941-ccc8fbca5034', '[JFS-06] Set up backend local environment (.env, Docker Compose, migrations)', 'Set up backend local environment (.env, Docker Compose, migrations)

Checklist Item: JFS-06
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 140, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('8ec2776e-ff32-7ba0-26ea-38476eef8ca4', '[JFS-07] Verify backend service starts and tests pass', 'Verify backend service starts and tests pass

Checklist Item: JFS-07
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Verification
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Verification', 141, 'service_running', '{"expectedPort":3001}'::jsonb, NULL, 20),
  ('b5cf0eaa-ac5d-c8c9-8cfe-56b4469d11fb', '[JFS-08] Set up frontend local environment (.env.local)', 'Set up frontend local environment (.env.local)

Checklist Item: JFS-08
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Environment Setup
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Environment Setup', 142, 'env_configured', '{"requiredKeys":["VITE_API_BASE_URL","VITE_WS_URL"]}'::jsonb, NULL, 15),
  ('1375900e-eea3-8fb5-1b73-c715c6b274f4', '[JFS-09] Verify frontend dev server starts and connects to local backend', 'Verify frontend dev server starts and connects to local backend

Checklist Item: JFS-09
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Verification
Deadline: Day 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Verification', 143, 'service_running', '{"expectedPort":3000}'::jsonb, NULL, 20),
  ('d43ae4b2-2937-f49c-6bb7-1a2e0d1e0681', '[JFS-10] Start Storybook and browse design system components', 'Start Storybook and browse design system components

Checklist Item: JFS-10
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Exploration
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Exploration', 144, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('4d29deee-0608-1558-6353-8c6ef2b4d7a1', '[JFS-11] Read Architecture Documentation — Backend + Frontend sections (KB-003)', 'Read Architecture Documentation — Backend + Frontend sections (KB-003)

Checklist Item: JFS-11
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 145, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('03644093-c2de-5117-7620-bd257f429cd9', '[JFS-12] Read Engineering Standards — JS/TS conventions, API Standards, PR Guidelines (KB-002)', 'Read Engineering Standards — JS/TS conventions, API Standards, PR Guidelines (KB-002)

Checklist Item: JFS-12
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Knowledge
Deadline: Day 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 146, 'text_confirmation', '{}'::jsonb, NULL, 20),
  ('68605d74-90a7-813a-2fba-9afa3c1680ca', '[JFS-13] PostgreSQL basics session with mentor (for MongoDB-to-PostgreSQL transition)', 'PostgreSQL basics session with mentor (for MongoDB-to-PostgreSQL transition)

Checklist Item: JFS-13
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Skill Building
Deadline: Day 4

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Skill Building', 147, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('7b9ec42b-49c2-3ca0-0c49-883311472a24', '[JFS-14] Zustand and React Query overview session with Frontend Lead', 'Zustand and React Query overview session with Frontend Lead

Checklist Item: JFS-14
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Skill Building
Deadline: Day 4

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Skill Building', 148, 'text_confirmation', '{}'::jsonb, NULL, 15),
  ('b2a0f9c7-fa8d-f88a-aea6-fd9068c8bfa8', '[JFS-15] Attend backend codebase walkthrough with mentor', 'Attend backend codebase walkthrough with mentor

Checklist Item: JFS-15
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Knowledge
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 149, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('c41232db-6bc6-aef4-57b1-6bec6414b8c9', '[JFS-16] Attend frontend codebase walkthrough with Frontend Lead', 'Attend frontend codebase walkthrough with Frontend Lead

Checklist Item: JFS-16
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: Knowledge
Deadline: Week 1

Verification: Paste the requested evidence or confirm completion in the task modal.', 'Knowledge', 150, 'text_confirmation', '{}'::jsonb, NULL, 30),
  ('3d828e72-e093-bcf2-c77f-de9b60c7aea0', '[JFS-17] Pick up backend starter ticket (FLOW-FS-001: Add input sanitization to connector endpoint)', 'Pick up backend starter ticket (FLOW-FS-001: Add input sanitization to connector endpoint)

Checklist Item: JFS-17
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 151, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('505c7598-014b-5f77-2f7a-2bda621a0ae3', '[JFS-18] Submit backend PR with tests', 'Submit backend PR with tests

Checklist Item: JFS-18
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: First Task
Deadline: Week 2

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 152, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('e057550b-5868-c4d2-7748-0678af453ea6', '[JFS-19] Pick up frontend starter ticket (FLOW-FS-002: Build status badge component)', 'Pick up frontend starter ticket (FLOW-FS-002: Build status badge component)

Checklist Item: JFS-19
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: First Task
Deadline: Week 2-3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 153, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('bf74c8c3-39af-5a16-1060-811bbb8782e1', '[JFS-20] Submit frontend PR with component tests and screenshots', 'Submit frontend PR with component tests and screenshots

Checklist Item: JFS-20
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: First Task
Deadline: Week 2-3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 154, 'text_confirmation', '{}'::jsonb, NULL, 90),
  ('d71a25dc-0cfb-8cbd-74f3-fd4606b56429', '[JFS-21] Address all code review feedback and get both PRs merged', 'Address all code review feedback and get both PRs merged

Checklist Item: JFS-21
Checklist Section: Junior Full-Stack Checklist (Node.js + React)
Category: First Task
Deadline: Week 3

Verification: Paste the requested evidence or confirm completion in the task modal.', 'First Task', 155, 'text_confirmation', '{}'::jsonb, NULL, 90)
;

-- PERSONA TASK MAPPINGS
INSERT INTO persona_tasks (persona_id, task_id, order_index)
VALUES
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'f57445d9-7e43-9953-60b6-577b2ac56221', 1),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '2e98d147-ec04-8077-ca3b-4f99eb532a57', 2),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '6d2f7a8e-e85d-b48c-6d84-36b7b0196f6f', 3),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'c3927b9e-070a-0a30-0e0a-a5693e29600e', 4),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'd0ae3073-8af0-550f-58df-9735b16dce50', 5),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'cbdc97c4-a60d-9c80-1bd3-352a473192aa', 6),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '4881d388-930e-cc48-f3f6-8d18084ec4c7', 7),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'cc5159ac-2880-6afd-ddbc-5773a0a6095d', 8),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '96bada91-18a4-4045-2b76-5a96bf52b504', 9),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'b256484f-0160-0e7d-4c7b-d75cc2ad8a00', 10),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '4f46bf16-717f-fa13-71f1-a6a6959308bc', 11),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '4a2a43d2-07ed-7cd0-f751-cdc330776981', 12),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '27c28067-261c-0617-3af0-ee5e903fcc37', 13),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'dfe4dfbb-68a9-ff28-c391-fbe7d65f3e02', 14),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '7ffb3391-244e-e029-564d-980613dd589a', 15),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '1b2b3e38-3ec9-a007-8b5a-aef76b34991c', 16),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'a4e19cc1-c5c9-b459-6f1e-2877354483c4', 17),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'd534455e-540e-d7f3-1f1e-bb7e37f3a7fb', 18),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '90505e36-1cc0-bf23-1583-24cacabbc16a', 19),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '6119c15e-d747-2299-9cdf-bce9feab4054', 20),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '14a94abb-30a7-d849-9696-3e9fa9b59762', 21),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '2a00e233-d24a-0bc0-b42a-b644770f51e0', 22),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'b64da6f3-286a-ab0a-13de-a8476e964e30', 23),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '82804176-dab0-fe68-2372-e3e1e8f7e77a', 24),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '9a324812-659a-d2f8-e5ed-19f8a4db8d69', 25),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '20b1a010-b6f0-9c42-4c5a-719bc9bec9ca', 26),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'b5dd8b68-f008-61b5-5f29-4890003ae221', 27),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '94caf452-62de-006d-e872-d74175a55612', 28),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '65139bae-b7cf-724a-32ad-0d26c8a328f6', 29),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '302de346-faec-1b55-84ff-d8b40b262969', 30),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '28ec1a38-8cb0-1805-0a68-0bba1d7770c5', 31),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '8fae1e94-dd53-408e-55e0-453d413931ce', 32),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'b873e210-c314-2ece-db2c-ba0f72a1d244', 33),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '3258958c-7afe-b2a7-1047-38f6af4d0640', 34),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '94455e67-70fe-4907-1620-9858365a85e2', 35),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'b28f5648-0cca-99f7-76f9-92ffa8b81cec', 36),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'fbe96400-9217-ac08-c1a6-d505248ec624', 37),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '52a59f1d-5a05-175c-0678-b1a5e7fd851e', 38),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'cf12b599-1fee-0758-a190-7432f3d0740b', 39),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'dbea7cad-3009-d818-bf63-5e6e528a0a14', 40),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '305c8fa1-d30f-e13b-bf39-384c8afaae1d', 41),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '5291258c-9712-a759-81cb-bdb084bb4063', 42),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'b9601f3c-a81d-b355-077e-65aeb613a14c', 43),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '50311f45-87dc-da94-22fa-498c6c6043f2', 44),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'a8300b3d-74b6-8959-e1a5-443a1b115a4e', 45),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '7b7bed15-3902-d143-a3a0-2d646f5f34bc', 46),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', '3dd01535-014a-3db0-5f44-0446546b3190', 47),
  ('7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'c1db83e9-d474-e058-016a-292a92e8d99d', 48),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'f57445d9-7e43-9953-60b6-577b2ac56221', 1),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '2e98d147-ec04-8077-ca3b-4f99eb532a57', 2),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '6d2f7a8e-e85d-b48c-6d84-36b7b0196f6f', 3),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'c3927b9e-070a-0a30-0e0a-a5693e29600e', 4),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'd0ae3073-8af0-550f-58df-9735b16dce50', 5),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'cbdc97c4-a60d-9c80-1bd3-352a473192aa', 6),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '4881d388-930e-cc48-f3f6-8d18084ec4c7', 7),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'cc5159ac-2880-6afd-ddbc-5773a0a6095d', 8),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '96bada91-18a4-4045-2b76-5a96bf52b504', 9),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'b256484f-0160-0e7d-4c7b-d75cc2ad8a00', 10),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '4f46bf16-717f-fa13-71f1-a6a6959308bc', 11),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '4a2a43d2-07ed-7cd0-f751-cdc330776981', 12),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '27c28067-261c-0617-3af0-ee5e903fcc37', 13),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'dfe4dfbb-68a9-ff28-c391-fbe7d65f3e02', 14),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '7ffb3391-244e-e029-564d-980613dd589a', 15),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '1b2b3e38-3ec9-a007-8b5a-aef76b34991c', 16),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'a4e19cc1-c5c9-b459-6f1e-2877354483c4', 17),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'd534455e-540e-d7f3-1f1e-bb7e37f3a7fb', 18),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '90505e36-1cc0-bf23-1583-24cacabbc16a', 19),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '6119c15e-d747-2299-9cdf-bce9feab4054', 20),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '14a94abb-30a7-d849-9696-3e9fa9b59762', 21),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '2a00e233-d24a-0bc0-b42a-b644770f51e0', 22),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'b64da6f3-286a-ab0a-13de-a8476e964e30', 23),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '82804176-dab0-fe68-2372-e3e1e8f7e77a', 24),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '9a324812-659a-d2f8-e5ed-19f8a4db8d69', 25),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '20b1a010-b6f0-9c42-4c5a-719bc9bec9ca', 26),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'b5dd8b68-f008-61b5-5f29-4890003ae221', 27),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '94caf452-62de-006d-e872-d74175a55612', 28),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '8bc6913a-e53d-b3b4-888d-22177c7e6d03', 29),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '96ae0cf3-21e0-ebd1-6fe5-5559938b6034', 30),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'c5b87fa6-1540-6ae8-6fa3-57686fef496b', 31),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'd753360a-f109-43a1-0c3f-69c46f4c7016', 32),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'cdc48e75-094d-023a-9fdc-3bbca3db1d75', 33),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '0741ce70-6a4d-b424-8567-99465650c147', 34),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '21124f05-b529-e6e5-d975-038c839ea9a2', 35),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '9d472e72-7c8e-ec5d-cb03-6f2520458ca2', 36),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'aef74fba-f13b-da3a-80ed-e99305ce4b32', 37),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'ad35fb47-47e5-e4f6-9bb1-40a108ff1cca', 38),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '6a3b9dfc-2073-8260-a959-74557098fee7', 39),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '6dc8bf1a-c2d3-6f09-dd1e-a4084a006a83', 40),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'bb9c4132-0217-cb72-979a-b9a318988040', 41),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'cd422767-5459-c7f5-a183-43cc6308cf74', 42),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '6b780163-bcb3-fdc3-1c68-5d8c7ef68600', 43),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '1f35c88e-d062-1ebf-b299-294d3571c419', 44),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'ce3197fd-52c9-2e05-5751-38beca843631', 45),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '94466a48-5a2c-142b-adc4-b5e9d70729a3', 46),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'aa459c3c-5bfe-1677-ed2f-17ae17bb6a02', 47),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '4659dbfd-2f59-4758-0f3d-ec1e9a714641', 48),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '9f21ed09-e6b1-a064-f500-d121df24fd85', 49),
  ('f7c521e3-441f-9f66-e56f-a6cf6741a77f', '6598dd3a-bd88-9fbe-2ddc-009890631fbb', 50),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'f57445d9-7e43-9953-60b6-577b2ac56221', 1),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '2e98d147-ec04-8077-ca3b-4f99eb532a57', 2),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '6d2f7a8e-e85d-b48c-6d84-36b7b0196f6f', 3),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'c3927b9e-070a-0a30-0e0a-a5693e29600e', 4),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'd0ae3073-8af0-550f-58df-9735b16dce50', 5),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'cbdc97c4-a60d-9c80-1bd3-352a473192aa', 6),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '4881d388-930e-cc48-f3f6-8d18084ec4c7', 7),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'cc5159ac-2880-6afd-ddbc-5773a0a6095d', 8),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '96bada91-18a4-4045-2b76-5a96bf52b504', 9),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'b256484f-0160-0e7d-4c7b-d75cc2ad8a00', 10),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '4f46bf16-717f-fa13-71f1-a6a6959308bc', 11),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '4a2a43d2-07ed-7cd0-f751-cdc330776981', 12),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '27c28067-261c-0617-3af0-ee5e903fcc37', 13),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'dfe4dfbb-68a9-ff28-c391-fbe7d65f3e02', 14),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '7ffb3391-244e-e029-564d-980613dd589a', 15),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '1b2b3e38-3ec9-a007-8b5a-aef76b34991c', 16),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'a4e19cc1-c5c9-b459-6f1e-2877354483c4', 17),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'd534455e-540e-d7f3-1f1e-bb7e37f3a7fb', 18),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '90505e36-1cc0-bf23-1583-24cacabbc16a', 19),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '6119c15e-d747-2299-9cdf-bce9feab4054', 20),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '14a94abb-30a7-d849-9696-3e9fa9b59762', 21),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '2a00e233-d24a-0bc0-b42a-b644770f51e0', 22),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'b64da6f3-286a-ab0a-13de-a8476e964e30', 23),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '82804176-dab0-fe68-2372-e3e1e8f7e77a', 24),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '9a324812-659a-d2f8-e5ed-19f8a4db8d69', 25),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '20b1a010-b6f0-9c42-4c5a-719bc9bec9ca', 26),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'b5dd8b68-f008-61b5-5f29-4890003ae221', 27),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '94caf452-62de-006d-e872-d74175a55612', 28),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'b82c0b04-2750-69f8-8fe5-dc9c8a8fa444', 29),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '43d078fe-9339-483c-d250-84229e8c985e', 30),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'b2db1fe7-8291-8fa1-6d4c-7c8126d8e45f', 31),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '95ba72cf-1554-62c2-378c-a4d8015ffc93', 32),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'f9666602-eca8-ed5d-8f37-156e39821b1f', 33),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '5ffcb3c4-7676-c4ad-d88a-aa6877d566d1', 34),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '885dea7b-e8b9-c48e-54c2-b4ffb6fef465', 35),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'f7a19692-098c-9053-a93d-15edec41ed3a', 36),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '71d0e41c-3064-8722-9c64-4c44fb645882', 37),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', 'b4c8eb2e-7706-6180-15e4-47794b85994c', 38),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '267f97ed-2238-05f2-c27f-bb8ccdd19925', 39),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '6735efde-1d3c-5591-332b-cb3144012379', 40),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '40061d37-d3f8-1408-34ec-3b221ad2726e', 41),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '79d22445-b82b-1d52-442b-9b775112c532', 42),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '659221c1-7eee-12a2-c047-68f8cee0768e', 43),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '77b60bdf-5def-3c7a-78e7-0a8cb8782ebf', 44),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '95e9408d-1af5-1d10-d191-f407d369bd60', 45),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '3be06e28-87f6-4c17-4725-9a08156ff0c4', 46),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '0687ec7c-3ebd-f7b9-a562-ebfb62ea3fc0', 47),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '15acb042-094b-cf1d-b3ca-fc9379dac2ef', 48),
  ('4d611550-374e-711c-475b-7d8e6f8b8952', '5db4ab2d-c40a-8832-acd4-d0ee59446318', 49),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'f57445d9-7e43-9953-60b6-577b2ac56221', 1),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '2e98d147-ec04-8077-ca3b-4f99eb532a57', 2),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '6d2f7a8e-e85d-b48c-6d84-36b7b0196f6f', 3),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'c3927b9e-070a-0a30-0e0a-a5693e29600e', 4),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'd0ae3073-8af0-550f-58df-9735b16dce50', 5),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'cbdc97c4-a60d-9c80-1bd3-352a473192aa', 6),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '4881d388-930e-cc48-f3f6-8d18084ec4c7', 7),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'cc5159ac-2880-6afd-ddbc-5773a0a6095d', 8),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '96bada91-18a4-4045-2b76-5a96bf52b504', 9),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'b256484f-0160-0e7d-4c7b-d75cc2ad8a00', 10),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '4f46bf16-717f-fa13-71f1-a6a6959308bc', 11),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '4a2a43d2-07ed-7cd0-f751-cdc330776981', 12),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '27c28067-261c-0617-3af0-ee5e903fcc37', 13),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'dfe4dfbb-68a9-ff28-c391-fbe7d65f3e02', 14),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '7ffb3391-244e-e029-564d-980613dd589a', 15),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '1b2b3e38-3ec9-a007-8b5a-aef76b34991c', 16),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'a4e19cc1-c5c9-b459-6f1e-2877354483c4', 17),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'd534455e-540e-d7f3-1f1e-bb7e37f3a7fb', 18),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '90505e36-1cc0-bf23-1583-24cacabbc16a', 19),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '6119c15e-d747-2299-9cdf-bce9feab4054', 20),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '14a94abb-30a7-d849-9696-3e9fa9b59762', 21),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '2a00e233-d24a-0bc0-b42a-b644770f51e0', 22),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'b64da6f3-286a-ab0a-13de-a8476e964e30', 23),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '82804176-dab0-fe68-2372-e3e1e8f7e77a', 24),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '9a324812-659a-d2f8-e5ed-19f8a4db8d69', 25),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '20b1a010-b6f0-9c42-4c5a-719bc9bec9ca', 26),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'b5dd8b68-f008-61b5-5f29-4890003ae221', 27),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '94caf452-62de-006d-e872-d74175a55612', 28),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'b2a1d7ca-d021-456a-fd8a-6b1207096f42', 29),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '7ece636d-f525-e20d-38c4-6df822eb58e3', 30),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '551c3a2a-d5a2-2611-b7d3-5e24d097e4e9', 31),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'edebd1cd-2d43-512b-8bb3-37eeac345610', 32),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '6aee8c2e-cce2-bc81-8eee-0a8145047d93', 33),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'b13f1e53-af3d-3019-adbb-44f2aa01c71d', 34),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'cf4eb674-8295-c462-a4b1-9cf899e60b83', 35),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'b24d9aa6-03a6-7085-c3f1-602a249749d6', 36),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'd6739888-4419-b791-df87-0dce8bffed50', 37),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '7113b58c-a5eb-c788-1b57-baf5eea492a6', 38),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '76e464c7-9e28-5ae9-ad54-8318d267bdda', 39),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '675c8d6b-fafc-9f43-0ef6-26cefd962ff7', 40),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '405b86a2-ad7a-2662-8607-6184d3c73eba', 41),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'a05089f3-d108-cb47-454e-4a52fad3fefb', 42),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'cf7b0b90-d183-f45c-8df9-0721461a7c21', 43),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '4010cfa5-96a5-5081-c986-845718b8f490', 44),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'e637fd3c-1233-7eee-37a9-00daab4fc52f', 45),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '1bfe0142-092c-1145-8e9e-5383aebb315a', 46),
  ('f72e55dc-7359-49eb-5479-5a376e590751', '3e1d1603-9386-63cb-6bf8-8ddcc265ff5a', 47),
  ('f72e55dc-7359-49eb-5479-5a376e590751', 'dfe5f2fc-d859-35cf-15c1-edb0ee3c6bb1', 48),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'f57445d9-7e43-9953-60b6-577b2ac56221', 1),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '2e98d147-ec04-8077-ca3b-4f99eb532a57', 2),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '6d2f7a8e-e85d-b48c-6d84-36b7b0196f6f', 3),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'c3927b9e-070a-0a30-0e0a-a5693e29600e', 4),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'd0ae3073-8af0-550f-58df-9735b16dce50', 5),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'cbdc97c4-a60d-9c80-1bd3-352a473192aa', 6),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '4881d388-930e-cc48-f3f6-8d18084ec4c7', 7),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'cc5159ac-2880-6afd-ddbc-5773a0a6095d', 8),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '96bada91-18a4-4045-2b76-5a96bf52b504', 9),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'b256484f-0160-0e7d-4c7b-d75cc2ad8a00', 10),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '4f46bf16-717f-fa13-71f1-a6a6959308bc', 11),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '4a2a43d2-07ed-7cd0-f751-cdc330776981', 12),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '27c28067-261c-0617-3af0-ee5e903fcc37', 13),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'dfe4dfbb-68a9-ff28-c391-fbe7d65f3e02', 14),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '7ffb3391-244e-e029-564d-980613dd589a', 15),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '1b2b3e38-3ec9-a007-8b5a-aef76b34991c', 16),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'a4e19cc1-c5c9-b459-6f1e-2877354483c4', 17),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'd534455e-540e-d7f3-1f1e-bb7e37f3a7fb', 18),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '90505e36-1cc0-bf23-1583-24cacabbc16a', 19),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '6119c15e-d747-2299-9cdf-bce9feab4054', 20),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '14a94abb-30a7-d849-9696-3e9fa9b59762', 21),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '2a00e233-d24a-0bc0-b42a-b644770f51e0', 22),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'b64da6f3-286a-ab0a-13de-a8476e964e30', 23),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '82804176-dab0-fe68-2372-e3e1e8f7e77a', 24),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '9a324812-659a-d2f8-e5ed-19f8a4db8d69', 25),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '20b1a010-b6f0-9c42-4c5a-719bc9bec9ca', 26),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'b5dd8b68-f008-61b5-5f29-4890003ae221', 27),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '94caf452-62de-006d-e872-d74175a55612', 28),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'fb3b6dd1-f5bf-26d6-7bb4-8ed3b7663684', 29),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '64863ae0-bd8e-d03e-7b30-c6f342b99984', 30),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '9280e28a-697c-2b65-b876-ffd72a810f55', 31),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '5403eb1f-fa25-842d-db0a-831efedf3058', 32),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'd5384023-d641-24e8-f658-41903ba1ab94', 33),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'f3e11b03-9419-b844-7a5a-532d5ac9bac3', 34),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '56ab369f-46bf-cc39-886c-73340e057990', 35),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '555530b5-f714-e488-18d8-344c58d4cfdc', 36),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'f143c55d-8d66-f0d8-113a-538af8f9df14', 37),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'af5b7242-d729-45f1-ce29-6ed6e3f4f8d6', 38),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '504bfa16-c783-da98-a7d1-5d8c396b540c', 39),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'cf66f75b-a402-0167-6d53-d3fe2c4e0c24', 40),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '4624f86a-5ca4-1b22-5da1-9686d533e4c3', 41),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '11103919-3621-30ad-94c1-eccbaed659a6', 42),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'c41c0aaf-f6ff-0bf4-ad7b-2b8439e0107f', 43),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'd7155e77-b4b1-6f0c-3621-ca95986b0223', 44),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '3413d84d-b84a-1180-40f1-f3c91dd92c02', 45),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '2208aab5-27e2-2e38-b75e-b2bf27118436', 46),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '41c84aa2-89e5-12d3-becd-796ce10658f8', 47),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '64f09707-7e91-1b03-5248-03ca22fc6e22', 48),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'f1f97f26-4a9c-11c9-ba2d-6d71dbea28a8', 49),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', '5ed7ad2a-e687-f5d4-cef0-46db3d31b69d', 50),
  ('e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'f64b87b0-da0d-7a65-d47e-180315cd6039', 51),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'f57445d9-7e43-9953-60b6-577b2ac56221', 1),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '2e98d147-ec04-8077-ca3b-4f99eb532a57', 2),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '6d2f7a8e-e85d-b48c-6d84-36b7b0196f6f', 3),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'c3927b9e-070a-0a30-0e0a-a5693e29600e', 4),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'd0ae3073-8af0-550f-58df-9735b16dce50', 5),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'cbdc97c4-a60d-9c80-1bd3-352a473192aa', 6),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '4881d388-930e-cc48-f3f6-8d18084ec4c7', 7),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'cc5159ac-2880-6afd-ddbc-5773a0a6095d', 8),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '96bada91-18a4-4045-2b76-5a96bf52b504', 9),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'b256484f-0160-0e7d-4c7b-d75cc2ad8a00', 10),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '4f46bf16-717f-fa13-71f1-a6a6959308bc', 11),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '4a2a43d2-07ed-7cd0-f751-cdc330776981', 12),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '27c28067-261c-0617-3af0-ee5e903fcc37', 13),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'dfe4dfbb-68a9-ff28-c391-fbe7d65f3e02', 14),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '7ffb3391-244e-e029-564d-980613dd589a', 15),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '1b2b3e38-3ec9-a007-8b5a-aef76b34991c', 16),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'a4e19cc1-c5c9-b459-6f1e-2877354483c4', 17),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'd534455e-540e-d7f3-1f1e-bb7e37f3a7fb', 18),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '90505e36-1cc0-bf23-1583-24cacabbc16a', 19),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '6119c15e-d747-2299-9cdf-bce9feab4054', 20),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '14a94abb-30a7-d849-9696-3e9fa9b59762', 21),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '2a00e233-d24a-0bc0-b42a-b644770f51e0', 22),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'b64da6f3-286a-ab0a-13de-a8476e964e30', 23),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '82804176-dab0-fe68-2372-e3e1e8f7e77a', 24),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '9a324812-659a-d2f8-e5ed-19f8a4db8d69', 25),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '20b1a010-b6f0-9c42-4c5a-719bc9bec9ca', 26),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'b5dd8b68-f008-61b5-5f29-4890003ae221', 27),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '94caf452-62de-006d-e872-d74175a55612', 28),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '8c270915-5d18-d6f7-e1f9-74f6fdb6963f', 29),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'b0e3efc3-1aae-db63-cdb9-bf292d891dd8', 30),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'cd7492d8-4f6f-3b9d-98dc-a2a233403273', 31),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '5b96e730-2db4-811a-fbcc-94e1f5e0c337', 32),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '97753cb9-c7d9-b260-5885-1cdb606b9682', 33),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '852aa339-9029-9f5d-1941-ccc8fbca5034', 34),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '8ec2776e-ff32-7ba0-26ea-38476eef8ca4', 35),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'b5cf0eaa-ac5d-c8c9-8cfe-56b4469d11fb', 36),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '1375900e-eea3-8fb5-1b73-c715c6b274f4', 37),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'd43ae4b2-2937-f49c-6bb7-1a2e0d1e0681', 38),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '4d29deee-0608-1558-6353-8c6ef2b4d7a1', 39),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '03644093-c2de-5117-7620-bd257f429cd9', 40),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '68605d74-90a7-813a-2fba-9afa3c1680ca', 41),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '7b9ec42b-49c2-3ca0-0c49-883311472a24', 42),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'b2a0f9c7-fa8d-f88a-aea6-fd9068c8bfa8', 43),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'c41232db-6bc6-aef4-57b1-6bec6414b8c9', 44),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '3d828e72-e093-bcf2-c77f-de9b60c7aea0', 45),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', '505c7598-014b-5f77-2f7a-2bda621a0ae3', 46),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'e057550b-5868-c4d2-7748-0678af453ea6', 47),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'bf74c8c3-39af-5a16-1060-811bbb8782e1', 48),
  ('03dc773e-1815-9b9b-db7e-939a2c2a0580', 'd71a25dc-0cfb-8cbd-74f3-fd4606b56429', 49)
;

-- KNOWLEDGE BASE DOCUMENTS
INSERT INTO documents (id, title, content, tags, category)
VALUES
  ('d3d430db-eb22-30ae-c5af-a7f8de115c00', 'NovaByte Technologies — Company Overview', '# NovaByte Technologies — Company Overview

## About Us

NovaByte Technologies is a Series B enterprise SaaS company headquartered in Bangalore, India, with offices in San Francisco and London. Founded in 2019, NovaByte builds intelligent workflow automation tools for mid-to-large enterprises. Our flagship product, **FlowEngine**, enables organizations to automate complex business processes using AI-driven decision engines.

## Mission

To empower enterprises with intelligent automation that reduces operational friction and unlocks human potential.

## Core Values

1. **Ship with Purpose** — Every feature we build must solve a real customer problem.
2. **Default to Transparency** — Share context generously across teams.
3. **Own the Outcome** — Take responsibility end-to-end, not just for your piece.
4. **Learn Fast, Fail Small** — Experiment rapidly, but contain the blast radius.
5. **Elevate Each Other** — Mentorship and knowledge sharing are part of everyone''s job.

## Products

### FlowEngine (Flagship)
- AI-powered workflow automation platform
- Supports rule-based and ML-driven decision nodes
- REST API-first architecture
- Deployed on AWS (EKS + RDS + S3)
- 200+ enterprise customers globally

### FlowEngine Analytics
- Real-time workflow performance dashboards
- Built with React + D3.js frontend, Python analytics backend
- Integrated with FlowEngine core via event streaming (Kafka)

### FlowEngine Connect
- Integration marketplace with 80+ connectors (Salesforce, SAP, Slack, Jira, etc.)
- Node.js-based connector runtime
- Plugin SDK for custom connector development

## Tech Stack Summary

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Tailwind CSS, Vite |
| Backend API | Node.js (Express), Python (FastAPI) |
| Database | PostgreSQL 15, Redis (caching), MongoDB (logs) |
| Message Queue | Apache Kafka |
| Search | Elasticsearch |
| Infrastructure | AWS (EKS, RDS, S3, CloudFront, Lambda) |
| CI/CD | GitHub Actions, ArgoCD |
| Monitoring | Datadog, PagerDuty |
| IaC | Terraform, Helm |
| Container | Docker, Kubernetes |

## Company Size

- **Total Employees:** ~320
- **Engineering Team:** ~140
- **Engineering Teams:** 8 squads across Backend, Frontend, Platform/DevOps, Data, QA

## Office Locations

| Location | Focus |
|---|---|
| Bangalore (HQ) | Engineering, Product, Operations |
| San Francisco | Sales, Customer Success, Solutions Engineering |
| London | EMEA Sales, Support |

## Funding

- Seed: $3M (2019)
- Series A: $15M (2021)
- Series B: $52M (2023)

## Key Customers

- Fortune 500 manufacturing companies
- Top-tier banking and financial services firms
- Global healthcare organizations
- Government digital transformation agencies

---

*Document ID: KB-001*
*Last Updated: January 2025*
*Owner: People Operations Team*
', ARRAY['company', 'overview', 'products', 'tech-stack'], 'General'),
  ('50ec29cb-0a77-91a1-1242-f74cce5e25d9', 'NovaByte Technologies — Engineering Standards & Guidelines', '# NovaByte Technologies — Engineering Standards & Guidelines

## 1. Code Style & Conventions

### General Principles
- Write self-documenting code. If you need a comment, consider renaming the variable or function first.
- Follow the DRY (Don''t Repeat Yourself) principle but avoid premature abstraction.
- All code must pass linting and formatting checks before commit.
- Maximum function length: 50 lines. If longer, refactor.
- Maximum file length: 400 lines. If longer, split into modules.

### JavaScript / TypeScript (Frontend & Node.js Backend)
- **Style Guide:** Airbnb JavaScript Style Guide (extended)
- **Formatter:** Prettier (config in `.prettierrc` at repo root)
- **Linter:** ESLint with `@novabyte/eslint-config`
- Use `const` by default; use `let` only when reassignment is necessary. Never use `var`.
- Use arrow functions for callbacks; named functions for top-level declarations.
- Always use TypeScript for new code. JavaScript files are legacy only.
- Use `async/await` over `.then()` chains.
- File naming: `kebab-case.ts` for modules, `PascalCase.tsx` for React components.
- Import order: external packages → internal packages → relative imports (enforced by ESLint).

### Python (Backend & Data Services)
- **Style Guide:** PEP 8 + Black formatter
- **Linter:** Ruff
- **Type Hints:** Mandatory for all function signatures.
- Use `dataclasses` or `pydantic` models for structured data.
- Use `pathlib` over `os.path`.
- File naming: `snake_case.py`
- Docstrings: Google style for all public functions and classes.

### Java (Legacy Connector Service)
- **Style Guide:** Google Java Style Guide
- **Formatter:** google-java-format
- Use Java 17+ features where applicable.
- Prefer records over POJOs for data carriers.

## 2. Git & Branching Strategy

### Branch Naming Convention
```
<type>/<ticket-id>-<short-description>

Examples:
  feat/FLOW-1234-add-webhook-retry
  fix/FLOW-5678-null-pointer-auth
  chore/FLOW-9012-upgrade-node-20
```

### Branch Types
| Prefix | Purpose |
|---|---|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `chore/` | Maintenance, dependency updates |
| `refactor/` | Code restructure without behavior change |
| `docs/` | Documentation only |
| `test/` | Adding or updating tests |

### Branch Rules
- `main` — Production branch. Protected. Deploys automatically.
- `develop` — Integration branch. All feature branches merge here first.
- `release/vX.Y.Z` — Release candidate branch. Created from `develop`.
- Direct commits to `main` or `develop` are **prohibited**.
- All branches must be created from latest `develop`.
- Delete branches after merge.

### Commit Messages
Follow Conventional Commits format:
```
<type>(<scope>): <description>

Examples:
  feat(auth): add SSO login support
  fix(api): handle null response in workflow endpoint
  docs(readme): update local setup instructions
```

## 3. Pull Request (PR) Guidelines

### PR Requirements
- Every PR must reference a Jira ticket (e.g., `FLOW-1234`).
- PR title must follow: `[FLOW-XXXX] Brief description`
- PR description must include:
  - **What:** Summary of changes
  - **Why:** Business/technical context
  - **How:** Implementation approach
  - **Testing:** How it was tested
  - **Screenshots:** Required for UI changes
- Maximum PR size: **400 lines changed** (excluding generated files). Larger PRs must be split.
- All PRs require **minimum 2 approvals** before merge.
- At least one reviewer must be a **code owner** of the affected module.
- All CI checks must pass (lint, test, build, security scan).
- Squash merge is the default strategy.

### Code Review Expectations
- Reviewers should respond within **4 business hours**.
- Review for: correctness, readability, security, performance, test coverage.
- Use GitHub''s suggestion feature for small fixes.
- Be constructive. Use "nit:" prefix for non-blocking style suggestions.

## 4. API Standards

### REST API Design
- Base URL pattern: `/api/v{version}/{resource}`
- Use plural nouns for resources: `/api/v1/workflows`, `/api/v1/users`
- HTTP methods:
  - `GET` — Read (idempotent)
  - `POST` — Create
  - `PUT` — Full update
  - `PATCH` — Partial update
  - `DELETE` — Remove
- Always return proper HTTP status codes:
  - `200` OK, `201` Created, `204` No Content
  - `400` Bad Request, `401` Unauthorized, `403` Forbidden, `404` Not Found
  - `500` Internal Server Error
- Pagination: Use `?page=1&limit=20` with response metadata:
  ```json
  {
    "data": [...],
    "meta": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "totalPages": 8
    }
  }
  ```
- Error response format:
  ```json
  {
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Email field is required",
      "details": [...]
    }
  }
  ```

### API Versioning
- Use URL-based versioning: `/api/v1/`, `/api/v2/`
- Maintain backward compatibility for at least 2 major versions.
- Deprecation notice must be given 3 months before sunsetting an API version.

### Authentication
- All APIs use **JWT Bearer tokens**.
- Token format: `Authorization: Bearer <token>`
- Token expiry: 1 hour (access token), 30 days (refresh token).
- Internal service-to-service: mTLS + API keys.

## 5. Testing Standards

### Coverage Requirements
| Type | Minimum Coverage |
|---|---|
| Unit Tests | 80% line coverage |
| Integration Tests | Critical paths covered |
| E2E Tests | Core user flows |

### Testing Frameworks
| Stack | Framework |
|---|---|
| React (Frontend) | Jest + React Testing Library |
| Node.js (Backend) | Jest + Supertest |
| Python (Backend) | pytest + httpx |
| Java (Legacy) | JUnit 5 + Mockito |

### Test File Location
- Colocate test files with source: `component.tsx` → `component.test.tsx`
- Integration tests go in `__tests__/integration/`
- E2E tests go in `e2e/` at project root

### Test Naming
```
describe(''WorkflowService'', () => {
  it(''should create a new workflow when valid data is provided'', () => {});
  it(''should throw ValidationError when name is missing'', () => {});
});
```

## 6. Security Standards

- Never commit secrets, API keys, or credentials to the repository.
- Use **AWS Secrets Manager** or `.env` files (excluded via `.gitignore`) for local development.
- All user inputs must be validated and sanitized.
- SQL queries must use parameterized queries. No string concatenation.
- Dependencies are scanned weekly using **Snyk**.
- Critical/High vulnerabilities must be patched within **48 hours**.
- All data at rest is encrypted (AES-256). All data in transit uses TLS 1.3.
- PII data must be masked in logs.
- Follow OWASP Top 10 guidelines.

## 7. Documentation Standards

- All public APIs must have OpenAPI (Swagger) documentation.
- README.md is mandatory for every repository with: project description, setup instructions, architecture overview, and contribution guidelines.
- Architecture Decision Records (ADRs) must be created for significant technical decisions.
- ADRs are stored in `docs/adr/` in the relevant repository.
- Internal documentation lives in **Notion** under the Engineering workspace.

## 8. Deployment Standards

- All deployments are automated through CI/CD (GitHub Actions → ArgoCD).
- Zero-downtime deployments using rolling updates on Kubernetes.
- Feature flags (LaunchDarkly) for gradual rollouts.
- Canary deployments for high-risk changes.
- Rollback must be achievable within 5 minutes.
- Deployment windows: Weekdays 10:00–16:00 IST. No Friday deployments.
- Hotfixes can bypass deployment windows with VP Engineering approval.

---

*Document ID: KB-002*
*Last Updated: January 2025*
*Owner: Engineering Standards Committee*
', ARRAY['engineering', 'standards', 'pr', 'api'], 'Engineering'),
  ('e6947405-b6b1-27f6-76ac-26ef6717d069', 'NovaByte Technologies — System Architecture Documentation', '# NovaByte Technologies — System Architecture Documentation

## 1. High-Level Architecture

NovaByte FlowEngine follows a **microservices architecture** deployed on AWS EKS (Elastic Kubernetes Service). The system is divided into the following major domains:

### Domain Breakdown

| Domain | Service(s) | Tech Stack | Team |
|---|---|---|---|
| API Gateway | `gateway-service` | Node.js, Express | Platform |
| Authentication | `auth-service` | Node.js, Passport.js | Platform |
| Workflow Engine | `workflow-core`, `workflow-executor` | Python, FastAPI | Backend Squad Alpha |
| Connector Runtime | `connector-runtime` | Node.js | Backend Squad Beta |
| Analytics | `analytics-service`, `analytics-pipeline` | Python, Apache Spark | Data Team |
| Notification | `notification-service` | Node.js | Backend Squad Beta |
| Frontend | `flowengine-web` | React, TypeScript | Frontend Team |
| Admin Panel | `admin-dashboard` | React, TypeScript | Frontend Team |

### Architecture Diagram (Text)

```
                    ┌──────────────┐
                    │  CloudFront  │
                    │    (CDN)     │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │   ALB/NLB    │
                    │ (Load Balancer)│
                    └──────┬───────┘
                           │
              ┌────────────▼────────────┐
              │     API Gateway         │
              │   (gateway-service)     │
              │   Rate Limiting, Auth   │
              └────┬──────┬──────┬──────┘
                   │      │      │
         ┌─────────▼┐  ┌──▼────┐ ┌▼──────────┐
         │ auth-    │  │workflow│ │connector- │
         │ service  │  │-core   │ │runtime    │
         └─────┬────┘  └──┬────┘ └─────┬─────┘
               │          │            │
         ┌─────▼────┐  ┌──▼────┐  ┌───▼─────┐
         │PostgreSQL │  │ Kafka │  │ Redis   │
         │  (Auth)   │  │       │  │ (Cache) │
         └──────────┘  └──┬────┘  └─────────┘
                          │
                   ┌──────▼───────┐
                   │  workflow-   │
                   │  executor    │
                   └──────┬───────┘
                          │
                   ┌──────▼───────┐
                   │ PostgreSQL   │
                   │ (Workflows)  │
                   └──────────────┘
```

## 2. Backend Architecture

### Workflow Core Service (Python/FastAPI)
- **Purpose:** Manages workflow definitions, versioning, and validation.
- **Database:** PostgreSQL 15 (`flowengine_core` schema)
- **Key Endpoints:**
  - `POST /api/v1/workflows` — Create workflow
  - `GET /api/v1/workflows/{id}` — Get workflow details
  - `PUT /api/v1/workflows/{id}` — Update workflow
  - `POST /api/v1/workflows/{id}/publish` — Publish workflow version
  - `GET /api/v1/workflows/{id}/versions` — List workflow versions
- **Repository:** `github.com/novabyte/workflow-core`

### Workflow Executor Service (Python/FastAPI)
- **Purpose:** Executes published workflows, manages execution state, handles retries.
- **Message Queue:** Consumes from Kafka topic `workflow.executions`
- **State Machine:** Uses a state machine pattern for execution lifecycle:
  ```
  PENDING → RUNNING → COMPLETED
                    → FAILED → RETRY → RUNNING
                    → CANCELLED
  ```
- **Repository:** `github.com/novabyte/workflow-executor`

### Gateway Service (Node.js/Express)
- **Purpose:** API gateway, request routing, rate limiting, authentication middleware.
- **Rate Limiting:** 1000 requests/minute per API key (configurable).
- **Auth:** Validates JWT tokens, attaches user context to requests.
- **Repository:** `github.com/novabyte/gateway-service`

### Auth Service (Node.js/Express)
- **Purpose:** User authentication, authorization, SSO integration.
- **Supports:** Email/password, Google OAuth, SAML SSO (enterprise).
- **Token Management:** JWT with RSA-256 signing.
- **Repository:** `github.com/novabyte/auth-service`

### Connector Runtime (Node.js)
- **Purpose:** Executes third-party integrations (Salesforce, Slack, Jira, SAP, etc.)
- **Plugin Architecture:** Each connector is an npm package implementing `IConnector` interface.
- **Sandboxing:** Connectors run in isolated V8 contexts.
- **Repository:** `github.com/novabyte/connector-runtime`

### Notification Service (Node.js)
- **Purpose:** Sends email, Slack, and webhook notifications.
- **Email Provider:** AWS SES
- **Template Engine:** Handlebars
- **Queue:** Kafka topic `notifications.outbound`
- **Repository:** `github.com/novabyte/notification-service`

## 3. Frontend Architecture

### FlowEngine Web (React/TypeScript)
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **State Management:** Zustand (global state) + React Query (server state)
- **Styling:** Tailwind CSS + custom design system (`@novabyte/ui-kit`)
- **Routing:** React Router v6
- **Key Features:**
  - Visual workflow builder (drag-and-drop canvas using React Flow)
  - Real-time execution monitoring via WebSocket
  - Role-based UI rendering
- **Repository:** `github.com/novabyte/flowengine-web`

### Design System (`@novabyte/ui-kit`)
- Component library built on Tailwind CSS + Radix UI primitives
- Published as internal npm package
- Storybook available at `https://storybook.internal.novabyte.dev`
- Components: Button, Input, Modal, Table, Toast, Card, Badge, Dropdown, DatePicker, etc.
- **Repository:** `github.com/novabyte/ui-kit`

### Admin Dashboard (React/TypeScript)
- Internal tool for managing tenants, users, billing, and system health.
- Same tech stack as FlowEngine Web.
- **Repository:** `github.com/novabyte/admin-dashboard`

## 4. Infrastructure & DevOps Architecture

### Cloud Provider: AWS

| Service | Purpose |
|---|---|
| EKS | Kubernetes cluster for all microservices |
| RDS (PostgreSQL) | Primary databases |
| ElastiCache (Redis) | Caching, session storage |
| MSK (Kafka) | Event streaming |
| S3 | File storage, static assets, backups |
| CloudFront | CDN for frontend assets |
| SES | Transactional email |
| Secrets Manager | Secrets and credentials |
| CloudWatch | Basic logging and alerting |
| ECR | Docker image registry |

### Kubernetes Cluster Layout

```
Cluster: novabyte-prod-eks
├── Namespace: gateway
│   └── gateway-service (3 replicas)
├── Namespace: auth
│   └── auth-service (3 replicas)
├── Namespace: workflow
│   ├── workflow-core (3 replicas)
│   └── workflow-executor (5 replicas, auto-scaled)
├── Namespace: connectors
│   └── connector-runtime (4 replicas)
├── Namespace: notifications
│   └── notification-service (2 replicas)
├── Namespace: analytics
│   ├── analytics-service (2 replicas)
│   └── analytics-pipeline (CronJob)
├── Namespace: monitoring
│   ├── datadog-agent (DaemonSet)
│   └── prometheus (1 replica)
└── Namespace: ingress
    └── nginx-ingress-controller
```

### CI/CD Pipeline

```
Developer Push → GitHub Actions
                    │
                    ├── Lint & Format Check
                    ├── Unit Tests
                    ├── Integration Tests
                    ├── Security Scan (Snyk)
                    ├── Docker Build & Push to ECR
                    └── Trigger ArgoCD Sync
                            │
                            ├── Deploy to Staging
                            ├── Smoke Tests
                            ├── Manual Approval (prod)
                            └── Deploy to Production
```

### Environments

| Environment | Purpose | URL Pattern |
|---|---|---|
| Local | Developer machine | `localhost:3000` (FE), `localhost:8000` (BE) |
| Development | Shared dev environment | `*.dev.novabyte.dev` |
| Staging | Pre-production testing | `*.staging.novabyte.dev` |
| Production | Live customer-facing | `*.novabyte.io` |

### Infrastructure as Code
- **Terraform** manages all AWS resources.
- **Helm charts** for Kubernetes deployments.
- All IaC is in `github.com/novabyte/infrastructure` repository.
- Changes require PR review from Platform team.

## 5. Data Architecture

### Databases

| Database | Engine | Purpose | Schema |
|---|---|---|---|
| `novabyte_auth` | PostgreSQL 15 | Users, roles, permissions | `auth` |
| `novabyte_core` | PostgreSQL 15 | Workflows, versions, templates | `core` |
| `novabyte_execution` | PostgreSQL 15 | Execution logs, state | `execution` |
| `novabyte_analytics` | PostgreSQL 15 | Aggregated metrics | `analytics` |
| `novabyte_logs` | MongoDB | Raw execution logs, audit trail | N/A |

### Data Flow

```
User Action → API Gateway → Service → PostgreSQL
                                    → Kafka Event
                                         │
                                    ┌────▼─────┐
                                    │ Analytics │
                                    │ Pipeline  │
                                    └────┬─────┘
                                         │
                                    ┌────▼──────┐
                                    │ Analytics  │
                                    │ Dashboard  │
                                    └───────────┘
```

## 6. Monitoring & Observability

| Tool | Purpose |
|---|---|
| Datadog | APM, metrics, dashboards, log aggregation |
| PagerDuty | Incident alerting and on-call rotation |
| Sentry | Frontend and backend error tracking |
| Statuspage | Public status page for customers |

### Key Metrics Monitored
- API latency (p50, p95, p99)
- Error rates by service
- Kafka consumer lag
- Database connection pool utilization
- Pod CPU/Memory usage
- Workflow execution success/failure rates

### On-Call Rotation
- Each squad maintains its own on-call rotation (weekly).
- Escalation: On-call engineer → Squad Lead → VP Engineering.
- Incident response SLA: Acknowledge within 15 minutes (P1).

---

*Document ID: KB-003*
*Last Updated: January 2025*
*Owner: Platform Engineering Team*
', ARRAY['architecture', 'services', 'infrastructure', 'data'], 'Engineering'),
  ('fa4e0415-c579-4783-a827-1e7bccf04942', 'NovaByte Technologies — Development Environment Setup Guides', '# NovaByte Technologies — Development Environment Setup Guides

---

## Guide 1: Node.js Backend Setup (Gateway, Auth, Connectors, Notifications)

### Prerequisites
- macOS 13+ or Ubuntu 22.04+
- Homebrew (macOS) or apt (Linux)
- Git 2.40+

### Step 1: Install Node.js
```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart terminal, then:
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### Step 2: Install Required Tools
```bash
# Install pnpm (our package manager)
npm install -g pnpm@8

# Install global dev tools
pnpm add -g typescript ts-node nodemon

# Verify
pnpm --version
tsc --version
```

### Step 3: Clone Repository
```bash
# Configure Git (use your NovaByte email)
git config --global user.name "Your Name"
git config --global user.email "your.name@novabyte.dev"

# Clone the service you''re working on (example: gateway-service)
git clone git@github.com:novabyte/gateway-service.git
cd gateway-service

# Install dependencies
pnpm install
```

### Step 4: Set Up Local Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your local settings
# Key variables to configure:
#   DATABASE_URL=postgresql://localhost:5432/novabyte_gateway
#   REDIS_URL=redis://localhost:6379
#   JWT_SECRET=local-dev-secret-key
#   KAFKA_BROKERS=localhost:9092
```

### Step 5: Start Local Dependencies
```bash
# Start PostgreSQL, Redis, Kafka via Docker Compose
docker-compose -f docker-compose.dev.yml up -d

# Run database migrations
pnpm run db:migrate

# Seed test data
pnpm run db:seed
```

### Step 6: Run the Service
```bash
# Development mode (with hot reload)
pnpm run dev

# The service should start on http://localhost:3001
# Health check: http://localhost:3001/health
```

### Step 7: Run Tests
```bash
# Unit tests
pnpm test

# Integration tests (requires local deps running)
pnpm run test:integration

# Test coverage
pnpm run test:coverage
```

### Common Issues
| Issue | Solution |
|---|---|
| `ECONNREFUSED` on PostgreSQL | Ensure Docker containers are running: `docker-compose ps` |
| `pnpm install` fails | Clear cache: `pnpm store prune` then retry |
| Port already in use | Kill process: `lsof -i :3001` then `kill -9 <PID>` |
| Auth token errors locally | Regenerate JWT secret in `.env` |

---

## Guide 2: Python Backend Setup (Workflow Core, Workflow Executor, Analytics)

### Prerequisites
- macOS 13+ or Ubuntu 22.04+
- Git 2.40+
- Docker Desktop

### Step 1: Install Python
```bash
# Install pyenv
curl https://pyenv.run | bash

# Add to ~/.bashrc or ~/.zshrc:
# export PATH="$HOME/.pyenv/bin:$PATH"
# eval "$(pyenv init -)"

# Restart terminal, then:
pyenv install 3.11.7
pyenv global 3.11.7

# Verify
python --version  # Should show 3.11.7
```

### Step 2: Install Poetry (Package Manager)
```bash
curl -sSL https://install.python-poetry.org | python3 -

# Verify
poetry --version
```

### Step 3: Clone Repository
```bash
# Example: workflow-core
git clone git@github.com:novabyte/workflow-core.git
cd workflow-core

# Install dependencies
poetry install

# Activate virtual environment
poetry shell
```

### Step 4: Set Up Local Environment
```bash
# Copy environment template
cp .env.example .env

# Key variables:
#   DATABASE_URL=postgresql://localhost:5432/novabyte_core
#   REDIS_URL=redis://localhost:6379
#   KAFKA_BROKERS=localhost:9092
#   LOG_LEVEL=DEBUG
```

### Step 5: Start Local Dependencies
```bash
# Start dependencies
docker-compose -f docker-compose.dev.yml up -d

# Run migrations (Alembic)
alembic upgrade head

# Seed test data
python scripts/seed_data.py
```

### Step 6: Run the Service
```bash
# Development mode with hot reload
uvicorn app.main:app --reload --port 8000

# API docs available at:
#   Swagger: http://localhost:8000/docs
#   ReDoc: http://localhost:8000/redoc
```

### Step 7: Run Tests
```bash
# All tests
pytest

# With coverage
pytest --cov=app --cov-report=html

# Specific test file
pytest tests/test_workflow_service.py -v
```

### Common Issues
| Issue | Solution |
|---|---|
| `ModuleNotFoundError` | Ensure you''re in Poetry shell: `poetry shell` |
| Alembic migration conflict | Run `alembic heads` to check, then merge: `alembic merge heads` |
| Kafka connection timeout | Check Docker: `docker-compose logs kafka` |
| Slow test suite | Use `pytest -x --ff` to fail fast and run failures first |

---

## Guide 3: React Frontend Setup (FlowEngine Web, Admin Dashboard)

### Prerequisites
- macOS 13+ or Ubuntu 22.04+
- Node.js 20+ (see Node.js setup above)
- Git 2.40+

### Step 1: Clone Repository
```bash
# FlowEngine Web
git clone git@github.com:novabyte/flowengine-web.git
cd flowengine-web

# Install dependencies
pnpm install
```

### Step 2: Set Up Environment
```bash
cp .env.example .env.local

# Key variables:
#   VITE_API_BASE_URL=http://localhost:3001/api/v1
#   VITE_WS_URL=ws://localhost:3001
#   VITE_SENTRY_DSN=<leave empty for local>
#   VITE_FEATURE_FLAGS_KEY=<leave empty for local>
```

### Step 3: Run Development Server
```bash
# Start development server
pnpm dev

# Opens at http://localhost:3000
# Hot Module Replacement (HMR) is enabled
```

### Step 4: Key Development Commands
```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Lint
pnpm lint

# Type check
pnpm type-check

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run Storybook (component documentation)
pnpm storybook
```

### Step 5: Project Structure
```
flowengine-web/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Buttons, inputs, modals
│   │   ├── workflow/     # Workflow-specific components
│   │   └── layout/       # Header, sidebar, footer
│   ├── pages/            # Route-level page components
│   ├── hooks/            # Custom React hooks
│   ├── stores/           # Zustand state stores
│   ├── services/         # API client functions
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── styles/           # Global styles, Tailwind config
├── public/               # Static assets
├── tests/                # Test utilities, fixtures
├── .storybook/           # Storybook configuration
└── vite.config.ts        # Vite configuration
```

### Common Issues
| Issue | Solution |
|---|---|
| CORS errors | Ensure backend is running and CORS is configured for `localhost:3000` |
| Storybook fails to start | Delete `node_modules/.cache` and restart |
| TypeScript errors in IDE | Restart TS server: VS Code → Cmd+Shift+P → "Restart TS Server" |
| Blank page after login | Check `.env.local` has correct `VITE_API_BASE_URL` |

---

## Guide 4: DevOps / Infrastructure Setup

### Prerequisites
- macOS 13+ or Ubuntu 22.04+
- Docker Desktop with Kubernetes enabled
- AWS CLI v2
- Terraform 1.6+
- kubectl 1.28+
- Helm 3.13+

### Step 1: Install Tools
```bash
# AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# Terraform
brew install terraform   # macOS
# or: sudo apt install terraform  # Linux

# kubectl
brew install kubectl

# Helm
brew install helm

# ArgoCD CLI
brew install argocd

# k9s (Kubernetes TUI)
brew install k9s
```

### Step 2: Configure AWS Access
```bash
# Configure AWS CLI with your NovaByte credentials
aws configure --profile novabyte-dev
# AWS Access Key ID: <provided by Platform team>
# AWS Secret Access Key: <provided by Platform team>
# Default region: ap-south-1
# Default output: json

export AWS_PROFILE=novabyte-dev
```

### Step 3: Connect to Kubernetes Cluster
```bash
# Update kubeconfig for dev cluster
aws eks update-kubeconfig --name novabyte-dev-eks --region ap-south-1

# Verify connection
kubectl get nodes
kubectl get namespaces
```

### Step 4: Clone Infrastructure Repository
```bash
git clone git@github.com:novabyte/infrastructure.git
cd infrastructure

# Structure:
# infrastructure/
# ├── terraform/
# │   ├── modules/
# │   ├── environments/
# │   │   ├── dev/
# │   │   ├── staging/
# │   │   └── prod/
# ├── helm-charts/
# │   ├── gateway-service/
# │   ├── workflow-core/
# │   └── ...
# └── scripts/
```

### Step 5: Local Kubernetes Development
```bash
# Use Skaffold for local K8s development
brew install skaffold

# Run a service locally on K8s
cd helm-charts/gateway-service
skaffold dev --port-forward
```

### VPN Setup
- Download **WireGuard** client
- Import the configuration file sent to your NovaByte email
- Connect to NovaByte VPN to access internal services
- VPN is required for: staging/prod cluster access, internal dashboards, database access

### Common Issues
| Issue | Solution |
|---|---|
| `kubectl` permission denied | Ensure AWS credentials are valid: `aws sts get-caller-identity` |
| Terraform state lock | Check if someone else is running Terraform. If stuck: `terraform force-unlock <ID>` |
| EKS nodes not ready | Check node group in AWS Console or `kubectl describe node <name>` |
| Helm chart deployment fails | Check values: `helm template . --values values-dev.yaml` |

---

## Required IDE Setup (All Developers)

### VS Code Extensions (Mandatory)
- ESLint
- Prettier
- GitLens
- Docker
- Kubernetes (by Microsoft)
- Thunder Client (API testing)
- Error Lens

### VS Code Extensions (Recommended)
- GitHub Copilot
- Tailwind CSS IntelliSense (Frontend)
- Python (by Microsoft) (Backend Python)
- Pylance (Backend Python)
- REST Client

### VS Code Settings
Create `.vscode/settings.json` in your project root:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

---

*Document ID: KB-004*
*Last Updated: January 2025*
*Owner: Developer Experience Team*
', ARRAY['setup', 'environment', 'frontend', 'backend'], 'Setup'),
  ('2d7aea5f-0dbc-be92-3b4f-6b90c449eddc', 'NovaByte Technologies — Company Policies', '# NovaByte Technologies — Company Policies

---

## 1. Security Policy

### Access Control
- All employees receive access based on the **Principle of Least Privilege**.
- Access is role-based (RBAC) and reviewed quarterly.
- Elevated access (production databases, admin consoles) requires manager approval + Security team review.
- Access is revoked immediately upon offboarding or role change.

### Password & Authentication
- All internal tools require SSO via **Google Workspace** (your NovaByte Google account).
- GitHub, Jira, Slack, Notion — all accessed via SSO.
- Personal password managers are encouraged (1Password is provided by the company).
- Multi-Factor Authentication (MFA) is **mandatory** for:
  - AWS Console
  - GitHub (hardware key or authenticator app)
  - VPN
  - Admin dashboards

### Device Security
- Company laptops must have:
  - Full disk encryption enabled
  - Firewall enabled
  - Auto-lock after 5 minutes of inactivity
  - Company-approved antivirus (CrowdStrike Falcon)
- Personal devices may NOT be used to access production systems.
- Report lost/stolen devices to IT Security within 1 hour: `security@novabyte.dev`

### Incident Reporting
- Security incidents must be reported immediately to `#security-incidents` Slack channel.
- DO NOT attempt to fix security issues yourself — report them.
- Bug bounty program exists for external researchers: `security.novabyte.io`

---

## 2. Data Handling & Privacy Policy

### Data Classification

| Level | Description | Examples |
|---|---|---|
| **Public** | Can be shared externally | Marketing materials, public docs |
| **Internal** | NovaByte employees only | Internal wikis, architecture docs |
| **Confidential** | Restricted to specific teams | Customer data, financial records |
| **Highly Confidential** | Need-to-know basis | Encryption keys, PII, security audits |

### Data Handling Rules
- **Never** store customer data on personal devices or personal cloud storage.
- **Never** share customer data in Slack channels. Use designated secure channels.
- **Never** include real customer data in test environments. Use anonymized/synthetic data.
- All database access must go through approved tools (DBeaver with SSO, or approved CLI tools via VPN).
- Data exports require manager approval and must be logged.

### GDPR & Compliance
- NovaByte is GDPR compliant and SOC 2 Type II certified.
- All developers must complete annual Data Privacy training (assigned via LMS).
- Customer data deletion requests must be handled within 30 days.
- Data Processing Agreements (DPAs) are managed by the Legal team.

---

## 3. Communication Policy

### Slack Guidelines
- **Response SLA:** Respond to direct messages within 4 business hours.
- **Channels:**
  - `#engineering-general` — Team-wide announcements
  - `#team-{squad-name}` — Squad-specific discussions (e.g., `#team-backend-alpha`)
  - `#incidents` — Production incident coordination
  - `#security-incidents` — Security issue reporting
  - `#random` — Casual/social conversations
  - `#standup-{team}` — Async standups
  - `#help-devops` — DevOps support requests
  - `#help-frontend` — Frontend support requests
  - `#help-backend` — Backend support requests
  - `#new-joiners` — New employee welcome and Q&A
- Use threads for replies to keep channels organized.
- Use `@channel` sparingly and only for urgent matters.
- After-hours messages: Use Slack''s "Schedule Send" feature.

### Email Guidelines
- Use email for: external communication, formal decisions, HR-related matters.
- Use Slack for: day-to-day team communication, quick questions, status updates.
- All official announcements go via email AND `#engineering-general`.

### Meeting Guidelines
- Default meeting duration: 25 minutes (not 30) or 50 minutes (not 60) to allow buffer time.
- All meetings must have an agenda shared at least 1 hour before.
- Meetings should have designated note-taker (rotating).
- "No Meeting Wednesdays" — No internal meetings on Wednesdays to protect focus time.
- Camera on is encouraged but not mandatory.

---

## 4. Work Schedule & Leave Policy

### Working Hours
- Core hours: **10:00 AM – 4:00 PM IST** (flexible otherwise).
- Total expected: ~8 hours/day, ~40 hours/week.
- Remote-first company. Office attendance is optional (Bangalore office available).

### Leave Policy

| Leave Type | Days/Year | Notes |
|---|---|---|
| Paid Time Off (PTO) | 24 days | Accrued monthly |
| Sick Leave | 12 days | No doctor''s note needed for ≤3 days |
| Parental Leave | 26 weeks (primary), 4 weeks (secondary) | Fully paid |
| Bereavement | 5 days | Immediate family |
| Public Holidays | 12 days | Per India/US/UK calendar |
| Comp Off | As earned | For weekend/holiday work |

### Leave Process
1. Apply via **BambooHR** at least 3 days in advance (PTO).
2. Inform your squad lead on Slack.
3. Set Slack status and Google Calendar to "OOO."
4. For extended leave (>5 days), ensure work handoff documentation.

---

## 5. Compliance & Training Requirements

### Mandatory Training (Complete within first 30 days)

| Training | Platform | Duration |
|---|---|---|
| Security Awareness | NovaByte LMS | 45 min |
| Data Privacy & GDPR | NovaByte LMS | 30 min |
| Code of Conduct | NovaByte LMS | 20 min |
| Anti-Harassment | NovaByte LMS | 30 min |
| Insider Threat Awareness | NovaByte LMS | 20 min |

### Annual Refreshers
- Security Awareness (annually)
- Data Privacy (annually)
- Code of Conduct acknowledgment (annually)

### Compliance Acknowledgments
- All new employees must digitally sign:
  - Employee Handbook Acknowledgment
  - NDA (Non-Disclosure Agreement)
  - Acceptable Use Policy
  - IP Assignment Agreement
- Completed via **DocuSign** (link sent to your NovaByte email).

---

## 6. Expense & Equipment Policy

### Equipment Provided
- MacBook Pro 14" (M3 Pro) or equivalent Linux laptop
- 27" external monitor
- Keyboard, mouse, headset
- Standing desk (on request)
- Home office setup allowance: ₹25,000 / $300 (one-time)

### Expense Reimbursement
- Submit expenses via **Expensify** within 30 days.
- Categories: Travel, meals (with clients), training, software licenses.
- Requires manager approval for expenses > ₹5,000 / $60.
- Company credit card available for recurring SaaS tools (request via IT).

---

## 7. VPN & Network Access Policy

### VPN Requirements
- VPN is **mandatory** to access:
  - Internal dashboards (Datadog, ArgoCD, internal Notion)
  - Staging and production databases
  - Kubernetes clusters (staging/prod)
  - Internal APIs
- VPN client: **WireGuard**
- Configuration file sent to your NovaByte email on Day 1.
- VPN credentials are tied to your SSO account.

### Network Rules
- Never connect to production databases from public WiFi (even with VPN).
- Report any unusual network activity to `#security-incidents`.
- Never use personal VPN services on company devices.

---

## 8. On-Call & Incident Response Policy

### On-Call Expectations
- Developers are added to on-call rotation after **90 days** of employment.
- On-call rotation: 1 week per rotation cycle (typically every 6-8 weeks per person).
- On-call engineers must:
  - Acknowledge alerts within **15 minutes** (P1) or **1 hour** (P2).
  - Have laptop and VPN access available at all times during on-call.
  - Escalate if unable to resolve within 30 minutes.

### Incident Severity

| Severity | Definition | Response Time |
|---|---|---|
| P1 | Full outage or data loss | 15 minutes |
| P2 | Major feature degraded | 1 hour |
| P3 | Minor issue, workaround exists | 4 hours |
| P4 | Cosmetic or minor UX issue | Next business day |

### Post-Incident
- Blameless post-mortem within 48 hours of P1/P2 resolution.
- Post-mortem template in Notion: `Engineering > Incidents > Post-Mortem Template`.
- Action items tracked in Jira under `INCIDENT` project.

---

*Document ID: KB-005*
*Last Updated: January 2025*
*Owner: People Operations & Security Team*
', ARRAY['policy', 'security', 'leave', 'compliance'], 'Compliance'),
  ('51a021fb-86ce-3e74-c338-e9607e9a9b39', 'NovaByte Technologies — Company Structure & Engineering Organization', '# NovaByte Technologies — Company Structure & Engineering Organization

---

## 1. Executive Leadership

| Name | Title | Email | Location |
|---|---|---|---|
| Aditya Krishnan | CEO & Co-Founder | aditya.k@novabyte.dev | Bangalore |
| Priyanka Rao | CTO & Co-Founder | priyanka.r@novabyte.dev | Bangalore |
| Suresh Iyer | VP Engineering | suresh.i@novabyte.dev | Bangalore |
| Neha Bansal | VP Product | neha.b@novabyte.dev | San Francisco |
| Rajat Gupta | VP Sales | rajat.g@novabyte.dev | San Francisco |
| Divya Menon | Head of People Operations | divya.m@novabyte.dev | Bangalore |

---

## 2. Engineering Organization Structure

```
VP Engineering (Suresh Iyer)
│
├── Backend Squad Alpha (Workflows)
│   ├── Squad Lead: Sneha Kulkarni
│   ├── Staff Engineer: Rahul Verma
│   ├── Senior Engineers (2)
│   ├── Engineers (3)
│   └── Intern (1)
│
├── Backend Squad Beta (Connectors & Notifications)
│   ├── Squad Lead: Arjun Mehta
│   ├── Senior Engineers (3)
│   ├── Engineers (2)
│   └── Interns (1)
│
├── Frontend Team
│   ├── Frontend Lead: Kavitha Rajan
│   ├── Senior Engineers (2)
│   ├── Engineers (4)
│   └── Intern (1)
│
├── Platform / DevOps Team
│   ├── Platform Lead: Rohan Saxena
│   ├── Staff Engineer: Nikhil Gupta
│   ├── Senior Engineers (2)
│   └── Engineers (2)
│
├── Data Team
│   ├── Data Lead: Amit Sharma
│   ├── Senior Data Engineer (1)
│   ├── Data Engineers (2)
│   └── ML Engineer (1)
│
├── QA Team
│   ├── QA Lead: Lakshmi Venkatesh
│   ├── Senior QA Engineers (2)
│   └── QA Engineers (3)
│
├── Security Team
│   ├── Security Lead: Farhan Ahmed
│   └── Security Engineers (2)
│
└── Developer Experience (DX) Team
    ├── DX Lead: Tanvi Shah
    └── DX Engineers (2)
```

---

## 3. Team Descriptions & Responsibilities

### Backend Squad Alpha — Workflows
- **Owns:** workflow-core, workflow-executor
- **Responsibilities:** Workflow definition, versioning, validation, execution engine, state management, retry logic
- **Key Metrics:** Workflow execution success rate, latency p95, error rate
- **Standup:** Daily 10:15 AM IST via Slack `#standup-backend-alpha`
- **Sprint Cycle:** 2-week sprints, planning on Mondays, retro on alternate Fridays

### Backend Squad Beta — Connectors & Notifications
- **Owns:** connector-runtime, notification-service
- **Responsibilities:** Third-party integrations (Salesforce, Slack, Jira, SAP), notification delivery (email, Slack, webhooks), connector SDK maintenance
- **Key Metrics:** Connector execution success rate, notification delivery rate, latency
- **Standup:** Daily 10:30 AM IST via Slack `#standup-backend-beta`
- **Sprint Cycle:** 2-week sprints, planning on Mondays, retro on alternate Fridays

### Frontend Team
- **Owns:** flowengine-web, admin-dashboard, @novabyte/ui-kit (design system)
- **Responsibilities:** Visual workflow builder, real-time monitoring UI, admin panel, design system maintenance, accessibility
- **Key Metrics:** Core Web Vitals, component test coverage, Storybook completeness
- **Standup:** Daily 10:00 AM IST via Slack `#standup-frontend`
- **Sprint Cycle:** 2-week sprints, planning on Mondays, retro on alternate Fridays

### Platform / DevOps Team
- **Owns:** infrastructure (Terraform, Helm), CI/CD pipelines, Kubernetes clusters, monitoring stack
- **Responsibilities:** Cloud infrastructure management, deployment automation, monitoring & alerting, security infrastructure, cost optimization, developer tooling
- **Key Metrics:** Deployment frequency, mean time to recovery (MTTR), infrastructure cost, cluster uptime
- **Standup:** Daily 9:45 AM IST via Slack `#standup-platform`
- **Sprint Cycle:** Kanban board (continuous flow)

### Data Team
- **Owns:** analytics-service, analytics-pipeline
- **Responsibilities:** Data pipelines, workflow analytics, customer usage reports, ML-driven workflow recommendations
- **Key Metrics:** Pipeline freshness, data quality scores, model accuracy
- **Standup:** Daily 10:30 AM IST via Slack `#standup-data`
- **Sprint Cycle:** 2-week sprints

### QA Team
- **Owns:** E2E test suites, test infrastructure, quality processes
- **Responsibilities:** Test planning, E2E automation (Playwright), regression testing, release sign-off, quality metrics
- **Key Metrics:** Test coverage, defect escape rate, release cycle time
- **Standup:** Daily 10:45 AM IST via Slack `#standup-qa`

### Security Team
- **Owns:** Security scanning, access management, incident response
- **Responsibilities:** Vulnerability management, security reviews, penetration testing, compliance audits (SOC 2), access control policies
- **Key Metrics:** Vulnerability remediation time, security incident count, audit compliance score

### Developer Experience (DX) Team
- **Owns:** Internal tooling, onboarding automation, developer documentation
- **Responsibilities:** CI/CD pipeline optimization, local development experience, internal developer portal, documentation standards
- **Key Metrics:** Developer satisfaction score, build time, onboarding time-to-productivity

---

## 4. Key Contacts for New Employees

| Need | Contact Person | Role | Slack Handle | Email |
|---|---|---|---|---|
| General HR queries | Divya Menon | Head of People Ops | @divya.menon | divya.m@novabyte.dev |
| IT setup / laptop issues | Rakesh Kumar | IT Manager | @rakesh.kumar | rakesh.k@novabyte.dev |
| GitHub / access issues | Tanvi Shah | DX Lead | @tanvi.shah | tanvi.s@novabyte.dev |
| VPN / network access | Rohan Saxena | Platform Lead | @rohan.saxena | rohan.s@novabyte.dev |
| Security concerns | Farhan Ahmed | Security Lead | @farhan.ahmed | farhan.a@novabyte.dev |
| Jira / project setup | Lakshmi Venkatesh | QA Lead | @lakshmi.v | lakshmi.v@novabyte.dev |
| Payroll / benefits | Meghna Patel | HR Coordinator | @meghna.patel | meghna.p@novabyte.dev |
| Expense reimbursement | Deepa Nair | Finance Associate | @deepa.nair | deepa.n@novabyte.dev |
| Compliance training | Divya Menon | Head of People Ops | @divya.menon | divya.m@novabyte.dev |
| Onboarding general | Tanvi Shah | DX Lead | @tanvi.shah | tanvi.s@novabyte.dev |

---

## 5. Communication Channels Overview

### Mandatory Channels (All Engineers)
| Channel | Purpose |
|---|---|
| `#engineering-general` | Engineering-wide announcements, all-hands updates |
| `#new-joiners` | Welcome channel for new employees, onboarding Q&A |
| `#incidents` | Production incident coordination |
| `#security-incidents` | Security issue reporting |
| `#team-{your-squad}` | Your squad''s main channel |
| `#standup-{your-team}` | Async daily standups |

### Optional but Recommended Channels
| Channel | Purpose |
|---|---|
| `#help-devops` | Ask DevOps/Platform team for help |
| `#help-frontend` | Ask Frontend team for help |
| `#help-backend` | Ask Backend team for help |
| `#tech-talks` | Internal tech talk announcements and discussions |
| `#learning` | Share articles, courses, conference talks |
| `#shipped` | Celebrate launches and deployments |
| `#random` | Casual conversations, memes, social |
| `#food-bangalore` | Food recommendations in Bangalore |
| `#gaming` | Gaming interest group |
| `#books` | Book club and recommendations |

---

## 6. Meeting Cadence

| Meeting | Frequency | Participants | Duration |
|---|---|---|---|
| Team Standup | Daily | Squad members | 15 min (async Slack) |
| Sprint Planning | Bi-weekly (Monday) | Squad + Product | 50 min |
| Sprint Retrospective | Bi-weekly (Friday) | Squad | 50 min |
| 1:1 with Manager | Weekly | You + Manager | 25 min |
| 1:1 with Mentor | Weekly (first month) | You + Mentor | 25 min |
| Engineering All-Hands | Monthly (first Thursday) | All engineering | 50 min |
| Tech Talk | Bi-weekly (Wednesday) | Open to all | 50 min |
| Architecture Review | Monthly | Senior+ engineers | 50 min |
| Demo Day | End of sprint | Squad + stakeholders | 25 min |

---

*Document ID: KB-008*
*Last Updated: January 2025*
*Owner: VP Engineering & People Operations*
', ARRAY['org', 'teams', 'contacts', 'slack'], 'General'),
  ('14803890-a579-405b-9ce1-0b4e46102336', 'NovaByte Technologies — Onboarding FAQ', '# NovaByte Technologies — Onboarding FAQ

---

## General Onboarding

### Q1: How long does onboarding take?
**A:** Onboarding typically takes **2 weeks** for all roles. The first week focuses on environment setup, account provisioning, documentation reading, and compliance training. The second week focuses on codebase exploration, meeting stakeholders, and completing your first task. Senior engineers may move faster, while interns may receive additional support sessions.

### Q2: Who is my main point of contact during onboarding?
**A:** Your primary contacts are:
- **Manager** — for role expectations, project context, and career questions
- **Mentor/Buddy** — for day-to-day technical questions, code reviews, and pair programming
- **HR (Divya Menon)** — for HR policies, benefits, and compliance questions
- **IT (Rakesh Kumar)** — for laptop, access, and tool setup issues
- **DX Team (Tanvi Shah)** — for onboarding process questions and documentation

### Q3: What should I do on my first day?
**A:** Your first day agenda:
1. Set up your laptop and accounts (Google Workspace, Slack, GitHub, Jira, Notion)
2. Enable MFA on all accounts
3. Install and configure VPN (WireGuard)
4. Join required Slack channels
5. Attend welcome call with HR
6. Meet your manager (1:1)
7. Meet your mentor/buddy
8. Set up BambooHR and 1Password

### Q4: What if I can''t complete all onboarding tasks in 2 weeks?
**A:** That''s okay! Talk to your manager. Some tasks can be extended, especially if you''re blocked on access or waiting for training sessions. The onboarding agent will track your progress and notify HR of any delays. The important thing is to communicate proactively.

### Q5: Is onboarding remote-friendly?
**A:** Yes, NovaByte is a remote-first company. All onboarding tasks can be completed remotely. Your laptop will be shipped to your address before your start date. All meetings are on Google Meet. The Bangalore office is available if you prefer in-person.

---

## Access & Accounts

### Q6: How do I get GitHub access?
**A:** You''ll receive a GitHub organization invite to `novabyte` on your NovaByte email within your first day. Accept the invite and enable MFA (hardware key or authenticator app). If you haven''t received the invite by end of Day 1, contact Tanvi Shah (DX Lead) at `tanvi.s@novabyte.dev` or Slack `@tanvi.shah`.

### Q7: How do I get Jira access?
**A:** A Jira workspace invite is sent to your NovaByte email on Day 1. Accept the invite to access the NovaByte Atlassian workspace. Your squad''s board will be shared by your manager. If you need access to additional projects, request via your manager. For issues, contact Lakshmi Venkatesh (QA Lead) at Slack `@lakshmi.v`.

### Q8: How do I set up VPN?
**A:** You''ll receive a WireGuard VPN configuration file via your NovaByte email on Day 1.
1. Download the WireGuard client for your OS (macOS/Linux/Windows)
2. Import the configuration file
3. Connect to the VPN
4. Verify access by pinging `internal.novabyte.dev`
VPN is required for accessing staging/production systems, internal dashboards, and databases. For issues, contact Rohan Saxena (Platform Lead) at Slack `@rohan.saxena`.

### Q9: How do I access Notion?
**A:** Notion access is through your NovaByte Google account (SSO). Go to `notion.novabyte.dev` and log in with your Google Workspace credentials. Bookmark the "Engineering" workspace. Key pages to start with: Architecture Overview, Engineering Standards, Team Wikis.

### Q10: What Slack channels should I join?
**A:** Mandatory channels: `#engineering-general`, `#new-joiners`, `#team-{your-squad}`, `#standup-{your-team}`, `#incidents`, `#security-incidents`. Recommended: `#help-devops`, `#help-frontend`, `#help-backend`, `#tech-talks`, `#learning`, `#shipped`, `#random`. See the full list in the Company Structure document (KB-008).

### Q11: How do I get AWS access? (DevOps/Platform only)
**A:** AWS IAM credentials are provisioned by the Platform Lead (Rohan Saxena). You''ll receive an email with your access key and secret key. Configure AWS CLI with `aws configure --profile novabyte-dev`. MFA is mandatory for AWS Console access. For production access, additional approval from VP Engineering is required.

---

## Development Environment

### Q12: What IDE should I use?
**A:** We recommend **VS Code** with mandatory extensions: ESLint, Prettier, GitLens, Docker, Kubernetes, Thunder Client, Error Lens. See the full list in Setup Guides (KB-004). You may use other IDEs (IntelliJ, WebStorm) but must ensure linting and formatting configs are compatible.

### Q13: My Docker containers won''t start. What should I do?
**A:** Common fixes:
1. Ensure Docker Desktop is running and has sufficient resources (4GB+ RAM allocated)
2. Check if ports are already in use: `lsof -i :5432` (PostgreSQL), `lsof -i :6379` (Redis)
3. Try `docker-compose down -v` to clean up volumes, then `docker-compose up -d`
4. Check Docker logs: `docker-compose logs <service-name>`
5. If still stuck, post in `#help-devops` with your error output

### Q14: How do I run database migrations?
**A:**
- **Node.js services:** `pnpm run db:migrate` (uses Knex or TypeORM depending on service)
- **Python services:** `alembic upgrade head` (uses Alembic)
- To seed test data: Node.js → `pnpm run db:seed`, Python → `python scripts/seed_data.py`
- If you get migration conflicts, run `alembic heads` (Python) to check, or check Git for migration file conflicts.

### Q15: What package manager do we use?
**A:** 
- **Node.js/Frontend:** pnpm (v8). Do NOT use npm or yarn.
- **Python:** Poetry. Do NOT use pip directly for project dependencies.
- **Global Python tools:** pip is fine for global tools like `black`, `ruff`.

### Q16: How do I run the full stack locally?
**A:** To run the entire FlowEngine locally:
1. Start infrastructure: `docker-compose -f docker-compose.dev.yml up -d` (PostgreSQL, Redis, Kafka)
2. Start backend services (in separate terminals):
   - `cd gateway-service && pnpm dev` (port 3001)
   - `cd workflow-core && uvicorn app.main:app --reload --port 8000`
3. Start frontend: `cd flowengine-web && pnpm dev` (port 3000)
4. Access app at `http://localhost:3000`
Note: You usually only need to run the service(s) you''re working on. Mock other services or use the shared dev environment.

---

## Git & Code Review

### Q17: How do I create my first branch?
**A:**
```bash
# Make sure you''re on latest develop
git checkout develop
git pull origin develop

# Create your feature branch
git checkout -b feat/FLOW-XXXX-short-description

# Make changes, then commit
git add .
git commit -m "feat(module): brief description"

# Push and create PR
git push origin feat/FLOW-XXXX-short-description
```
Then open a Pull Request on GitHub targeting the `develop` branch.

### Q18: How many approvals do I need for a PR?
**A:** Minimum **2 approvals** required. At least one reviewer must be a code owner of the affected module. All CI checks (lint, test, build, security scan) must pass. For interns and juniors, one approval should be from your mentor.

### Q19: What if my PR is too large?
**A:** PRs should be under **400 lines changed** (excluding generated files). If your change is larger, split it into smaller, logical PRs. For example, split into: (1) schema/model changes, (2) service layer, (3) API endpoint, (4) tests. Talk to your mentor for guidance on PR splitting.

### Q20: How long should I wait for code review?
**A:** Reviewers are expected to respond within **4 business hours**. If you haven''t received a review after 4 hours, send a polite reminder on Slack. If still no response after 8 hours, escalate to your squad lead.

---

## Company Processes

### Q21: What is "No Meeting Wednesday"?
**A:** Every Wednesday is designated as a "No Meeting" day at NovaByte. No internal meetings should be scheduled on Wednesdays to protect focused, uninterrupted work time. External meetings with customers are exceptions but should be minimized. Use Wednesdays for deep work, coding, learning, and documentation.

### Q22: How do sprint planning work?
**A:** Sprints are 2 weeks long. Sprint planning happens on Monday mornings with your squad and Product Manager. During planning, the team reviews the backlog, estimates stories (in story points), and commits to sprint scope. The squad lead facilitates. As a new hire, you''ll observe the first sprint and participate in the second.

### Q23: When do I join the on-call rotation?
**A:** After **90 days** of employment. Before joining, you''ll shadow on-call shifts, review runbooks, and attend incident response training. On-call rotations are typically 1 week every 6-8 weeks. You''ll receive PagerDuty access and be briefed on escalation procedures.

### Q24: How do I report a security issue?
**A:** Post immediately in `#security-incidents` Slack channel. Do NOT try to fix it yourself. Include: what you found, where you found it, and any relevant logs or screenshots. The Security team (led by Farhan Ahmed) will triage and respond. For sensitive findings, DM Farhan directly.

### Q25: How do I submit expenses?
**A:** Use **Expensify** (set up during onboarding). Submit receipts within 30 days. For amounts over ₹5,000 / $60, you''ll need manager approval. Categories: Travel, meals (client-related), training, software. Home office setup (₹25,000 / $300 one-time) is auto-approved.

---

## Compliance & Training

### Q26: What training do I need to complete and by when?
**A:** Within your first 30 days, complete these courses on the NovaByte LMS (`lms.novabyte.dev`):
1. Security Awareness (45 min) — Week 1
2. Data Privacy & GDPR (30 min) — Week 1
3. Code of Conduct (20 min) — Week 1
4. Anti-Harassment (30 min) — Week 2
5. Insider Threat Awareness (20 min) — Week 2
All courses are self-paced and available 24/7.

### Q27: What documents do I need to sign?
**A:** Four documents via DocuSign (links sent to your email):
1. Employee Handbook Acknowledgment
2. Non-Disclosure Agreement (NDA)
3. Acceptable Use Policy
4. IP Assignment Agreement
These should be signed within your first week.

### Q28: What is the data classification policy?
**A:** NovaByte has 4 data classification levels: Public, Internal, Confidential, and Highly Confidential. Key rules: never store customer data on personal devices, never share customer data in open Slack channels, use anonymized data in test environments, and mask PII in logs. See full details in the Policies document (KB-005).

---

## Culture & Social

### Q29: Are there social events or interest groups?
**A:** Yes! NovaByte has several interest-based Slack channels: `#gaming`, `#books`, `#food-bangalore`, `#fitness`, `#music`, `#movies`. We have monthly team social events (virtual and in-person), quarterly offsites, and annual company retreats. Tech Talks happen every other Wednesday.

### Q30: How do I give feedback about the onboarding process?
**A:** We value your feedback! At the end of your onboarding, you''ll receive an onboarding feedback survey. You can also share feedback anytime with:
- Your manager (1:1s)
- DX Team (Tanvi Shah) — for process improvements
- HR (Divya Menon) — for policy-related feedback
- The `#new-joiners` channel — for suggestions that help future joiners

---

*Document ID: KB-011*
*Last Updated: January 2025*
*Owner: Developer Experience Team & People Operations*
', ARRAY['faq', 'onboarding', 'support', 'process'], 'General')
;

-- STARTER TICKETS
INSERT INTO tickets (id, title, description, repository, acceptance_criteria, difficulty, persona_id, status)
VALUES
  ('6c48a6d4-bc8d-4ea9-9b61-db93f67031b3', 'FLOW-INTERN-001: Fix Input Validation Bug in Connector Config Endpoint', 'Project: FlowEngine Connectors
Type: Bug Fix
Priority: Low
Story Points: 2

The `POST /api/v1/connectors/{id}/config` endpoint currently accepts empty strings for required configuration fields (`api_key`, `base_url`). This should return a 400 Bad Request with a proper validation error message instead.

Files to Modify:
- `src/routes/connector-config.ts` (validation logic)
- `src/validators/connector-config.validator.ts` (new validation rules)
- `tests/routes/connector-config.test.ts` (new test cases)

Helpful Resources:
- API Standards: KB-002, Section 4
- Existing validation patterns: `src/validators/connector.validator.ts`
- Ask your mentor (Priya Nair) if you need guidance

---', 'novabyte/connector-runtime', '1. Endpoint rejects empty strings for `api_key` and `base_url` fields
2. Returns HTTP 400 with error response format: `{ "error": { "code": "VALIDATION_ERROR", "message": "..." } }`
3. Unit test added covering empty string, null, and undefined cases
4. Existing tests still pass
5. Follow API standards from KB-002', 'easy', '7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'assigned'),
  ('5eb12d8a-22e0-4f7c-4d09-9a0800b6e3e3', 'FLOW-INTERN-002: Add Request Logging Middleware for Connector Endpoints', 'Project: FlowEngine Connectors
Type: Enhancement
Priority: Low
Story Points: 2

Add structured request logging to all connector-related endpoints. Each incoming request should log: HTTP method, path, request ID, timestamp, and response status code. Use the existing Winston logger instance.

Files to Modify:
- `src/middleware/request-logger.ts` (new file)
- `src/routes/index.ts` (apply middleware)
- `tests/middleware/request-logger.test.ts` (new test file)

Helpful Resources:
- Existing middleware patterns: `src/middleware/auth.ts`
- Winston logger setup: `src/utils/logger.ts`

---', 'novabyte/connector-runtime', '1. Middleware logs incoming requests with method, path, request ID, and timestamp
2. Middleware logs response status code and response time (in ms)
3. Logs are structured JSON format
4. PII (authorization headers, request bodies) is NOT logged
5. Unit test verifies log output format
6. Middleware is applied to connector routes only', 'easy', '7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', 'assigned'),
  ('a9a43a73-99b1-0b52-7963-c32923308413', 'FLOW-JR-001: Add Input Validation to Create Workflow Endpoint', 'Project: FlowEngine Core
Type: Enhancement
Priority: Medium
Story Points: 3

The `POST /api/v1/workflows` endpoint needs stronger input validation. Currently, workflow names can contain special characters that cause issues in downstream systems. Add Pydantic validation to enforce naming rules.

Files to Modify:
- `app/schemas/workflow.py` (Pydantic model validation)
- `app/api/routes/workflows.py` (ensure schema is used)
- `tests/test_workflow_schemas.py` (new test file)
- `tests/test_workflow_routes.py` (additional test cases)

Helpful Resources:
- Pydantic documentation: https://docs.pydantic.dev
- Existing schemas: `app/schemas/`
- Testing patterns: `tests/test_workflow_service.py`

---', 'novabyte/workflow-core', '1. Workflow name must be 3-100 characters long
2. Workflow name must match pattern: `^[a-zA-Z0-9][a-zA-Z0-9_-\s]*$` (alphanumeric start, allows underscores, hyphens, spaces)
3. Workflow description is optional but must be under 500 characters if provided
4. Returns HTTP 422 with Pydantic validation error details
5. Unit tests cover: valid names, too short, too long, special characters, boundary cases
6. Minimum 80% test coverage on modified files', 'medium', 'f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'assigned'),
  ('58667bae-6e2a-4ee2-fa32-289e8cdbd9c9', 'FLOW-JR-002: Add Health Check Endpoint with Dependency Status', 'Project: FlowEngine Core
Type: Enhancement
Priority: Medium
Story Points: 3

Enhance the existing `/health` endpoint to include detailed dependency checks. The endpoint should verify connectivity to PostgreSQL, Redis, and Kafka, and return individual status for each.

Files to Modify:
- `app/api/routes/health.py` (enhance endpoint)
- `app/services/health_check.py` (new service file)
- `tests/test_health.py` (test cases)

---', 'novabyte/workflow-core', '1. GET `/health` returns overall status and individual dependency statuses
2. Response format:
   ```json
   {
     "status": "healthy",
     "timestamp": "2025-01-15T10:30:00Z",
     "dependencies": {
       "postgresql": { "status": "healthy", "latency_ms": 5 },
       "redis": { "status": "healthy", "latency_ms": 2 },
       "kafka": { "status": "healthy", "latency_ms": 12 }
     }
   }
   ```
3. Overall status is "unhealthy" if any dependency is down
4. Each dependency check has a 5-second timeout
5. Unit tests with mocked dependencies (healthy and unhealthy scenarios)', 'medium', 'f7c521e3-441f-9f66-e56f-a6cf6741a77f', 'assigned'),
  ('bce0c68d-8de9-a270-1085-761f001d5bdd', 'FLOW-FE-001: Enhance Workflow Status Badge Component', 'Project: FlowEngine Web
Type: Enhancement
Priority: Low
Story Points: 2

The current workflow status badge only supports 3 states (Active, Inactive, Draft). We need to add support for "Running", "Failed", and "Archived" states with appropriate colors and icons.

Files to Modify:
- `src/components/workflow/StatusBadge.tsx`
- `src/components/workflow/StatusBadge.test.tsx`
- `src/components/workflow/StatusBadge.stories.tsx`
- `src/types/workflow.ts` (add new status types)

Helpful Resources:
- Design system: Storybook at `pnpm storybook`
- Tailwind CSS animation classes: `animate-pulse`
- Existing badge: `src/components/common/Badge.tsx`

---', 'novabyte/flowengine-web', '1. StatusBadge component supports all 6 states: Active, Inactive, Draft, Running, Failed, Archived
2. Color mapping:
   - Active: Green
   - Inactive: Gray
   - Draft: Yellow
   - Running: Blue (with pulse animation)
   - Failed: Red
   - Archived: Gray with strikethrough text
3. Uses @novabyte/ui-kit Badge component as base
4. Storybook story added showing all 6 states
5. React Testing Library tests for each state
6. TypeScript types updated', 'easy', '4d611550-374e-711c-475b-7d8e6f8b8952', 'assigned'),
  ('61c7aca3-2adb-1b1b-231c-e4a8b6e8530e', 'FLOW-FE-002: Build Empty State Component for Workflow List', 'Project: FlowEngine Web
Type: Enhancement
Priority: Low
Story Points: 2

When a user has no workflows, the workflow list page shows a blank area. Create a reusable EmptyState component that displays an illustration, a title, a description, and an optional CTA button.

Files to Modify:
- `src/components/common/EmptyState.tsx` (new component)
- `src/components/common/EmptyState.test.tsx` (new test file)
- `src/components/common/EmptyState.stories.tsx` (new story)
- `src/pages/WorkflowList.tsx` (integrate EmptyState)

---', 'novabyte/flowengine-web', '1. EmptyState component is reusable with customizable props: `icon`, `title`, `description`, `actionLabel`, `onAction`
2. Centered layout with appropriate spacing
3. Uses Tailwind CSS for styling (no custom CSS)
4. Uses Lucide React icons
5. Storybook story with multiple variants (with action, without action, different icons)
6. React Testing Library tests
7. Used in WorkflowList page when workflows array is empty', 'easy', '4d611550-374e-711c-475b-7d8e6f8b8952', 'assigned'),
  ('c8b25fa7-ef1f-2f57-c83e-dd807f5cde50', 'FLOW-FS-001: Add Input Sanitization to Connector Name Field', 'Project: FlowEngine Connectors
Type: Security Enhancement
Priority: Medium
Story Points: 2

The connector name field in `POST /api/v1/connectors` doesn''t sanitize HTML/script content. Add server-side sanitization to prevent stored XSS.

Files to Modify:
- `src/routes/connectors.ts`
- `src/utils/sanitizer.ts` (new utility)
- `tests/utils/sanitizer.test.ts` (new test file)

---', 'novabyte/connector-runtime', '1. Connector name field is sanitized (HTML tags stripped)
2. Connector description field is sanitized
3. Use `sanitize-html` library with strict text-only config
4. Unit tests verify: script tags stripped, HTML entities handled, clean strings unchanged
5. Returns sanitized value in response (not rejection)', 'easy', '03dc773e-1815-9b9b-db7e-939a2c2a0580', 'assigned'),
  ('e3b9d083-f2aa-ecb3-6811-66f357f0a137', 'FLOW-FS-002: Build Status Badge Component (Frontend)', 'Build Status Badge Component (Frontend)', '', '', 'easy', '03dc773e-1815-9b9b-db7e-939a2c2a0580', 'assigned'),
  ('d58c82d4-815d-21cb-c96d-98ae3ba2b1f5', 'FLOW-SR-001: Implement Circuit Breaker for External Connector Calls', 'Project: FlowEngine Connectors
Type: Enhancement
Priority: High
Story Points: 5

External connector calls (Salesforce, Slack, Jira APIs) currently don''t have circuit breaker protection. When a third-party API goes down, our system retries aggressively, causing cascading failures. Implement a circuit breaker pattern using `opossum` library.

Files to Modify:
- `src/services/circuit-breaker.ts` (new service)
- `src/services/connector-executor.ts` (integrate circuit breaker)
- `src/events/circuit-events.ts` (Kafka event producer)
- `tests/services/circuit-breaker.test.ts`
- `tests/integration/circuit-breaker.integration.test.ts`
- `README.md`

---', 'novabyte/connector-runtime', '1. Circuit breaker wraps all external connector HTTP calls
2. Configuration per connector type:
   - Failure threshold: 5 failures in 30 seconds
   - Reset timeout: 60 seconds
   - Half-open: Allow 1 test request
3. Circuit state changes emit Kafka events to `connector.circuit.events` topic
4. Metrics exposed via existing Datadog integration
5. Fallback behavior: Return cached response if available, otherwise return 503
6. Integration tests with simulated failures
7. Documentation updated in connector-runtime README', 'hard', 'f72e55dc-7359-49eb-5479-5a376e590751', 'assigned'),
  ('36588da4-6bb7-0973-205e-9e30c330f4b5', 'FLOW-INFRA-001: Add Pod Disruption Budgets to All Production Services', 'Project: Infrastructure
Type: Reliability Enhancement
Priority: High
Story Points: 3

Our Kubernetes services don''t have Pod Disruption Budgets (PDBs), which means node drains during maintenance can cause brief outages. Add PDBs to all production services to ensure minimum availability during planned disruptions.

Files to Modify:
- `helm-charts/*/templates/pdb.yaml` (new template per service)
- `helm-charts/*/values.yaml` (PDB configuration values)
- `helm-charts/*/values-dev.yaml`
- `helm-charts/*/values-staging.yaml`
- `helm-charts/*/values-prod.yaml`
- `docs/runbooks/node-maintenance.md` (update procedure)

---

*Document ID: KB-010*
*Last Updated: January 2025*
*Owner: Engineering Managers*', 'novabyte/infrastructure', '1. PDB created for each production service with appropriate `minAvailable`:
   - gateway-service: minAvailable 2
   - auth-service: minAvailable 2
   - workflow-core: minAvailable 2
   - workflow-executor: minAvailable 3
   - connector-runtime: minAvailable 2
   - notification-service: minAvailable 1
2. PDBs defined in Helm chart templates
3. Applied to dev, staging, and prod environments
4. Terraform/Helm plan reviewed by Platform Lead
5. Tested by simulating node drain on dev cluster
6. Documentation updated', 'medium', 'e3f35ac1-75a1-8518-5309-03ab2278fb6e', 'assigned')
;

-- SAMPLE USERS
INSERT INTO users (id, email, name, password_hash, role, experience_level, tech_stack, team, persona_id, created_at)
VALUES
  ('1c3ea09e-e46d-2d6b-c164-80bfe21eb028', 'riya.sharma@novabyte.dev', 'Riya Sharma', '$2a$10$J8op36C7toLHjxha5qix6.sH.g9/c0Tvy8GxegLHaPrcZlHkwe5au', 'developer', 'intern', '["Node.js","JavaScript","TypeScript"]'::jsonb, 'Backend Squad Beta', '7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170', NOW() - INTERVAL '2 hours'),
  ('ee38b022-3c29-26b0-c2c8-51e7b53e4544', 'vikram.desai@novabyte.dev', 'Vikram Desai', '$2a$10$J8op36C7toLHjxha5qix6.sH.g9/c0Tvy8GxegLHaPrcZlHkwe5au', 'developer', 'junior', '["Python","FastAPI","PostgreSQL","Docker"]'::jsonb, 'Backend Squad Alpha', 'f7c521e3-441f-9f66-e56f-a6cf6741a77f', NOW() - INTERVAL '4 hours'),
  ('ef0eaaa6-cee3-49f9-b8f6-2e99fcf89ce5', 'ananya.iyer@novabyte.dev', 'Ananya Iyer', '$2a$10$J8op36C7toLHjxha5qix6.sH.g9/c0Tvy8GxegLHaPrcZlHkwe5au', 'developer', 'junior', '["React","JavaScript","CSS","TypeScript"]'::jsonb, 'Frontend Team', '4d611550-374e-711c-475b-7d8e6f8b8952', NOW() - INTERVAL '6 hours'),
  ('38917ce5-18e6-5602-fdc3-e357951ea3d3', 'karan.patel@novabyte.dev', 'Karan Patel', '$2a$10$J8op36C7toLHjxha5qix6.sH.g9/c0Tvy8GxegLHaPrcZlHkwe5au', 'developer', 'senior', '["Node.js","TypeScript","PostgreSQL","Redis","Kafka","Docker","Kubernetes"]'::jsonb, 'Backend Squad Beta', 'f72e55dc-7359-49eb-5479-5a376e590751', NOW() - INTERVAL '8 hours'),
  ('4ef042fe-1ad8-b2ea-23fb-01a090d22686', 'meera.joshi@novabyte.dev', 'Meera Joshi', '$2a$10$J8op36C7toLHjxha5qix6.sH.g9/c0Tvy8GxegLHaPrcZlHkwe5au', 'developer', 'senior', '["AWS","Terraform","Kubernetes","Helm","GitHub Actions","ArgoCD","Prometheus","Grafana"]'::jsonb, 'Platform Team', 'e3f35ac1-75a1-8518-5309-03ab2278fb6e', NOW() - INTERVAL '10 hours'),
  ('3982e9ce-9a9c-01c7-ac71-3a2052ed1ccd', 'arjun.nair@novabyte.dev', 'Arjun Nair', '$2a$10$J8op36C7toLHjxha5qix6.sH.g9/c0Tvy8GxegLHaPrcZlHkwe5au', 'developer', 'junior', '["Node.js","React","JavaScript","MongoDB","TypeScript"]'::jsonb, 'Backend Squad Beta + Frontend Team (rotational)', '03dc773e-1815-9b9b-db7e-939a2c2a0580', NOW() - INTERVAL '12 hours'),
  ('7ec0f38b-191f-ba12-20a1-67f41db51f3e', 'manager@novabyte.dev', 'Tanvi Shah', '$2a$10$J8op36C7toLHjxha5qix6.sH.g9/c0Tvy8GxegLHaPrcZlHkwe5au', 'manager', 'senior', '["Leadership","Developer Experience","Process"]'::jsonb, 'Developer Experience', NULL, NOW() - INTERVAL '12 hours')
;

-- TASK INSTANCES
INSERT INTO task_instances (id, user_id, task_id, status, order_index)
SELECT gen_random_uuid(), '1c3ea09e-e46d-2d6b-c164-80bfe21eb028', pt.task_id, 'not_started', pt.order_index
FROM persona_tasks pt
WHERE pt.persona_id = '7fe4e1ef-5e54-3e3c-2c18-9682cb9e6170';
INSERT INTO task_instances (id, user_id, task_id, status, order_index)
SELECT gen_random_uuid(), 'ee38b022-3c29-26b0-c2c8-51e7b53e4544', pt.task_id, 'not_started', pt.order_index
FROM persona_tasks pt
WHERE pt.persona_id = 'f7c521e3-441f-9f66-e56f-a6cf6741a77f';
INSERT INTO task_instances (id, user_id, task_id, status, order_index)
SELECT gen_random_uuid(), 'ef0eaaa6-cee3-49f9-b8f6-2e99fcf89ce5', pt.task_id, 'not_started', pt.order_index
FROM persona_tasks pt
WHERE pt.persona_id = '4d611550-374e-711c-475b-7d8e6f8b8952';
INSERT INTO task_instances (id, user_id, task_id, status, order_index)
SELECT gen_random_uuid(), '38917ce5-18e6-5602-fdc3-e357951ea3d3', pt.task_id, 'not_started', pt.order_index
FROM persona_tasks pt
WHERE pt.persona_id = 'f72e55dc-7359-49eb-5479-5a376e590751';
INSERT INTO task_instances (id, user_id, task_id, status, order_index)
SELECT gen_random_uuid(), '4ef042fe-1ad8-b2ea-23fb-01a090d22686', pt.task_id, 'not_started', pt.order_index
FROM persona_tasks pt
WHERE pt.persona_id = 'e3f35ac1-75a1-8518-5309-03ab2278fb6e';
INSERT INTO task_instances (id, user_id, task_id, status, order_index)
SELECT gen_random_uuid(), '3982e9ce-9a9c-01c7-ac71-3a2052ed1ccd', pt.task_id, 'not_started', pt.order_index
FROM persona_tasks pt
WHERE pt.persona_id = '03dc773e-1815-9b9b-db7e-939a2c2a0580';

-- DEMO PROGRESS STATES
UPDATE task_instances
SET status = 'completed',
    started_at = NOW() - INTERVAL '6 hours',
    completed_at = NOW() - INTERVAL '5 hours',
    evidence = 'Seeded demo completion',
    verification_result = TRUE,
    attempt_count = 1
WHERE user_id = '1c3ea09e-e46d-2d6b-c164-80bfe21eb028'
  AND order_index BETWEEN 1 AND 4;
UPDATE task_instances
SET status = 'in_progress',
    started_at = NOW() - INTERVAL '20 minutes'
WHERE user_id = '1c3ea09e-e46d-2d6b-c164-80bfe21eb028'
  AND order_index BETWEEN 5 AND 5;
UPDATE task_instances
SET status = 'completed',
    started_at = NOW() - INTERVAL '6 hours',
    completed_at = NOW() - INTERVAL '5 hours',
    evidence = 'Seeded demo completion',
    verification_result = TRUE,
    attempt_count = 1
WHERE user_id = 'ee38b022-3c29-26b0-c2c8-51e7b53e4544'
  AND order_index BETWEEN 1 AND 6;
UPDATE task_instances
SET status = 'in_progress',
    started_at = NOW() - INTERVAL '20 minutes'
WHERE user_id = 'ee38b022-3c29-26b0-c2c8-51e7b53e4544'
  AND order_index BETWEEN 7 AND 7;
UPDATE task_instances
SET status = 'completed',
    started_at = NOW() - INTERVAL '6 hours',
    completed_at = NOW() - INTERVAL '5 hours',
    evidence = 'Seeded demo completion',
    verification_result = TRUE,
    attempt_count = 1
WHERE user_id = 'ef0eaaa6-cee3-49f9-b8f6-2e99fcf89ce5'
  AND order_index BETWEEN 1 AND 5;
UPDATE task_instances
SET status = 'in_progress',
    started_at = NOW() - INTERVAL '20 minutes'
WHERE user_id = 'ef0eaaa6-cee3-49f9-b8f6-2e99fcf89ce5'
  AND order_index BETWEEN 6 AND 6;
UPDATE task_instances
SET status = 'completed',
    started_at = NOW() - INTERVAL '6 hours',
    completed_at = NOW() - INTERVAL '5 hours',
    evidence = 'Seeded demo completion',
    verification_result = TRUE,
    attempt_count = 1
WHERE user_id = '38917ce5-18e6-5602-fdc3-e357951ea3d3'
  AND order_index BETWEEN 1 AND 8;
UPDATE task_instances
SET status = 'in_progress',
    started_at = NOW() - INTERVAL '20 minutes'
WHERE user_id = '38917ce5-18e6-5602-fdc3-e357951ea3d3'
  AND order_index BETWEEN 9 AND 9;
UPDATE task_instances
SET status = 'completed',
    started_at = NOW() - INTERVAL '6 hours',
    completed_at = NOW() - INTERVAL '5 hours',
    evidence = 'Seeded demo completion',
    verification_result = TRUE,
    attempt_count = 1
WHERE user_id = '4ef042fe-1ad8-b2ea-23fb-01a090d22686'
  AND order_index BETWEEN 1 AND 7;
UPDATE task_instances
SET status = 'in_progress',
    started_at = NOW() - INTERVAL '20 minutes'
WHERE user_id = '4ef042fe-1ad8-b2ea-23fb-01a090d22686'
  AND order_index BETWEEN 8 AND 8;
UPDATE task_instances
SET status = 'completed',
    started_at = NOW() - INTERVAL '6 hours',
    completed_at = NOW() - INTERVAL '5 hours',
    evidence = 'Seeded demo completion',
    verification_result = TRUE,
    attempt_count = 1
WHERE user_id = '3982e9ce-9a9c-01c7-ac71-3a2052ed1ccd'
  AND order_index BETWEEN 1 AND 5;
UPDATE task_instances
SET status = 'in_progress',
    started_at = NOW() - INTERVAL '20 minutes'
WHERE user_id = '3982e9ce-9a9c-01c7-ac71-3a2052ed1ccd'
  AND order_index BETWEEN 6 AND 6;

-- RISK SNAPSHOTS
INSERT INTO risk_scores (user_id, score, factors, flag_for_manager, updated_at)
VALUES
  ('1c3ea09e-e46d-2d6b-c164-80bfe21eb028', 0.12, '{"stuck_tasks":{"count":0,"signal_score":0},"verification_failures":{"max_attempts":1,"high_fail_tasks":0,"signal_score":0},"inactive_24h":{"recent_events":1,"signal_score":0},"low_completion":{"completion_pct":20,"hours_since_start":12,"signal_score":0},"no_chat_activity":{"total_messages":0,"signal_score":1}}'::jsonb, FALSE, NOW()),
  ('ee38b022-3c29-26b0-c2c8-51e7b53e4544', 0.12, '{"stuck_tasks":{"count":0,"signal_score":0},"verification_failures":{"max_attempts":1,"high_fail_tasks":0,"signal_score":0},"inactive_24h":{"recent_events":1,"signal_score":0},"low_completion":{"completion_pct":20,"hours_since_start":12,"signal_score":0},"no_chat_activity":{"total_messages":0,"signal_score":1}}'::jsonb, FALSE, NOW()),
  ('ef0eaaa6-cee3-49f9-b8f6-2e99fcf89ce5', 0.12, '{"stuck_tasks":{"count":0,"signal_score":0},"verification_failures":{"max_attempts":1,"high_fail_tasks":0,"signal_score":0},"inactive_24h":{"recent_events":1,"signal_score":0},"low_completion":{"completion_pct":20,"hours_since_start":12,"signal_score":0},"no_chat_activity":{"total_messages":0,"signal_score":1}}'::jsonb, FALSE, NOW()),
  ('38917ce5-18e6-5602-fdc3-e357951ea3d3', 0.12, '{"stuck_tasks":{"count":0,"signal_score":0},"verification_failures":{"max_attempts":1,"high_fail_tasks":0,"signal_score":0},"inactive_24h":{"recent_events":1,"signal_score":0},"low_completion":{"completion_pct":20,"hours_since_start":12,"signal_score":0},"no_chat_activity":{"total_messages":0,"signal_score":1}}'::jsonb, FALSE, NOW()),
  ('4ef042fe-1ad8-b2ea-23fb-01a090d22686', 0.12, '{"stuck_tasks":{"count":0,"signal_score":0},"verification_failures":{"max_attempts":1,"high_fail_tasks":0,"signal_score":0},"inactive_24h":{"recent_events":1,"signal_score":0},"low_completion":{"completion_pct":20,"hours_since_start":12,"signal_score":0},"no_chat_activity":{"total_messages":0,"signal_score":1}}'::jsonb, FALSE, NOW()),
  ('3982e9ce-9a9c-01c7-ac71-3a2052ed1ccd', 0.12, '{"stuck_tasks":{"count":0,"signal_score":0},"verification_failures":{"max_attempts":1,"high_fail_tasks":0,"signal_score":0},"inactive_24h":{"recent_events":1,"signal_score":0},"low_completion":{"completion_pct":20,"hours_since_start":12,"signal_score":0},"no_chat_activity":{"total_messages":0,"signal_score":1}}'::jsonb, FALSE, NOW())
;

-- ONBOARDING START EVENTS
INSERT INTO progress_logs (user_id, event_type, metadata, timestamp)
VALUES (
  '1c3ea09e-e46d-2d6b-c164-80bfe21eb028',
  'onboarding_started',
  '{"persona":"Backend Intern (Node.js)","total_tasks":48}'::jsonb,
  NOW() - INTERVAL '2 hours'
);
INSERT INTO progress_logs (user_id, event_type, metadata, timestamp)
VALUES (
  'ee38b022-3c29-26b0-c2c8-51e7b53e4544',
  'onboarding_started',
  '{"persona":"Junior Backend Engineer (Python)","total_tasks":50}'::jsonb,
  NOW() - INTERVAL '2 hours'
);
INSERT INTO progress_logs (user_id, event_type, metadata, timestamp)
VALUES (
  'ef0eaaa6-cee3-49f9-b8f6-2e99fcf89ce5',
  'onboarding_started',
  '{"persona":"Junior Frontend Engineer (React)","total_tasks":49}'::jsonb,
  NOW() - INTERVAL '2 hours'
);
INSERT INTO progress_logs (user_id, event_type, metadata, timestamp)
VALUES (
  '38917ce5-18e6-5602-fdc3-e357951ea3d3',
  'onboarding_started',
  '{"persona":"Senior Backend Engineer (Node.js)","total_tasks":48}'::jsonb,
  NOW() - INTERVAL '2 hours'
);
INSERT INTO progress_logs (user_id, event_type, metadata, timestamp)
VALUES (
  '4ef042fe-1ad8-b2ea-23fb-01a090d22686',
  'onboarding_started',
  '{"persona":"Senior DevOps Engineer","total_tasks":51}'::jsonb,
  NOW() - INTERVAL '2 hours'
);
INSERT INTO progress_logs (user_id, event_type, metadata, timestamp)
VALUES (
  '3982e9ce-9a9c-01c7-ac71-3a2052ed1ccd',
  'onboarding_started',
  '{"persona":"Junior Full-Stack Engineer (Node.js + React)","total_tasks":49}'::jsonb,
  NOW() - INTERVAL '2 hours'
);

COMMIT;
