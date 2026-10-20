import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";

// Shows the three customer types and what each one gets.
export default function ServiceGroups({ compact = false }) {
  const [types, setTypes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .services()
      .then((r) => setTypes(r.userTypes))
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="notice">Could not load services ({error}). Is the backend running?</p>;

  return (
    <div className="cards-3">
      {types.map((t) => (
        <article key={t.id} className="card">
          <h3>{t.title}</h3>
          <p>{t.summary}</p>
          <ul className="tick-list">
            {t.services.map((s) => (
              <li key={s.id}>
                <strong>{s.name}</strong>
                {!compact && <span>{s.description}</span>}
              </li>
            ))}
          </ul>
          <Link to={`/signup?role=${t.id}`} className="btn btn-outline">
            Sign up as {t.id}
          </Link>
        </article>
      ))}
    </div>
  );
}
