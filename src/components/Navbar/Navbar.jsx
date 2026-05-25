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

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["الرئيسية", "خدماتنا", "أعمالنا", "لماذا نحن", "تواصل"];
  const ids = ["home", "services", "portfolio", "why", "contact"];

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

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} dir="rtl">
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => setPage("home")}>
        <Logo height={70} />
      </div>

      {/* Desktop links */}
      <div className="navbar__links">
        {links.map((l, i) => (
          <button
            key={l}
            onClick={() => handleNav(ids[i])}
            style={{
              background: page === ids[i] ? T.tealPale : "transparent",
              color: page === ids[i] ? T.tealDark : T.gray700,
              border: "none", borderRadius: 12, padding: "10px 22px",
              fontFamily: "DM Sans", fontSize: 16, fontWeight: page === ids[i] ? 600 : 400,
              cursor: "pointer", transition: "all 0.18s",
            }}
            onMouseEnter={(e) => { if (page !== ids[i]) e.target.style.background = T.gray100; }}
            onMouseLeave={(e) => { if (page !== ids[i]) e.target.style.background = "transparent"; }}
          >
            {l}
          </button>
        ))}
      </div>

      <button
        onClick={() => setPage("request")}
        className="navbar__cta"
      >
        اطلب الآن
      </button>
    </nav>
  );
}
