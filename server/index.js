import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

// In production on Render, set CORS to your frontend URL.
// For local dev, allow localhost.
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin, credentials: true }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/api/message", (_req, res) => {
  res.json({ message: "Hello from the API 👋" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API listening on ${port}`));
