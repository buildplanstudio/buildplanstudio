import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import publicRoutes from "./routes/public.js";

if (!process.env.JWT_SECRET) {
  console.error("Missing JWT_SECRET. Copy .env.example to .env and set a value.");
  process.exit(1);
}

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api", publicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.use((_req, res) => res.status(404).json({ error: "Not found" }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Build Plan Studio API running on http://localhost:${port}`));
