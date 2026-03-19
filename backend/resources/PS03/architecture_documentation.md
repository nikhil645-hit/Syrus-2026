# NovaByte Technologies — System Architecture Documentation

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
