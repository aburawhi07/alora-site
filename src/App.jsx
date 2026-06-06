import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import { LangProvider } from "./utils/LangContext";
import Navbar     from "./components/Navbar/Navbar";
import Footer     from "./components/Footer/Footer";
import Home       from "./pages/Home";
import RequestPage from "./pages/RequestPage";

/* ─── PAGE CONTENT ───────────────────────────────────────── */
function PageContent({ page, setPage }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (page === "request") return <RequestPage />;
  return <Home setPage={setPage} />;
}

/* ─── FLOATING WHATSAPP BUTTON ───────────────────────────── */
function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);
  // Pre-filled Arabic message: "أهلا، أريد الاستفسار عن خدماتكم"
  const waUrl =
    "https://wa.me/972599651585?text=%D8%A3%D9%87%D9%84%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85";

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا على واتساب"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 9999,
        width: "54px",
        height: "54px",
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: hovered
          ? "0 6px 28px rgba(37,211,102,0.65)"
          : "0 4px 20px rgba(37,211,102,0.45)",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        textDecoration: "none",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.562 4.129 1.545 5.862L.057 23.8l5.94-1.488A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.654-.502-5.184-1.382l-.371-.22-3.867.968.987-3.876-.229-.381A10 10 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    </a>
  );
}

/* ─── ROOT APP ───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");

  return (
    <LangProvider>
      <div>
        <Navbar page={page} setPage={setPage} />
        <main>
          <PageContent page={page} setPage={setPage} />
        </main>
        <Footer setPage={setPage} />
        <WhatsAppFloat />
        <Analytics />
        <SpeedInsights />
      </div>
    </LangProvider>
  );
}
