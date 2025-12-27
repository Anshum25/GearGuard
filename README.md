 GearGuard

GearGuard is a role-based equipment maintenance tracking system with a *React/Vite* frontend and an *Express + PostgreSQL* backend.

It supports two roles:

- *Manager* (backend role: USER, frontend role: manager)
  - Access: *Equipment* and *Maintenance Calendar* (read-only calendar)
- *Technician* (backend role: TECHNICIAN, frontend role: technician)
  - Access: Full system (Kanban workflow, request creation, stage updates, etc.)

---

## Monorepo Structure

- backend/
  - Express API (/api/v1/...), PostgreSQL, Sequelize models, JWT auth
- frontend/
  - React/Vite SPA, Context-based state, Axios API layer, RBAC components

---

## Tech Stack / Technologies Used

### Frontend

- *React 18*
- *TypeScript*
- *Vite*
- *React Router DOM* (routing)
- *Axios* (API client) with interceptors (token refresh + demo sync)
- *Context API* (AuthContext, GearGuardContext)
- *TanStack Query* (installed and initialized)
- *Tailwind CSS*
- *shadcn/ui* + *Radix UI* primitives
- *Lucide React* icons
- *Recharts* (Dashboard/Reports charts)
- *date-fns* (date utilities)

### Backend

- *Node.js*
- *Express 5* (ES Modules)
- *PostgreSQL*
- *Sequelize ORM*
- *JWT Authentication* (access token + refresh token flow)
- *CORS + Cookies* (withCredentials support)
- *Multer* (avatar upload on register)
- *In-memory caching middleware* for GET routes (simple Map cache)

### Demo / RBAC Layer (Frontend)

- *RBAC routing + UI gating*
  - PrivateRoute for route-level role restrictions
  - PermissionGate for component-level restrictions
- *Local persistence “working demo”*
  - localStorage demo dataset (gearguard_demo_data)
  - Demo sync interceptor (sync.service.ts) to persist stage/hours/scrap behavior

---

## Key Features

- *Equipment management*
  - List and detail views
  - Create equipment (UI)
  - Update equipment details (technician)
- *Maintenance requests (Technician)*
  - Kanban stages: new → in-progress → repaired → scrap
  - Scrap stage demonstrates immediate equipment unusable/scrapped effect
- *Preventive Calendar*
  - Managers can view calendar but cannot create/edit
  - Technicians can schedule preventive maintenance
- *Team Management (Backend-driven)*
  - Create team
  - Add/remove team members (technicians)
  - Fetch team list + members

---

## Setup & Run (Development)

### 1) Backend

From backend/:

1. Install dependencies
2. Configure environment variables (backend/.env)
3. Start the API server

Typical endpoints are served under:

- http://localhost:8000/api/v1/...

### 2) Frontend

From frontend/:

1. Install dependencies
2. Configure environment variables (frontend/.env)
3. Start Vite dev server

Frontend dev server:

- http://localhost:8080

> The frontend reads API base URL from VITE_API_URL.

---

## Environment Variables

### Backend (backend/.env)

See backend/.env.example for the full list. Common values include:

- PORT
- DATABASE_URL (or DB host/user/password/name depending on your config)
- ACCESS_TOKEN_SECRET
- REFRESH_TOKEN_SECRET
- CORS_ORIGIN (frontend origin)

### Frontend (frontend/.env)

- VITE_API_URL=http://localhost:8000
- VITE_DEMO_MODE=true (optional)
  - If true, demo mode uses local demo persistence for the UI illusion.

---

## Demo Mode

Demo mode is designed to create a *“working system” illusion* where changes persist across refresh even if you are presenting without a stable backend.

- Demo data is stored in localStorage key: gearguard_demo_data
- Demo mode can be enabled by:
  - setting VITE_DEMO_MODE=true, or
  - localStorage.setItem("gearguard_demo_mode", "true")

Demo behavior includes:

- Kanban stage updates persist locally
- Logged hours persist locally
- Scrap stage immediately marks the related equipment as scrapped locally

---

## API Namespace

Backend routes are mounted under:

- /api/v1/users
- /api/v1/teams
- /api/v1/equipment
- /api/v1/requests

---

## Notes

- This repo also contains gearguard-pro-main/ which includes a separate template README. The main application code lives in backend/ and frontend/.