import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Architecture · 3D Visualisation · Layout Plans</p>
          <h1>You share the idea. We draw the plan.</h1>
          <p className="lead">
            Whether you are building your own home, developing a project or running an architecture practice, send us
            your ideas. Our design team prepares the plan, the 3D visuals and the approval drawings.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Start your project
            </Link>
            <Link to="/services" className="btn btn-outline btn-lg">
              See our services
            </Link>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <svg viewBox="0 0 400 320" role="img">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity=".12" />
              </pattern>
            </defs>
            <rect width="400" height="320" fill="url(#grid)" />
            <g fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="50" y="50" width="300" height="220" />
              <path d="M50 150H190M190 50V150M190 210V270M190 210H260M260 210V150M260 150H350" />
              <path d="M120 150a30 30 0 0 1 30 -30" strokeOpacity=".5" />
              <path d="M190 190a20 20 0 0 1 20 20" strokeOpacity=".5" />
            </g>
            <g fontSize="11" fill="currentColor" fontFamily="Inter, sans-serif" opacity=".7">
              <text x="95" y="105">LIVING</text>
              <text x="255" y="105">BEDROOM</text>
              <text x="85" y="215">KITCHEN</text>
              <text x="290" y="215">BATH</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
