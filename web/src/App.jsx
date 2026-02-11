import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState("");

  async function loadTasks() {
    setError("");
    const res = await fetch(`${API_BASE}/api/tasks`);
    if (!res.ok) throw new Error("Failed to load tasks");
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks().catch(() => setError("Could not load tasks"));
  }, []);

  async function addTask(e) {
    e.preventDefault();
    setError("");

    const name = taskName.trim();
    if (!name) return;

    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task_name: name }),
    });

    if (!res.ok) {
      setError("Could not add task");
      return;
    }

    const created = await res.json();
    setTasks((prev) => [created, ...prev]);
    setTaskName("");
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: 24, maxWidth: 520 }}>
      <h1>Tasks</h1>

      <form onSubmit={addTask} style={{ display: "flex", gap: 8 }}>
        <input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add a task..."
          style={{ flex: 1, padding: 10 }}
        />
        <button type="submit" style={{ padding: "10px 14px" }}>
          Add
        </button>
      </form>

      {error && <p style={{ marginTop: 12 }}>{error}</p>}

      <ul style={{ marginTop: 16, paddingLeft: 18 }}>
        {tasks.map((t) => (
          <li key={t.task_id}>
            <strong>{t.task_id}</strong>: {t.task_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
