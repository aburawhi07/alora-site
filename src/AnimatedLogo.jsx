import { useEffect, useRef, useState } from "react";

const C = { dark: "#1a6b7a", mid: "#2a8fa3", lite: "#3ab4cc", yellow: "#f5c800" };

/* ── CSS injected once ── */
const cssId = "animated-logo-css";
const cssText = `
  @keyframes al-dropIn {
    0%   { opacity:0; transform:translateY(-40px) scale(0.7); }
    60%  { opacity:1; transform:translateY(6px) scale(1.03); }
    100% { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes al-fanLeft {
    0%   { opacity:0; transform:rotate(30deg) scale(0.5); }
    100% { opacity:1; transform:rotate(0deg) scale(1); }
  }
  @keyframes al-fanRight {
    0%   { opacity:0; transform:rotate(-30deg) scale(0.5); }
    100% { opacity:1; transform:rotate(0deg) scale(1); }
  }
  @keyframes al-domeUp {
    0%   { opacity:0; transform:translateY(30px) scaleY(0.4); }
    70%  { opacity:1; transform:translateY(-3px) scaleY(1.03); }
    100% { opacity:1; transform:translateY(0) scaleY(1); }
  }
  @keyframes al-sparkle {
    0%   { opacity:0; transform:scale(0) rotate(-180deg); }
    50%  { opacity:1; transform:scale(1.3) rotate(10deg); }
    100% { opacity:1; transform:scale(1) rotate(0deg); }
  }
  @keyframes al-letterIn {
    0%   { opacity:0; transform:translateX(-24px) translateY(8px); }
    60%  { opacity:1; transform:translateX(3px) translateY(-1px); }
    100% { opacity:1; transform:translateX(0) translateY(0); }
  }
  @keyframes al-shapePop {
    0%   { opacity:0; transform:scale(0) rotate(-45deg); }
    70%  { opacity:1; transform:scale(1.15) rotate(5deg); }
    100% { opacity:1; transform:scale(1) rotate(0deg); }
  }
  @keyframes al-glow {
    0%, 100% { filter: drop-shadow(0 0 0px transparent); }
    50%      { filter: drop-shadow(0 0 12px rgba(26,107,122,0.35)); }
  }
  @keyframes al-shimmerStar {
    0%, 100% { filter: drop-shadow(0 0 2px rgba(245,200,0,0.3)); }
    50%      { filter: drop-shadow(0 0 14px rgba(245,200,0,0.7)); }
  }
  .al-el { opacity: 0; }
  .al-active .al-el { animation-fill-mode: forwards; }
  .al-done { animation: al-glow 3s ease-in-out infinite; }
  .al-done .al-star-g { animation: al-shimmerStar 2.5s ease-in-out infinite; }
`;

export default function AnimatedLogo({ width = 420, onComplete, autoPlay = true, className = "" }) {
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!document.getElementById(cssId)) {
      const s = document.createElement("style");
      s.id = cssId;
      s.textContent = cssText;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(() => setActive(true), 200);
      return () => clearTimeout(t);
    }
  }, [autoPlay]);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => {
        setDone(true);
        onComplete?.();
      }, 3800);
      return () => clearTimeout(t);
    }
  }, [active]);

  const anim = (name, dur, delay) => active
    ? { animation: `${name} ${dur}s cubic-bezier(.16,1,.3,1) ${delay}s forwards` }
    : {};

  return (
    <div
      ref={ref}
      className={`${active ? "al-active" : ""} ${done ? "al-done" : ""} ${className}`}
      style={{ width, display: "inline-block" }}
    >
      <svg viewBox="0 0 500 560" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>

        {/* ═══════════ ICON: PETALS + STAR ═══════════ */}
        <g transform="translate(250, 150)">

          {/* Bottom dome/large petal */}
          <path
            className="al-el"
            style={{ transformOrigin: "0 30px", ...anim("al-domeUp", 0.7, 0.4) }}
            d="M-62,8 C-62,-55 62,-55 62,8 C52,50 -52,50 -62,8 Z"
            fill={C.dark}
          />

          {/* Left petal */}
          <path
            className="al-el"
            style={{ transformOrigin: "-20px -10px", ...anim("al-fanLeft", 0.65, 0.2) }}
            d="M-8,-15 C-45,-55 -85,-50 -75,-18 C-65,14 -30,5 -8,-15 Z"
            fill={C.dark}
          />

          {/* Right/top petal (the one that appears first) */}
          <path
            className="al-el"
            style={{ transformOrigin: "10px -30px", ...anim("al-dropIn", 0.7, 0) }}
            d="M5,-20 C20,-70 60,-85 55,-50 C50,-15 25,0 5,-20 Z"
            fill={C.dark}
          />

          {/* Yellow sparkle star */}
          <g className="al-el al-star-g" style={{ transformOrigin: "-35px -65px", ...anim("al-sparkle", 0.8, 0.6) }}>
            <path
              d="M-35,-95 Q-28,-72 -8,-65 Q-28,-58 -35,-35 Q-42,-58 -62,-65 Q-42,-72 -35,-95 Z"
              fill={C.yellow}
            />
          </g>
        </g>

        {/* ═══════════ TEXT: "alora" ═══════════ */}
        <g transform="translate(250, 300)">
          {/* a */}
          <g className="al-el" style={{ transformOrigin: "-100px 0", ...anim("al-letterIn", 0.55, 0.9) }}>
            <circle cx={-108} cy={-8} r={14} fill="none" stroke={C.dark} strokeWidth={10} />
            <circle cx={-130} cy={8} r={8} fill={C.dark} />
          </g>

          {/* l */}
          <g className="al-el" style={{ transformOrigin: "-60px 0", ...anim("al-letterIn", 0.55, 1.0) }}>
            <rect x={-66} y={-35} width={11} height={55} rx={2} fill={C.dark} />
          </g>

          {/* o */}
          <g className="al-el" style={{ transformOrigin: "-10px 0", ...anim("al-letterIn", 0.55, 1.1) }}>
            <circle cx={-10} cy={-5} r={22} fill={C.dark} />
            <circle cx={-10} cy={-5} r={10} fill="white" />
          </g>

          {/* r */}
          <g className="al-el" style={{ transformOrigin: "40px 0", ...anim("al-letterIn", 0.55, 1.2) }}>
            <rect x={30} y={-25} width={10} height={45} rx={2} fill={C.dark} />
            <path d="M40,-25 Q40,-35 50,-35 L62,-35 L62,-25 L50,-25 Q45,-25 40,-20" fill={C.dark} />
          </g>

          {/* a */}
          <g className="al-el" style={{ transformOrigin: "95px 0", ...anim("al-letterIn", 0.55, 1.3) }}>
            <path d="M78,-15 A20,20 0 1,1 78,15 L78,15 A10,10 0 1,0 78,-15 Z" fill={C.dark} transform="translate(95,0)" />
            <circle cx={115} cy={10} r={10} fill={C.dark} />
          </g>
        </g>

        {/* ═══════════ TEXT: "GRAPHIC" ═══════════ */}
        <g transform="translate(118, 395)">
          {"GRAPHIC".split("").map((ch, i) => (
            <text
              key={i}
              className="al-el"
              style={{
                transformOrigin: `${i * 22 + 10}px 0`,
                fontFamily: "Syne, sans-serif",
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: 4,
                fill: C.mid,
                ...anim("al-letterIn", 0.5, 1.6 + i * 0.08),
              }}
              x={i * 22}
              y={0}
              textAnchor="start"
              dominantBaseline="central"
            >
              {ch}
            </text>
          ))}
        </g>

        {/* ═══════════ DECORATIVE SHAPES ═══════════ */}
        <g transform="translate(298, 378)">
          {/* Shape 1: small half-circle */}
          <path className="al-el" style={{ transformOrigin: "10px 10px", ...anim("al-shapePop", 0.45, 2.3) }}
            d="M0,20 A10,10 0 0,1 20,20 Z" fill={C.dark} />

          {/* Shape 2: diamond/4-point star */}
          <path className="al-el" style={{ transformOrigin: "40px 10px", ...anim("al-shapePop", 0.45, 2.4) }}
            d="M40,0 L47,10 L40,20 L33,10 Z" fill={C.mid} />

          {/* Shape 3: triangles stack */}
          <g className="al-el" style={{ transformOrigin: "70px 10px", ...anim("al-shapePop", 0.45, 2.5) }}>
            <polygon points="65,20 70,12 75,20" fill={C.dark} />
            <polygon points="65,12 70,4 75,12" fill={C.dark} />
            <polygon points="65,4 70,-4 75,4" fill={C.mid} />
          </g>

          {/* Shape 4: leaf pair */}
          <g className="al-el" style={{ transformOrigin: "100px 10px", ...anim("al-shapePop", 0.45, 2.6) }}>
            <ellipse cx={95} cy={8} rx={5} ry={10} transform="rotate(-30, 95, 8)" fill={C.dark} />
            <ellipse cx={105} cy={8} rx={5} ry={10} transform="rotate(30, 105, 8)" fill={C.mid} />
          </g>

          {/* Shape 5: 4-pointed star */}
          <path className="al-el" style={{ transformOrigin: "130px 10px", ...anim("al-shapePop", 0.45, 2.7) }}
            d="M130,-2 L134,6 L142,10 L134,14 L130,22 L126,14 L118,10 L126,6 Z" fill={C.mid} />

          {/* Shape 6: plant/leaf trio */}
          <g className="al-el" style={{ transformOrigin: "160px 10px", ...anim("al-shapePop", 0.45, 2.8) }}>
            <ellipse cx={155} cy={10} rx={4} ry={9} transform="rotate(-25,155,10)" fill={C.dark} />
            <ellipse cx={160} cy={6} rx={4} ry={9} transform="rotate(0,160,6)" fill={C.mid} />
            <ellipse cx={165} cy={10} rx={4} ry={9} transform="rotate(25,165,10)" fill={C.dark} />
          </g>
        </g>

      </svg>
    </div>
  );
}
