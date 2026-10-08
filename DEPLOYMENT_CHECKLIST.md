# Lunaro Production Deployment Checklist

## Pre-Deployment Requirements

### ✅ Environment Configuration
- [ ] `DATABASE_URL` set to production PostgreSQL instance
- [ ] `RESEND_API_KEY` configured with valid Resend API credentials
- [ ] `JWT_SECRET` set to a strong random string (min 8 characters)
- [ ] `CONTACT_TO_EMAIL` configured to ahmedmohamedstoer1234@gmail.com
- [ ] `PUBLIC_SITE_URL` set to production domain
- [ ] `NODE_ENV=production`
- [ ] `PORT=4000` (or configured port)

### ✅ Database Setup
- [ ] PostgreSQL database created
- [ ] `npm run db:migrate` executed successfully
- [ ] `npm run db:seed` executed successfully (optional)
- [ ] All schema tables created (contact_messages, site_testimonials, admin_users)

### ✅ Build Verification
- [ ] `npm run build` completes with zero errors
- [ ] Frontend dist files generated (frontend/dist/)
- [ ] Backend TypeScript compiles (backend/dist/)
- [ ] No TypeScript strict mode violations
- [ ] All dependencies installed correctly

### ✅ Security
- [ ] Helmet middleware enabled
- [ ] CORS configured appropriately
- [ ] Rate limiting active
- [ ] Zod validation schemas applied to all endpoints
- [ ] No secrets in .env.example
- [ ] Environment variables not logged

### ✅ Email Configuration
- [ ] Resend SMTP working
- [ ] Welcome email template renders correctly
- [ ] Contact receipt email template renders correctly
- [ ] Admin notification email sends successfully

### ✅ API Endpoints
- [ ] `GET /api/health` returns 200
- [ ] `POST /api/contact` accepts valid payloads
- [ ] `POST /api/auth/register` creates users
- [ ] `GET /api/contact` lists messages (admin)
- [ ] All endpoints return proper error messages

### ✅ Frontend
- [ ] React app builds to dist/
- [ ] All RTL styles render correctly
- [ ] Dark theme applies globally
- [ ] Form validation works
- [ ] Contact form submits to backend
- [ ] No console errors in production build

### ✅ Database Indexing
- [ ] Indexes created on frequently queried fields
- [ ] Query performance acceptable
- [ ] No N+1 queries in contact retrieval

## Deployment Steps

### 1. Install Dependencies
```bash
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

### 2. Compile TypeScript
```bash
npm run build
```

### 3. Set Up Database
```bash
cd backend
npm run prisma:migrate
npm run prisma:seed  # optional
cd ..
```

### 4. Start Production Server
```bash
npm start
```

## Health Check

After deployment, verify:

```bash
# Check backend health
curl http://localhost:4000/api/health

# Check database connectivity
# (Look for no errors in startup logs)

# Test contact form endpoint
curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+201234567890",
    "scope": "Test project scope details"
  }'
```

## Monitoring

- Monitor application logs for errors
- Check database connection pool status
- Verify email delivery through Resend dashboard
- Monitor rate limiting metrics
- Track API response times

## Rollback Plan

1. Revert to previous git commit: `git checkout <previous-commit>`
2. Rebuild: `npm run build`
3. Restart server
4. Verify health endpoint is responding

---

**Last Updated:** $(date)
**Deployment Ready:** ✅
