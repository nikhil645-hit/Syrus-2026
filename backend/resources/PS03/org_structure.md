# NovaByte Technologies — Company Structure & Engineering Organization

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
| `#team-{your-squad}` | Your squad's main channel |
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
