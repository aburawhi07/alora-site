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
// Keys are LOWERCASE so we can match regardless of Cloudinary casing
const FOLDER_TO_CAT = {
  "vehicle-wraps": { ar: "لصق سيارات", en: "Vehicle Wraps" },
  "printing":      { ar: "طباعة",       en: "Printing"      },
  "signage":       { ar: "لافتات",      en: "Signage"       },
  "design":        { ar: "تصميم",       en: "Design"        },
  "apparel":       { ar: "ملابس",       en: "Apparel"       },
};

// filename from public_id → human readable title
// Cloudinary may store the display_name separately, so we prefer it.
// "alora-portfolio/printing/بانر-اعلاني" → "بانر اعلاني"
function publicIdToTitle(publicId, displayName) {
  // Prefer Cloudinary's original filename if available
  if (displayName) {
    return displayName.replace(/\.[^/.]+$/, ""); // strip extension
  }
  const parts = publicId.split("/");
  const raw = parts[parts.length - 1];
  // Remove any Cloudinary version suffix (e.g. "_abc123")
  const clean = raw.replace(/_[a-z0-9]{6,}$/, "");
  return decodeURIComponent(clean).replace(/[-_]/g, " ").trim();
}

// Extract subfolder slug from asset_folder
// "alora-portfolio/Printing" → "printing"
// "alora-portfolio/vehicle-wraps" → "vehicle-wraps"
function assetFolderToSlug(assetFolder) {
  if (!assetFolder) return "";
  const parts = assetFolder.split("/");
  // The subfolder is the last segment after the root folder
  const sub = parts.length >= 2 ? parts[parts.length - 1] : "";
  return sub.toLowerCase();
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
      // Use asset_folder (e.g. "alora-portfolio/Printing") instead of public_id
      const folder = assetFolderToSlug(r.asset_folder);
      const cat = FOLDER_TO_CAT[folder] || { ar: folder, en: folder };
      const title = publicIdToTitle(r.public_id, r.display_name || r.filename);
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

