# Hiring Journey

Production web app for [Hiring Journey](https://hiringjourney.com) by Undash-cop Private Limited.

## Repositories

| Repo | Path | Deploy target |
|------|------|---------------|
| **Frontend** (this repo) | `hiring-journey-website/` | Netlify → `hiringjourney.com` |
| **Backend** (separate repo) | [hiring-journey-backend](https://github.com/undash-cop/hiring-journey-backend) | VM/Docker → `api.hiringjourney.com` |

The API is a **separate GitHub repository**. For local full-stack dev, clone it into `backend/`:

```bash
./scripts/clone-backend-dev.sh
```

## Quick start

### Frontend

```bash
git clone https://github.com/undash-cop/hiring-journey-website.git
cd hiring-journey-website
npm install
cp .env.example .env.local
npm run dev
```

For API work locally:

```bash
./scripts/clone-backend-dev.sh
```

### Backend

```bash
cd backend
cp .env.example .env
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

Or clone the API repo standalone: [hiring-journey-backend](https://github.com/undash-cop/hiring-journey-backend).

## Tech stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind, Keycloak JS
- **Backend:** FastAPI, SQLAlchemy, Alembic ([separate repo](https://github.com/undash-cop/hiring-journey-backend))
- **Deploy:** Netlify (frontend), Docker Compose (API)

## Documentation

**[docs/README.md](docs/README.md)** — full index

| Topic | Doc |
|-------|-----|
| Local development | [docs/development/local-dev.md](docs/development/local-dev.md) |
| Architecture | [docs/architecture.md](docs/architecture.md) |
| Roadmap | [docs/roadmap.md](docs/roadmap.md) |
| Deploy frontend | [docs/deployment/frontend.md](docs/deployment/frontend.md) |
| Deploy API | [hiring-journey-backend deployment](https://github.com/undash-cop/hiring-journey-backend/blob/main/docs/deployment.md) |
| Production checklist | [docs/deployment/production-checklist.md](docs/deployment/production-checklist.md) |

## Scripts

```bash
npm run build
npm run test:e2e
npm run smoke:api
npm run api:sync           # refresh OpenAPI client from local backend
npm run validate:env:parity
```
