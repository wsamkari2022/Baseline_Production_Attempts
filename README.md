# VRDS Baseline - Wildfire Decision Simulation Interface

A comprehensive value-driven decision-making research platform designed for deployment at `moonlander.fit.edu/VRDS_BASELINE`.

## 🚀 Quick Start

```bash
# 1. Configure MongoDB connection
# Edit backend/.env and set your MongoDB URI

# 2. Build for production
npm run build:all

# 3. Start production server
npm run start:prod
```

Your application will be available at: **http://localhost:4004/VRDS_BASELINE**

**See [QUICK_START.md](./QUICK_START.md) for detailed instructions.**

---

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get up and running in 3 steps
- **[PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)** - Comprehensive deployment guide
- **[CONFIGURATION_SUMMARY.md](./CONFIGURATION_SUMMARY.md)** - Complete configuration reference
- **[MONGODB_MIGRATION.md](./MONGODB_MIGRATION.md)** - Database migration information

---

## 🏗️ Project Structure

```
project/
├── src/                           # Frontend React application
│   ├── App.tsx                    # Main app with routing
│   ├── components/                # Reusable components
│   ├── pages/                     # Page components
│   ├── lib/mongoService.ts        # API service layer
│   └── ...
├── backend/                       # Express.js backend
│   ├── src/
│   │   ├── server.ts             # Main server (PORT 4004)
│   │   ├── models/               # Mongoose models
│   │   ├── routes/               # API route handlers
│   │   └── config/               # Configuration
│   └── .env                      # Backend environment variables
├── dist/                         # Frontend build output
├── vite.config.ts                # Vite configuration
└── package.json                  # Project dependencies
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **TypeScript** - Type safety

---

## 📋 Available Scripts

### Production
```bash
npm run build:all      # Build frontend + backend
npm run start:prod     # Start production server
```

### Development
```bash
npm run dev:all        # Run both frontend (3004) and backend (4004)
npm run dev            # Frontend only
npm run server         # Backend only
```

### Individual Builds
```bash
npm run build:frontend # Build frontend only
npm run build:backend  # Build backend only
```

---

## 🌐 Deployment Configuration

### Production URL
- **Base URL**: `https://moonlander.fit.edu/VRDS_BASELINE`
- **API Endpoints**: `https://moonlander.fit.edu/VRDS_BASELINE/api/*`

### Ports
- **Backend**: 4004
- **Frontend Dev**: 3004
- **MongoDB**: 27017

### Base Path
All routes and assets are served under `/VRDS_BASELINE` subpath.

---

## 🔧 Configuration

### Backend Environment Variables
Create `backend/.env`:
```bash
MONGODB_URI=mongodb://your-host:27017/wildfire_study
PORT=4004
NODE_ENV=production
```

### Frontend Environment Variables
Create `.env`:
```bash
VITE_API_URL=/VRDS_BASELINE
```

---

## 🧪 Testing

### Health Check
```bash
curl http://localhost:4004/VRDS_BASELINE/api/health
```

Expected response:
```json
{
  "status": "ok",
  "basePath": "/VRDS_BASELINE"
}
```

### Test Data Persistence
1. Navigate to application
2. Fill out demographics form
3. Click "Begin Assessment"
4. Verify data saved in MongoDB `usersessions` collection

---

## 📊 API Endpoints

All endpoints are prefixed with `/VRDS_BASELINE/api/`:

- `POST /user-sessions` - Create user session
- `PATCH /user-sessions/:id` - Update session
- `POST /value-evolution` - Save value evolution
- `POST /cvr-responses` - Save CVR responses
- `POST /apa-reorderings` - Save APA reorderings
- `POST /scenario-interactions` - Save interactions
- `POST /baseline-values` - Save baseline values
- `POST /final-decisions` - Save decisions
- `POST /session-metrics` - Save metrics
- `POST /session-feedback` - Save feedback
- `POST /value-stability` - Save stability
- `GET /health` - Health check

---

## 🗄️ MongoDB Collections

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

---

## 🚦 Production Checklist

Before deploying:

- [ ] Update MongoDB URI in `backend/.env`
- [ ] Set `NODE_ENV=production` in `backend/.env`
- [ ] Run `npm run build:all`
- [ ] Test health endpoint
- [ ] Verify data saves to MongoDB
- [ ] Check browser console for errors
- [ ] Configure process manager (PM2)
- [ ] Set up MongoDB backups
- [ ] Configure reverse proxy (optional)

---

## 🐛 Troubleshooting

### Build Issues
```bash
# Clean and rebuild
rm -rf dist backend/dist node_modules
npm install
npm run build:all
```

### 404 Errors
- Check `VITE_API_URL` in `.env`
- Verify backend is running on port 4004
- Confirm base path in all configuration files

### MongoDB Connection
```bash
# Test connection
mongosh "mongodb://localhost:27017/wildfire_study"
```

**See [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) for detailed troubleshooting.**

---

## 📝 Key Features

- ✅ Production-ready configuration for subpath deployment
- ✅ MongoDB integration for data persistence
- ✅ ES modules support in backend
- ✅ Static file serving from Express
- ✅ SPA client-side routing support
- ✅ Development proxy for API calls
- ✅ CORS configured for production
- ✅ Health check monitoring endpoint
- ✅ Comprehensive error handling

---

## 🤝 Development

### Prerequisites
- Node.js 20+
- MongoDB 6+
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
cp backend/.env.example backend/.env

# Update backend/.env with your MongoDB URI

# Start development servers
npm run dev:all
```

### Development URLs
- Frontend: http://localhost:3004
- Backend: http://localhost:4004/VRDS_BASELINE/api/*

---

## 📄 License

This project is part of the VRDS research platform.

---

## 👥 Support

For deployment questions, see the documentation files:
- Technical setup: [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)
- Quick reference: [QUICK_START.md](./QUICK_START.md)
- Configuration: [CONFIGURATION_SUMMARY.md](./CONFIGURATION_SUMMARY.md)

---

## ✨ Production Status

**Status**: ✅ Ready for Production

All configurations have been verified and tested:
- Base path correctly set to `/VRDS_BASELINE`
- All API routes properly prefixed
- Static file serving configured
- MongoDB integration complete
- Build process verified

**Last Updated**: 2026-02-07
