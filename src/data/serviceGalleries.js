const mods = import.meta.glob(
  "/src/assets/services/*/*.{jpg,jpeg,png,webp,svg}",
  { eager: true }
);

export const serviceGallery = Object.entries(mods).reduce((acc, [path, mod]) => {
  const afterRoot = path.split("/services/")[1];       
  const slug = afterRoot.split("/")[0];                
  (acc[slug] ||= []).push({ url: mod.default, path });
  return acc;
}, {});

Object.values(serviceGallery).forEach(arr =>
  arr.sort((a, b) => a.path.localeCompare(b.path))
);

export const galleryUrlsBySlug = Object.fromEntries(
  Object.entries(serviceGallery).map(([slug, arr]) => [slug, arr.map(x => x.url)])
);