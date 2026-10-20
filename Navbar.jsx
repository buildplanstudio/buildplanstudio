import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <path d="M4 28V12L16 4l12 8v16" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M12 28V18h8v10" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          Build Plan Studio
        </Link>

        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={close}>
              {l.label}
            </NavLink>
          ))}
          <div className="nav-auth">
            {user ? (
              <>
                <NavLink to="/dashboard" onClick={close}>
                  Dashboard
                </NavLink>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    logout();
                    close();
                    navigate("/");
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost" onClick={close}>
                  Log in
                </Link>
                <Link to="/signup" className="btn btn-primary" onClick={close}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
