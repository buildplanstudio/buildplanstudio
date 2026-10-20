import { useState } from "react";
import { api } from "../api/client.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus({ type: "", text: "" });
    try {
      await api.contact(form);
      setStatus({ type: "ok", text: "Thank you! We will get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container page-pad narrow">
      <h1>Contact us</h1>
      <p className="section-lead">Questions about a project or a custom quote? Send us a message.</p>
      <form className="form" onSubmit={submit}>
        <label>
          Name
          <input value={form.name} onChange={set("name")} required />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={set("email")} required />
        </label>
        <label>
          Message
          <textarea rows="5" value={form.message} onChange={set("message")} required />
        </label>
        {status.text && <p className={status.type === "ok" ? "notice ok" : "notice error"}>{status.text}</p>}
        <button className="btn btn-primary" disabled={busy}>
          {busy ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
