// ─────────────────────────────────────────────────────────────
// cloudinary.js — Auto-fetch portfolio from Cloudinary folders
//
// HOW IT WORKS:
//   1. Upload images to Cloudinary inside folders:
//        alora-portfolio/vehicle-wraps/لصق سيارة لونا.jpg
//        alora-portfolio/printing/بانر اعلاني.jpg
//   2. Image filename  → card title  (automatic)
//   3. Folder name     → category    (automatic)
//   4. No code changes needed ever — just upload.
//
// REQUIRED ENV VARS (set in Vercel → Settings → Environment Variables):
//   VITE_CLOUDINARY_CLOUD_NAME   = your cloud name
//   VITE_CLOUDINARY_API_KEY      = your API key
//   VITE_CLOUDINARY_API_SECRET   = your API secret   ← server-side only
//
// FOLDER → CATEGORY mapping:
//   vehicle-wraps  →  { ar: "لصق سيارات", en: "Vehicle Wraps" }
//   printing       →  { ar: "طباعة",       en: "Printing"      }
//   signage        →  { ar: "لافتات",      en: "Signage"       }
//   design         →  { ar: "تصميم",       en: "Design"        }
//   apparel        →  { ar: "ملابس",       en: "Apparel"       }
// ─────────────────────────────────────────────────────────────

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const ROOT_FOLDER = "alora-portfolio";

// Folder slug → bilingual category label
const FOLDER_TO_CAT = {
  "vehicle-wraps": { ar: "لصق سيارات", en: "Vehicle Wraps" },
  "printing":      { ar: "طباعة",       en: "Printing"      },
  "signage":       { ar: "لافتات",      en: "Signage"       },
  "design":        { ar: "تصميم",       en: "Design"        },
  "apparel":       { ar: "ملابس",       en: "Apparel"       },
};

// filename from public_id → human readable title
// "alora-portfolio/printing/بانر-اعلاني" → "بانر اعلاني"
function publicIdToTitle(publicId) {
  const parts = publicId.split("/");
  const raw = parts[parts.length - 1];
  return decodeURIComponent(raw).replace(/[-_]/g, " ");
}

// folder slug from public_id
// "alora-portfolio/vehicle-wraps/img" → "vehicle-wraps"
function publicIdToFolder(publicId) {
  const parts = publicId.split("/");
  return parts.length >= 2 ? parts[parts.length - 2] : "";
}

// Optimized Cloudinary URL — resize to 800px, auto quality & format (WebP)
export function buildImageUrl(publicId) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_800,q_auto,f_auto/${publicId}`;
}

// ─── Main fetch — calls our own Vercel API route ─────────────
// The actual Cloudinary Search API call happens server-side
// (api/portfolio.js) so the API secret is never exposed to the browser.
export async function fetchPortfolioItems() {
  if (!CLOUD_NAME) {
    console.warn("[Cloudinary] VITE_CLOUDINARY_CLOUD_NAME is not set.");
    return [];
  }

  try {
    const res = await fetch("/api/portfolio");
    if (!res.ok) throw new Error(`Portfolio API failed: ${res.status}`);
    const data = await res.json();
    const resources = data.resources || [];

    return resources.map((r) => {
      const folder = publicIdToFolder(r.public_id);
      const cat = FOLDER_TO_CAT[folder] || { ar: folder, en: folder };
      const title = publicIdToTitle(r.public_id);
      return {
        title,
        cat,
        image: buildImageUrl(r.public_id),
        publicId: r.public_id,
        folder,
      };
    });
  } catch (err) {
    console.error("[Cloudinary] Failed to fetch portfolio:", err);
    return [];
  }
}
