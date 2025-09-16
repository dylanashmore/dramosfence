// Grab all images under each service subfolder (wood, vinyl, gates, etc.)
const mods = import.meta.glob(
  "/src/assets/services/*/*.{jpg,jpeg,png,webp,svg}",
  { eager: true, import: "default" }   // <- direct URLs
);

// Build { slug: [{url, path}, ...] }
export const serviceGallery = Object.entries(mods).reduce((acc, [path, url]) => {
  const afterRoot = path.split("/services/")[1]; // e.g. "wood/abc.jpg"
  const slug = afterRoot.split("/")[0];          // e.g. "wood"
  (acc[slug] ||= []).push({ url, path });
  return acc;
}, {});

// Sort each gallery by path for stable order
Object.values(serviceGallery).forEach(arr =>
  arr.sort((a, b) => a.path.localeCompare(b.path))
);

// Convenience: { slug: [url, url, ...] }
export const galleryUrlsBySlug = Object.fromEntries(
  Object.entries(serviceGallery).map(([slug, arr]) => [slug, arr.map(x => x.url)])
);

// Helper to fetch one service by slug ("wood", "vinyl", "gates", "aluminum", "steel", "chain-link")
export const getServiceUrls = (slug) => galleryUrlsBySlug[slug] ?? [];
