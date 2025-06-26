# Deployment Guide for Reminder System

## Overview
This project consists of:
- **Frontend**: React + Vite app in `apps/docs/`
- **Backend**: Node.js + Express app in `apps/web/`

## Frontend Deployment (Vercel)

### 1. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `/` (root of monorepo)
   - **Build Command**: `pnpm build`
   - **Install Command**: `pnpm install`
   - **Output Directory**: `apps/docs/dist`

### 2. Environment Variables (Vercel)
Set these in Vercel dashboard → Settings → Environment Variables:
```
VITE_PORT=3000
VITE_API_URL=https://your-backend-url.railway.app
```

## Backend Deployment (Railway)

### 1. Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the `apps/web` directory
4. Railway will automatically detect it's a Node.js project

### 2. Environment Variables (Railway)
Set these in Railway dashboard → Variables:
```
PORT=3001
JWT_SECRET=your_secure_jwt_secret_here
DATABASE_URL=your_postgresql_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
NODE_ENV=production
```

### 3. Database Setup
1. Add PostgreSQL service in Railway
2. Copy the connection string to `DATABASE_URL`
3. Railway will automatically run migrations

### 4. Email Setup
1. Use Gmail App Passwords or SendGrid
2. Update `EMAIL_USER` and `EMAIL_PASS`

## Alternative Backend Deployment (Render)

If you prefer Render:
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set root directory to `apps/web`
5. Build command: `npm install && npm run build`
6. Start command: `npm start`

## Environment Variables Reference

### Frontend (.env)
```
VITE_PORT=3000
VITE_API_URL=https://your-backend-url.railway.app
```

### Backend (.env)
```
PORT=3001
JWT_SECRET=your_secure_jwt_secret_here
DATABASE_URL=postgresql://username:password@host:port/database
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
NODE_ENV=production
```

## Post-Deployment Steps

1. **Update CORS in Backend**: Ensure your backend allows requests from your Vercel frontend domain
2. **Test API Endpoints**: Verify all API calls work from the deployed frontend
3. **Monitor Logs**: Check Railway/Render logs for any issues
4. **Database Migration**: Ensure all database tables are created

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Update CORS configuration in backend
2. **Database Connection**: Verify DATABASE_URL is correct
3. **Email Not Working**: Check email credentials and app passwords
4. **Build Failures**: Ensure all dependencies are in package.json

### Health Check:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.railway.app/api/health` (add this endpoint if needed) 