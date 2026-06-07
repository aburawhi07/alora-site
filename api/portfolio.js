// ─────────────────────────────────────────────────────────────
// api/portfolio.js — Vercel serverless function
// Calls Cloudinary Search API server-side so the API secret
// is never exposed to the browser.
// ─────────────────────────────────────────────────────────────

const CLOUD_NAME  = process.env.VITE_CLOUDINARY_CLOUD_NAME;
const API_KEY     = process.env.CLOUDINARY_API_KEY;
const API_SECRET  = process.env.CLOUDINARY_API_SECRET;
const ROOT_FOLDER = "alora-portfolio";

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.error("[Portfolio API] Missing Cloudinary environment variables.");
    return res.status(500).json({ error: "Server misconfiguration", resources: [] });
  }

  try {
    // Cloudinary Search API — finds all images inside the root folder
    const searchUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`;

    const body = JSON.stringify({
      expression: `folder:${ROOT_FOLDER}/*`,
      sort_by: [{ created_at: "desc" }],   // newest first
      max_results: 100,
      fields: ["public_id", "secure_url", "folder", "asset_folder", "created_at", "format", "display_name", "filename"],
    });

    // Basic Auth using API key + secret
    const credentials = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");

    const cloudRes = await fetch(searchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials}`,
      },
      body,
    });

    if (!cloudRes.ok) {
      const err = await cloudRes.text();
      console.error("[Portfolio API] Cloudinary error:", err);
      return res.status(502).json({ error: "Cloudinary error", resources: [] });
    }

    const data = await cloudRes.json();

    // Cache for 60 seconds on Vercel edge
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({ resources: data.resources || [] });

  } catch (err) {
    console.error("[Portfolio API] Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error", resources: [] });
  }
}
