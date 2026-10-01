# SkillTrack

SkillTrack is a career-management web app for organizing job applications, tracking professional skills, and keeping career goals in view. It has a React frontend and an Express/MongoDB backend.

## Features

- Public landing page, account registration, and sign in
- Protected career dashboard
- Create, edit, search, filter, and delete job applications
- Track skills and proficiency levels
- Set and manage career goals and deadlines
- Manage profile details and change account password
- Password requirements shown during registration and password changes
- Cookie-based authentication, login/registration rate limits, and standard security headers

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Sass, Lucide icons
- Backend: Node.js, Express 5, MongoDB/Mongoose, JWT, bcryptjs

## Requirements

- Node.js `^20.19.0` or `>=22.12.0` (required by Vite 8)
- npm
- MongoDB connection string, local or hosted

## Local Setup

Use two terminals from the project root.

### 1. Configure the backend

```powershell
Copy-Item Backend/.env.example Backend/.env
```

Edit `Backend/.env` and set `MONGO_URI` to your MongoDB connection string. Generate a strong JWT secret with:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the generated value into `JWT_SECRET`. The backend requires a secret of at least 32 bytes.

Install dependencies and start the API:

```powershell
Set-Location Backend
npm install
node server.js
```

The API listens on `http://localhost:3000` by default. It connects to MongoDB before accepting requests.

### 2. Configure and start the frontend

In another terminal, from the project root:

```powershell
Copy-Item Frontend/.env.example Frontend/.env
Set-Location Frontend
npm install
npm run dev
```

Vite uses port `5174` by default. Open the URL printed by Vite, usually `http://localhost:5174`.

## Environment Variables

### Backend (`Backend/.env`)

| Variable                | Purpose                                                                    | Local default / example                       |
| ----------------------- | -------------------------------------------------------------------------- | --------------------------------------------- |
| `PORT`                  | API listening port                                                         | `3000`                                        |
| `NODE_ENV`              | Runtime environment                                                        | `development`                                 |
| `MONGO_URI`             | MongoDB connection string                                                  | Required                                      |
| `JWT_SECRET`            | Signs authentication tokens; at least 32 bytes                             | Required                                      |
| `CLIENT_ORIGINS`        | Comma-separated exact frontend origins allowed by CORS                     | `http://localhost:5174,http://127.0.0.1:5174` |
| `AUTH_COOKIE_SAME_SITE` | Cookie same-site policy: `lax`, `strict`, or `none`                        | `lax`                                         |
| `TRUST_PROXY`           | Trust one reverse proxy for client IP/protocol information when set to `1` | `0`                                           |

In production, set `CLIENT_ORIGINS` to the deployed frontend origin(s). If the frontend and API are on different sites and need cross-site cookies, set `AUTH_COOKIE_SAME_SITE=none` and serve over HTTPS; cookies using `none` are marked `Secure`.

### Frontend (`Frontend/.env`)

| Variable            | Purpose                               | Local default           |
| ------------------- | ------------------------------------- | ----------------------- |
| `VITE_API_BASE_URL` | Base URL used by frontend API clients | `http://localhost:3000` |

Vite environment values are embedded into the built frontend. Do not put secrets in `VITE_*` variables.

## Password Policy

Passwords must:

- Be 8 to 72 characters long
- Include at least one lowercase letter, uppercase letter, number, and one of `@ $ ! % * ? &`
- Contain only letters, numbers, and those allowed special characters

The backend validates the password as well as the frontend. Passwords are hashed with bcrypt before being stored.

## API Overview

All routes below are relative to `http://localhost:3000`. Protected routes require the authentication cookie.

### Authentication

| Method  | Path                   | Purpose                          |
| ------- | ---------------------- | -------------------------------- |
| `POST`  | `/auth/register`       | Create an account                |
| `POST`  | `/auth/login`          | Sign in                          |
| `POST`  | `/auth/logout`         | Sign out                         |
| `GET`   | `/auth/get-me`         | Get the signed-in user's profile |
| `PATCH` | `/auth/updateProfile`  | Update profile details           |
| `PATCH` | `/auth/changePassword` | Change account password          |

Login and registration have rate limits. Authentication uses an HttpOnly cookie; the JWT is not returned in the login response body.

### Applications

| Method   | Path                                | Purpose               |
| -------- | ----------------------------------- | --------------------- |
| `POST`   | `/dashboard/create-application`     | Create an application |
| `GET`    | `/dashboard/get-applications`       | List applications     |
| `PATCH`  | `/dashboard/update-application/:id` | Update an application |
| `DELETE` | `/dashboard/delete-application/:id` | Delete an application |

### Skills

| Method   | Path                         | Purpose        |
| -------- | ---------------------------- | -------------- |
| `POST`   | `/dashboard/createSkills`    | Create a skill |
| `GET`    | `/dashboard/getSkills`       | List skills    |
| `PATCH`  | `/dashboard/updateSkill/:id` | Update a skill |
| `DELETE` | `/dashboard/deleteSkill/:id` | Delete a skill |

### Goals

| Method   | Path                        | Purpose       |
| -------- | --------------------------- | ------------- |
| `POST`   | `/dashboard/createGoals`    | Create a goal |
| `GET`    | `/dashboard/getGoals`       | List goals    |
| `PATCH`  | `/dashboard/updateGoal/:id` | Update a goal |
| `DELETE` | `/dashboard/deleteGoal/:id` | Delete a goal |

## Checks

Run backend password-policy tests:

```powershell
Set-Location Backend
npm test
```

Build the frontend:

```powershell
Set-Location Frontend
npm run build
```

Run frontend lint:

```powershell
npm run lint
```

## Production Notes

- Keep `Backend/.env` private; it is ignored by Git. Use the example env files as templates and configure real values in your deployment platform.
- Use HTTPS in production so secure authentication cookies can be sent.
- Configure exact allowed frontend origins in `CLIENT_ORIGINS`; avoid broad wildcard origins when cookies are enabled.
- The built-in rate limiter uses in-memory storage. For multiple backend instances, configure a shared rate-limit store so limits apply across instances.
- Configure `TRUST_PROXY=1` only when the app is behind the expected single trusted reverse proxy.
