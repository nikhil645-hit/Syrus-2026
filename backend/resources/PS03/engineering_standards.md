# NovaByte Technologies — Engineering Standards & Guidelines

## 1. Code Style & Conventions

### General Principles
- Write self-documenting code. If you need a comment, consider renaming the variable or function first.
- Follow the DRY (Don't Repeat Yourself) principle but avoid premature abstraction.
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
- Use GitHub's suggestion feature for small fixes.
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
describe('WorkflowService', () => {
  it('should create a new workflow when valid data is provided', () => {});
  it('should throw ValidationError when name is missing', () => {});
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
