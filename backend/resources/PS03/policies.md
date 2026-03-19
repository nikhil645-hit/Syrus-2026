# NovaByte Technologies — Company Policies

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
- After-hours messages: Use Slack's "Schedule Send" feature.

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
| Sick Leave | 12 days | No doctor's note needed for ≤3 days |
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
