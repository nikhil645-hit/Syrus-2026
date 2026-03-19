# NovaByte Technologies — Onboarding Checklists

---

## Common Checklist (All Roles & Levels)

These items apply to every new hire regardless of role or experience level.

| # | Task | Category | Owner | Deadline |
|---|---|---|---|---|
| C-01 | Receive and set up company laptop | IT Setup | IT Team | Day 1 |
| C-02 | Activate NovaByte Google Workspace account (email, calendar, drive) | Account Setup | IT Team | Day 1 |
| C-03 | Set up Slack and join mandatory channels (#engineering-general, #new-joiners, #team-{squad}) | Communication | Employee | Day 1 |
| C-04 | Set up 1Password (company password manager) | Security | Employee | Day 1 |
| C-05 | Enable MFA on Google Workspace | Security | Employee | Day 1 |
| C-06 | Enable MFA on GitHub | Security | Employee | Day 1 |
| C-07 | Accept GitHub organization invite (novabyte org) | Access | Employee | Day 1 |
| C-08 | Accept Jira workspace invite | Access | Employee | Day 1 |
| C-09 | Join Notion workspace and bookmark Engineering space | Knowledge | Employee | Day 1 |
| C-10 | Install and configure VPN (WireGuard) | Network | Employee | Day 1 |
| C-11 | Read Company Overview document (KB-001) | Knowledge | Employee | Day 2 |
| C-12 | Read Engineering Standards document (KB-002) | Knowledge | Employee | Day 2 |
| C-13 | Read Company Policies document (KB-005) | Knowledge | Employee | Day 3 |
| C-14 | Complete Security Awareness training (LMS) | Compliance | Employee | Week 1 |
| C-15 | Complete Data Privacy & GDPR training (LMS) | Compliance | Employee | Week 1 |
| C-16 | Complete Code of Conduct training (LMS) | Compliance | Employee | Week 1 |
| C-17 | Complete Anti-Harassment training (LMS) | Compliance | Employee | Week 2 |
| C-18 | Complete Insider Threat Awareness training (LMS) | Compliance | Employee | Week 2 |
| C-19 | Sign Employee Handbook Acknowledgment (DocuSign) | Compliance | Employee | Week 1 |
| C-20 | Sign NDA (DocuSign) | Compliance | Employee | Week 1 |
| C-21 | Sign Acceptable Use Policy (DocuSign) | Compliance | Employee | Week 1 |
| C-22 | Sign IP Assignment Agreement (DocuSign) | Compliance | Employee | Week 1 |
| C-23 | Attend welcome call with HR | Onboarding | HR | Day 1 |
| C-24 | Meet your manager (1:1 intro call) | Onboarding | Manager | Day 1 |
| C-25 | Meet your mentor/buddy (intro call) | Onboarding | Mentor | Day 1-2 |
| C-26 | Attend team standup | Onboarding | Employee | Day 2 |
| C-27 | Set up BambooHR profile (personal details, emergency contacts) | HR | Employee | Week 1 |
| C-28 | Set up Expensify account | Finance | Employee | Week 1 |

---

## Backend Intern Checklist (Node.js)

In addition to Common Checklist:

| # | Task | Category | Deadline |
|---|---|---|---|
| BI-01 | Install Node.js 20 via nvm | Environment Setup | Day 1 |
| BI-02 | Install pnpm and global tools (TypeScript, nodemon) | Environment Setup | Day 1 |
| BI-03 | Install Docker Desktop | Environment Setup | Day 1 |
| BI-04 | Install VS Code with mandatory extensions | Environment Setup | Day 1 |
| BI-05 | Clone assigned repository (connector-runtime) | Environment Setup | Day 2 |
| BI-06 | Set up local environment (.env configuration) | Environment Setup | Day 2 |
| BI-07 | Run Docker Compose for local dependencies | Environment Setup | Day 2 |
| BI-08 | Run database migrations and seed data | Environment Setup | Day 2 |
| BI-09 | Successfully start the service locally | Environment Setup | Day 2 |
| BI-10 | Run unit tests and verify all pass | Verification | Day 2 |
| BI-11 | Read Architecture Documentation — Backend section (KB-003) | Knowledge | Day 3 |
| BI-12 | Read API Standards section of Engineering Standards (KB-002) | Knowledge | Day 3 |
| BI-13 | Read Git & Branching Strategy section (KB-002) | Knowledge | Day 3 |
| BI-14 | Read PR Guidelines section (KB-002) | Knowledge | Day 3 |
| BI-15 | Complete Git workflow practice (create branch, make commit, open PR) | Skill Building | Day 4 |
| BI-16 | Attend codebase walkthrough with mentor | Knowledge | Week 1 |
| BI-17 | Attend pair programming session with mentor | Skill Building | Week 1 |
| BI-18 | Pick up starter ticket (FLOW-INTERN-001: Fix validation bug) | First Task | Week 2 |
| BI-19 | Submit PR for starter ticket | First Task | Week 2 |
| BI-20 | Get PR approved and merged | First Task | Week 2 |

---

## Junior Backend Checklist (Python)

In addition to Common Checklist:

| # | Task | Category | Deadline |
|---|---|---|---|
| JBP-01 | Install Python 3.11 via pyenv | Environment Setup | Day 1 |
| JBP-02 | Install Poetry (package manager) | Environment Setup | Day 1 |
| JBP-03 | Install Docker Desktop | Environment Setup | Day 1 |
| JBP-04 | Install VS Code with Python, Pylance, and mandatory extensions | Environment Setup | Day 1 |
| JBP-05 | Clone assigned repository (workflow-core) | Environment Setup | Day 2 |
| JBP-06 | Run `poetry install` and activate virtual environment | Environment Setup | Day 2 |
| JBP-07 | Set up local environment (.env configuration) | Environment Setup | Day 2 |
| JBP-08 | Run Docker Compose for local dependencies (PostgreSQL, Redis, Kafka) | Environment Setup | Day 2 |
| JBP-09 | Run Alembic database migrations | Environment Setup | Day 2 |
| JBP-10 | Seed test data using `python scripts/seed_data.py` | Environment Setup | Day 2 |
| JBP-11 | Start the service locally with uvicorn and verify Swagger UI loads | Verification | Day 2 |
| JBP-12 | Run full pytest suite and verify all tests pass | Verification | Day 2 |
| JBP-13 | Read Architecture Documentation — Backend & Data sections (KB-003) | Knowledge | Day 3 |
| JBP-14 | Read API Standards and Testing Standards (KB-002) | Knowledge | Day 3 |
| JBP-15 | Read Git & Branching Strategy and PR Guidelines (KB-002) | Knowledge | Day 3 |
| JBP-16 | Review database schema walkthrough with mentor | Knowledge | Day 4 |
| JBP-17 | Attend codebase walkthrough with mentor (workflow-core deep dive) | Knowledge | Week 1 |
| JBP-18 | Review CI/CD pipeline (GitHub Actions workflow files) | Knowledge | Week 1 |
| JBP-19 | Pick up starter ticket (FLOW-JR-001: Add validation to workflow endpoint) | First Task | Week 2 |
| JBP-20 | Write unit tests for starter ticket (minimum 80% coverage) | First Task | Week 2 |
| JBP-21 | Submit PR for starter ticket with proper description | First Task | Week 2 |
| JBP-22 | Address code review feedback and get PR merged | First Task | Week 2 |

---

## Junior Frontend Checklist (React)

In addition to Common Checklist:

| # | Task | Category | Deadline |
|---|---|---|---|
| JFR-01 | Install Node.js 20 via nvm | Environment Setup | Day 1 |
| JFR-02 | Install pnpm | Environment Setup | Day 1 |
| JFR-03 | Install VS Code with Tailwind CSS IntelliSense, ESLint, Prettier extensions | Environment Setup | Day 1 |
| JFR-04 | Clone flowengine-web repository | Environment Setup | Day 2 |
| JFR-05 | Run `pnpm install` and set up `.env.local` | Environment Setup | Day 2 |
| JFR-06 | Start development server (`pnpm dev`) and verify it loads | Verification | Day 2 |
| JFR-07 | Run test suite (`pnpm test`) and verify all pass | Verification | Day 2 |
| JFR-08 | Start Storybook (`pnpm storybook`) and browse existing components | Exploration | Day 2 |
| JFR-09 | Read Architecture Documentation — Frontend section (KB-003) | Knowledge | Day 3 |
| JFR-10 | Read project structure guide in setup docs (KB-004) | Knowledge | Day 3 |
| JFR-11 | Read Engineering Standards — Code Style (TS/React sections) (KB-002) | Knowledge | Day 3 |
| JFR-12 | Read PR Guidelines and Code Review expectations (KB-002) | Knowledge | Day 3 |
| JFR-13 | Explore @novabyte/ui-kit design system components in Storybook | Knowledge | Day 4 |
| JFR-14 | Review Zustand store patterns used in codebase | Knowledge | Day 4 |
| JFR-15 | Review React Query usage patterns in services/ directory | Knowledge | Day 4 |
| JFR-16 | Attend codebase walkthrough with mentor (flowengine-web deep dive) | Knowledge | Week 1 |
| JFR-17 | Attend design system walkthrough with Frontend Lead | Knowledge | Week 1 |
| JFR-18 | Pick up starter ticket (FLOW-FE-001: Enhance table component styling) | First Task | Week 2 |
| JFR-19 | Write component tests using React Testing Library | First Task | Week 2 |
| JFR-20 | Submit PR with screenshots for UI changes | First Task | Week 2 |
| JFR-21 | Address code review feedback and get PR merged | First Task | Week 2 |

---

## Senior Backend Checklist (Node.js)

In addition to Common Checklist:

| # | Task | Category | Deadline |
|---|---|---|---|
| SBN-01 | Self-serve environment setup (Node.js, pnpm, Docker, VS Code) | Environment Setup | Day 1 |
| SBN-02 | Clone all Backend Squad Beta repositories (connector-runtime, notification-service) | Environment Setup | Day 1 |
| SBN-03 | Set up and run all services locally | Environment Setup | Day 1 |
| SBN-04 | Read full Architecture Documentation (KB-003) — all sections | Knowledge | Day 2 |
| SBN-05 | Read Engineering Standards (KB-002) — all sections | Knowledge | Day 2 |
| SBN-06 | Deep dive into connector-runtime plugin architecture with buddy | Knowledge | Day 3 |
| SBN-07 | Review notification-service Kafka consumer patterns | Knowledge | Day 3 |
| SBN-08 | Review service SLAs, error budgets, and Datadog dashboards | Operations | Day 4 |
| SBN-09 | Review on-call runbooks and incident response playbooks | Operations | Day 4 |
| SBN-10 | Attend on-call and incident response training session | Operations | Week 1 |
| SBN-11 | Review active Jira epics and current sprint board | Planning | Week 1 |
| SBN-12 | Review product roadmap with Squad Lead | Planning | Week 1 |
| SBN-13 | Meet Product Manager (1:1 introduction) | Stakeholders | Week 1 |
| SBN-14 | Meet QA Lead (1:1 introduction) | Stakeholders | Week 1 |
| SBN-15 | Meet DevOps/Platform team contact (1:1 introduction) | Stakeholders | Week 1 |
| SBN-16 | Review deployment pipeline end-to-end (GitHub Actions → ArgoCD → Production) | Operations | Week 1 |
| SBN-17 | Shadow an on-call shift with current on-call engineer | Operations | Week 2 |
| SBN-18 | Pick up medium-complexity task from sprint backlog | First Task | Week 2 |
| SBN-19 | Submit PR, lead code review discussion | First Task | Week 2 |
| SBN-20 | Deploy change to staging and verify | First Task | Week 2 |

---

## Senior DevOps / Platform Checklist

In addition to Common Checklist:

| # | Task | Category | Deadline |
|---|---|---|---|
| SDO-01 | Request and receive AWS IAM credentials from Platform Lead | Access | Day 1 |
| SDO-02 | Configure AWS CLI with NovaByte profile | Environment Setup | Day 1 |
| SDO-03 | Install required tools: Terraform, kubectl, Helm, ArgoCD CLI, k9s | Environment Setup | Day 1 |
| SDO-04 | Set up VPN and verify connectivity to internal services | Network | Day 1 |
| SDO-05 | Connect to dev and staging EKS clusters via kubectl | Environment Setup | Day 1 |
| SDO-06 | Clone infrastructure repository | Environment Setup | Day 1 |
| SDO-07 | Read full Architecture Documentation (KB-003) — all sections, focus on Infrastructure | Knowledge | Day 2 |
| SDO-08 | Read Engineering Standards — Deployment Standards section (KB-002) | Knowledge | Day 2 |
| SDO-09 | Review Terraform module structure and conventions with buddy | Knowledge | Day 3 |
| SDO-10 | Review Helm chart structure for all services | Knowledge | Day 3 |
| SDO-11 | Walkthrough Kubernetes cluster layout (namespaces, deployments, services) | Knowledge | Day 3 |
| SDO-12 | Review CI/CD pipeline deep dive (GitHub Actions workflows + ArgoCD sync) | Knowledge | Day 4 |
| SDO-13 | Review Datadog dashboards, alerts, and SLOs | Operations | Day 4 |
| SDO-14 | Review PagerDuty integration and on-call rotation setup | Operations | Day 4 |
| SDO-15 | Review active infrastructure Jira tickets and tech debt backlog | Planning | Week 1 |
| SDO-16 | Meet all Squad Leads (1:1 introductions to understand their infra needs) | Stakeholders | Week 1 |
| SDO-17 | Meet Security team contact (1:1 introduction) | Stakeholders | Week 1 |
| SDO-18 | Review disaster recovery and backup procedures | Operations | Week 1 |
| SDO-19 | Review cost optimization dashboards (AWS Cost Explorer) | Operations | Week 1 |
| SDO-20 | Shadow on-call shift with current Platform on-call engineer | Operations | Week 2 |
| SDO-21 | Pick up infrastructure improvement task from backlog | First Task | Week 2 |
| SDO-22 | Submit Terraform PR, get reviewed by Platform Lead | First Task | Week 2 |
| SDO-23 | Apply change to dev environment and verify | First Task | Week 2 |

---

## Junior Full-Stack Checklist (Node.js + React)

In addition to Common Checklist:

| # | Task | Category | Deadline |
|---|---|---|---|
| JFS-01 | Install Node.js 20 via nvm | Environment Setup | Day 1 |
| JFS-02 | Install pnpm and global tools (TypeScript, nodemon) | Environment Setup | Day 1 |
| JFS-03 | Install Docker Desktop | Environment Setup | Day 1 |
| JFS-04 | Install VS Code with all mandatory + frontend-specific extensions | Environment Setup | Day 1 |
| JFS-05 | Clone connector-runtime (backend) and flowengine-web (frontend) repositories | Environment Setup | Day 2 |
| JFS-06 | Set up backend local environment (.env, Docker Compose, migrations) | Environment Setup | Day 2 |
| JFS-07 | Verify backend service starts and tests pass | Verification | Day 2 |
| JFS-08 | Set up frontend local environment (.env.local) | Environment Setup | Day 2 |
| JFS-09 | Verify frontend dev server starts and connects to local backend | Verification | Day 2 |
| JFS-10 | Start Storybook and browse design system components | Exploration | Day 3 |
| JFS-11 | Read Architecture Documentation — Backend + Frontend sections (KB-003) | Knowledge | Day 3 |
| JFS-12 | Read Engineering Standards — JS/TS conventions, API Standards, PR Guidelines (KB-002) | Knowledge | Day 3 |
| JFS-13 | PostgreSQL basics session with mentor (for MongoDB-to-PostgreSQL transition) | Skill Building | Day 4 |
| JFS-14 | Zustand and React Query overview session with Frontend Lead | Skill Building | Day 4 |
| JFS-15 | Attend backend codebase walkthrough with mentor | Knowledge | Week 1 |
| JFS-16 | Attend frontend codebase walkthrough with Frontend Lead | Knowledge | Week 1 |
| JFS-17 | Pick up backend starter ticket (FLOW-FS-001: Add input sanitization to connector endpoint) | First Task | Week 2 |
| JFS-18 | Submit backend PR with tests | First Task | Week 2 |
| JFS-19 | Pick up frontend starter ticket (FLOW-FS-002: Build status badge component) | First Task | Week 2-3 |
| JFS-20 | Submit frontend PR with component tests and screenshots | First Task | Week 2-3 |
| JFS-21 | Address all code review feedback and get both PRs merged | First Task | Week 3 |

---

## Checklist Status Definitions

| Status | Meaning |
|---|---|
| **Not Started** | Task has not been initiated |
| **In Progress** | Task is actively being worked on |
| **Blocked** | Task cannot proceed due to a dependency or issue |
| **Completed** | Task is finished and verified |
| **Skipped** | Task is not applicable for this employee (with manager approval) |

## Onboarding Completion Criteria

An employee's onboarding is considered **Complete** when:
1. All Common Checklist items are marked Completed or Skipped (with approval).
2. All role-specific checklist items are marked Completed or Skipped (with approval).
3. First task PR has been merged.
4. All compliance training modules are completed.
5. All legal documents are signed.

Upon completion, the onboarding agent sends a structured HR notification email.

---

*Document ID: KB-007*
*Last Updated: January 2025*
*Owner: People Operations & Engineering Managers*
