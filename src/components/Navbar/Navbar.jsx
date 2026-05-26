import { useState, useEffect } from "react";
import logoImg from "../../assets/logo.png";
import T from "../../utils/tokens";
import "./Navbar.css";

export function Logo({ height = 38, dark = false }) {
  return (
    <img
      src={logoImg}
      alt="ALORA Graphic"
      style={{
        height,
        width: "auto",
        objectFit: "contain",
        filter: dark ? "brightness(0) invert(1)" : "none",
      }}
    />
  );
}

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Track which section is currently visible */
  useEffect(() => {
    if (page !== "home") return;
    const sectionIds = ["contact", "why", "portfolio", "services"];
    const onScroll = () => {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  const links = ["الرئيسية", "خدماتنا", "أعمالنا", "لماذا نحن", "تواصل"];
  const ids = ["home", "services", "portfolio", "why", "contact"];

  const handleNav = (id) => {
    setMenuOpen(false);
    if (id === "home") {
      setPage("home");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
      return;
    }
    if (page !== "home") {
      setPage("home");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isActive = (id) => {
    if (page === "request") return false;
    return activeSection === id;
  };

  return (
    <nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${menuOpen ? "navbar--menu-open" : ""}`}
      dir="rtl"
      role="navigation"
      aria-label="التنقل الرئيسي"
    >
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => setPage("home")}>
        <Logo height={70} />
      </div>

      {/* Desktop links */}
      <div className="navbar__links">
        {links.map((l, i) => (
          <button
            key={l}
            onClick={() => handleNav(ids[i])}
            aria-label={`انتقل إلى ${l}`}
            style={{
              background: isActive(ids[i]) ? T.tealPale : "transparent",
              color: isActive(ids[i]) ? T.tealDark : T.gray700,
              border: "none", borderRadius: 12, padding: "10px 22px",
              fontFamily: "DM Sans", fontSize: 16, fontWeight: isActive(ids[i]) ? 600 : 400,
              cursor: "pointer", transition: "all 0.18s",
            }}
            onMouseEnter={(e) => { if (!isActive(ids[i])) e.target.style.background = T.gray100; }}
            onMouseLeave={(e) => { if (!isActive(ids[i])) e.target.style.background = "transparent"; }}
          >
            {l}
          </button>
        ))}
      </div>

      <button
        onClick={() => handleNav("contact")}
        className="navbar__cta"
        aria-label="اطلب خدمة الآن"
      >
        اطلب الآن
      </button>

      {/* Hamburger button (mobile) */}
      <button
        className="navbar__hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={menuOpen}
      >
        <span className={`navbar__hamburger-line ${menuOpen ? "open" : ""}`} />
        <span className={`navbar__hamburger-line ${menuOpen ? "open" : ""}`} />
        <span className={`navbar__hamburger-line ${menuOpen ? "open" : ""}`} />
      </button>

      {/* Mobile drawer */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {links.map((l, i) => (
          <button
            key={l}
            onClick={() => handleNav(ids[i])}
            className="navbar__mobile-link"
            style={{
              color: isActive(ids[i]) ? T.tealDark : T.gray700,
              fontWeight: isActive(ids[i]) ? 600 : 400,
            }}
          >
            {l}
          </button>
        ))}
        <button
          onClick={() => handleNav("contact")}
          className="navbar__mobile-cta"
        >
          اطلب الآن
        </button>
      </div>
    </nav>
  );
}
