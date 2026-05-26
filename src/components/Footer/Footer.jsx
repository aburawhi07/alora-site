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
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
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
          <div>
            <div style={{ fontFamily: "Syne", fontSize: 14, fontWeight: 700, color: T.white, marginBottom: 16 }}>تواصل معنا</div>
            {[
              { ic: "📍", v: "عقابا، فلسطين", href: "https://maps.app.goo.gl/EFaxJN4bJMobaMWU6" },
              { ic: "📞", v: "+972 59 965 1585", href: "tel:+972599651585" },
              { ic: "✉️", v: "aloragraphic@gmail.com", href: "mailto:aloragraphic@gmail.com" }
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
                  <span style={{ fontSize: 14 }}>{item.ic}</span>
                  <span style={{ direction: item.href && item.href.startsWith("tel:") ? "ltr" : "inherit" }}>{item.v}</span>
                </Tag>
              );
            })}
          </div>
        </div>
        <div className="footer__bottom">
          <span style={{ fontSize: 12 }}>© 2026 ALORA Graphic. جميع الحقوق محفوظة.</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>صُمِّم باحتراف في فلسطين 🇵🇸</span>
        </div>
      </div>
    </footer>
  );
}
