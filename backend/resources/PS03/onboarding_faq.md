# NovaByte Technologies — Onboarding FAQ

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

### Q4: What if I can't complete all onboarding tasks in 2 weeks?
**A:** That's okay! Talk to your manager. Some tasks can be extended, especially if you're blocked on access or waiting for training sessions. The onboarding agent will track your progress and notify HR of any delays. The important thing is to communicate proactively.

### Q5: Is onboarding remote-friendly?
**A:** Yes, NovaByte is a remote-first company. All onboarding tasks can be completed remotely. Your laptop will be shipped to your address before your start date. All meetings are on Google Meet. The Bangalore office is available if you prefer in-person.

---

## Access & Accounts

### Q6: How do I get GitHub access?
**A:** You'll receive a GitHub organization invite to `novabyte` on your NovaByte email within your first day. Accept the invite and enable MFA (hardware key or authenticator app). If you haven't received the invite by end of Day 1, contact Tanvi Shah (DX Lead) at `tanvi.s@novabyte.dev` or Slack `@tanvi.shah`.

### Q7: How do I get Jira access?
**A:** A Jira workspace invite is sent to your NovaByte email on Day 1. Accept the invite to access the NovaByte Atlassian workspace. Your squad's board will be shared by your manager. If you need access to additional projects, request via your manager. For issues, contact Lakshmi Venkatesh (QA Lead) at Slack `@lakshmi.v`.

### Q8: How do I set up VPN?
**A:** You'll receive a WireGuard VPN configuration file via your NovaByte email on Day 1.
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
**A:** AWS IAM credentials are provisioned by the Platform Lead (Rohan Saxena). You'll receive an email with your access key and secret key. Configure AWS CLI with `aws configure --profile novabyte-dev`. MFA is mandatory for AWS Console access. For production access, additional approval from VP Engineering is required.

---

## Development Environment

### Q12: What IDE should I use?
**A:** We recommend **VS Code** with mandatory extensions: ESLint, Prettier, GitLens, Docker, Kubernetes, Thunder Client, Error Lens. See the full list in Setup Guides (KB-004). You may use other IDEs (IntelliJ, WebStorm) but must ensure linting and formatting configs are compatible.

### Q13: My Docker containers won't start. What should I do?
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
Note: You usually only need to run the service(s) you're working on. Mock other services or use the shared dev environment.

---

## Git & Code Review

### Q17: How do I create my first branch?
**A:**
```bash
# Make sure you're on latest develop
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
**A:** Reviewers are expected to respond within **4 business hours**. If you haven't received a review after 4 hours, send a polite reminder on Slack. If still no response after 8 hours, escalate to your squad lead.

---

## Company Processes

### Q21: What is "No Meeting Wednesday"?
**A:** Every Wednesday is designated as a "No Meeting" day at NovaByte. No internal meetings should be scheduled on Wednesdays to protect focused, uninterrupted work time. External meetings with customers are exceptions but should be minimized. Use Wednesdays for deep work, coding, learning, and documentation.

### Q22: How do sprint planning work?
**A:** Sprints are 2 weeks long. Sprint planning happens on Monday mornings with your squad and Product Manager. During planning, the team reviews the backlog, estimates stories (in story points), and commits to sprint scope. The squad lead facilitates. As a new hire, you'll observe the first sprint and participate in the second.

### Q23: When do I join the on-call rotation?
**A:** After **90 days** of employment. Before joining, you'll shadow on-call shifts, review runbooks, and attend incident response training. On-call rotations are typically 1 week every 6-8 weeks. You'll receive PagerDuty access and be briefed on escalation procedures.

### Q24: How do I report a security issue?
**A:** Post immediately in `#security-incidents` Slack channel. Do NOT try to fix it yourself. Include: what you found, where you found it, and any relevant logs or screenshots. The Security team (led by Farhan Ahmed) will triage and respond. For sensitive findings, DM Farhan directly.

### Q25: How do I submit expenses?
**A:** Use **Expensify** (set up during onboarding). Submit receipts within 30 days. For amounts over ₹5,000 / $60, you'll need manager approval. Categories: Travel, meals (client-related), training, software. Home office setup (₹25,000 / $300 one-time) is auto-approved.

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
**A:** We value your feedback! At the end of your onboarding, you'll receive an onboarding feedback survey. You can also share feedback anytime with:
- Your manager (1:1s)
- DX Team (Tanvi Shah) — for process improvements
- HR (Divya Menon) — for policy-related feedback
- The `#new-joiners` channel — for suggestions that help future joiners

---

*Document ID: KB-011*
*Last Updated: January 2025*
*Owner: Developer Experience Team & People Operations*
