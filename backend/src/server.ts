import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDatabase } from "./config/database.js";
import userSessionsRouter from "./routes/userSessions.js";
import valueEvolutionRouter from "./routes/valueEvolution.js";
import finalDecisionsRouter from "./routes/finalDecisions.js";
import sessionMetricsRouter from "./routes/sessionMetrics.js";
import sessionFeedbackRouter from "./routes/sessionFeedback.js";
import valueStabilityRouter from "./routes/valueStability.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
const BASE_PATH = "/VRDS_BASELINE";
const PORT = Number(process.env.PORT || 4004);
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(cors({
  origin: NODE_ENV === "production"
    ? ["https://moonlander.fit.edu", "http://moonlander.fit.edu", "http://localhost:3004", "http://127.0.0.1:3004"]
    : ["http://localhost:3004", "http://127.0.0.1:3004", "http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));

// Serve static files from frontend build in production
if (NODE_ENV === "production") {
  const frontendDistPath = path.resolve(__dirname, "..", "..", "dist");
  app.use(BASE_PATH, express.static(frontendDistPath));
}

// Root endpoint
app.get("/", (_req, res) => {
  res.json({ message: "Wildfire Study API", basePath: BASE_PATH, api: `${BASE_PATH}/api` });
});

// Health check endpoint
app.get(`${BASE_PATH}/api/health`, (_req, res) => {
  res.json({ status: "ok", basePath: BASE_PATH });
});

// API routes
app.use(`${BASE_PATH}/api/user-sessions`, userSessionsRouter);
app.use(`${BASE_PATH}/api/value-evolution`, valueEvolutionRouter);
app.use(`${BASE_PATH}/api/final-decisions`, finalDecisionsRouter);
app.use(`${BASE_PATH}/api/session-metrics`, sessionMetricsRouter);
app.use(`${BASE_PATH}/api/session-feedback`, sessionFeedbackRouter);
app.use(`${BASE_PATH}/api/value-stability`, valueStabilityRouter);

// Fallback to index.html for client-side routing in production
if (NODE_ENV === "production") {
  const frontendDistPath = path.resolve(__dirname, "..", "..", "dist");
  app.get(`${BASE_PATH}/*`, (_req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

async function start() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
    console.log(`📁 Base path: ${BASE_PATH}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
  });
}

start();
