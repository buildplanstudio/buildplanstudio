# Build Plan Studio: Architecture Design Website

A full-stack website for an architecture and layout-planning studio.

**Concept:** clients, builders and architects only *share their ideas*. The Build Plan Studio team prepares the plan.

| Who they are | What our team prepares |
|---|---|
| **Client / Home owner** | Design, 3D visualisation, approval layout plan |
| **Builder / Developer** | Design, 3D visualisation, approval layout plan, brochure, 3D video |
| **Architect / Designer** | Plan, design, brochure, 3D video |

## What is included

| Part | Technology | Folder |
|---|---|---|
| Front end (main, runnable) | React 18 + Vite + React Router | `frontend/` |
| Back end API | Node.js + Express + JWT login | `backend/` |
| Front end (alternative) | Angular, step-by-step guide with code | `angular-guide/` and `docs/ANGULAR_GUIDE.md` |
| Documentation | Markdown | `docs/` |

### Pages and features
- Landing page, with hero, the three customer paths, how it works, pricing and a call to action
- Menu: Home, Services, Pricing, About, Contact
- **Sign up** (choose client / builder / architect) and **Log in** (JWT)
- **Dashboard**: share ideas, pick the services you want, track status and progress notes
- **Admin (design team) view**: see every request and change its status
- Contact form that saves messages

## Quick start (5 minutes)

You need **Node.js 18 or newer** (https://nodejs.org).

```bash
# Terminal 1: back end
cd backend
cp .env.example .env        # Windows: copy .env.example .env  (then edit JWT_SECRET)
npm install
npm run seed:admin          # creates the design-team admin login
npm run dev                 # API on http://localhost:5000

# Terminal 2: front end
cd frontend
npm install
npm run dev                 # site on http://localhost:5173
```

Open http://localhost:5173.

Default admin (from `seed:admin`): `admin@buildplanstudio.com` / `ChangeMe123!`. **Change this before going live.**

## Documentation

| File | Read it for |
|---|---|
| [docs/SETUP_VISUAL_STUDIO.md](docs/SETUP_VISUAL_STUDIO.md) | Step-by-step in Visual Studio 2022 and VS Code |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Folder map, API reference, data model, how to upgrade to a real database |
| [docs/ANGULAR_GUIDE.md](docs/ANGULAR_GUIDE.md) | Building the same front end in Angular, with code |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Putting the site online |
| [docs/CUSTOMISATION.md](docs/CUSTOMISATION.md) | Changing name, colours, prices, services, copy |

## Important notes
- The data store is a JSON file (`backend/src/data/db.json`) so it runs with zero setup. **Use MongoDB or PostgreSQL for production**; see `docs/ARCHITECTURE.md`.
- Prices and About text are samples. Edit `backend/src/data/catalog.js` and `frontend/src/pages/About.jsx`.
- File uploads (plot photos, drawings) and delivery of final plan files are not built yet. `docs/ARCHITECTURE.md` lists them as the next steps.
