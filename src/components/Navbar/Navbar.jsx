import { useState, useEffect, useRef, useCallback } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [logoArrived, setLogoArrived] = useState(false);
  const floatingLogoRef = useRef(null);
  const navLogoRef = useRef(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Reset logoArrived when navigating to home
  useEffect(() => {
    if (page === "home") {
      setLogoArrived(false);
    }
  }, [page]);

  // Scroll-driven logo animation (mobile only)
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 24);

    if (!isMobile || !floatingLogoRef.current) return;

    const scrollY = window.scrollY;
    const SCROLL_START = 10;
    const SCROLL_END = 220;
    const progress = Math.min(1, Math.max(0, (scrollY - SCROLL_START) / (SCROLL_END - SCROLL_START)));

    // Eased progress for smoother feel
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    // Start position: centered in hero
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight * 0.27;
    const startScale = 1.0;
    const startOpacity = 0.6;

    // End position: navbar logo spot
    const endX = window.innerWidth - 55;
    const endY = 36;
    const endScale = 0.28;
    const endOpacity = 1;

    const x = startX + (endX - startX) * ease;
    const y = startY + (endY - startY) * ease;
    const scale = startScale + (endScale - startScale) * ease;
    const opacity = startOpacity + (endOpacity - startOpacity) * ease;

    const fl = floatingLogoRef.current;
    fl.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
    fl.style.opacity = opacity;

    if (progress >= 1 && !logoArrived) {
      setLogoArrived(true);
    } else if (progress < 0.95 && logoArrived) {
      setLogoArrived(false);
    }
  }, [isMobile, logoArrived]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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

  const showNavLogo = !isMobile || logoArrived || page !== "home";

  return (
    <>
      {/* Floating animated logo (mobile only, home page) */}
      {isMobile && page === "home" && (
        <div
          ref={floatingLogoRef}
          className="navbar__floating-logo"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 99,
            pointerEvents: "none",
            willChange: "transform, opacity",
            visibility: logoArrived ? "hidden" : "visible",
          }}
        >
          <img src={logoImg} alt="" style={{ height: 250, width: "auto" }} />
        </div>
      )}

      <nav
        className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${menuOpen ? "navbar--menu-open" : ""}`}
        dir="rtl"
        role="navigation"
        aria-label="التنقل الرئيسي"
      >
        <div
          ref={navLogoRef}
          className={`navbar__logo-wrap ${showNavLogo ? "navbar__logo-wrap--visible" : ""}`}
          style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative", zIndex: 110 }}
          onClick={() => setPage("home")}
        >
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
      </nav>

      {/* Mobile drawer – rendered outside nav so it covers the full screen */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`} dir="rtl">
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
    </>
  );
}
