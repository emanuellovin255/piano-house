import { media, type MediaImage } from "@/data/images.generated";
import type { L } from "@/lib/i18n";
import type { UnitSlug } from "@/data/units";

export type GalleryTag = "interior" | "exterior" | UnitSlug;

export type GalleryItem = MediaImage & {
  id: string;
  tags: GalleryTag[];
  alt: L;
};

/** Shots in /gallery that show the courtyard, the gate or the street. */
const EXTERIOR_IN_GALLERY = new Set([
  "20220305_202442",
  "20220305_202559",
  "img-20220223-wa0037--1-",
  "img_5012",
]);

/** Which unit each photo belongs to, derived from the per-unit folders. */
const unitOf = new Map<string, UnitSlug>();
for (const slug of ["city", "travel", "tango"] as const) {
  for (const photo of media[`units/${slug}`]) {
    unitOf.set(basename(photo.src), slug);
  }
}

function basename(src: string) {
  return src
    .split("/")
    .pop()!
    .replace(/\.(jpe?g|png)$/i, "");
}

const altFor = (tags: GalleryTag[], id: string): L => {
  const unit = tags.find(
    (t) => t === "city" || t === "travel" || t === "tango",
  );
  if (unit) {
    return {
      ro: `Piano House Alba Iulia — ${unit.toUpperCase()}`,
      en: `Piano House Alba Iulia — ${unit.toUpperCase()}`,
    };
  }
  if (tags.includes("exterior")) {
    return {
      ro: "Curtea și exteriorul Piano House, Alba Iulia",
      en: "The courtyard and exterior of Piano House, Alba Iulia",
    };
  }
  return {
    ro: `Interior Piano House Alba Iulia (${id})`,
    en: `Piano House Alba Iulia interior (${id})`,
  };
};

function toItem(photo: MediaImage, forceExterior = false): GalleryItem {
  const id = basename(photo.src);
  const tags: GalleryTag[] = [];
  const exterior = forceExterior || EXTERIOR_IN_GALLERY.has(id);
  tags.push(exterior ? "exterior" : "interior");
  const unit = unitOf.get(id);
  if (unit) tags.push(unit);
  return { ...photo, id, tags, alt: altFor(tags, id) };
}

/**
 * Filenames lead the grid, strongest first. Sorting by name alone opened the
 * gallery on night exteriors and grouped every bathroom together; this puts
 * the rooms people are actually choosing between up top.
 */
const FEATURED = [
  "img_5248",
  "img_5275hdr",
  "img_5231",
  "img_5259",
  "img_5056",
  "img_5230",
  "img_5261",
  "img_5233",
  "img_5276",
  "img_5243",
  "img_5224",
  "img_5062",
  "img_5222",
  "img_5265",
  "img_5289",
  "img_5241",
  "img_5053",
  "img_5236",
];

const rank = (id: string) => {
  const index = FEATURED.indexOf(id);
  return index === -1 ? FEATURED.length : index;
};

/**
 * The full gallery: every interior shot, plus the courtyard set. hero/antet.jpg
 * is deliberately excluded — it is a collage from the old site, not a photo.
 */
export const galleryItems: GalleryItem[] = [
  ...media.gallery.map((p) => toItem(p)),
  ...media.new.map((p) => toItem(p, true)),
  ...media.hero
    .filter((p) => p.src.endsWith("pano.jpg"))
    .map((p) => toItem(p, true)),
].sort((a, b) => rank(a.id) - rank(b.id));

export const galleryFilters: { id: "all" | GalleryTag; count: number }[] = [
  { id: "all", count: galleryItems.length },
  {
    id: "interior",
    count: galleryItems.filter((i) => i.tags.includes("interior")).length,
  },
  {
    id: "exterior",
    count: galleryItems.filter((i) => i.tags.includes("exterior")).length,
  },
  {
    id: "city",
    count: galleryItems.filter((i) => i.tags.includes("city")).length,
  },
  {
    id: "travel",
    count: galleryItems.filter((i) => i.tags.includes("travel")).length,
  },
  {
    id: "tango",
    count: galleryItems.filter((i) => i.tags.includes("tango")).length,
  },
];

const pick = (src: string) => galleryItems.find((i) => i.src === src)!;

/**
 * Hero fallback slides, shown until the client's video files land — and kept
 * afterwards for reduced-motion and data-saver visitors. Chosen for variety:
 * living room, bedroom, courtyard.
 */
export const heroSlides: MediaImage[] = [
  pick("/media/gallery/img_5248.jpg"),
  pick("/media/gallery/img_5275hdr.jpg"),
  pick("/media/new/img_5059.jpg"),
];

/**
 * A handful of strong shots for the homepage gallery teaser. The first entry
 * is the featured tile — it runs two columns wide and two rows tall on
 * desktop, so the count here should stay at nine to fill the grid exactly.
 */
export const galleryTeaser: GalleryItem[] = [
  pick("/media/gallery/img_5224.jpg"),
  pick("/media/gallery/img_5275hdr.jpg"),
  pick("/media/gallery/img_5233.jpg"),
  pick("/media/gallery/img_5230.jpg"),
  pick("/media/gallery/img_5261.jpg"),
  pick("/media/gallery/img_5253.jpg"),
  pick("/media/gallery/img_5271.jpg"),
  pick("/media/gallery/img_5276.jpg"),
  pick("/media/new/img_5056.jpg"),
];

/** The illuminated house sign at night. */
export const signAtNight = pick("/media/gallery/20220305_202559.jpg");
/** Courtyard after dark — the full-bleed backdrop behind the closing CTA. */
export const courtyardNight = pick("/media/gallery/20220305_202442.jpg");
export const courtyardLounge = pick("/media/new/img_5056.jpg");
export const gateShot = pick("/media/new/img_5053.jpg");
