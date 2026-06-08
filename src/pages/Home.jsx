import { useState, useEffect, useRef } from "react";
import { fetchPortfolioItems } from "../utils/cloudinary";
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
      <div className="section-header__tag-wrap">
        <div className="section-header__tag-line" />
        <span className="section-header__tag" style={{ color: tc }}>{tag}</span>
      </div>
      <h2 className="section-header__title" style={{ color: hc }}>{title}</h2>
      {sub && <p className="section-header__sub" style={{ color: sc }}>{sub}</p>}
    </div>
  );
}

/* ─── MARQUEE STRIP ──────────────────────────────────────── */
function Marquee() {
  const { t } = useLang();
  const items = t("marquee.items");
  const repeated = [...items, ...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {repeated.map((txt, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-text">{txt}</span>
            <span className="marquee-star">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SERVICES ───────────────────────────────────────────── */
function SvcIcon({ type }) {
  if (type === "design") return (
    <svg className="service-card__icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 40, height: 40 }}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  );
  if (type === "print") return (
    <svg className="service-card__icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 40, height: 40 }}>
      <path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
    </svg>
  );
  if (type === "sign") return (
    <svg className="service-card__icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 40, height: 40 }}>
      <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
    </svg>
  );
  if (type === "shirt") return (
    <svg className="service-card__icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 40, height: 40 }}>
      <path d="M20.38 3.46L16 2 12 5 8 2 3.62 3.46a2 2 0 00-1.34 1.42l-.76 3.04a1 1 0 00.97 1.24H6v10a2 2 0 002 2h8a2 2 0 002-2v-10h3.51a1 1 0 00.97-1.24l-.76-3.04a2 2 0 00-1.34-1.42z" />
    </svg>
  );
  return null;
}

const ICON_TYPES = ["design", "print", "sign", "shirt"];
const ACCENTS = [T.tealDark, T.teal, T.tealDark, T.teal];

function ServiceCard({ s, i, iconType, accent }) {
  const { t } = useLang();
  return (
    <div
      className="reveal service-card"
      style={{
        '--card-accent': accent,
        animationDelay: `${i * 0.1}s`,
      }}
      onClick={() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <div className="service-card__icon-wrap">
        <SvcIcon type={iconType} />
      </div>
      <div className="service-card__header">
        <div className="service-card__title">{s.name}</div>
        <span className="service-card__tag">{s.tag}</span>
      </div>
      <p className="service-card__desc">{s.desc}</p>
      <div className="service-card__cta">
        {t("services.cta")} <span>←</span>
      </div>
    </div>
  );
}

function Services() {
  useReveal();
  const { t, dir } = useLang();
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
          {items.map((s, i) => <ServiceCard key={i} s={s} i={i} iconType={s.iconType} accent={s.accent} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── PORTFOLIO ──────────────────────────────────────────── */

// Skeleton card shown while images are loading
function PortfolioSkeleton() {
  return (
    <div className="portfolio-card portfolio-card--skeleton">
      <div className="portfolio-card__img-wrap portfolio-card__img-wrap--skeleton" />
      <div className="portfolio-card__body">
        <div className="portfolio-card__skeleton-line" />
        <div className="portfolio-card__skeleton-line portfolio-card__skeleton-line--short" />
      </div>
    </div>
  );
}

function Portfolio() {
  useReveal();
  const { t, lang, dir } = useLang();

  // ── Cloudinary data ──────────────────────────────────────
  const [cloudItems, setCloudItems] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [active, setActive]         = useState(0);
  const [expanded, setExpanded]     = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed]           = useState(false);
  const gridRef = useRef(null);

  const INITIAL_COUNT = 4;

  // Fetch from Cloudinary on mount
  useEffect(() => {
    fetchPortfolioItems().then((items) => {
      setCloudItems(items);
      setLoading(false);
    });
  }, []);

  // ── Build category filter list from real Cloudinary folders ─
  const allCatLabel = lang === "ar" ? "الكل" : "All";

  // Deduplicate by folder slug — preserves order of first appearance
  const seenFolders = new Set();
  const uniqueCats = [];
  cloudItems.forEach((item) => {
    if (item.folder && !seenFolders.has(item.folder)) {
      seenFolders.add(item.folder);
      uniqueCats.push(item.cat);
    }
  });
  const cats = [allCatLabel, ...uniqueCats.map((c) => lang === "ar" ? c.ar : c.en)];

  // ── Filter logic ─────────────────────────────────────────
  const filtered = active === 0
    ? cloudItems
    : cloudItems.filter((item) => {
        const label = lang === "ar" ? item.cat.ar : item.cat.en;
        return label === cats[active];
      });

  // ── Visible items (limited or all) ───────────────────────
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > INITIAL_COUNT;

  // Reset filter & collapse when language changes
  useEffect(() => { setActive(0); setExpanded(false); }, [lang]);

  // Collapse when filter changes
  useEffect(() => { setExpanded(false); }, [active]);

  // Re-run reveal animation when filter, language, or expand state changes
  useEffect(() => {
    if (!gridRef.current) return;
    const els = gridRef.current.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active, lang, cloudItems, expanded]);

  return (
    <section id="portfolio" className="section" style={{ background: T.white, direction: dir }}>
      <div className="section__inner">
        <SectionHeader tag={t("portfolio.tag")} title={t("portfolio.title")} sub={t("portfolio.sub")} />

        {/* ── Category Filters (built from real Cloudinary folders) ── */}
        {!loading && cloudItems.length > 0 && (
          <div className="portfolio-filters">
            {cats.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`portfolio-filter-btn ${active === idx ? "portfolio-filter-btn--active" : ""}`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* ── Grid ─────────────────────────────────────────────────── */}
        <div ref={gridRef} className="portfolio-grid">

          {/* Loading skeletons */}
          {loading && Array.from({ length: 4 }).map((_, i) => (
            <PortfolioSkeleton key={i} />
          ))}

          {/* Empty state */}
          {!loading && cloudItems.length === 0 && (
            <div className="portfolio-empty">
              <p>{lang === "ar" ? "لا توجد أعمال حتى الآن" : "No projects yet"}</p>
            </div>
          )}

          {/* Real images from Cloudinary */}
          {!loading && visible.map((p, i) => (
            <div
              key={p.publicId}
              className="reveal portfolio-card"
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => setSelectedImage(p)}
            >
              <div className="portfolio-card__img-wrap">
                <img
                  src={p.image}
                  alt={lang === "ar" ? p.title.ar : p.title.en}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div className="portfolio-card__badge">
                  {lang === "ar" ? p.cat.ar : p.cat.en}
                </div>
              </div>
              <div className="portfolio-card__body">
                <div className="portfolio-card__title">{lang === "ar" ? p.title.ar : p.title.en}</div>
                <div className="portfolio-card__cta">
                  {t("portfolio.viewDetails")} <span>←</span>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* ── View More / View Less Button ─────────────────────────── */}
        {!loading && hasMore && (
          <div className="portfolio-view-more-wrap">
            <button
              className="portfolio-view-more-btn"
              onClick={() => setExpanded((prev) => !prev)}
            >
              <span>{expanded ? t("portfolio.viewLess") : t("portfolio.viewMore")}</span>
              <svg
                className={`portfolio-view-more-arrow ${expanded ? "portfolio-view-more-arrow--up" : ""}`}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        )}

        {/* ── Image Modal ─────────────────────────────────────────────────── */}
        {selectedImage && (
          <div className="portfolio-modal" onClick={() => { setSelectedImage(null); setIsZoomed(false); }}>
            <div className={`portfolio-modal__content ${isZoomed ? "portfolio-modal__content--zoomed" : ""}`} onClick={e => e.stopPropagation()}>
              <button className="portfolio-modal__close" onClick={() => { setSelectedImage(null); setIsZoomed(false); }}>✕</button>
              
              {/* Prev Button */}
              <button 
                className="portfolio-modal__nav portfolio-modal__nav--prev" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(false);
                  const idx = visible.findIndex(p => p.publicId === selectedImage.publicId);
                  setSelectedImage(visible[(idx - 1 + visible.length) % visible.length]);
                }}
              >
                ❮
              </button>

              <img 
                src={selectedImage.image} 
                alt={lang === "ar" ? selectedImage.title.ar : selectedImage.title.en} 
                className={`portfolio-modal__img ${isZoomed ? "portfolio-modal__img--zoomed" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
              />

              {/* Next Button */}
              <button 
                className="portfolio-modal__nav portfolio-modal__nav--next" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(false);
                  const idx = visible.findIndex(p => p.publicId === selectedImage.publicId);
                  setSelectedImage(visible[(idx + 1) % visible.length]);
                }}
              >
                ❯
              </button>

              {!isZoomed && <div className="portfolio-modal__caption">{lang === "ar" ? selectedImage.title.ar : selectedImage.title.en}</div>}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

/* ─── WHY US ─────────────────────────────────────────────── */
function WhyCard({ w, i }) {
  return (
    <div className="reveal why-card" style={{ animationDelay: `${i * 0.09}s` }}>
      <div className="why-card__num">{w.num}</div>
      <div className="why-card__title">{w.title}</div>
      <p className="why-card__body">{w.body}</p>
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
          <div className="process-connector--h" />
          {/* vertical connector line (mobile) */}
          <div className="process-connector--v" />
          {steps.map((s, i) => (
            <div key={i} className="reveal process-step" style={{ position: "relative", zIndex: 1, animationDelay: `${i * 0.1}s` }}>
              <div className={`process-step__circle-wrap ${i === 0 ? "process-step__circle-wrap--first" : ""}`}>
                <span className={`process-step__num ${i === 0 ? "process-step__num--first" : ""}`}>{s.n}</span>
              </div>
              {/* Desktop: inline labels */}
              <div className="process-step__label-inline">{s.label}</div>
              <div className="process-step__desc-inline">{s.desc}</div>
              {/* Mobile: grouped text block */}
              <div className="process-step__text">
                <div className="process-step__label-mobile">{s.label}</div>
                <div className="process-step__desc-mobile">{s.desc}</div>
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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [validation, setValidation] = useState(false);
  const [form, setForm] = useState({ name: "", contactInfo: "", msg: "" });
  const allFilled = form.name.trim() && form.contactInfo.trim() && form.msg.trim();
  const submit = async () => {
    if (sending) return;
    if (!allFilled) {
      setValidation(true);
      return;
    }
    setValidation(false);
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, contactInfo: form.contactInfo, message: form.msg }),
      });
      if (!res.ok) throw new Error("fail");
      setSent(true);
      setTimeout(() => setSent(false), 5000);
      setForm({ name: "", contactInfo: "", msg: "" });
    } catch {
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setSending(false);
    }
  };
  return (
    <div className="reveal contact-info-card">
      {sent && (
        <div className="contact-form__success">
          {t("contact.form.success")}
        </div>
      )}
      {error && (
        <div className="contact-form__error">
          {t("contact.form.error")}
        </div>
      )}
      {validation && !allFilled && (
        <div className="contact-form__error">
          {t("contact.form.required")}
        </div>
      )}
      <div className="contact-form__field">
        <label className="contact-form__label">{t("contact.form.nameLabel")} <span className="contact-form__required-star">*</span></label>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={t("contact.form.namePlaceholder")} className={`contact-form__input ${validation && !form.name.trim() ? "contact-form__input--error" : ""}`} dir={dir} />
      </div>
      <div className="contact-form__field">
        <label className="contact-form__label">{t("contact.form.contactInfoLabel")} <span className="contact-form__required-star">*</span></label>
        <input type="text" value={form.contactInfo} onChange={e => setForm({ ...form, contactInfo: e.target.value })} placeholder={t("contact.form.contactInfoPlaceholder")} dir={dir} className={`contact-form__input ${validation && !form.contactInfo.trim() ? "contact-form__input--error" : ""}`} />
      </div>
      <div className="contact-form__field contact-form__field--last">
        <label className="contact-form__label">{t("contact.form.msgLabel")} <span className="contact-form__required-star">*</span></label>
        <textarea value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} placeholder={t("contact.form.msgPlaceholder")} className={`contact-form__input contact-form__textarea ${validation && !form.msg.trim() ? "contact-form__input--error" : ""}`} dir={dir} />
      </div>
      <div className="contact-form__actions">
        <button onClick={submit} disabled={sending} className={`contact-form__btn-submit ${sending ? "contact-form__btn-submit--loading" : ""} ${!allFilled ? "contact-form__btn-submit--disabled" : ""}`}>
          {sending ? t("contact.form.sending") : t("contact.form.submit")}
        </button>
        <button onClick={() => window.open("https://wa.me/972599651585", "_blank")} className="contact-form__btn-wa">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.562 4.129 1.545 5.862L.057 23.8l5.94-1.488A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.654-.502-5.184-1.382l-.371-.22-3.867.968.987-3.876-.229-.381A10 10 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z" /></svg>
          {t("contact.form.whatsapp")}
        </button>
      </div>
    </div>
  );
}

function Contact() {
  useReveal();
  const { t, dir } = useLang();
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
            <div className="contact-info-list">
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
                    className={`contact-info-item ${clickable ? "contact-info-item--clickable" : ""}`}
                  >
                    <div className="contact-info-icon">{it.icon(T.tealDark)}</div>
                    <div>
                      <div className="contact-info-label">{it.label}</div>
                      <div className={`contact-info-val ${it.href && it.href.startsWith("tel:") ? "contact-info-val--ltr" : ""}`}>{it.val}</div>
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

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Portfolio />
      <WhyUs />
      <Process />
      <Contact />
    </>
  );
}
