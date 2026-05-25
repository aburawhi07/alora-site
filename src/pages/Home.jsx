import { useState, useEffect, useRef } from "react";
import T from "../utils/tokens";
import useReveal from "../hooks/useReveal";
import Hero from "../components/Hero/Hero";

/* ─── HELPER: SECTION HEADER ─────────────────────────────── */
export function SectionHeader({ tag, title, sub, dark = false, noMargin = false }) {
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
    <div style={{ background: T.white, borderRadius: 10, padding: "14px 24px", textAlign: "center", border: `2px solid ${T.tealDark}`, borderTop: `2px solid ${T.tealDark}` }}>
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
