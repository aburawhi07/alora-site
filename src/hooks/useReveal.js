import { useEffect } from "react";

/* ─── REVEAL HOOK ────────────────────────────────────────── */
// Observes all .reveal elements and adds .visible when they enter the viewport
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
