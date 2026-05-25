import { useState } from "react";
import T from "../utils/tokens";
import useReveal from "../hooks/useReveal";

export default function RequestPage() {
  useReveal();
  const [selSvcs, setSelSvcs] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", qty: "", budget: "", details: "" });
  const [sent, setSent] = useState(false);

  const svcs = ["تصميم جرافيك", "طباعة رقمية", "لافتات", "طباعة ملابس", "بطاقات أعمال", "هوية بصرية"];
  const toggle = (s) => setSelSvcs(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const submit = () => {
    if (!form.name.trim()) return;
    setSent(true);
    setSelSvcs([]);
    setForm({ name: "", phone: "", qty: "", budget: "", details: "" });
    setTimeout(() => setSent(false), 6000);
  };

  const inp = { width: "100%", padding: "12px 14px", border: `1.5px solid ${T.gray200}`, borderRadius: 12, background: T.offWhite, fontFamily: "DM Sans", fontSize: 14, color: T.dark, outline: "none", direction: "rtl", transition: "border-color 0.2s" };
  const sel = { ...inp, cursor: "pointer" };

  return (
    <section style={{ padding: "120px 40px 80px", minHeight: "100vh", background: T.offWhite, direction: "rtl" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div className="reveal">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.yellowPale, border: `1.5px solid ${T.yellow}`, borderRadius: 50, padding: "5px 16px", marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#7a6000" }}>طلب خدمة جديدة</span>
          </div>
          <h1 style={{ fontFamily: "Syne", fontSize: 36, fontWeight: 800, color: T.dark, marginBottom: 8, letterSpacing: -0.5 }}>أخبرنا بما تحتاجه</h1>
          <p style={{ fontSize: 15, color: T.gray700, marginBottom: 36 }}>سيتواصل معك فريقنا خلال ساعات قليلة بعرض سعر مفصّل.</p>
        </div>

        <div className="reveal" style={{ background: T.white, borderRadius: 24, padding: 36, border: `1px solid ${T.gray200}` }}>
          {sent && (
            <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: 12, padding: "14px 18px", fontSize: 14, color: "#166534", marginBottom: 24 }}>
              ✓ تم إرسال طلبك بنجاح! سنتواصل معك قريباً.
            </div>
          )}

          {/* Service chips */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.dark, marginBottom: 10 }}>اختر نوع الخدمة</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {svcs.map(s => (
                <button key={s} onClick={() => toggle(s)} style={{ padding: "8px 18px", borderRadius: 50, border: `1.5px solid ${selSvcs.includes(s) ? T.tealDark : T.gray200}`, background: selSvcs.includes(s) ? T.tealPale : T.white, color: selSvcs.includes(s) ? T.tealDark : T.gray700, fontFamily: "DM Sans", fontSize: 13, fontWeight: selSvcs.includes(s) ? 500 : 400, cursor: "pointer", transition: "all 0.18s" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Phone */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>الاسم الكامل</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="أدخل اسمك" style={inp}
                onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>رقم الهاتف</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="05X XXX XXXX" dir="ltr" style={inp}
                onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200} />
            </div>
          </div>

          {/* Qty & Budget */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>الكمية</label>
              <select value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} style={sel}
                onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200}>
                <option value="">اختر الكمية</option>
                {["50 قطعة", "100 قطعة", "250 قطعة", "500 قطعة", "كمية مخصصة"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>الميزانية</label>
              <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} style={sel}
                onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200}>
                <option value="">اختر النطاق</option>
                {["أقل من 100₪", "100 – 300₪", "300 – 600₪", "600 – 1000₪", "أكثر من 1000₪"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Details */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 12, color: T.gray700, marginBottom: 6, display: "block" }}>تفاصيل الطلب</label>
            <textarea value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} placeholder="اشرح لنا ما تحتاجه بالتفصيل..." style={{ ...inp, height: 110, resize: "none" }}
              onFocus={e => e.target.style.borderColor = T.teal} onBlur={e => e.target.style.borderColor = T.gray200} />
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={submit} style={{ flex: 1, background: T.tealDark, color: T.white, border: "none", borderRadius: 50, padding: "14px", fontFamily: "DM Sans", fontSize: 15, fontWeight: 500, cursor: "pointer", boxShadow: `0 6px 24px rgba(26,107,122,0.25)`, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.tealDark; e.currentTarget.style.transform = "none"; }}>
              إرسال الطلب
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", border: "none", borderRadius: 50, padding: "14px 24px", fontFamily: "DM Sans", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.562 4.129 1.545 5.862L.057 23.8l5.94-1.488A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.654-.502-5.184-1.382l-.371-.22-3.867.968.987-3.876-.229-.381A10 10 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z" /></svg>
              واتساب
            </button>
          </div>
        </div>

        {/* Info note */}
        <div className="reveal" style={{ marginTop: 16, background: T.tealPale, border: `1px solid rgba(26,107,122,0.2)`, borderRadius: 14, padding: "14px 18px" }}>
          <p style={{ fontSize: 13, color: T.gray700, lineHeight: 1.7 }}>
            يتم مراجعة الطلبات خلال ساعات العمل (9ص – 9م). سنرسل لك تأكيداً وسعراً تفصيلياً عبر واتساب أو الهاتف.
          </p>
        </div>
      </div>
    </section>
  );
}
