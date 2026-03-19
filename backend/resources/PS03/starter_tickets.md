# NovaByte Technologies — Starter Tickets for New Employees

These are pre-created Jira tickets designed as first tasks for new hires. They are scoped to be completable within 2-3 days, well-documented, and low-risk.

---

## Backend Intern Tickets (Node.js)

### FLOW-INTERN-001: Fix Input Validation Bug in Connector Config Endpoint

**Project:** FlowEngine Connectors
**Type:** Bug Fix
**Priority:** Low
**Story Points:** 2
**Repository:** `novabyte/connector-runtime`
**Assignee:** New Backend Intern

**Description:**
The `POST /api/v1/connectors/{id}/config` endpoint currently accepts empty strings for required configuration fields (`api_key`, `base_url`). This should return a 400 Bad Request with a proper validation error message instead.

**Acceptance Criteria:**
1. Endpoint rejects empty strings for `api_key` and `base_url` fields
2. Returns HTTP 400 with error response format: `{ "error": { "code": "VALIDATION_ERROR", "message": "..." } }`
3. Unit test added covering empty string, null, and undefined cases
4. Existing tests still pass
5. Follow API standards from KB-002

**Files to Modify:**
- `src/routes/connector-config.ts` (validation logic)
- `src/validators/connector-config.validator.ts` (new validation rules)
- `tests/routes/connector-config.test.ts` (new test cases)

**Helpful Resources:**
- API Standards: KB-002, Section 4
- Existing validation patterns: `src/validators/connector.validator.ts`
- Ask your mentor (Priya Nair) if you need guidance

---

### FLOW-INTERN-002: Add Request Logging Middleware for Connector Endpoints

**Project:** FlowEngine Connectors
**Type:** Enhancement
**Priority:** Low
**Story Points:** 2
**Repository:** `novabyte/connector-runtime`
**Assignee:** New Backend Intern

**Description:**
Add structured request logging to all connector-related endpoints. Each incoming request should log: HTTP method, path, request ID, timestamp, and response status code. Use the existing Winston logger instance.

**Acceptance Criteria:**
1. Middleware logs incoming requests with method, path, request ID, and timestamp
2. Middleware logs response status code and response time (in ms)
3. Logs are structured JSON format
4. PII (authorization headers, request bodies) is NOT logged
5. Unit test verifies log output format
6. Middleware is applied to connector routes only

**Files to Modify:**
- `src/middleware/request-logger.ts` (new file)
- `src/routes/index.ts` (apply middleware)
- `tests/middleware/request-logger.test.ts` (new test file)

**Helpful Resources:**
- Existing middleware patterns: `src/middleware/auth.ts`
- Winston logger setup: `src/utils/logger.ts`

---

## Junior Backend Tickets (Python)

### FLOW-JR-001: Add Input Validation to Create Workflow Endpoint

**Project:** FlowEngine Core
**Type:** Enhancement
**Priority:** Medium
**Story Points:** 3
**Repository:** `novabyte/workflow-core`
**Assignee:** New Junior Backend Engineer

**Description:**
The `POST /api/v1/workflows` endpoint needs stronger input validation. Currently, workflow names can contain special characters that cause issues in downstream systems. Add Pydantic validation to enforce naming rules.

**Acceptance Criteria:**
1. Workflow name must be 3-100 characters long
2. Workflow name must match pattern: `^[a-zA-Z0-9][a-zA-Z0-9_-\s]*$` (alphanumeric start, allows underscores, hyphens, spaces)
3. Workflow description is optional but must be under 500 characters if provided
4. Returns HTTP 422 with Pydantic validation error details
5. Unit tests cover: valid names, too short, too long, special characters, boundary cases
6. Minimum 80% test coverage on modified files

**Files to Modify:**
- `app/schemas/workflow.py` (Pydantic model validation)
- `app/api/routes/workflows.py` (ensure schema is used)
- `tests/test_workflow_schemas.py` (new test file)
- `tests/test_workflow_routes.py` (additional test cases)

**Helpful Resources:**
- Pydantic documentation: https://docs.pydantic.dev
- Existing schemas: `app/schemas/`
- Testing patterns: `tests/test_workflow_service.py`

---

### FLOW-JR-002: Add Health Check Endpoint with Dependency Status

**Project:** FlowEngine Core
**Type:** Enhancement
**Priority:** Medium
**Story Points:** 3
**Repository:** `novabyte/workflow-core`
**Assignee:** New Junior Backend Engineer

**Description:**
Enhance the existing `/health` endpoint to include detailed dependency checks. The endpoint should verify connectivity to PostgreSQL, Redis, and Kafka, and return individual status for each.

**Acceptance Criteria:**
1. GET `/health` returns overall status and individual dependency statuses
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
5. Unit tests with mocked dependencies (healthy and unhealthy scenarios)

**Files to Modify:**
- `app/api/routes/health.py` (enhance endpoint)
- `app/services/health_check.py` (new service file)
- `tests/test_health.py` (test cases)

---

## Junior Frontend Tickets (React)

### FLOW-FE-001: Enhance Workflow Status Badge Component

**Project:** FlowEngine Web
**Type:** Enhancement
**Priority:** Low
**Story Points:** 2
**Repository:** `novabyte/flowengine-web`
**Assignee:** New Junior Frontend Engineer

**Description:**
The current workflow status badge only supports 3 states (Active, Inactive, Draft). We need to add support for "Running", "Failed", and "Archived" states with appropriate colors and icons.

**Acceptance Criteria:**
1. StatusBadge component supports all 6 states: Active, Inactive, Draft, Running, Failed, Archived
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
6. TypeScript types updated

**Files to Modify:**
- `src/components/workflow/StatusBadge.tsx`
- `src/components/workflow/StatusBadge.test.tsx`
- `src/components/workflow/StatusBadge.stories.tsx`
- `src/types/workflow.ts` (add new status types)

**Helpful Resources:**
- Design system: Storybook at `pnpm storybook`
- Tailwind CSS animation classes: `animate-pulse`
- Existing badge: `src/components/common/Badge.tsx`

---

### FLOW-FE-002: Build Empty State Component for Workflow List

**Project:** FlowEngine Web
**Type:** Enhancement
**Priority:** Low
**Story Points:** 2
**Repository:** `novabyte/flowengine-web`
**Assignee:** New Junior Frontend Engineer

**Description:**
When a user has no workflows, the workflow list page shows a blank area. Create a reusable EmptyState component that displays an illustration, a title, a description, and an optional CTA button.

**Acceptance Criteria:**
1. EmptyState component is reusable with customizable props: `icon`, `title`, `description`, `actionLabel`, `onAction`
2. Centered layout with appropriate spacing
3. Uses Tailwind CSS for styling (no custom CSS)
4. Uses Lucide React icons
5. Storybook story with multiple variants (with action, without action, different icons)
6. React Testing Library tests
7. Used in WorkflowList page when workflows array is empty

**Files to Modify:**
- `src/components/common/EmptyState.tsx` (new component)
- `src/components/common/EmptyState.test.tsx` (new test file)
- `src/components/common/EmptyState.stories.tsx` (new story)
- `src/pages/WorkflowList.tsx` (integrate EmptyState)

---

## Full-Stack Tickets (Node.js + React)

### FLOW-FS-001: Add Input Sanitization to Connector Name Field

**Project:** FlowEngine Connectors
**Type:** Security Enhancement
**Priority:** Medium
**Story Points:** 2
**Repository:** `novabyte/connector-runtime`
**Assignee:** New Full-Stack Engineer (Backend portion)

**Description:**
The connector name field in `POST /api/v1/connectors` doesn't sanitize HTML/script content. Add server-side sanitization to prevent stored XSS.

**Acceptance Criteria:**
1. Connector name field is sanitized (HTML tags stripped)
2. Connector description field is sanitized
3. Use `sanitize-html` library with strict text-only config
4. Unit tests verify: script tags stripped, HTML entities handled, clean strings unchanged
5. Returns sanitized value in response (not rejection)

**Files to Modify:**
- `src/routes/connectors.ts`
- `src/utils/sanitizer.ts` (new utility)
- `tests/utils/sanitizer.test.ts` (new test file)

---

### FLOW-FS-002: Build Status Badge Component (Frontend)

*Same as FLOW-FE-001 — see Junior Frontend Tickets section above.*
*Assigned as second task to full-stack engineers after completing backend task.*

---

## Senior Backend Tickets (Node.js)

### FLOW-SR-001: Implement Circuit Breaker for External Connector Calls

**Project:** FlowEngine Connectors
**Type:** Enhancement
**Priority:** High
**Story Points:** 5
**Repository:** `novabyte/connector-runtime`
**Assignee:** New Senior Backend Engineer

**Description:**
External connector calls (Salesforce, Slack, Jira APIs) currently don't have circuit breaker protection. When a third-party API goes down, our system retries aggressively, causing cascading failures. Implement a circuit breaker pattern using `opossum` library.

**Acceptance Criteria:**
1. Circuit breaker wraps all external connector HTTP calls
2. Configuration per connector type:
   - Failure threshold: 5 failures in 30 seconds
   - Reset timeout: 60 seconds
   - Half-open: Allow 1 test request
3. Circuit state changes emit Kafka events to `connector.circuit.events` topic
4. Metrics exposed via existing Datadog integration
5. Fallback behavior: Return cached response if available, otherwise return 503
6. Integration tests with simulated failures
7. Documentation updated in connector-runtime README

**Files to Modify:**
- `src/services/circuit-breaker.ts` (new service)
- `src/services/connector-executor.ts` (integrate circuit breaker)
- `src/events/circuit-events.ts` (Kafka event producer)
- `tests/services/circuit-breaker.test.ts`
- `tests/integration/circuit-breaker.integration.test.ts`
- `README.md`

---

## Senior DevOps Tickets

### FLOW-INFRA-001: Add Pod Disruption Budgets to All Production Services

**Project:** Infrastructure
**Type:** Reliability Enhancement
**Priority:** High
**Story Points:** 3
**Repository:** `novabyte/infrastructure`
**Assignee:** New Senior DevOps Engineer

**Description:**
Our Kubernetes services don't have Pod Disruption Budgets (PDBs), which means node drains during maintenance can cause brief outages. Add PDBs to all production services to ensure minimum availability during planned disruptions.

**Acceptance Criteria:**
1. PDB created for each production service with appropriate `minAvailable`:
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
6. Documentation updated

**Files to Modify:**
- `helm-charts/*/templates/pdb.yaml` (new template per service)
- `helm-charts/*/values.yaml` (PDB configuration values)
- `helm-charts/*/values-dev.yaml`
- `helm-charts/*/values-staging.yaml`
- `helm-charts/*/values-prod.yaml`
- `docs/runbooks/node-maintenance.md` (update procedure)

---

*Document ID: KB-010*
*Last Updated: January 2025*
*Owner: Engineering Managers*
