# Inkwell

A minimal story publishing platform where writers can share their work and readers can discover stories worth reading. Built with a focus on simplicity, clean typography, and a smooth reading experience.

![Inkwell](https://img.shields.io/badge/status-active-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue)

---

## What it does

- Create an account and log in securely
- Write and publish stories with a distraction-free editor
- Browse and read stories published by others
- Manage your own stories — view and delete them
- Clean, minimal UI built for reading and writing

---

## Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router v6
- Axios

**Backend**
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT authentication (HTTP-only cookies)
- Zod validation

---

## Getting started locally

### Prerequisites
- Node.js 18+
- PostgreSQL running locally

### 1. Clone the repo
```bash
git clone https://github.com/asitgiri1234/inkwell.git
cd inkwell
```

### 2. Set up the backend
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/inkwell"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="development"
CLIENT_URL="http://localhost:5173"
```

Run migrations and start:
```bash
npx prisma migrate dev --name init --schema=src/prisma/schema.prisma
npm run dev
```

### 3. Set up the frontend
```bash
cd ../client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/register | — | Create account |
| POST | /api/auth/login | — | Login |
| POST | /api/auth/logout | ✓ | Logout |
| GET | /api/auth/me | ✓ | Get current user |
| GET | /api/stories | — | All stories (paginated) |
| GET | /api/stories/:id | — | Single story |
| POST | /api/stories | ✓ | Create story |
| DELETE | /api/stories/:id | ✓ | Delete story |
| GET | /api/stories/mine | ✓ | Your stories |

---

---

## Deployment

- **Backend** — [Railway](https://railway.app)
- **Frontend** — [Vercel](https://vercel.com)

Both auto-deploy on every push to `main`.

---