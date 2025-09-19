// src/components/Nav.jsx
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { services } from "../data/servicesData";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(null); // "fencing" | "gates" | null
  const wrapRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const fencingSlugs = Object.keys(services).filter((s) => s !== "gates");
  const gateSlugs = ["gates"];

  const closeAll = () => {
    setMobileOpen(false);
    setExpanded(null);
    document.body.classList.add("menu-closing");
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    requestAnimationFrame(() => {
      setTimeout(() => document.body.classList.remove("menu-closing"), 300);
    });
  };

  // Click handler that closes first, then navigates
  const handleNav = (to) => (e) => {
    // let typical new-tab / modifier clicks behave normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    closeAll();
    // navigate after the close re-render
    setTimeout(() => navigate(to), 0);
  };

  // outside click + ESC
  useEffect(() => {
    const onClick = (e) => {
      if (!wrapRef.current?.contains(e.target)) closeAll();
    };
    const onKey = (e) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev || "";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  // close on route change (covers back/forward, etc.)
  useEffect(() => {
    closeAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleSection = (key) => {
    setExpanded((cur) => (cur === key ? null : key));
  };

  return (
    <header className="site-header" ref={wrapRef}>
      <nav className="nav container">
        <Link
          to="/"
          className="nav-home"
          aria-label="Home"
          onClick={handleNav("/")}
        >
          <img src="/logo green.png" alt="D Ramos Enterprises LLC" className="nav-logo" />
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          {/* FENCING */}
          <div className={`dd ${expanded === "fencing" ? "open" : ""}`}>
            <button
              className="dd-toggle"
              type="button"
              aria-haspopup="true"
              aria-expanded={expanded === "fencing"}
              onClick={() => toggleSection("fencing")}
            >
              Fencing <span className="chev">▼</span>
            </button>
            <div className="dd-menu" role="menu">
              {fencingSlugs.map((slug) => {
                const to = `/services/${services[slug].slug}`;
                return (
                  <NavLink
                    key={slug}
                    to={to}
                    className="dd-item"
                    onClick={handleNav(to)}
                  >
                    {services[slug].title}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* GATES */}
          <div className={`dd ${expanded === "gates" ? "open" : ""}`}>
            <button
              className="dd-toggle"
              type="button"
              aria-haspopup="true"
              aria-expanded={expanded === "gates"}
              onClick={() => toggleSection("gates")}
            >
              Gates <span className="chev">▼</span>
            </button>
            <div className="dd-menu" role="menu">
              {gateSlugs.map((slug) => {
                const to = `/services/${services[slug].slug}`;
                return (
                  <NavLink
                    key={slug}
                    to={to}
                    className="dd-item"
                    onClick={handleNav(to)}
                  >
                    {services[slug].title}
                  </NavLink>
                );
              })}
            </div>
          </div>

          <NavLink to="/portfolio" onClick={handleNav("/portfolio")}>Portfolio</NavLink>
          <NavLink to="/contact"   onClick={handleNav("/contact")}>Contact</NavLink>
        </div>

        {/* Hamburger — visible on mobile only via CSS */}
        <button
          className={`nav-toggle ${mobileOpen ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#203c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <span className="burger" />
          )}
        </button>
      </nav>

      {/* MOBILE DROPDOWN PANEL */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`} role="menu" aria-hidden={!mobileOpen}>
        <div className="mobile-card">
          <NavLink to="/" className="mm-row" onClick={handleNav("/")}>
            <span className="mm-text">Home</span>
          </NavLink>

          {/* Fencing (expandable) */}
          <button
            className="mm-row mm-toggle"
            onClick={() => toggleSection("fencing")}
            aria-expanded={expanded === "fencing"}
            aria-controls="sub-fencing"
            type="button"
          >
            <span className="mm-text strong">Fencing</span>
            <span className="mm-icon">{expanded === "fencing" ? "×" : "+"}</span>
          </button>
          <div id="sub-fencing" className={`mm-sub ${expanded === "fencing" ? "show" : ""}`}>
            {fencingSlugs.map((slug) => {
              const to = `/services/${services[slug].slug}`;
              return (
                <NavLink
                  key={slug}
                  to={to}
                  className="mm-sublink"
                  onClick={handleNav(to)}
                >
                  {services[slug].title}
                </NavLink>
              );
            })}
          </div>

          {/* Gates (expandable) */}
          <button
            className="mm-row mm-toggle"
            onClick={() => toggleSection("gates")}
            aria-expanded={expanded === "gates"}
            aria-controls="sub-gates"
            type="button"
          >
            <span className="mm-text strong">Gates</span>
            <span className="mm-icon">{expanded === "gates" ? "×" : "+"}</span>
          </button>
          <div id="sub-gates" className={`mm-sub ${expanded === "gates" ? "show" : ""}`}>
            {gateSlugs.map((slug) => {
              const to = `/services/${services[slug].slug}`;
              return (
                <NavLink
                  key={slug}
                  to={to}
                  className="mm-sublink"
                  onClick={handleNav(to)}
                >
                  {services[slug].title}
                </NavLink>
              );
            })}
          </div>

          <NavLink to="/portfolio" className="mm-row" onClick={handleNav("/portfolio")}>
            <span className="mm-text">Portfolio</span>
          </NavLink>

          <NavLink to="/contact" className="mm-row" onClick={handleNav("/contact")}>
            <span className="mm-text">Contact Us</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
