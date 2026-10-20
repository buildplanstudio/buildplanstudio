import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand brand-light">Build Plan Studio</div>
          <p>Architecture design, 3D visualisation and layout plans for clients, builders and architects.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/services">Services</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/about">About</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} Build Plan Studio. All rights reserved.</div>
    </footer>
  );
}
