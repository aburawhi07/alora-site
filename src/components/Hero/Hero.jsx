import logoImg from "../../assets/logo.png";
import patternImg from "../../assets/logo_2.png";
import T from "../../utils/tokens";
import useReveal from "../../hooks/useReveal";
import { useLang } from "../../utils/LangContext";
import "./Hero.css";

export function HeroVisual() {
  const { t } = useLang();
  return (
    <div className="hero__visual hero-animate" style={{ animationDelay: "0.15s" }}>
      {/* Main big card */}
      <div className="hero__card">
        <div className="hero__card-dots">
          {[T.yellow, "rgba(255,255,255,0.3)", "rgba(255,255,255,0.3)"].map((c, i) => <div key={i} className="hero__card-dot" style={{ background: c }} />)}
        </div>
        <div className="hero__card-label">{t("hero.cardLabel")}</div>
        <div className="hero__card-name">{t("hero.cardName")}</div>
        <div className="hero__card-role">{t("hero.cardRole")}</div>
        <div className="hero__card-divider" />
        <div className="hero__card-phone">+972 59 965 1585</div>
      </div>

      {/* Badge */}
      <div className="hero__badge">
        {t("hero.badge")}
      </div>

      {/* Color palette swatch */}
      <div className="hero__palette">
        {[T.tealDark, T.teal, T.tealLight, T.yellow].map((c, i) => (
          <div key={i} className="hero__palette-color" style={{ background: c, marginTop: i % 2 === 0 ? 0 : 6 }} />
        ))}
      </div>
    </div>
  );
}

export default function Hero({ setPage }) {
  useReveal();
  const { t, dir } = useLang();

  return (
    <section className="hero" style={{ background: `linear-gradient(145deg, var(--color-white) 0%, var(--color-teal-pale) 55%, var(--color-white) 100%)` }}>
      {/* Watermark logo */}
      <img className="hero__watermark" src={logoImg} alt="" />
      {/* Decorative circles */}
      <div className="hero__circle-1" />
      <div className="hero__circle-2" />

      {/* Pattern Background */}
      <img className="hero__pattern" src={patternImg} alt="" />

      <div className="hero__grid" style={{ direction: dir }}>
        {/* Left: text */}
        <div className="hero-animate" style={{ animationDelay: "0.05s" }}>

          <h1 className="hero__title">
            {t("hero.h1_1")}{" "}
            <span className="hero__title-highlight">{t("hero.h1_2")}</span>
            <br />
            <span className="hero__title-highlight">{t("hero.h1_3")}</span>
            {" "}{t("hero.h1_4")}
          </h1>

          <p className="hero__desc">
            {t("hero.desc")}
          </p>

          <div className="hero__buttons">
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="hero__btn-primary"
            >
              {t("hero.ctaPrimary")}
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("portfolio");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="hero__btn-secondary"
            >
              {t("hero.ctaSecondary")}
            </button>
          </div>
        </div>

        {/* Right: visual cards */}
        <HeroVisual />
      </div>
    </section>
  );
}
