import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export default function App() {
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    fetch(`${API_BASE}/api/message`)
      .then((r) => r.json())
      .then((d) => setMsg(d.message))
      .catch(() => setMsg("Failed to reach API"));
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>My Render Full-Stack App</h1>
      <p>{msg}</p>
    </div>
  );
}
