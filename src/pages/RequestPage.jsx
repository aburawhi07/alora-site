import { useState } from "react";
import T from "../utils/tokens";
import useReveal from "../hooks/useReveal";
import { useLang } from "../utils/LangContext";
import "./RequestPage.css";

export default function RequestPage() {
  useReveal();
  const { t, dir } = useLang();
  const [selSvcs, setSelSvcs] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", qty: "", budget: "", details: "" });
  const [sent, setSent] = useState(false);

  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const svcs = t("request.services");
  const toggle = (s) => setSelSvcs(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const submit = async () => {
    if (!form.name.trim() || sending) return;
    setSending(true);
    setError(false);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: form.name, 
          phone: form.phone, 
          message: `Qty: ${form.qty}\nBudget: ${form.budget}\nDetails: ${form.details}`,
          services: selSvcs.join(", ") 
        }),
      });
      if (!res.ok) throw new Error("fail");
      setSent(true);
      setSelSvcs([]);
      setForm({ name: "", phone: "", qty: "", budget: "", details: "" });
      setTimeout(() => setSent(false), 6000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="request-page" style={{ background: T.offWhite, direction: dir }}>
      <div className="request-page__inner">
        <div className="reveal">
          <div className="request-badge">
            <span className="request-badge__text">{t("request.badge")}</span>
          </div>
          <h1 className="request-title">{t("request.title")}</h1>
          <p className="request-sub">{t("request.sub")}</p>
        </div>

        <div className="reveal request-card">
          {sent && (
            <div className="request-success">
              {t("request.success")}
            </div>
          )}
          {error && (
            <div className="contact-form__error">
              {t("request.error")}
            </div>
          )}

          {/* Service chips */}
          <div style={{ marginBottom: 24 }}>
            <div className="request-section-title">{t("request.serviceType")}</div>
            <div className="request-chips">
              {svcs.map(s => (
                <button key={s} onClick={() => toggle(s)} className={`request-chip ${selSvcs.includes(s) ? "request-chip--active" : ""}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Phone */}
          <div className="request-form-grid" style={{ marginBottom: 16 }}>
            <div>
              <label className="request-field-label">{t("request.nameLabel")}</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={t("request.namePlaceholder")} className="request-input" />
            </div>
            <div>
              <label className="request-field-label">{t("request.phoneLabel")}</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder={t("request.phonePlaceholder")} dir="ltr" className="request-input" />
            </div>
          </div>

          {/* Qty & Budget */}
          <div className="request-form-grid" style={{ marginBottom: 16 }}>
            <div>
              <label className="request-field-label">{t("request.qtyLabel")}</label>
              <select value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} className="request-input request-input--select">
                <option value="">{t("request.qtyPlaceholder")}</option>
                {t("request.qtyOptions").map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="request-field-label">{t("request.budgetLabel")}</label>
              <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className="request-input request-input--select">
                <option value="">{t("request.budgetPlaceholder")}</option>
                {t("request.budgetOptions").map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Details */}
          <div style={{ marginBottom: 28 }}>
            <label className="request-field-label">{t("request.detailsLabel")}</label>
            <textarea value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} placeholder={t("request.detailsPlaceholder")} className="request-input request-input--textarea" />
          </div>

          <div className="request-actions">
            <button onClick={submit} disabled={sending} className={`request-btn-submit ${sending ? "contact-form__btn-submit--loading" : ""}`}>
              {sending ? t("request.sending") : t("request.submit")}
            </button>
            <button className="request-btn-wa">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.562 4.129 1.545 5.862L.057 23.8l5.94-1.488A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.654-.502-5.184-1.382l-.371-.22-3.867.968.987-3.876-.229-.381A10 10 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z" /></svg>
              {t("request.whatsapp")}
            </button>
          </div>
        </div>

        {/* Info note */}
        <div className="reveal request-info">
          <p className="request-info__text">
            {t("request.infoNote")}
          </p>
        </div>
      </div>
    </section>
  );
}
