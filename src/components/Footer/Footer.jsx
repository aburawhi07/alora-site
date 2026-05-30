import T from "../../utils/tokens";
import { Logo } from "../Navbar/Navbar";
import patternImg from "../../assets/logo_2.png";
import "./Footer.css";

export default function Footer({ setPage }) {
  const links = [
    { label: "خدماتنا", id: "services" },
    { label: "أعمالنا", id: "portfolio" },
    { label: "لماذا نحن", id: "why" },
    { label: "تواصل", id: "contact" },
    { label: "اطلب خدمة", id: "request" },
  ];
  return (
    <footer className="footer" style={{ position: "relative", overflow: "hidden" }}>
      {/* Corner pattern decoration */}
      <img
        src={patternImg}
        alt=""
        style={{
          position: "absolute",
          bottom: "0%",
          left: "0%",
          width: "450px",
          opacity: 0.30,
          pointerEvents: "none",
          userSelect: "none"
        }}
      />
      <div className="footer__inner" style={{ position: "relative", zIndex: 1 }}>
        <div className="footer__grid">
          {/* تواصل معنا - Left/First */}
          <div>
            <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 700, color: T.white, marginBottom: 16 }}>تواصل معنا</div>
            {[
              {
                ic: (color) => (
                  <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                v: "عقابا، فلسطين",
                href: "https://maps.app.goo.gl/EFaxJN4bJMobaMWU6"
              },
              {
                ic: (color) => (
                  <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                ),
                v: "+972 59 965 1585",
                href: "tel:+972599651585"
              },
              {
                ic: (color) => (
                  <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
                v: "aloragraphic@gmail.com",
                href: "mailto:aloragraphic@gmail.com"
              },
              {
                ic: (color) => (
                  <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill={color} stroke="none">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                ),
                v: "Facebook",
                href: "https://www.facebook.com/profile.php?id=100063596649869"
              },
              {
                ic: (color) => (
                  <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
                v: "Instagram",
                href: "https://www.instagram.com/alora_graphic?igsh=eHc4ZDdpNmJ2dmpp"
              }
            ].map(item => {
              const Tag = item.href ? "a" : "div";
              const props = item.href ? {
                href: item.href,
                target: item.href.startsWith("http") ? "_blank" : undefined,
                rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined
              } : {};
              return (
                <Tag
                  key={item.v}
                  {...props}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 10,
                    fontSize: 13,
                    textDecoration: "none",
                    color: "rgba(255,255,255,0.55)",
                    transition: "color 0.2s",
                    cursor: item.href ? "pointer" : "default"
                  }}
                  onMouseEnter={e => {
                    if (item.href) e.currentTarget.style.color = T.yellow;
                  }}
                  onMouseLeave={e => {
                    if (item.href) e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{item.ic("currentColor")}</span>
                  <span style={{ direction: item.href && item.href.startsWith("tel:") ? "ltr" : "inherit" }}>{item.v}</span>
                </Tag>
              );
            })}
          </div>

          {/* روابط سريعة - Center */}
          <div>
            <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 700, color: T.white, marginBottom: 16 }}>روابط سريعة</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {links.map(l => (
                <button
                  key={l.id}
                  onClick={() => {
                    if (l.id === "request") {
                      setPage("home");
                      setTimeout(() => {
                        const el = document.getElementById("contact");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 100);
                    } else {
                      setPage("home");
                      setTimeout(() => {
                        const el = document.getElementById(l.id);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 100);
                    }
                  }}
                  className="footer__link-btn"
                  onMouseEnter={e => e.target.style.color = T.yellow}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Logo - Right */}
          <div className="footer__logo-col">
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => setPage("home")}>
              <Logo height={120} dark />
            </div>
            <p className="footer__logo-desc" style={{ fontSize: 13, lineHeight: 1.8, maxWidth: 240 }}>مطبعة وتصميم جرافيك احترافية في عقابا، فلسطين. نحول أفكارك إلى واقع مطبوع.</p>
          </div>
        </div>
        <div className="footer__bottom">
          <span style={{ fontSize: 12 }}>© 2026 ALORA Graphic. جميع الحقوق محفوظة.</span>
        </div>
      </div>
    </footer>
  );
}
