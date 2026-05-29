import logoImg from "../../assets/logo.png";
import patternImg from "../../assets/logo_2.png";
import T from "../../utils/tokens";
import useReveal from "../../hooks/useReveal";
import "./Hero.css";

export function HeroVisual() {
  return (
    <div className="hero__visual hero-animate" style={{ animationDelay: "0.15s" }}>
      {/* Main big card */}
      <div style={{ position: "absolute", top: 20, right: 0, width: 270, background: T.tealDark, borderRadius: 20, padding: "24px 24px 20px", animation: "floatA 5s ease-in-out infinite", boxShadow: "0 24px 60px rgba(26,107,122,0.28)" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {[T.yellow, "rgba(255,255,255,0.3)", "rgba(255,255,255,0.3)"].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>بطاقة أعمال</div>
        <div style={{ fontFamily: "Syne", fontSize: 18, fontWeight: 800, color: T.yellow }}>محمد الأحمد</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>مدير تسويق</div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 12 }} />
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", direction: "ltr", textAlign: "right" }}>+972 59 965 1585</div>
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

export default function Hero({ setPage }) {
  useReveal();

  const heroWrap = {
    background: `linear-gradient(145deg, ${T.white} 0%, ${T.tealPale} 55%, ${T.white} 100%)`,
  };

  return (
    <section className="hero" style={heroWrap}>
      {/* Watermark logo */}
      <img className="hero__watermark" src={logoImg} alt="" style={{ position: "absolute", top: "15%", left: "50%", transform: "translate(-50%, 0)", width: "75%", maxWidth: 900, opacity: 0.18, pointerEvents: "none", userSelect: "none" }} />
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: -80, left: -80, width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, rgba(245,200,0,0.12) 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, right: "5%", width: 260, height: 260, borderRadius: "50%", background: `radial-gradient(circle, rgba(42,143,163,0.10) 0%, transparent 70%)`, pointerEvents: "none" }} />
      {/* Spinning ring */}
      <div className="hero__ring" style={{ position: "absolute", top: "12%", left: "42%", width: 340, height: 340, border: `1.5px dashed ${T.gray200}`, borderRadius: "50%", animation: "spinSlow 28s linear infinite", pointerEvents: "none" }} />
      {/* Pattern Background */}
      <img className="hero__pattern" src={patternImg} alt="" style={{ position: "absolute", top: "67%", left: "11%", transform: "translate(-50%, -10%)", width: "75%", maxWidth: 400, opacity: 0.50, pointerEvents: "none", userSelect: "none" }} />

      <div className="hero__grid">
        {/* Left: text */}
        <div className="hero-animate" style={{ animationDelay: "0.05s" }}>

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

          <div className="hero__buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{ background: T.tealDark, color: T.white, border: "none", borderRadius: 50, padding: "15px 36px", fontFamily: "DM Sans", fontSize: 16, fontWeight: 500, cursor: "pointer", boxShadow: `0 8px 28px rgba(26,107,122,0.3)`, transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 14px 36px rgba(26,107,122,0.38)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 8px 28px rgba(26,107,122,0.3)`; }}
            >
              اطلب الآن
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("portfolio");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{ background: "transparent", color: T.tealDark, border: `2px solid ${T.tealDark}`, borderRadius: 50, padding: "13px 28px", fontFamily: "DM Sans", fontSize: 16, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = T.tealPale; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              شاهد أعمالنا
            </button>
          </div>
        </div>

        {/* Right: visual cards */}
        <HeroVisual />
      </div>
    </section>
  );
}
