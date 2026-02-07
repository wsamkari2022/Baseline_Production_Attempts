# VRDS_BASELINE - Production Deployment Guide

## Overview

This project is configured for production deployment at **moonlander.fit.edu/VRDS_BASELINE** with a MongoDB backend.

## Project Configuration

### Base Path Configuration
- **Production URL**: `moonlander.fit.edu/VRDS_BASELINE`
- **Backend Port**: 4004
- **Frontend Dev Port**: 3004
- **Base Path**: `/VRDS_BASELINE`

### Key Configuration Files

#### 1. Backend Server (backend/src/server.ts)
- `BASE_PATH = "/VRDS_BASELINE"`
- `PORT = 4004`
- All API routes mounted under `${BASE_PATH}/api/*`
- Static files served from `dist/` in production
- Fallback to `index.html` for client-side routing

#### 2. Vite Configuration (vite.config.ts)
- `base: '/VRDS_BASELINE/'` - Ensures correct asset paths
- Dev server runs on port 3004
- API proxy: `/api/*` → `http://localhost:4004/api/*`

#### 3. React Router (src/App.tsx)
- `basename="/VRDS_BASELINE"` - Ensures routes work under subpath

#### 4. API Service (src/lib/mongoService.ts)
- `API = "/VRDS_BASELINE"` - API endpoint configuration

## Environment Variables

### Backend (.env in backend directory)
```bash
# MongoDB connection string - UPDATE THIS WITH YOUR PRODUCTION URI
MONGODB_URI=mongodb://localhost:27017/wildfire_study

# Backend server port
PORT=4004

# Environment (development or production)
NODE_ENV=production
```

### Frontend (.env in root directory)
```bash
# Frontend API configuration
VITE_API_URL=/VRDS_BASELINE
```

## Building for Production

### Build All (Frontend + Backend)
```bash
npm run build:all
```

This command:
1. Compiles frontend TypeScript
2. Builds frontend with Vite (outputs to `dist/`)
3. Compiles backend TypeScript (outputs to `backend/dist/`)

### Build Separately
```bash
# Frontend only
npm run build:frontend

# Backend only
npm run build:backend
```

## Running in Production

### Start Production Server
```bash
npm run start:prod
```

This starts the Express server which:
- Serves the frontend static files from `dist/`
- Handles API requests at `/VRDS_BASELINE/api/*`
- Runs on port 4004

### Using Process Manager (Recommended)
For production deployments, use PM2 or similar:

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start backend/dist/server.js --name vrds-baseline

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

## Development Mode

### Run Development Servers
```bash
# Run both frontend and backend in development mode
npm run dev:all
```

This runs:
- Frontend dev server on http://localhost:3004
- Backend API server on http://localhost:4004

### Development URLs
- Frontend: http://localhost:3004
- Backend API: http://localhost:4004
- API endpoints: http://localhost:4004/VRDS_BASELINE/api/*

## API Endpoints

All API routes are prefixed with `/VRDS_BASELINE/api/`:

- `POST /VRDS_BASELINE/api/user-sessions` - Create user session
- `PATCH /VRDS_BASELINE/api/user-sessions/:sessionId` - Update session
- `POST /VRDS_BASELINE/api/value-evolution` - Save value evolution
- `POST /VRDS_BASELINE/api/cvr-responses` - Save CVR responses
- `POST /VRDS_BASELINE/api/apa-reorderings` - Save APA reorderings
- `POST /VRDS_BASELINE/api/scenario-interactions` - Save interactions
- `POST /VRDS_BASELINE/api/baseline-values` - Save baseline values
- `GET /VRDS_BASELINE/api/baseline-values/session/:session_id` - Get values
- `POST /VRDS_BASELINE/api/final-decisions` - Save final decisions
- `POST /VRDS_BASELINE/api/session-metrics` - Save session metrics
- `POST /VRDS_BASELINE/api/session-feedback` - Save feedback
- `POST /VRDS_BASELINE/api/value-stability` - Save value stability
- `GET /VRDS_BASELINE/api/health` - Health check

## Path Verification Checklist

✅ All configurations are set correctly:

1. **Frontend API Calls**: `/VRDS_BASELINE/api/*`
2. **Backend Expects**: `/VRDS_BASELINE/api/*`
3. **Vite Dev Proxy**: `/api/*` → `http://localhost:4004/api/*`
4. **Static Files**: Served from `/VRDS_BASELINE/`
5. **Frontend Routes**: Work under `/VRDS_BASELINE/*`
6. **React Router**: `basename="/VRDS_BASELINE"`

## MongoDB Setup

1. Ensure MongoDB is running and accessible
2. Update `backend/.env` with your MongoDB connection string:
   ```bash
   MONGODB_URI=mongodb://your-mongodb-host:27017/wildfire_study
   ```
3. The application will automatically create collections on first use

### MongoDB Collections
- `usersessions` - User session data
- `valueevolutions` - Value evolution tracking
- `cvrresponses` - CVR response data
- `apareorderings` - APA reordering data
- `scenariointeractions` - Scenario interactions
- `baselinevalues` - Baseline value data
- `finaldecisions` - Final decision data
- `sessionmetrics` - Session metrics
- `sessionfeedbacks` - Session feedback
- `valuestabilities` - Value stability data

## Nginx Configuration Example

If you're using Nginx as a reverse proxy:

```nginx
location /VRDS_BASELINE {
    proxy_pass http://localhost:4004;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Testing the Deployment

### 1. Test Backend Health
```bash
curl http://localhost:4004/VRDS_BASELINE/api/health
```

Expected response:
```json
{"status":"ok","basePath":"/VRDS_BASELINE"}
```

### 2. Test Frontend Access
Open browser and navigate to:
- Local: http://localhost:4004/VRDS_BASELINE
- Production: https://moonlander.fit.edu/VRDS_BASELINE

### 3. Test "Begin Assessment" Button
1. Navigate to the application
2. Fill out demographics form
3. Click "Begin Assessment"
4. Check MongoDB for new document in `usersessions` collection
5. Verify no 404 errors in browser console

## Troubleshooting

### 404 Errors on API Calls
- Verify `VITE_API_URL` is set to `/VRDS_BASELINE` in `.env`
- Check backend is running on port 4004
- Confirm all API routes are mounted under `${BASE_PATH}/api/`

### Static Assets Not Loading
- Ensure `base: '/VRDS_BASELINE/'` is set in `vite.config.ts`
- Rebuild frontend with `npm run build:frontend`
- Verify assets are in `dist/assets/` directory

### MongoDB Connection Issues
- Check MongoDB is running: `mongosh`
- Verify connection string in `backend/.env`
- Check MongoDB logs for connection errors

### Routes Not Working
- Confirm `basename="/VRDS_BASELINE"` is set in `src/App.tsx`
- Check backend fallback route is serving `index.html`

## File Structure

```
project/
├── dist/                          # Frontend build output
│   ├── assets/                    # Static assets (JS, CSS)
│   └── index.html                 # Main HTML file
├── backend/
│   ├── src/                       # Backend source code
│   │   ├── server.ts             # Main server file (BASE_PATH configured)
│   │   ├── config/               # Configuration files
│   │   ├── models/               # Mongoose models
│   │   └── routes/               # API routes
│   ├── dist/                     # Backend build output
│   │   └── server.js            # Compiled server file
│   └── .env                      # Backend environment variables
├── src/                          # Frontend source code
│   ├── App.tsx                   # Main app with Router (basename set)
│   ├── lib/
│   │   └── mongoService.ts      # API service (API endpoint set)
│   └── ...
├── vite.config.ts                # Vite config (base path set)
├── .env                          # Frontend environment variables
└── package.json                  # NPM scripts
```

## ES Modules Support

This project uses ES modules in Node.js with TypeScript:
- All backend imports include `.js` extensions
- Backend `tsconfig.json` uses `"module": "ES2020"`
- Backend `package.json` has `"type": "module"`

## Production Checklist

Before deploying to production:

- [ ] Update MongoDB connection string in `backend/.env`
- [ ] Set `NODE_ENV=production` in `backend/.env`
- [ ] Run `npm run build:all` to build both frontend and backend
- [ ] Test health endpoint: `/VRDS_BASELINE/api/health`
- [ ] Verify "Begin Assessment" saves data to MongoDB
- [ ] Check browser console for 404 or CORS errors
- [ ] Set up process manager (PM2) for backend
- [ ] Configure Nginx reverse proxy (if applicable)
- [ ] Set up MongoDB backups
- [ ] Configure firewall rules for port 4004

## Support

For issues or questions:
1. Check browser console for errors
2. Check backend logs: `pm2 logs vrds-baseline`
3. Verify MongoDB connectivity
4. Review this documentation

## Version Information

- Node.js: v20+ recommended
- MongoDB: v6+ recommended
- Frontend Build Tool: Vite 5.x
- Backend Framework: Express 5.x
- Database Driver: Mongoose 8.x
