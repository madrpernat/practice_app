import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(express.json());

// CORS: allow local dev OR your deployed frontend
const allowedOrigin =
  process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.get("/health", (_req, res) => res.json({ ok: true }));

// ✅ GET all tasks
app.get("/api/tasks", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT task_id, task_name FROM tasks ORDER BY task_id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/tasks error:", err);
    res.status(500).json({ error: "Failed to load tasks" });
  }
});

// ✅ POST a new task
app.post("/api/tasks", async (req, res) => {
  try {
    const { task_name } = req.body;

    if (!task_name || typeof task_name !== "string" || !task_name.trim()) {
      return res.status(400).json({ error: "task_name is required" });
    }

    const result = await pool.query(
      "INSERT INTO tasks (task_name) VALUES ($1) RETURNING task_id, task_name",
      [task_name.trim()]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /api/tasks error:", err);
    res.status(500).json({ error: "Failed to add task" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API listening on ${port}`));
