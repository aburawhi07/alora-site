import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Sanitize user input to prevent HTML injection ──────────
function esc(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, contactInfo, email, phone, message, services } = req.body;
  const contact = contactInfo || email || phone;

  // ─── Validation ──────────────────────────────────────────
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!contact || !contact.trim()) {
    return res.status(400).json({ error: "Contact info is required" });
  }

  // Reject suspiciously long inputs (prevent abuse)
  if (
    name.length > 100 ||
    contact.length > 200 ||
    (message && message.length > 5000) ||
    (services && services.length > 500)
  ) {
    return res.status(400).json({ error: "Input too long" });
  }

  try {
    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl;">
        <div style="background: #1a6b7a; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #f5c518; margin: 0; font-size: 22px;">📩 رسالة جديدة من موقع ألورا</h1>
        </div>
        <div style="background: #ffffff; padding: 28px 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #1a6b7a; width: 120px;">الاسم:</td>
              <td style="padding: 10px 0; color: #1a2e33;">${esc(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #1a6b7a;">وسيلة التواصل:</td>
              <td style="padding: 10px 0; color: #1a2e33; direction: ltr; text-align: right;">${esc(contact)}</td>
            </tr>
            ${services ? `
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #1a6b7a;">الخدمات:</td>
              <td style="padding: 10px 0; color: #1a2e33;">${esc(services)}</td>
            </tr>` : ""}
          </table>
          ${message ? `
          <div style="margin-top: 20px; padding: 16px; background: #f8f9fa; border-radius: 8px; border-right: 4px solid #1a6b7a;">
            <div style="font-weight: 600; color: #1a6b7a; margin-bottom: 8px;">الرسالة:</div>
            <div style="color: #374151; line-height: 1.8; white-space: pre-wrap;">${esc(message)}</div>
          </div>` : ""}
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      // TODO: After verifying your domain in Resend, change to:
      // from: "ALORA Graphic <noreply@yourdomain.com>",
      from: "ALORA Graphic <onboarding@resend.dev>",
      to: [process.env.RECIPIENT_EMAIL || "aloragraphic@gmail.com"],
      subject: `📩 رسالة جديدة من ${esc(name)}`,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
