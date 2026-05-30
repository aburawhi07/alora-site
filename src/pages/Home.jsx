import { useState, useEffect, useRef } from "react";
import T from "../utils/tokens";
import useReveal from "../hooks/useReveal";
import Hero from "../components/Hero/Hero";
import { useLang } from "../utils/LangContext";
import "./Home.css";

/* ─── HELPER: SECTION HEADER ─────────────────────────────── */
export function SectionHeader({ tag, title, sub, dark = false, noMargin = false }) {
  const tc = dark ? T.yellow : T.teal;
  const hc = dark ? T.white : T.dark;
  const sc = dark ? "rgba(255,255,255,0.6)" : T.gray700;
  return (
    <div className="reveal" style={{ marginBottom: noMargin ? 0 : 48 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ width: 40, height: 4, background: T.yellow, borderRadius: 2 }} />
        <span style={{ fontSize: 25, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: tc }}>{tag}</span>
      </div>
      <h2 style={{ fontFamily: "Syne", fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, color: hc, lineHeight: 1.2, marginBottom: 14, letterSpacing: -0.5 }}>{title}</h2>
      {sub && <p style={{ fontSize: 16, color: sc, maxWidth: 520, lineHeight: 1.75 }}>{sub}</p>}
    </div>
  );
}

/* ─── MARQUEE STRIP ──────────────────────────────────────── */
function Marquee() {
  const { t } = useLang();
  const items = t("marquee.items");
  const repeated = [...items, ...items];
  return (
    <div style={{ background: T.tealDark, padding: "16px 0", overflow: "hidden", direction: "ltr" }}>
      <div style={{ display: "flex", gap: 0, animation: "marquee 22s linear infinite", width: "max-content" }}>
        {repeated.map((txt, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 30, padding: "0 25px", whiteSpace: "nowrap" }}>
            <span style={{ fontFamily: "DM Sans", fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>{txt}</span>
            <span style={{ color: T.yellow, fontSize: 18 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SERVICES ───────────────────────────────────────────── */
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

const ICON_TYPES = ["design", "print", "sign", "shirt"];
const ACCENTS = [T.tealDark, T.teal, T.tealDark, T.teal];

function ServiceCard({ s, i, setPage, iconType, accent }) {
  const { t } = useLang();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? accent : T.white,
        border: `1.5px solid ${hovered ? accent : T.gray200}`,
        borderRadius: 20, padding: "28px 24px",
        cursor: "pointer", transition: "all 0.3s cubic-bezier(.16,1,.3,1)",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 20px 50px rgba(26,107,122,0.2)` : "none",
        animationDelay: `${i * 0.1}s`,
      }}
      onClick={() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <div style={{ marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 14, background: hovered ? "rgba(255,255,255,0.15)" : T.tealPale, transition: "background 0.3s" }}>
        <SvcIcon type={iconType} color={hovered ? T.white : T.tealDark} />
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ fontFamily: "Syne", fontSize: 17, fontWeight: 700, color: hovered ? T.white : T.dark }}>{s.name}</div>
        <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 50, background: hovered ? "rgba(255,255,255,0.18)" : T.tealPale, color: hovered ? T.yellow : T.tealDark }}>{s.tag}</span>
      </div>
      <p style={{ fontSize: 13, color: hovered ? "rgba(255,255,255,0.75)" : T.gray700, lineHeight: 1.7, marginBottom: 18 }}>{s.desc}</p>
      <div style={{ fontSize: 12, fontWeight: 500, color: hovered ? T.yellow : T.teal, display: "flex", alignItems: "center", gap: 4 }}>
        {t("services.cta")} <span>←</span>
      </div>
    </div>
  );
}

function Services({ setPage }) {
  useReveal();
  const { t, lang, dir } = useLang();
  const serviceItems = t("services.items");

  // Map translated items to include iconType and accent
  const items = serviceItems.map((item, i) => ({
    name: item.name,
    desc: item.desc,
    tag: item.tag,
    iconType: ICON_TYPES[i],
    accent: ACCENTS[i],
  }));

  return (
    <section id="services" className="section" style={{ background: T.offWhite, direction: dir }}>
      <div className="section__inner">
        <SectionHeader tag={t("services.tag")} title={t("services.title")} sub={t("services.sub")} />
        <div className="services-grid">
          {items.map((s, i) => <ServiceCard key={i} s={s} i={i} setPage={setPage} iconType={s.iconType} accent={s.accent} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── PORTFOLIO ──────────────────────────────────────────── */

const PORTFOLIO_BG = [
  `linear-gradient(135deg,${T.tealPale},#b2dce4)`,
  `linear-gradient(135deg,${T.yellowPale},#fde68a)`,
  `linear-gradient(135deg,#e8f4f7,${T.tealPale})`,
  `linear-gradient(135deg,#f0f4f5,${T.gray100})`,
  `linear-gradient(135deg,${T.tealDark},#0f4550)`,
  `linear-gradient(135deg,#fff8d6,#fde68a)`,
];
const PORTFOLIO_MOCKS = ["identity", "banner", "bizcard", "sign", "corp", "shirt"];

function PortfolioMock({ type }) {
  const { t } = useLang();
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
      <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 800, color: T.yellow, marginBottom: 4 }}>{t("portfolioMocks.specialOffer")}</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", marginBottom: 10 }}>{t("portfolioMocks.discount")}</div>
      <div style={{ background: T.yellow, borderRadius: 50, padding: "4px 14px", fontSize: 9, fontWeight: 700, color: "#1a2e33", display: "inline-block" }}>{t("portfolioMocks.contactNow")}</div>
    </div>
  );
  if (type === "bizcard") return (
    <div style={{ display: "flex", gap: 8 }}>
      {[{ bg: T.tealDark, nc: T.yellow, tc: "rgba(255,255,255,0.5)" }, { bg: T.white, nc: T.tealDark, tc: T.gray400, border: `1.5px solid ${T.gray200}` }].map((s, i) => (
        <div key={i} style={{ background: s.bg, border: s.border, borderRadius: 8, padding: "10px 12px", width: 110, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          <div style={{ fontFamily: "Syne", fontSize: 10, fontWeight: 700, color: s.nc, marginBottom: 2 }}>{t("portfolioMocks.name")}</div>
          <div style={{ fontSize: 8, color: s.tc, marginBottom: 6 }}>{t("portfolioMocks.role")}</div>
          <div style={{ height: 1, background: s.nc, opacity: 0.25, marginBottom: 6 }} />
          <div style={{ fontSize: 7, color: s.tc }}>+970 59 000 0000</div>
        </div>
      ))}
    </div>
  );
  if (type === "sign") return (
    <div style={{ background: T.white, borderRadius: 10, padding: "14px 24px", textAlign: "center", border: `2px solid ${T.tealDark}`, borderTop: `2px solid ${T.tealDark}` }}>
      <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 800, color: T.tealDark }}>ALORA Store</div>
      <div style={{ fontSize: 10, color: T.gray400, marginTop: 3 }}>{t("portfolioMocks.storeHours")}</div>
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
      <div style={{ background: T.tealDark, color: T.yellow, borderRadius: 50, padding: "4px 14px", fontSize: 10, fontWeight: 700, marginTop: 10, display: "inline-block" }}>{t("portfolioMocks.digitalPrint")}</div>
    </div>
  );
  return null;
}

function Portfolio() {
  useReveal();
  const { t, lang, dir } = useLang();
  const cats = t("portfolio.cats");
  const portfolioItems = t("portfolio.items");
  const [active, setActive] = useState(0); // track by index for language safety
  const filtered = active === 0 ? portfolioItems : portfolioItems.filter((_, i) => {
    // Map original items by their category matching the selected filter
    const item = portfolioItems[i];
    return item.cat === cats[active];
  });
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
    <section id="portfolio" className="section" style={{ background: T.white, direction: dir }}>
      <div className="section__inner">
        <SectionHeader tag={t("portfolio.tag")} title={t("portfolio.title")} sub={t("portfolio.sub")} />
        {/* Filter */}
        <div className="portfolio-filters">
          {cats.map((c, idx) => (
            <button key={idx} onClick={() => setActive(idx)} style={{ padding: "8px 20px", borderRadius: 50, border: `1.5px solid ${active === idx ? T.tealDark : T.gray200}`, background: active === idx ? T.tealDark : T.white, color: active === idx ? T.white : T.gray700, fontFamily: "DM Sans", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>
              {c}
            </button>
          ))}
        </div>
        {/* Grid */}
        <div ref={gridRef} className="portfolio-grid">
          {filtered.map((p, i) => {
            // Find original index for bg/mock
            const origIdx = portfolioItems.indexOf(p);
            return (
              <div key={p.title + i} className="reveal" style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${T.gray200}`, background: T.white, cursor: "pointer", transition: "all 0.3s", animationDelay: `${i * 0.08}s` }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px rgba(26,107,122,0.14)`; e.currentTarget.style.borderColor = T.teal; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = T.gray200; }}
              >
                <div style={{ height: 170, background: PORTFOLIO_BG[origIdx] || PORTFOLIO_BG[0], display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <PortfolioMock type={PORTFOLIO_MOCKS[origIdx] || "identity"} />
                  <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.45)", color: "#fff", fontSize: 10, padding: "3px 10px", borderRadius: 50 }}>{p.cat}</div>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 700, color: T.dark, marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: T.teal, display: "flex", alignItems: "center", gap: 4 }}>
                    {t("portfolio.viewDetails")} <span>←</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── WHY US ─────────────────────────────────────────────── */
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

function WhyUs() {
  useReveal();
  const { t, dir } = useLang();
  const whyItems = t("why.items");
  const WHY = whyItems.map((item, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: item.title,
    body: item.body,
  }));

  return (
    <section id="why" className="section" style={{ background: T.tealDark, direction: dir }}>
      <div className="section__inner">
        <SectionHeader tag={t("why.tag")} title={t("why.title")} sub={t("why.sub")} dark />
        <div className="why-grid">
          {WHY.map((w, i) => (
            <WhyCard key={i} w={w} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS ────────────────────────────────────────────── */
function Process() {
  useReveal();
  const { t, dir } = useLang();
  const steps = t("process.steps");

  return (
    <section className="section" style={{ background: T.offWhite, direction: dir }}>
      <div className="section__inner">
        <SectionHeader tag={t("process.tag")} title={t("process.title")} sub={t("process.sub")} />
        <div className="process-grid">
          {/* horizontal connector line (desktop) */}
          <div className="process-connector--h" style={{ position: "absolute", top: 32, right: "10%", left: "10%", height: 2, background: `linear-gradient(to left,${T.tealLight},${T.yellow})`, zIndex: 0, borderRadius: 1 }} />
          {/* vertical connector line (mobile) */}
          <div className="process-connector--v" style={{ display: "none" }} />
          {steps.map((s, i) => (
            <div key={i} className="reveal process-step" style={{ textAlign: "center", padding: "0 12px", position: "relative", zIndex: 1, animationDelay: `${i * 0.1}s` }}>
              <div className="process-step__circle" style={{ width: 56, height: 56, borderRadius: "50%", background: i === 0 ? T.tealDark : T.white, border: `2px solid ${i === 0 ? T.tealDark : T.gray200}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", boxShadow: "0 4px 18px rgba(0,0,0,0.07)" }}>
                <span style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 800, color: i === 0 ? T.yellow : T.tealDark }}>{s.n}</span>
              </div>
              {/* Desktop: inline labels */}
              <div className="process-step__label-inline" style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 700, color: T.dark, marginBottom: 6 }}>{s.label}</div>
              <div className="process-step__desc-inline" style={{ fontSize: 12, color: T.gray700, lineHeight: 1.6 }}>{s.desc}</div>
              {/* Mobile: grouped text block */}
              <div className="process-step__text">
                <div style={{ fontFamily: "Syne", fontSize: 15, fontWeight: 700, color: T.dark, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: T.gray700, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────── */
function ContactForm() {
  const { t, dir } = useLang();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", msg: "" });
  const inp = {
    width: "100%", padding: "12px 14px",
    border: `1.5px solid ${T.gray200}`, borderRadius: 12,
    background: T.offWhite, fontFamily: "DM Sans", fontSize: 14,
    color: T.dark, outline: "none", direction: dir,
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
          {t("contact.form.success")}
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>{t("contact.form.nameLabel")}</label>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={t("contact.form.namePlaceholder")} style={inp}
          onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>{t("contact.form.phoneLabel")}</label>
        <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder={t("contact.form.phonePlaceholder")} dir="ltr" style={inp}
          onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200} />
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>{t("contact.form.msgLabel")}</label>
        <textarea value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} placeholder={t("contact.form.msgPlaceholder")} style={{ ...inp, height: 100, resize: "none" }}
          onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200} />
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={submit} style={{ flex: 1, background: T.tealDark, color: T.white, border: "none", borderRadius: 50, padding: "13px", fontFamily: "DM Sans", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = T.teal; }} onMouseLeave={e => { e.currentTarget.style.background = T.tealDark; }}>
          {t("contact.form.submit")}
        </button>
        <button onClick={() => window.open("https://wa.me/972599651585", "_blank")} style={{ display: "flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", border: "none", borderRadius: 50, padding: "13px 20px", fontFamily: "DM Sans", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "opacity 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity = ".85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.562 4.129 1.545 5.862L.057 23.8l5.94-1.488A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.654-.502-5.184-1.382l-.371-.22-3.867.968.987-3.876-.229-.381A10 10 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z" /></svg>
          {t("contact.form.whatsapp")}
        </button>
      </div>
    </div>
  );
}

function Contact() {
  useReveal();
  const { t, dir, lang } = useLang();
  const info = [
    {
      icon: (color) => (
        <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: t("contact.infoLabels.location"),
      val: t("contact.infoValues.location"),
      href: "https://maps.app.goo.gl/EFaxJN4bJMobaMWU6"
    },
    {
      icon: (color) => (
        <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: t("contact.infoLabels.phone"),
      val: "+972 59 965 1585",
      href: "tel:+972599651585"
    },
    {
      icon: (color) => (
        <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: t("contact.infoLabels.email"),
      val: "aloragraphic@gmail.com",
      href: "mailto:aloragraphic@gmail.com"
    },
    {
      icon: (color) => (
        <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: t("contact.infoLabels.hours"),
      val: t("contact.infoValues.hours")
    },
  ];
  return (
    <section id="contact" className="section" style={{ background: T.white, direction: dir }}>
      <div className="section__inner">
        <div className="contact-grid">
          <div className="reveal">
            <SectionHeader tag={t("contact.tag")} title={t("contact.title")} sub={t("contact.sub")} noMargin />
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 32 }}>
              {info.map((it, i) => {
                const clickable = !!it.href;
                const Tag = clickable ? "a" : "div";
                const props = clickable ? {
                  href: it.href,
                  target: it.href.startsWith("http") ? "_blank" : undefined,
                  rel: it.href.startsWith("http") ? "noopener noreferrer" : undefined
                } : {};
                return (
                  <Tag
                    key={i}
                    {...props}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "14px 18px",
                      background: T.offWhite,
                      borderRadius: 14,
                      cursor: clickable ? "pointer" : "default",
                      textDecoration: "none",
                      color: "inherit",
                      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    onMouseEnter={e => {
                      if (clickable) {
                        e.currentTarget.style.background = T.tealPale;
                        e.currentTarget.style.transform = lang === "ar" ? "translateX(-4px)" : "translateX(4px)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (clickable) {
                        e.currentTarget.style.background = T.offWhite;
                        e.currentTarget.style.transform = "none";
                      }
                    }}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: T.tealPale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{it.icon(T.tealDark)}</div>
                    <div>
                      <div style={{ fontSize: 11, color: T.gray400, marginBottom: 1 }}>{it.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: T.dark, direction: it.href && it.href.startsWith("tel:") ? "ltr" : "inherit", display: "inline-block" }}>{it.val}</div>
                    </div>
                  </Tag>
                );
              })}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default function Home({ setPage }) {
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
