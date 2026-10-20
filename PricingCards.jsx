import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function PricingCards() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .pricing()
      .then((r) => setPlans(r.plans))
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="notice">Could not load pricing ({error}). Is the backend running?</p>;

  return (
    <div className="cards-3">
      {plans.map((p) => (
        <article key={p.id} className={`card price-card ${p.highlight ? "featured" : ""}`}>
          {p.highlight && <span className="badge">Most popular</span>}
          <h3>{p.name}</h3>
          <p className="muted">{p.audience}</p>
          <p className="price">
            {inr.format(p.price)} <small>{p.unit}</small>
          </p>
          <ul className="tick-list">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Link to="/signup" className={`btn ${p.highlight ? "btn-primary" : "btn-outline"}`}>
            Choose {p.name}
          </Link>
        </article>
      ))}
    </div>
  );
}
