# LUNARO - Digital Studio Platform

![Lunaro](https://img.shields.io/badge/Lunaro-Production%20Ready-blue)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Express%20%7C%20PostgreSQL-blueviolet)
![License](https://img.shields.io/badge/License-MIT-green)

**لونارو** - نحوّل أفكارك إلى حلول رقمية تصنع فرقًا حقيقيًا.

Lunaro is a complete, production-ready digital agency platform built with React, Node.js/Express, TypeScript, and PostgreSQL.

## 🚀 Features

- **Frontend**: React + Vite + TypeScript with RTL Arabic-first UI
- **Backend**: Express REST API with authentication and authorization
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Email/password + Google OAuth
- **Email System**: SMTP-based with multiple template types
- **Admin Dashboard**: Complete management interface
- **Portfolio Management**: Database-backed project showcase
- **Blog System**: Full-featured blog with categories and SEO
- **Contact System**: Inquiry management with admin dashboard
- **Review System**: Moderated client testimonials
- **Security**: Helmet, CORS, rate limiting, validation
- **SEO**: Sitemap, robots.txt, structured data, meta tags
- **Responsive**: Mobile-first design supporting 360px - 1440px+
- **Accessibility**: Semantic HTML, ARIA, keyboard navigation

## 📁 Repository Structure

```
lunaro-platform111/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Route pages
│   │   ├── layouts/         # Layout components
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   ├── assets/          # Images, fonts
│   │   ├── styles/          # Global CSS
│   │   └── App.tsx
│   ├── public/              # Static assets
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                  # Express backend
│   ├── src/
│   │   ├── config/          # Configuration modules
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Data access layer
│   │   ├── validators/      # Zod schemas
│   │   ├── utils/           # Utilities
│   │   ├── types/           # TypeScript types
│   │   ├── emails/          # Email templates
│   │   └── app.ts           # Express app
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── migrations/          # Prisma migrations
│   ├── tests/               # Test files
│   ├── Dockerfile
│   ├── tsconfig.json
│   └── package.json
│
├── docs/                     # Documentation
│   ├── ARCHITECTURE.md       # System architecture
│   ├── DATABASE.md           # Database schema docs
│   ├── SECURITY.md           # Security implementation
│   ├── EMAIL.md              # Email configuration
│   ├── ADMIN.md              # Admin features
│   ├── DEPLOYMENT_RENDER.md  # Render deployment guide
│   └── PRODUCTION_CHECKLIST.md
│
├── .github/
│   └── workflows/           # GitHub Actions
│       ├── frontend-build.yml
│       ├── backend-build.yml
│       └── test.yml
│
├── docker-compose.yml        # Local development
├── render.yaml               # Render deployment config
├── .env.example              # Environment variables template
├── package.json              # Monorepo root
└── README.md
```

## 🛠 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL 14+ (or Render managed)

### Local Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up database
npm run db:migrate
npm run db:seed

# Start development servers
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:3000

### Production Build

```bash
# Build both frontend and backend
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

## 🚀 Deployment

Lunaro is configured for seamless deployment on Render.

See **[DEPLOYMENT_RENDER.md](./docs/DEPLOYMENT_RENDER.md)** for complete step-by-step instructions.

Before deploying, review **[PRODUCTION_CHECKLIST.md](./docs/PRODUCTION_CHECKLIST.md)**.

## 📚 Documentation

- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System design and data flow
- **[DATABASE.md](./docs/DATABASE.md)** - Prisma schema and migrations
- **[SECURITY.md](./docs/SECURITY.md)** - Security implementation details
- **[EMAIL.md](./docs/EMAIL.md)** - Email system configuration
- **[ADMIN.md](./docs/ADMIN.md)** - Admin dashboard features

## 🔐 Security

- Helmet.js for HTTP headers
- CORS properly configured
- Rate limiting on sensitive endpoints
- Zod validation on all inputs
- Password hashing with bcrypt
- Secure session management
- No secrets in repository
- Environment-based configuration

## 📊 API Endpoints

### Public
- `GET /api/health` - Health check
- `GET /api/services` - List services
- `GET /api/projects` - List projects
- `GET /api/reviews` - List approved reviews
- `POST /api/reviews` - Submit review
- `GET /api/blog` - List blog posts
- `GET /api/blog/:slug` - Get blog post
- `POST /api/contact` - Submit contact inquiry

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/google` - Google OAuth start
- `GET /api/auth/google/callback` - Google OAuth callback

### Admin (Protected)
- `GET /api/admin/inquiries` - List inquiries
- `PATCH /api/admin/inquiries/:id` - Update inquiry status
- `GET /api/admin/reviews` - List all reviews
- `PATCH /api/admin/reviews/:id` - Approve/reject review
- `GET/POST /api/admin/projects` - Manage projects
- `GET/POST /api/admin/services` - Manage services
- `GET/POST /api/admin/blog` - Manage blog posts
- `GET /api/admin/users` - List users

## 🌍 Environment Variables

See `.env.example` for complete list. Critical variables:

```
# Server
PORT=3000
NODE_ENV=production

# Database
DATABASE_URL=postgresql://...

# URLs
FRONTEND_URL=https://lunaro.example.com
PUBLIC_SITE_URL=https://lunaro.example.com
VITE_API_URL=https://api.lunaro.example.com

# Authentication
JWT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Email
EMAIL_HOST=...
EMAIL_PORT=...
EMAIL_USER=...
EMAIL_PASSWORD=...
EMAIL_FROM=...
```

## 📝 License

MIT

## 📧 Contact

**WhatsApp**: [+20 104 196 1879](https://wa.me/201041961879)

**Email**: [ahmedmohamedstoer1234@gmail.com](mailto:ahmedmohamedstoer1234@gmail.com)

---

**Made with ❤️ by Lunaro Team**
