# NovaByte Technologies — Development Environment Setup Guides

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

# Clone the service you're working on (example: gateway-service)
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
| `ModuleNotFoundError` | Ensure you're in Poetry shell: `poetry shell` |
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
