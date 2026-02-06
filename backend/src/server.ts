import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDatabase } from "./config/database";
import userSessionsRouter from "./routes/userSessions";
import valueEvolutionRouter from "./routes/valueEvolution";
// import cvrResponsesRouter from "./routes/cvrResponses";
// import apaReorderingsRouter from "./routes/apaReorderings";
import finalDecisionsRouter from "./routes/finalDecisions";
import sessionMetricsRouter from "./routes/sessionMetrics";
import sessionFeedbackRouter from "./routes/sessionFeedback";
import valueStabilityRouter from "./routes/valueStability";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));

app.get("/", (_req, res) => {
  res.json({ message: "Wildfire Study API", base: "/api" });
});

app.use("/api/user-sessions", userSessionsRouter);
app.use("/api/value-evolution", valueEvolutionRouter);
// app.use("/api/cvr-responses", cvrResponsesRouter);
// app.use("/api/apa-reorderings", apaReorderingsRouter);
app.use("/api/final-decisions", finalDecisionsRouter);
app.use("/api/session-metrics", sessionMetricsRouter);
app.use("/api/session-feedback", sessionFeedbackRouter);
app.use("/api/value-stability", valueStabilityRouter);

async function start() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 API on http://localhost:${PORT}`);
  });
}

start();
