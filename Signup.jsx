import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const roles = [
  { id: "client", label: "Client / Home owner" },
  { id: "builder", label: "Builder / Developer" },
  { id: "architect", label: "Architect / Designer" },
];

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialRole = roles.some((r) => r.id === params.get("role")) ? params.get("role") : "client";

  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", password: "", role: initialRole });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signup(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container page-pad auth-wrap">
      <form className="form card" onSubmit={submit}>
        <h1>Create your account</h1>

        <fieldset className="role-pick">
          <legend>I am a…</legend>
          {roles.map((r) => (
            <label key={r.id} className={`role-option ${form.role === r.id ? "selected" : ""}`}>
              <input type="radio" name="role" value={r.id} checked={form.role === r.id} onChange={set("role")} />
              {r.label}
            </label>
          ))}
        </fieldset>

        <label>
          Full name
          <input value={form.name} onChange={set("name")} required />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={set("email")} required />
        </label>
        <label>
          Phone (optional)
          <input value={form.phone} onChange={set("phone")} />
        </label>
        {form.role !== "client" && (
          <label>
            Company / firm name
            <input value={form.company} onChange={set("company")} />
          </label>
        )}
        <label>
          Password (min 6 characters)
          <input type="password" minLength="6" value={form.password} onChange={set("password")} required />
        </label>

        {error && <p className="notice error">{error}</p>}
        <button className="btn btn-primary" disabled={busy}>
          {busy ? "Creating…" : "Sign up"}
        </button>
        <p className="muted">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
