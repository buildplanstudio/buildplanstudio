# Architecture

```
Browser (React or Angular)
   │  HTTPS, JSON, Authorization: Bearer <JWT>
   ▼
Express API  (backend/)
   ├─ routes/public.js     services, pricing, contact
   ├─ routes/auth.js       signup, login, me
   ├─ routes/projects.js   create / list / update project requests
   ├─ middleware/auth.js   JWT sign + verify, admin check
   └─ data/store.js        JSON file database  (swap for MongoDB / PostgreSQL)
```

## Folder map

```
build-plan-studio/
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── seedAdmin.js
│       ├── middleware/auth.js
│       ├── routes/{auth,projects,public}.js
│       └── data/{catalog.js,store.js}
├── frontend/                (React + Vite)
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx, App.jsx
│       ├── api/client.js
│       ├── context/AuthContext.jsx
│       ├── components/{Navbar,Footer,Hero,ServiceGroups,PricingCards}.jsx
│       ├── pages/{Home,Services,Pricing,About,Contact,Login,Signup,Dashboard}.jsx
│       └── styles/main.css
├── angular-guide/           (Angular starter files to copy into an `ng new` project)
└── docs/
```

## Roles

| Role | Created by | Can do |
|---|---|---|
| `client` | Signup | Submit and view own projects. Services: design, 3d, approval-layout |
| `builder` | Signup | Same, plus brochure and 3d-video |
| `architect` | Signup | Services: plan, design, brochure, 3d-video |
| `admin` | `npm run seed:admin` | See all projects, change status |

The service list per role lives in `backend/src/data/catalog.js`. The server rejects services that do not belong to the user's role. The Dashboard mirrors that list in `SERVICES_BY_ROLE`; keep both in sync or load it from the API.

## API reference

Base URL: `/api`. Send `Authorization: Bearer <token>` where marked 🔒.

| Method | Path | Body | Returns |
|---|---|---|---|
| GET | `/health` | | `{ ok: true }` |
| GET | `/services` | | `{ userTypes: [...] }` |
| GET | `/pricing` | | `{ plans: [...] }` |
| POST | `/contact` | `{ name, email, message }` | `{ ok: true }` |
| POST | `/auth/signup` | `{ name, email, password, role, phone?, company? }` | `{ token, user }` |
| POST | `/auth/login` | `{ email, password }` | `{ token, user }` |
| GET 🔒 | `/auth/me` | | `{ user }` |
| POST 🔒 | `/projects` | `{ title, ideas, services[], location?, plotSize?, budget? }` | `{ project }` |
| GET 🔒 | `/projects` | | `{ projects }` (own; admin gets all) |
| GET 🔒 | `/projects/:id` | | `{ project }` |
| PATCH 🔒 admin | `/projects/:id/status` | `{ status, note? }` | `{ project }` |

Statuses: `submitted → in-review → in-design → revision → approved → delivered`.

Errors are `{ "error": "message" }` with status 400, 401, 403, 404 or 409.

## Data model

```
User    { id, name, email, passwordHash, role, phone, company, createdAt }
Project { id, ownerId, ownerRole, title, ideas, services[], location, plotSize,
          budget, status, createdAt, updates[ { at, note } ] }
Message { id, name, email, message, createdAt }
```

## Security notes
- Passwords are hashed with bcrypt. Never store plain passwords.
- JWTs last 7 days and are kept in `localStorage`. For higher security move to httpOnly cookies.
- Set a long random `JWT_SECRET` in production and never commit `.env`.
- Add rate limiting (`express-rate-limit`) and security headers (`helmet`) before going live.
- Restrict `CLIENT_ORIGIN` to your real domain.

## Upgrading to a real database

All database access goes through `backend/src/data/store.js` (`all`, `find`, `filter`, `insert`, `update`). Two options:

**MongoDB (Mongoose)**: `npm i mongoose`, create `User`, `Project`, `Message` models, and replace the store calls in the three route files with `Model.find / create / findByIdAndUpdate`.

**PostgreSQL**: `npm i pg` (or Prisma). Tables: `users`, `projects`, `project_updates`, `messages`.

The routes are short, so the swap is a few hours of work.

## Recommended next features
1. **File uploads**: customers attach plot photos and sketches; the team uploads final plans, 3D renders, brochures and videos (use `multer` plus S3, Cloudinary or Azure Blob).
2. **Email notifications** on new request and status change (Nodemailer or a service such as Resend).
3. **Payments** (Razorpay or Stripe) tied to the pricing packages.
4. **Revision comments** between customer and team on each project.
5. **Gallery / portfolio** page with 3D renders.
6. Move from JWT in `localStorage` to httpOnly cookies and add password reset.
