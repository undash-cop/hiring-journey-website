# Hiring Journey

Production web app for [Hiring Journey](https://hiringjourney.com) by Undash-cop Private Limited.

## Repositories

| Repo | Path | Deploy target |
|------|------|---------------|
| **Frontend** (this repo) | `hiring-journey-website/` | Netlify → `hiringjourney.com` |
| **Backend** (submodule) | `backend/` → [hiring-journey-backend](https://github.com/undash-cop/hiring-journey-backend) | VM/Docker → `api.hiringjourney.com` |

The API is a **separate GitHub repository** linked as a git submodule at `backend/`.

## Quick start

### Frontend

```bash
git clone --recurse-submodules https://github.com/undash-cop/hiring-journey-website.git
cd hiring-journey-website
npm install
cp .env.example .env.local
npm run dev
```

If you already cloned without submodules:

```bash
git submodule update --init --recursive
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
- **Backend:** FastAPI, SQLAlchemy, Alembic (submodule)
- **Deploy:** Netlify (frontend), Docker Compose (API)

## Documentation

**[docs/README.md](docs/README.md)** — full index

| Topic | Doc |
|-------|-----|
| Local development | [docs/development/local-dev.md](docs/development/local-dev.md) |
| Architecture | [docs/architecture.md](docs/architecture.md) |
| Roadmap | [docs/roadmap.md](docs/roadmap.md) |
| Deploy frontend | [docs/deployment/frontend.md](docs/deployment/frontend.md) |
| Deploy API | [backend/docs/deployment.md](backend/docs/deployment.md) |
| Production checklist | [docs/deployment/production-checklist.md](docs/deployment/production-checklist.md) |

## Scripts

```bash
npm run build
npm run test:e2e
npm run smoke:api
npm run api:sync           # refresh OpenAPI client from local backend
npm run validate:env:parity
```
