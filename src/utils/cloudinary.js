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
  "singnage":      { ar: "لافتات",      en: "Signage"       }, // handling the typo in Cloudinary
  "design":        { ar: "تصميم",       en: "Design"        },
  "apparel":       { ar: "ملابس",       en: "Apparel"       },
  "clothing printing": { ar: "طباعة ملابس", en: "Apparel Printing" },
  "wallpapers":    { ar: "جداريات",     en: "Wallpapers"    },
};

// Known Arabic image names from Cloudinary → English translations
const IMAGE_TRANSLATIONS = {
  "طباعة كڤر": "Cover Printing",
  "جدارية مطعم": "Restaurant Wallpaper",
  "صندوق مضيئ": "Lightbox Sign",
  "طباعة ملابس": "Apparel Printing",
  "ستاند عرض": "Display Stand",
  "ميش _ مخرّم": "Mesh Banner",
  "ملصق سياره عجاوي": "Ajjawi Car Wrap",
  "ملصق باص الريان": "Al-Rayyan Bus Wrap",
  "ملصق باص لونا": "Luna Bus Wrap",
  "ملصق باص العجاوي": "Ajjawi Bus Wrap",
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

// Extract subfolder name from asset_folder
// "alora-portfolio/Printing" → "Printing"
// "alora-portfolio/طباعة - Printing" → "طباعة - Printing"
function getSubfolderRaw(assetFolder) {
  if (!assetFolder) return "";
  const parts = assetFolder.split("/");
  // The subfolder is the last segment after the root folder
  return parts.length >= 2 ? parts[parts.length - 1] : "";
}

// Parses a string formatted as "Arabic Name - English Name" or "Arabic Name | English Name"
// Returns { ar: "...", en: "..." }
function parseBilingualText(text) {
  if (!text) return { ar: "", en: "" };
  
  // Split by common separators: "-" or "|" surrounded by optional spaces
  const parts = text.split(/\s*[-|]\s*/);
  
  if (parts.length >= 2) {
    // Assuming Arabic is first, English is second
    return { ar: parts[0].trim(), en: parts[1].trim() };
  }
  
  return null; // Return null if no separator found
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
      // 1. Resolve Category (Folder)
      const folderRaw = getSubfolderRaw(r.asset_folder);
      const folderSlug = folderRaw.toLowerCase();
      
      let cat;
      const parsedFolder = parseBilingualText(folderRaw);
      if (parsedFolder) {
        cat = parsedFolder; // e.g. "طباعة - Printing"
      } else {
        // Fallback to dictionary for old folders
        cat = FOLDER_TO_CAT[folderSlug] || { ar: folderRaw, en: folderRaw };
      }

      // 2. Resolve Title (Image Name)
      const rawTitle = publicIdToTitle(r.public_id, r.display_name || r.filename);
      
      let title;
      const parsedTitle = parseBilingualText(rawTitle);
      if (parsedTitle) {
        title = parsedTitle; // e.g. "جدارية مطعم - Restaurant Wallpaper"
      } else {
        // Fallback to dictionary for old images
        const enTitle = IMAGE_TRANSLATIONS[rawTitle] || rawTitle;
        title = { ar: rawTitle, en: enTitle };
      }

      return {
        title,
        cat,
        image: buildImageUrl(r.public_id),
        publicId: r.public_id,
        folder: folderSlug, // use slug for filtering logic internally
      };
    });
  } catch (err) {
    console.error("[Cloudinary] Failed to fetch portfolio:", err);
    return [];
  }
}

