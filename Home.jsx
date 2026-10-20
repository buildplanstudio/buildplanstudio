import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import ServiceGroups from "../components/ServiceGroups.jsx";
import PricingCards from "../components/PricingCards.jsx";

const steps = [
  { n: "01", title: "Share your ideas", text: "Sign up, choose who you are and tell us what you want: rooms, style, plot size, budget." },
  { n: "02", title: "Our team prepares the plan", text: "Designers and 3D artists turn your ideas into plans, visuals and approval drawings." },
  { n: "03", title: "Review and approve", text: "Track progress in your dashboard, request revisions, then approve the final files." },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section">
        <div className="container">
          <h2>Built for three kinds of people</h2>
          <p className="section-lead">Pick the path that fits you. Every path ends with a finished plan prepared by our team.</p>
          <ServiceGroups compact />
          <p className="center">
            <Link to="/services" className="link-arrow">
              View full service details →
            </Link>
          </p>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <h2>How it works</h2>
          <div className="cards-3">
            {steps.map((s) => (
              <article key={s.n} className="step">
                <span className="step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Simple pricing</h2>
          <p className="section-lead">Sample rates shown. Final quotes depend on plot size and scope.</p>
          <PricingCards />
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to see your idea on paper?</h2>
          <Link to="/signup" className="btn btn-light btn-lg">
            Create a free account
          </Link>
        </div>
      </section>
    </>
  );
}
