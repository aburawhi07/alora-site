import { useState, useEffect } from "react";

import { LangProvider } from "./utils/LangContext";
import Navbar    from "./components/Navbar/Navbar";
import Footer    from "./components/Footer/Footer";
import Home      from "./pages/Home";
import RequestPage from "./pages/RequestPage";

/* ─── PAGE CONTENT ───────────────────────────────────────── */
function PageContent({ page, setPage }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (page === "request") return <RequestPage />;

  return <Home setPage={setPage} />;
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
      </div>
    </LangProvider>
  );
}
