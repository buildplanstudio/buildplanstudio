import { useEffect, useState } from "react";
import { api } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

// Services each customer type can request (mirrors backend/src/data/catalog.js)
const SERVICES_BY_ROLE = {
  client: [
    ["design", "Design"],
    ["3d", "3D Visualisation"],
    ["approval-layout", "Approval Layout Plan"],
  ],
  builder: [
    ["design", "Design"],
    ["3d", "3D Visualisation"],
    ["approval-layout", "Approval Layout Plan"],
    ["brochure", "Brochure"],
    ["3d-video", "3D Video"],
  ],
  architect: [
    ["plan", "Plan"],
    ["design", "Design"],
    ["brochure", "Brochure"],
    ["3d-video", "3D Video"],
  ],
};

const STATUSES = ["submitted", "in-review", "in-design", "revision", "approved", "delivered"];
const empty = { title: "", ideas: "", location: "", plotSize: "", budget: "", services: [] };

export default function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isAdmin = user.role === "admin";
  const options = SERVICES_BY_ROLE[user.role] || [];
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = () =>
    api
      .projects()
      .then((r) => setProjects(r.projects))
      .catch((e) => setError(e.message));

  useEffect(() => {
    load();
  }, []);

  function toggleService(id) {
    setForm((f) => ({
      ...f,
      services: f.services.includes(id) ? f.services.filter((s) => s !== id) : [...f.services, id],
    }));
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api.createProject(form);
      setForm(empty);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function changeStatus(id, status) {
    try {
      await api.updateStatus(id, { status });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container page-pad">
      <h1>Welcome, {user.name.split(" ")[0]}</h1>
      <p className="muted">
        Signed in as <strong>{user.role}</strong>
      </p>

      <div className="dash-grid">
        {!isAdmin && (
          <form className="form card" onSubmit={submit}>
            <h2>Share your ideas</h2>
            <label>
              Project title
              <input value={form.title} onChange={set("title")} placeholder="e.g. 3BHK house, 30x40 plot" required />
            </label>
            <label>
              Your ideas
              <textarea
                rows="5"
                value={form.ideas}
                onChange={set("ideas")}
                placeholder="Rooms, style, vastu, parking, anything you imagine…"
                required
              />
            </label>
            <div className="two-col">
              <label>
                Location
                <input value={form.location} onChange={set("location")} />
              </label>
              <label>
                Plot size
                <input value={form.plotSize} onChange={set("plotSize")} placeholder="30 x 40 ft" />
              </label>
            </div>
            <label>
              Budget (optional)
              <input value={form.budget} onChange={set("budget")} />
            </label>

            <fieldset className="service-pick">
              <legend>What should our team prepare?</legend>
              {options.map(([id, label]) => (
                <label key={id} className="check">
                  <input type="checkbox" checked={form.services.includes(id)} onChange={() => toggleService(id)} />
                  {label}
                </label>
              ))}
            </fieldset>

            {error && <p className="notice error">{error}</p>}
            <button className="btn btn-primary" disabled={busy}>
              {busy ? "Sending…" : "Send to our team"}
            </button>
          </form>
        )}

        <section className={isAdmin ? "full" : ""}>
          <h2>{isAdmin ? "All project requests" : "Your projects"}</h2>
          {isAdmin && error && <p className="notice error">{error}</p>}
          {projects.length === 0 && <p className="muted">No projects yet.</p>}
          {projects.map((p) => (
            <article key={p.id} className="card project">
              <header>
                <h3>{p.title}</h3>
                <span className={`pill pill-${p.status}`}>{p.status}</span>
              </header>
              <p>{p.ideas}</p>
              <p className="muted">
                {[p.location, p.plotSize, p.budget].filter(Boolean).join(" · ")}
                {p.services.length > 0 && <> — {p.services.join(", ")}</>}
              </p>
              {isAdmin && (
                <label className="inline">
                  Status
                  <select value={p.status} onChange={(e) => changeStatus(p.id, e.target.value)}>
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              )}
              <ol className="timeline">
                {p.updates.map((u, i) => (
                  <li key={i}>
                    <time>{new Date(u.at).toLocaleDateString()}</time> {u.note}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
