import { useState, useEffect, useRef } from "react";
import logoImg from "./assets/logo.png";

/* ─── DESIGN TOKENS ──────────────────────────────────────── */
const T = {
  tealDark: "#1a6b7a",
  teal: "#2a8fa3",
  tealLight: "#3ab4cc",
  tealPale: "#e4f5f8",
  tealGlass: "rgba(26,107,122,0.08)",
  yellow: "#f5c800",
  yellowPale: "#fffadc",
  white: "#ffffff",
  offWhite: "#f7f9fa",
  gray100: "#eef1f2",
  gray200: "#d6dfe2",
  gray400: "#8fa8af",
  gray700: "#3a5a62",
  dark: "#0d2830",
};

/* ─── GLOBAL STYLES (injected once) ─────────────────────── */
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: ${T.offWhite};
    color: ${T.dark};
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${T.gray100}; }
  ::-webkit-scrollbar-thumb { background: ${T.tealDark}; border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes floatA {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%      { transform: translateY(-14px) rotate(1.5deg); }
  }
  @keyframes floatB {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50%      { transform: translateY(-10px) rotate(-1deg); }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes scaleIn {
    from { transform: scale(0.94); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.65s cubic-bezier(.16,1,.3,1), transform 0.65s cubic-bezier(.16,1,.3,1);
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* ─── HOOKS ──────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── LOGO ────────────────────────────────────────────────── */
function Logo({ height = 38, dark = false }) {
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

/* ─── NAVBAR ─────────────────────────────────────────────── */
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 60px", height: 88,
    background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
    backdropFilter: scrolled ? "blur(14px)" : "none",
    borderBottom: scrolled ? `0.5px solid ${T.gray200}` : "none",
    transition: "all 0.3s ease",
  };

  const links = ["الرئيسية", "خدماتنا", "أعمالنا", "لماذا نحن", "تواصل"];
  const ids = ["home", "services", "portfolio", "why", "contact"];

  const handleNav = (id) => {
    if (id === "home") {
      setPage("home");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
      return;
    }
    // If on request page, go home first then scroll
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
    <nav style={nav} dir="rtl">
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => setPage("home")}>
        <Logo height={70} />
      </div>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: 10 }}>
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
        style={{
          background: T.tealDark, color: T.white,
          border: "none", borderRadius: 50, padding: "12px 30px",
          fontFamily: "DM Sans", fontSize: 16, fontWeight: 500,
          cursor: "pointer", transition: "all 0.2s",
          boxShadow: "0 4px 18px rgba(26,107,122,0.28)",
        }}
        onMouseEnter={(e) => { e.target.style.background = T.teal; e.target.style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { e.target.style.background = T.tealDark; e.target.style.transform = "none"; }}
      >
        اطلب الآن
      </button>
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────────── */
function Hero({ setPage }) {
  useReveal();

  const heroWrap = {
    minHeight: "100vh", display: "flex", alignItems: "center",
    padding: "120px 40px 80px",
    background: `linear-gradient(145deg, ${T.white} 0%, ${T.tealPale} 55%, ${T.white} 100%)`,
    position: "relative", overflow: "hidden",
    direction: "rtl",
  };

  return (
    <section style={heroWrap}>
      {/* Watermark logo */}
      <img src={logoImg} alt="" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "75%", maxWidth: 900, opacity: 0.18, pointerEvents: "none", userSelect: "none" }} />
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: -80, left: -80, width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, rgba(245,200,0,0.12) 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, right: "5%", width: 260, height: 260, borderRadius: "50%", background: `radial-gradient(circle, rgba(42,143,163,0.10) 0%, transparent 70%)`, pointerEvents: "none" }} />
      {/* Spinning ring */}
      <div style={{ position: "absolute", top: "12%", left: "42%", width: 340, height: 340, border: `1.5px dashed ${T.gray200}`, borderRadius: "50%", animation: "spinSlow 28s linear infinite", pointerEvents: "none" }} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", maxWidth: 1400, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        {/* Left: text */}
        <div className="reveal" style={{ animationDelay: "0.05s" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.yellowPale, border: `1.5px solid ${T.yellow}`, borderRadius: 50, padding: "5px 16px", marginBottom: 24 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.yellow }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: "#7a6000" }}>مطبعة احترافية · نابلس، فلسطين</span>
          </div>

          <h1 style={{ fontFamily: "Syne", fontSize: "clamp(38px,5.5vw,68px)", fontWeight: 800, lineHeight: 1.12, color: T.dark, marginBottom: 20, letterSpacing: -1 }}>
            نطبع{" "}
            <span style={{ color: T.tealDark, display: "inline-block" }}>أفكارك</span>
            <br />
            <span style={{ color: T.tealDark, display: "inline-block" }}>ونحولها</span>
            {" "}لواقع
          </h1>

          <p style={{ fontSize: 17, color: T.gray700, lineHeight: 1.8, maxWidth: 440, marginBottom: 36 }}>
            من الهوية البصرية إلى الطباعة الاحترافية — نجمع بين الإبداع والتقنية لنقدم منتجاً يستحق الفخر.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={() => setPage("request")}
              style={{ background: T.tealDark, color: T.white, border: "none", borderRadius: 50, padding: "15px 36px", fontFamily: "DM Sans", fontSize: 16, fontWeight: 500, cursor: "pointer", boxShadow: `0 8px 28px rgba(26,107,122,0.3)`, transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 14px 36px rgba(26,107,122,0.38)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 8px 28px rgba(26,107,122,0.3)`; }}
            >
              اطلب الآن
            </button>
            <button
              onClick={() => setPage("portfolio")}
              style={{ background: "transparent", color: T.tealDark, border: `2px solid ${T.tealDark}`, borderRadius: 50, padding: "13px 28px", fontFamily: "DM Sans", fontSize: 16, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = T.tealPale; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              شاهد أعمالنا
            </button>
          </div>


        </div>

        {/* Right: floating cards */}
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="reveal" style={{ position: "relative", height: 440, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Main big card */}
      <div style={{ position: "absolute", top: 20, right: 0, width: 270, background: T.tealDark, borderRadius: 20, padding: "24px 24px 20px", animation: "floatA 5s ease-in-out infinite", boxShadow: "0 24px 60px rgba(26,107,122,0.28)" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {[T.yellow, "rgba(255,255,255,0.3)", "rgba(255,255,255,0.3)"].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>بطاقة أعمال</div>
        <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 800, color: T.yellow }}>محمد الأحمد</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>مدير تسويق</div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 12 }} />
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>+970 59 000 0000</div>
      </div>

      {/* Floating poster */}
      <div style={{ position: "absolute", bottom: 40, left: 0, width: 190, background: `linear-gradient(150deg,${T.teal},${T.tealDark})`, borderRadius: 18, padding: "20px 18px", animation: "floatB 6s ease-in-out infinite", boxShadow: "0 20px 50px rgba(42,143,163,0.25)" }}>
        <div style={{ fontFamily: "Syne", fontSize: 28, color: T.yellow, lineHeight: 1, marginBottom: 6 }}>✦</div>
        <div style={{ fontFamily: "Syne", fontSize: 15, fontWeight: 800, color: T.white, marginBottom: 4 }}>عرض خاص</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>تخفيضات تصل 50%</div>
        <div style={{ background: T.yellow, color: "#1a2e33", borderRadius: 50, padding: "5px 14px", fontSize: 10, fontWeight: 700, display: "inline-block" }}>احصل عليه</div>
      </div>

      {/* Badge */}
      <div style={{ position: "absolute", top: 0, left: 40, background: T.yellow, borderRadius: 50, padding: "8px 18px", fontFamily: "Syne", fontSize: 13, fontWeight: 800, color: "#1a2e33", boxShadow: "0 6px 20px rgba(245,200,0,0.35)", animation: "floatA 3.5s ease-in-out infinite" }}>
        ✦ جودة مضمونة
      </div>



      {/* Color palette swatch */}
      <div style={{ position: "absolute", top: "42%", left: "32%", display: "flex", gap: 5 }}>
        {[T.tealDark, T.teal, T.tealLight, T.yellow].map((c, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c, border: "2px solid white", boxShadow: "0 2px 6px rgba(0,0,0,0.12)", marginTop: i % 2 === 0 ? 0 : 6 }} />
        ))}
      </div>
    </div>
  );
}

/* ─── MARQUEE STRIP ──────────────────────────────────────── */
function Marquee() {
  const items = ["طباعة رقمية", "تصميم جرافيك", "هوية بصرية", "لافتات", "بطاقات أعمال", "طباعة ملابس", "بوسترات", "شعارات"];
  const repeated = [...items, ...items];
  return (
    <div style={{ background: T.tealDark, padding: "14px 0", overflow: "hidden", direction: "ltr" }}>
      <div style={{ display: "flex", gap: 0, animation: "marquee 22s linear infinite", width: "max-content" }}>
        {repeated.map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 28px", whiteSpace: "nowrap" }}>
            <span style={{ fontFamily: "DM Sans", fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>{t}</span>
            <span style={{ color: T.yellow, fontSize: 14 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SERVICES ───────────────────────────────────────────── */
/* Service SVG Icons */
function SvcIcon({ type, color = T.tealDark }) {
  const s = { width: 40, height: 40 };
  if (type === "design") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  );
  if (type === "print") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
    </svg>
  );
  if (type === "sign") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
    </svg>
  );
  if (type === "shirt") return (
    <svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2 12 5 8 2 3.62 3.46a2 2 0 00-1.34 1.42l-.76 3.04a1 1 0 00.97 1.24H6v10a2 2 0 002 2h8a2 2 0 002-2v-10h3.51a1 1 0 00.97-1.24l-.76-3.04a2 2 0 00-1.34-1.42z" />
    </svg>
  );
  return null;
}

const SERVICES = [
  { iconType: "design", name: "تصميم جرافيك", desc: "هوية بصرية، شعارات، وتصاميم إبداعية تعكس علامتك التجارية بشكل احترافي.", tag: "الأكثر طلباً", accent: T.tealDark },
  { iconType: "print", name: "طباعة رقمية", desc: "طباعة عالية الجودة على مختلف الأحجام والخامات بأسرع وقت ممكن.", tag: "سريع", accent: T.teal },
  { iconType: "sign", name: "لافتات وإعلانات", desc: "لافتات خارجية وداخلية، بانرات وإعلانات ضخمة بألوان زاهية ومقاومة.", tag: "خارجي", accent: T.tealDark },
  { iconType: "shirt", name: "طباعة ملابس", desc: "طباعة على تيشيرتات، هوديز، وجاكيتات بتقنيات متعددة ونتائج مبهرة.", tag: "مخصص", accent: T.teal },
];

function Services({ setPage }) {
  useReveal();
  return (
    <section id="services" style={{ padding: "100px 40px", background: T.offWhite, direction: "rtl" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader tag="خدماتنا" title="كل ما تحتاجه في مكان واحد" sub="من التصميم إلى التسليم — نغطي كل احتياجاتك التجارية والشخصية." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 20 }}>
          {SERVICES.map((s, i) => <ServiceCard key={i} s={s} i={i} setPage={setPage} />)}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, i, setPage }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? s.accent : T.white,
        border: `1.5px solid ${hovered ? s.accent : T.gray200}`,
        borderRadius: 20, padding: "28px 24px",
        cursor: "pointer", transition: "all 0.3s cubic-bezier(.16,1,.3,1)",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 20px 50px rgba(26,107,122,0.2)` : "none",
        animationDelay: `${i * 0.1}s`,
      }}
      onClick={() => setPage("request")}
    >
      <div style={{ marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 14, background: hovered ? "rgba(255,255,255,0.15)" : T.tealPale, transition: "background 0.3s" }}>
        <SvcIcon type={s.iconType} color={hovered ? T.white : T.tealDark} />
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ fontFamily: "Syne", fontSize: 17, fontWeight: 700, color: hovered ? T.white : T.dark }}>{s.name}</div>
        <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 50, background: hovered ? "rgba(255,255,255,0.18)" : T.tealPale, color: hovered ? T.yellow : T.tealDark }}>{s.tag}</span>
      </div>
      <p style={{ fontSize: 13, color: hovered ? "rgba(255,255,255,0.75)" : T.gray700, lineHeight: 1.7, marginBottom: 18 }}>{s.desc}</p>
      <div style={{ fontSize: 12, fontWeight: 500, color: hovered ? T.yellow : T.teal, display: "flex", alignItems: "center", gap: 4 }}>
        اطلب الآن <span>←</span>
      </div>
    </div>
  );
}

/* ─── PORTFOLIO ──────────────────────────────────────────── */
const PORTFOLIO = [
  { title: "هوية بصرية متكاملة", cat: "تصميم", bg: `linear-gradient(135deg,${T.tealPale},#b2dce4)`, mock: "identity" },
  { title: "بانر إعلاني 3×1 متر", cat: "طباعة", bg: `linear-gradient(135deg,${T.yellowPale},#fde68a)`, mock: "banner" },
  { title: "بطاقات أعمال فاخرة", cat: "طباعة", bg: `linear-gradient(135deg,#e8f4f7,${T.tealPale})`, mock: "bizcard" },
  { title: "لافتة محل تجاري", cat: "لافتات", bg: `linear-gradient(135deg,#f0f4f5,${T.gray100})`, mock: "sign" },
  { title: "مطبوعات مؤسسية", cat: "تصميم", bg: `linear-gradient(135deg,${T.tealDark},#0f4550)`, mock: "corp" },
  { title: "طباعة تيشيرتات", cat: "ملابس", bg: `linear-gradient(135deg,#fff8d6,#fde68a)`, mock: "shirt" },
];

function PortfolioMock({ type }) {
  if (type === "identity") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%", padding: 20 }}>
      <div style={{ background: T.tealDark, borderRadius: "50%", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "Syne", fontSize: 22, fontWeight: 800, color: T.yellow }}>A</span>
      </div>
      <div style={{ fontFamily: "Syne", fontSize: 13, fontWeight: 700, color: T.tealDark }}>ALORA BRAND</div>
      <div style={{ display: "flex", gap: 8 }}>
        {[T.tealDark, T.teal, T.yellow, "#f5f5f0"].map((c, i) => <div key={i} style={{ width: 20, height: 20, borderRadius: 6, background: c, border: "1.5px solid rgba(0,0,0,0.08)" }} />)}
      </div>
    </div>
  );
  if (type === "banner") return (
    <div style={{ background: T.tealDark, borderRadius: 10, padding: "14px 18px", width: "85%", textAlign: "center" }}>
      <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 800, color: T.yellow, marginBottom: 4 }}>عرض خاص</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", marginBottom: 10 }}>خصم 30% على الطباعة</div>
      <div style={{ background: T.yellow, borderRadius: 50, padding: "4px 14px", fontSize: 9, fontWeight: 700, color: "#1a2e33", display: "inline-block" }}>تواصل الآن</div>
    </div>
  );
  if (type === "bizcard") return (
    <div style={{ display: "flex", gap: 8 }}>
      {[{ bg: T.tealDark, nc: T.yellow, tc: "rgba(255,255,255,0.5)" }, { bg: T.white, nc: T.tealDark, tc: T.gray400, border: `1.5px solid ${T.gray200}` }].map((s, i) => (
        <div key={i} style={{ background: s.bg, border: s.border, borderRadius: 8, padding: "10px 12px", width: 110, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          <div style={{ fontFamily: "Syne", fontSize: 10, fontWeight: 700, color: s.nc, marginBottom: 2 }}>محمد الأحمد</div>
          <div style={{ fontSize: 8, color: s.tc, marginBottom: 6 }}>مدير تسويق</div>
          <div style={{ height: 1, background: s.nc, opacity: 0.25, marginBottom: 6 }} />
          <div style={{ fontSize: 7, color: s.tc }}>+970 59 000 0000</div>
        </div>
      ))}
    </div>
  );
  if (type === "sign") return (
    <div style={{ background: T.white, borderRadius: 10, padding: "14px 24px", textAlign: "center", border: `2px solid ${T.tealDark}`, borderTop: `6px solid ${T.tealDark}` }}>
      <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 800, color: T.tealDark }}>ALORA Store</div>
      <div style={{ fontSize: 10, color: T.gray400, marginTop: 3 }}>مفتوح 9ص – 9م</div>
    </div>
  );
  if (type === "corp") return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "Syne", fontSize: 28, fontWeight: 800, color: T.yellow, letterSpacing: 2 }}>ALORA</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: 4, marginTop: 2 }}>GRAPHIC</div>
    </div>
  );
  if (type === "shirt") return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 52, lineHeight: 1 }}>👕</div>
      <div style={{ background: T.tealDark, color: T.yellow, borderRadius: 50, padding: "4px 14px", fontSize: 10, fontWeight: 700, marginTop: 10, display: "inline-block" }}>طباعة رقمية</div>
    </div>
  );
  return null;
}

function Portfolio() {
  useReveal();
  const [active, setActive] = useState("الكل");
  const cats = ["الكل", "تصميم", "طباعة", "لافتات", "ملابس"];
  const filtered = active === "الكل" ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === active);
  const gridRef = useRef(null);

  // Re-observe .reveal elements when filter changes
  useEffect(() => {
    if (!gridRef.current) return;
    const els = gridRef.current.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active]);

  return (
    <section id="portfolio" style={{ padding: "100px 40px", background: T.white, direction: "rtl" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader tag="أعمالنا" title="معرض المشاريع المنجزة" sub="نفخر بتقديم أعمال تعكس مستوى الاحترافية والإبداع الذي نؤمن به." />
        {/* Filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
          {cats.map((c) => (
            <button key={c} onClick={() => setActive(c)} style={{ padding: "8px 20px", borderRadius: 50, border: `1.5px solid ${active === c ? T.tealDark : T.gray200}`, background: active === c ? T.tealDark : T.white, color: active === c ? T.white : T.gray700, fontFamily: "DM Sans", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>
              {c}
            </button>
          ))}
        </div>
        {/* Grid */}
        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 16 }}>
          {filtered.map((p, i) => (
            <div key={p.title} className="reveal" style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${T.gray200}`, background: T.white, cursor: "pointer", transition: "all 0.3s", animationDelay: `${i * 0.08}s` }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px rgba(26,107,122,0.14)`; e.currentTarget.style.borderColor = T.teal; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.gray200; }}
            >
              <div style={{ height: 170, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <PortfolioMock type={p.mock} />
                <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.45)", color: "#fff", fontSize: 10, padding: "3px 10px", borderRadius: 50 }}>{p.cat}</div>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 700, color: T.dark, marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: T.teal, display: "flex", alignItems: "center", gap: 4 }}>
                  عرض التفاصيل <span>←</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WHY US ─────────────────────────────────────────────── */
const WHY = [
  { num: "01", title: "جودة مضمونة", body: "أحدث تقنيات الطباعة وأجود الخامات لنتائج تفوق التوقعات في كل مشروع." },
  { num: "02", title: "تسليم سريع", body: "نلتزم بالمواعيد ونقدم خدمة تسليم خلال 24 ساعة عند الطلب." },
  { num: "03", title: "أسعار منافسة", body: "أفضل الأسعار في السوق مع الحفاظ على أعلى معايير الجودة دائماً." },
  { num: "04", title: "تصميم مخصص", body: "فريقنا الإبداعي يعمل معك لتحقيق رؤيتك بشكل يعكس هويتك تماماً." },
  { num: "05", title: "دعم متواصل", body: "نحن هنا قبل وأثناء وبعد تنفيذ مشروعك — خدمة عملاء احترافية." },
  { num: "06", title: "خامات صديقة", body: "أحبار وخامات صديقة للبيئة لأننا نؤمن بمسؤوليتنا تجاه مجتمعنا." },
];

function WhyUs() {
  useReveal();
  return (
    <section id="why" style={{ padding: "100px 40px", background: T.tealDark, direction: "rtl" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader tag="لماذا نحن" title="نفرق بالجودة والسرعة" sub="نجمع بين الإبداع والتقنية والخدمة الممتازة لنقدم لك تجربة لا مثيل لها." dark />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 18 }}>
          {WHY.map((w, i) => (
            <WhyCard key={i} w={w} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCard({ w, i }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
        border: `1.5px solid ${hovered ? T.yellow : "rgba(255,255,255,0.1)"}`,
        borderRadius: 20, padding: "28px 24px",
        transition: "all 0.3s cubic-bezier(.16,1,.3,1)",
        transform: hovered ? "translateY(-4px)" : "none",
        animationDelay: `${i * 0.09}s`,
        cursor: "default",
      }}
    >
      <div style={{ fontFamily: "Syne", fontSize: 28, fontWeight: 800, color: hovered ? T.yellow : "rgba(255,255,255,0.2)", marginBottom: 14, transition: "color 0.3s" }}>{w.num}</div>
      <div style={{ fontFamily: "Syne", fontSize: 16, fontWeight: 700, color: T.white, marginBottom: 10 }}>{w.title}</div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>{w.body}</p>
    </div>
  );
}

/* ─── PROCESS ────────────────────────────────────────────── */
function Process() {
  useReveal();
  const steps = [
    { n: "١", label: "تواصل معنا", desc: "شاركنا فكرتك عبر واتساب أو النموذج" },
    { n: "٢", label: "التصميم", desc: "فريقنا يعد التصميم المناسب لك" },
    { n: "٣", label: "الموافقة", desc: "تراجع وتوافق قبل الطباعة" },
    { n: "٤", label: "التسليم", desc: "نطبع ونسلم بأعلى جودة" },
  ];
  return (
    <section style={{ padding: "100px 40px", background: T.offWhite, direction: "rtl" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader tag="كيف نعمل" title="أربع خطوات بسيطة" sub="من الفكرة إلى المنتج النهائي بكل سلاسة." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, position: "relative" }}>
          {/* connector line */}
          <div style={{ position: "absolute", top: 32, right: "10%", left: "10%", height: 2, background: `linear-gradient(to left,${T.tealLight},${T.yellow})`, zIndex: 0, borderRadius: 1 }} />
          {steps.map((s, i) => (
            <div key={i} className="reveal" style={{ textAlign: "center", padding: "0 12px", position: "relative", zIndex: 1, animationDelay: `${i * 0.1}s` }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: i === 0 ? T.tealDark : T.white, border: `2px solid ${i === 0 ? T.tealDark : T.gray200}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", boxShadow: "0 4px 18px rgba(0,0,0,0.07)" }}>
                <span style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 800, color: i === 0 ? T.yellow : T.tealDark }}>{s.n}</span>
              </div>
              <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 700, color: T.dark, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: T.gray700, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────── */
function Contact() {
  useReveal();
  const info = [
    { icon: "📍", label: "الموقع", val: "نابلس، فلسطين" },
    { icon: "📞", label: "الهاتف", val: "+970 59 000 0000" },
    { icon: "✉️", label: "البريد", val: "info@aloragraphic.ps" },
    { icon: "🕐", label: "ساعات العمل", val: "السبت – الخميس، 9ص – 9م" },
  ];
  return (
    <section id="contact" style={{ padding: "100px 40px", background: T.white, direction: "rtl" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div className="reveal">
            <SectionHeader tag="تواصل معنا" title="هل لديك مشروع؟" sub="تواصل معنا وسنسعد بمساعدتك في تحقيق رؤيتك." noMargin />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 32 }}>
              {info.map((it, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: T.offWhite, borderRadius: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: T.tealPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{it.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: T.gray400, marginBottom: 1 }}>{it.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: T.dark }}>{it.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", msg: "" });
  const inp = {
    width: "100%", padding: "12px 14px",
    border: `1.5px solid ${T.gray200}`, borderRadius: 12,
    background: T.offWhite, fontFamily: "DM Sans", fontSize: 14,
    color: T.dark, outline: "none", direction: "rtl",
    transition: "border-color 0.2s",
  };
  const submit = () => {
    if (!form.name.trim()) return;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", phone: "", msg: "" });
  };
  return (
    <div className="reveal" style={{ background: T.offWhite, borderRadius: 24, padding: 32 }}>
      {sent && (
        <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: 12, padding: "12px 16px", fontSize: 13, color: "#166534", marginBottom: 20 }}>
          ✓ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>الاسم الكامل</label>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="أدخل اسمك" style={inp}
          onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>رقم الهاتف</label>
        <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="05X XXX XXXX" dir="ltr" style={inp}
          onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200} />
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>رسالتك</label>
        <textarea value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} placeholder="اشرح لنا ما تحتاجه..." style={{ ...inp, height: 100, resize: "none" }}
          onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200} />
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={submit} style={{ flex: 1, background: T.tealDark, color: T.white, border: "none", borderRadius: 50, padding: "13px", fontFamily: "DM Sans", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = T.teal; }} onMouseLeave={e => { e.currentTarget.style.background = T.tealDark; }}>
          إرسال الرسالة
        </button>
        <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", border: "none", borderRadius: 50, padding: "13px 20px", fontFamily: "DM Sans", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = ".85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.562 4.129 1.545 5.862L.057 23.8l5.94-1.488A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.654-.502-5.184-1.382l-.371-.22-3.867.968.987-3.876-.229-.381A10 10 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z" /></svg>
          واتساب
        </button>
      </div>
    </div>
  );
}

/* ─── REQUEST FORM ───────────────────────────────────────── */
function RequestPage() {
  useReveal();
  const [selSvcs, setSelSvcs] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", qty: "", budget: "", details: "" });
  const [sent, setSent] = useState(false);

  const svcs = ["تصميم جرافيك", "طباعة رقمية", "لافتات", "طباعة ملابس", "بطاقات أعمال", "هوية بصرية"];
  const toggle = (s) => setSelSvcs(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const submit = () => {
    if (!form.name.trim()) return;
    setSent(true);
    setSelSvcs([]);
    setForm({ name: "", phone: "", qty: "", budget: "", details: "" });
    setTimeout(() => setSent(false), 6000);
  };

  const inp = { width: "100%", padding: "12px 14px", border: `1.5px solid ${T.gray200}`, borderRadius: 12, background: T.offWhite, fontFamily: "DM Sans", fontSize: 14, color: T.dark, outline: "none", direction: "rtl", transition: "border-color 0.2s" };
  const sel = { ...inp, cursor: "pointer" };

  return (
    <section style={{ padding: "120px 40px 80px", minHeight: "100vh", background: T.offWhite, direction: "rtl" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div className="reveal">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.yellowPale, border: `1.5px solid ${T.yellow}`, borderRadius: 50, padding: "5px 16px", marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#7a6000" }}>طلب خدمة جديدة</span>
          </div>
          <h1 style={{ fontFamily: "Syne", fontSize: 36, fontWeight: 800, color: T.dark, marginBottom: 8, letterSpacing: -0.5 }}>أخبرنا بما تحتاجه</h1>
          <p style={{ fontSize: 15, color: T.gray700, marginBottom: 36 }}>سيتواصل معك فريقنا خلال ساعات قليلة بعرض سعر مفصّل.</p>
        </div>

        <div className="reveal" style={{ background: T.white, borderRadius: 24, padding: 36, border: `1px solid ${T.gray200}` }}>
          {sent && (
            <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: 12, padding: "14px 18px", fontSize: 14, color: "#166534", marginBottom: 24 }}>
              ✓ تم إرسال طلبك بنجاح! سنتواصل معك قريباً.
            </div>
          )}

          {/* Service chips */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.dark, marginBottom: 10 }}>اختر نوع الخدمة</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {svcs.map(s => (
                <button key={s} onClick={() => toggle(s)} style={{ padding: "8px 18px", borderRadius: 50, border: `1.5px solid ${selSvcs.includes(s) ? T.tealDark : T.gray200}`, background: selSvcs.includes(s) ? T.tealPale : T.white, color: selSvcs.includes(s) ? T.tealDark : T.gray700, fontFamily: "DM Sans", fontSize: 13, fontWeight: selSvcs.includes(s) ? 500 : 400, cursor: "pointer", transition: "all 0.18s" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Phone */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>الاسم الكامل</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="أدخل اسمك" style={inp}
                onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>رقم الهاتف</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="05X XXX XXXX" dir="ltr" style={inp}
                onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200} />
            </div>
          </div>

          {/* Qty & Budget */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>الكمية</label>
              <select value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} style={sel}
                onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200}>
                <option value="">اختر الكمية</option>
                {["50 قطعة", "100 قطعة", "250 قطعة", "500 قطعة", "كمية مخصصة"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>الميزانية</label>
              <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} style={sel}
                onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200}>
                <option value="">اختر النطاق</option>
                {["أقل من 100₪", "100 – 300₪", "300 – 600₪", "600 – 1000₪", "أكثر من 1000₪"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Details */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>تفاصيل الطلب</label>
            <textarea value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} placeholder="اشرح لنا ما تحتاجه بالتفصيل..." style={{ ...inp, height: 110, resize: "none" }}
              onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200} />
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={submit} style={{ flex: 1, background: T.tealDark, color: T.white, border: "none", borderRadius: 50, padding: "14px", fontFamily: "DM Sans", fontSize: 15, fontWeight: 500, cursor: "pointer", boxShadow: `0 6px 24px rgba(26,107,122,0.25)`, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.tealDark; e.currentTarget.style.transform = "none"; }}>
              إرسال الطلب
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", border: "none", borderRadius: 50, padding: "14px 24px", fontFamily: "DM Sans", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.562 4.129 1.545 5.862L.057 23.8l5.94-1.488A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.654-.502-5.184-1.382l-.371-.22-3.867.968.987-3.876-.229-.381A10 10 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z" /></svg>
              واتساب
            </button>
          </div>
        </div>

        {/* Info note */}
        <div className="reveal" style={{ marginTop: 16, background: T.tealPale, border: `1px solid rgba(26,107,122,0.2)`, borderRadius: 14, padding: "14px 18px" }}>
          <p style={{ fontSize: 13, color: T.gray700, lineHeight: 1.7 }}>
            يتم مراجعة الطلبات خلال ساعات العمل (9ص – 9م). سنرسل لك تأكيداً وسعراً تفصيلياً عبر واتساب أو الهاتف.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer({ setPage }) {
  const links = [
    { label: "خدماتنا", id: "services" },
    { label: "أعمالنا", id: "portfolio" },
    { label: "لماذا نحن", id: "why" },
    { label: "تواصل", id: "contact" },
    { label: "اطلب خدمة", id: "request" },
  ];
  return (
    <footer style={{ background: T.dark, color: "rgba(255,255,255,0.6)", padding: "32px 40px", direction: "rtl" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16, cursor: "pointer" }} onClick={() => setPage("home")}>
              <Logo height={120} dark />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, maxWidth: 240 }}>مطبعة وتصميم جرافيك احترافية في نابلس، فلسطين. نحول أفكارك إلى واقع مطبوع.</p>
          </div>
          <div>
            <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 700, color: T.white, marginBottom: 16 }}>روابط سريعة</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {links.map(l => (
                <button key={l.id} onClick={() => setPage(l.id)} style={{ background: "none", border: "none", textAlign: "right", fontSize: 13, color: "rgba(255,255,255,0.55)", cursor: "pointer", padding: 0, fontFamily: "DM Sans", transition: "color 0.18s" }}
                  onMouseEnter={e => e.target.style.color = T.yellow} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 700, color: T.white, marginBottom: 16 }}>تواصل معنا</div>
            {[["📍", "نابلس، فلسطين"], ["📞", "+970 59 000 0000"], ["✉️", "info@aloragraphic.ps"]].map(([ic, v]) => (
              <div key={v} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, fontSize: 13 }}>
                <span style={{ fontSize: 14 }}>{ic}</span><span style={{ color: "rgba(255,255,255,0.55)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12 }}>© 2026 ALORA Graphic. جميع الحقوق محفوظة.</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>صُمِّم باحتراف في فلسطين 🇵🇸</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── HELPER: SECTION HEADER ─────────────────────────────── */
function SectionHeader({ tag, title, sub, dark = false, noMargin = false }) {
  const tc = dark ? T.yellow : T.teal;
  const hc = dark ? T.white : T.dark;
  const sc = dark ? "rgba(255,255,255,0.6)" : T.gray700;
  return (
    <div className="reveal" style={{ marginBottom: noMargin ? 0 : 48 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 24, height: 3, background: T.yellow, borderRadius: 2 }} />
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: tc }}>{tag}</span>
      </div>
      <h2 style={{ fontFamily: "Syne", fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, color: hc, lineHeight: 1.2, marginBottom: 14, letterSpacing: -0.5 }}>{title}</h2>
      {sub && <p style={{ fontSize: 16, color: sc, maxWidth: 520, lineHeight: 1.75 }}>{sub}</p>}
    </div>
  );
}

/* ─── PAGE RENDERER ──────────────────────────────────────── */
function PageContent({ page, setPage }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);
  if (page === "request") return <RequestPage />;
  // home — all sections on one page
  return (
    <>
      <Hero setPage={setPage} />
      <Marquee />
      <Services setPage={setPage} />
      <Portfolio />
      <WhyUs />
      <Process />
      <Contact />
    </>
  );
}

/* ─── ROOT APP ───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");

  // Inject global CSS once
  useEffect(() => {
    const id = "alora-global-css";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = globalCSS;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      <main>
        <PageContent page={page} setPage={setPage} />
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}
