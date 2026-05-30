import { createContext, useContext, useState, useEffect } from "react";
import { t, tRaw } from "./i18n";

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem("alora-lang") || "ar";
    } catch {
      return "ar";
    }
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("alora-lang", newLang);
    } catch {
      // ignore
    }
  };

  // Update document direction and lang attribute
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const isRTL = lang === "ar";
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <LangContext.Provider value={{ lang, setLang, t: (path) => t(path, lang), tRaw, isRTL, dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
}
