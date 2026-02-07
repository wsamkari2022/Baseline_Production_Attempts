# VRDS_BASELINE - Quick Start Guide

## 🚀 Production Deployment in 3 Steps

### Step 1: Configure MongoDB
Edit `backend/.env` and update your MongoDB connection string:
```bash
MONGODB_URI=mongodb://your-host:27017/wildfire_study
PORT=4004
NODE_ENV=production
```

### Step 2: Build Everything
```bash
npm run build:all
```

### Step 3: Start Production Server
```bash
npm run start:prod
```

Your application is now running at: **http://localhost:4004/VRDS_BASELINE**

---

## 📋 Available Scripts

### Production
```bash
npm run build:all      # Build frontend + backend
npm run start:prod     # Start production server
```

### Development
```bash
npm run dev:all        # Run both frontend and backend dev servers
npm run dev            # Frontend only (port 3004)
npm run server         # Backend only (port 4004)
```

### Individual Builds
```bash
npm run build:frontend # Build frontend only
npm run build:backend  # Build backend only
```

---

## 🌐 URLs

### Production
- Application: `https://moonlander.fit.edu/VRDS_BASELINE`
- API: `https://moonlander.fit.edu/VRDS_BASELINE/api/*`
- Health Check: `https://moonlander.fit.edu/VRDS_BASELINE/api/health`

### Development
- Frontend: `http://localhost:3004`
- Backend: `http://localhost:4004`
- API: `http://localhost:4004/VRDS_BASELINE/api/*`

---

## ✅ Configuration Summary

| Component | Configuration | Value |
|-----------|--------------|-------|
| **Base Path** | Production subpath | `/VRDS_BASELINE` |
| **Backend Port** | Express server | `4004` |
| **Frontend Port** | Vite dev server | `3004` |
| **Database** | MongoDB | Port `27017` |
| **API Prefix** | All endpoints | `/VRDS_BASELINE/api/*` |

---

## 🔧 Key Files Modified

1. **backend/src/server.ts** - Base path & port configuration
2. **vite.config.ts** - Base path & proxy setup
3. **src/App.tsx** - Router basename
4. **src/lib/mongoService.ts** - API endpoint
5. **backend/tsconfig.json** - ES modules support
6. **All backend imports** - Added .js extensions

---

## 🧪 Quick Test

After starting the production server:

```bash
# Test health endpoint
curl http://localhost:4004/VRDS_BASELINE/api/health

# Expected response:
# {"status":"ok","basePath":"/VRDS_BASELINE"}
```

---

## 📦 What Gets Built

### Frontend (`dist/`)
- `index.html` - Main HTML with correct base path
- `assets/*.js` - JavaScript bundles
- `assets/*.css` - CSS stylesheets

### Backend (`backend/dist/`)
- `server.js` - Compiled Express server
- `config/` - Database configuration
- `models/` - Mongoose models
- `routes/` - API route handlers

---

## 🔍 Troubleshooting

### Build fails?
```bash
# Clean and rebuild
rm -rf dist backend/dist node_modules
npm install
npm run build:all
```

### API 404 errors?
Check these files have correct paths:
- `src/lib/mongoService.ts` → `API = "/VRDS_BASELINE"`
- `backend/src/server.ts` → `BASE_PATH = "/VRDS_BASELINE"`

### MongoDB connection issues?
```bash
# Test MongoDB connection
mongosh "mongodb://localhost:27017/wildfire_study"
```

---

## 📚 Full Documentation

For detailed information, see [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)

---

## 🎯 Ready for Production?

Checklist:
- [x] Backend configured with BASE_PATH
- [x] Frontend built with correct base path
- [x] All routes use `/VRDS_BASELINE` prefix
- [x] MongoDB connection configured
- [x] Build scripts working
- [x] ES modules properly configured

**You're all set!** 🎉
