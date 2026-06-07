import { useState, useEffect, useRef, useCallback } from "react";
import logoImg from "../../assets/logo.png";
import { useLang } from "../../utils/LangContext";
import "./Navbar.css";

export function Logo({ height = 38, dark = false }) {
  return (
    <img
      src={logoImg}
      alt="ALORA Graphic"
      className={`navbar__logo-img ${dark ? "navbar__logo-img--dark" : ""}`}
      style={{ height }}
    />
  );
}

export default function Navbar({ page, setPage }) {
  const { t, dir, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [logoArrived, setLogoArrived] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const floatingLogoRef = useRef(null);
  const navLogoRef = useRef(null);
  const lastScrollY = useRef(0);
  const heroHeight = useRef(0);

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
      requestAnimationFrame(() => setLogoArrived(false));
    }
  }, [page]);

  // Measure hero height
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (hero) {
      heroHeight.current = hero.offsetHeight;
    }
  }, [page]);

  // Scroll-driven logo animation + hide/show navbar (mobile only)
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrolled(currentScrollY > 24);

    // Mobile: hide/show navbar based on scroll direction (Facebook-style)
    if (isMobile && heroHeight.current > 0) {
      const pastHero = currentScrollY > heroHeight.current;
      if (pastHero) {
        if (currentScrollY > lastScrollY.current + 5) {
          // Scrolling down → hide
          setNavHidden(true);
        } else if (currentScrollY < lastScrollY.current - 5) {
          // Scrolling up → show
          setNavHidden(false);
        }
      } else {
        setNavHidden(false);
      }
    }
    lastScrollY.current = currentScrollY;

    // Logo animation
    if (!isMobile || !floatingLogoRef.current) return;

    const SCROLL_START = 10;
    const SCROLL_END = 220;
    const progress = Math.min(1, Math.max(0, (currentScrollY - SCROLL_START) / (SCROLL_END - SCROLL_START)));

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
    const endX = dir === "rtl" ? window.innerWidth - 55 : 55;
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
  }, [isMobile, logoArrived, dir]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    const rafId = requestAnimationFrame(handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
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

  const links = t("navbar.links");
  const ids = ["services", "portfolio", "why", "contact"];

  const handleNav = (id) => {
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
          style={{ visibility: logoArrived ? "hidden" : "visible" }}
        >
          <img src={logoImg} alt="" className="navbar__floating-logo-img" />
        </div>
      )}

      <nav
        className={`navbar ${scrolled ? "navbar--scrolled" : ""} ${navHidden ? "navbar--hidden" : ""}`}
        dir={dir}
        role="navigation"
        aria-label={lang === "ar" ? "التنقل الرئيسي" : "Main Navigation"}
      >
        <div
          ref={navLogoRef}
          className={`navbar__logo-wrap-base navbar__logo-wrap ${showNavLogo ? "navbar__logo-wrap--visible" : ""}`}
          onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <Logo height={70} />
        </div>

        {/* Desktop links */}
        <div className="navbar__links">
          {links.map((l, i) => (
            <button
              key={ids[i]}
              onClick={() => handleNav(ids[i])}
              aria-label={lang === "ar" ? `انتقل إلى ${l}` : `Go to ${l}`}
              className={`navbar__link-btn ${isActive(ids[i]) ? "navbar__link-btn--active" : ""}`}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleNav("contact")}
          className="navbar__cta"
          aria-label={lang === "ar" ? "اطلب خدمة الآن" : "Order a service now"}
        >
          {t("navbar.cta")}
        </button>

        {/* Mobile inline links */}
        <div className={`navbar__mobile-links ${showNavLogo ? "navbar__mobile-links--logo-visible" : ""}`}>
          {links.map((l, i) => (
            <button
              key={ids[i]}
              onClick={() => handleNav(ids[i])}
              className={`navbar__mobile-link-inline ${isActive(ids[i]) ? "navbar__mobile-link-inline--active" : ""}`}
            >
              {l}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
