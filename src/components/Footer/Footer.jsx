import T from "../../utils/tokens";
import { Logo } from "../Navbar/Navbar";
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
                      setPage("request");
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
            {[["📍", "نابلس، فلسطين"], ["📞", "+970 59 000 0000"], ["✉️", "info@aloragraphic.ps"]].map(([ic, v]) => (
              <div key={v} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, fontSize: 13 }}>
                <span style={{ fontSize: 14 }}>{ic}</span><span style={{ color: "rgba(255,255,255,0.55)" }}>{v}</span>
              </div>
            ))}
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
