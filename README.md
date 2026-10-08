# Lunaro Platform

Premium full-stack monorepo for Lunaro / لونارو, with a Vite + React frontend and an Express + TypeScript backend.

## Tech stack
- Frontend: Vite + React + TypeScript
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL + Prisma
- Email: Resend SMTP-compatible API integration
- Security: Helmet, CORS, rate limiting, Zod validation

## Local setup

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## Production notes
- Set environment values in `.env`
- Ensure `DATABASE_URL` points to a PostgreSQL instance
- Add your `RESEND_API_KEY` before sending email notifications

## Contact
- WhatsApp: https://wa.me
- Email: ahmedmohamedstoer1234@gmail.com
