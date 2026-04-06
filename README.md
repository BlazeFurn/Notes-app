# Notes App (React + Node + Express)

This is a sample notes app for students with user signup/login and note CRUD. The backend uses JSON file storage (`data/data.json`) instead of a database.

## Features

- User signup
- User login
- JWT authentication
- Password hashing with bcrypt
- Create/read/delete notes
- User profile
- Clean front-end UI using React + Vite

## Folder structure

- `backend/` - Express API
  - `server.js` - app entrypoint
  - `routes/auth.js` - signup/login/profile
  - `routes/notes.js` - notes CRUD
  - `middleware/auth.js` - JWT middleware
  - `utils/db.js` - JSON read/write helper
  - `data/data.json` - storage file

- `frontend/` - React UI
  - `src/` - components and pages
  - `src/services/api.js` - Axios API client

## Run locally

### 1) Start backend

1. `cd backend`
2. `npm install`
3. `npm run dev` (or `npm start`)

API server listens on `http://localhost:5000`

### 2) Start frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`

Open `http://localhost:5173` in browser.

## API endpoints

- `POST /api/auth/signup` { name, email, password }
- `POST /api/auth/login` { email, password }
- `GET /api/auth/me` (Auth header `Bearer <token>`)
- `GET /api/notes` (Auth)
- `POST /api/notes` { title, content } (Auth)
- `DELETE /api/notes/:id` (Auth)

## Notes
- This is not production-ready storage; only for demos. JSON file persistence resets if deleted.
- JWT secret is in `.env`; change before sharing. 
