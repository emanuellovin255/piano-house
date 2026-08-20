import { media, type MediaImage } from "@/data/images.generated";
import type { L, LList } from "@/lib/i18n";

export type UnitSlug = "city" | "travel" | "tango";

export type Unit = {
  slug: UnitSlug;
  /** Brand name — deliberately identical in both languages. */
  name: string;
  kind: L;
  tagline: L;
  intro: LList;
  maxGuests: number;
  pricePerNight: number;
  rooms: { label: L; area: number }[];
  totalArea: number;
  beds: LList;
  highlights: LList;
  /** Amenity ids resolved against src/data/amenities.ts */
  amenities: string[];
  cover: MediaImage;
  photos: readonly MediaImage[];
};

const cover = (name: UnitSlug) =>
  media["units/cover"].find((i) => i.src.endsWith(`/${name}.jpg`))!;

/** Pick a specific shot from a unit's own folder as its cover. */
const coverFrom = (slug: UnitSlug, file: string) =>
  media[`units/${slug}`].find((i) => i.src.endsWith(file))!;

export const units: Unit[] = [
  {
    slug: "city",
    name: "CITY",
    kind: { ro: "Apartament", en: "Apartment" },
    tagline: {
      ro: "Cărămidă aparentă, stejar și o scară în spirală",
      en: "Exposed brick, oak floors and a spiral staircase",
    },
    intro: {
      ro: [
        "Cel mai spațios dintre apartamentele noastre. Livingul deschis către bucătăria complet utilată e dominat de un perete de cărămidă aparentă și de scara metalică în spirală — detaliile care fac spațiul de neconfundat.",
        "Dormitorul separat, cu pat matrimonial, și canapeaua extensibilă din living permit cazarea a patru persoane fără compromisuri. Baia cu duș e finisată în aceleași tonuri calde.",
      ],
      en: [
        "The most spacious of our apartments. The open living area, connected to a fully equipped kitchen, is anchored by an exposed brick wall and a spiral steel staircase — the details that make the space unmistakable.",
        "A separate bedroom with a double bed, plus the sofa bed in the living room, sleeps four without compromise. The shower room is finished in the same warm tones.",
      ],
    },
    maxGuests: 4,
    pricePerNight: 250,
    rooms: [
      {
        label: {
          ro: "Living + bucătărie complet utilată",
          en: "Living room + fully equipped kitchen",
        },
        area: 26,
      },
      { label: { ro: "Dormitor", en: "Bedroom" }, area: 12 },
      { label: { ro: "Baie cu duș", en: "Bathroom with shower" }, area: 6 },
    ],
    totalArea: 44,
    beds: {
      ro: [
        "Pat matrimonial în dormitor",
        "Canapea extensibilă în living (2 copii)",
      ],
      en: [
        "Double bed in the bedroom",
        "Sofa bed in the living room (2 children)",
      ],
    },
    highlights: {
      ro: [
        "Perete de cărămidă aparentă",
        "Bucătărie complet utilată",
        "Dormitor separat",
        "Parcare în curte",
      ],
      en: [
        "Exposed brick wall",
        "Fully equipped kitchen",
        "Separate bedroom",
        "Parking in the courtyard",
      ],
    },
    amenities: [
      "smart-tv",
      "wifi",
      "fridge",
      "microwave",
      "espresso",
      "toaster",
      "kitchenware",
      "hairdryer",
      "parking",
      "toiletries",
      "towels",
      "linen",
      "lavazza",
      "water",
    ],
    cover: cover("city"),
    photos: media["units/city"],
  },
  {
    slug: "travel",
    name: "TRAVEL",
    kind: { ro: "Apartament", en: "Apartment" },
    tagline: {
      ro: "Dormitor generos, living luminos, aceleași dotări complete",
      en: "A generous bedroom, a bright living room, the same full kit",
    },
    intro: {
      ro: [
        "TRAVEL inversează proporțiile față de CITY: dormitorul e mai mare, livingul puțin mai compact, dar la fel de luminos și cu bucătăria complet utilată la îndemână.",
        "Patul matrimonial și canapeaua extensibilă acoperă până la patru persoane. Alegerea potrivită dacă petreceți mai mult timp în cameră decât în oraș.",
      ],
      en: [
        "TRAVEL flips the proportions of CITY: a larger bedroom, a slightly more compact living room — just as bright, with the fully equipped kitchen within reach.",
        "The double bed and sofa bed together sleep up to four. The right pick if you spend more time in the room than out in town.",
      ],
    },
    maxGuests: 4,
    pricePerNight: 250,
    rooms: [
      {
        label: {
          ro: "Living + bucătărie complet utilată",
          en: "Living room + fully equipped kitchen",
        },
        area: 21,
      },
      { label: { ro: "Dormitor", en: "Bedroom" }, area: 15 },
      { label: { ro: "Baie cu duș", en: "Bathroom with shower" }, area: 6 },
    ],
    totalArea: 42,
    beds: {
      ro: [
        "Pat matrimonial în dormitor",
        "Canapea extensibilă în living (2 copii)",
      ],
      en: [
        "Double bed in the bedroom",
        "Sofa bed in the living room (2 children)",
      ],
    },
    highlights: {
      ro: [
        "Dormitor de 15 mp",
        "Bucătărie complet utilată",
        "Dormitor separat",
        "Parcare în curte",
      ],
      en: [
        "15 sqm bedroom",
        "Fully equipped kitchen",
        "Separate bedroom",
        "Parking in the courtyard",
      ],
    },
    amenities: [
      "smart-tv",
      "wifi",
      "fridge",
      "microwave",
      "espresso",
      "toaster",
      "kitchenware",
      "hairdryer",
      "parking",
      "toiletries",
      "towels",
      "linen",
      "lavazza",
      "water",
    ],
    // The stock cover is a bedroom, same as TANGO — the living room reads apart.
    cover: coverFrom("travel", "img_5259.jpg"),
    photos: media["units/travel"],
  },
  {
    slug: "tango",
    name: "TANGO",
    kind: { ro: "Cameră matrimonială", en: "Double room" },
    tagline: {
      ro: "O cameră de hotel boutique, pentru doi",
      en: "A boutique hotel room, for two",
    },
    intro: {
      ro: [
        "Camera matrimonială TANGO e cea mai intimă opțiune: 21 mp în tonuri de grafit și crem, cu lenjerie albă, aplice de perete și parchet de stejar.",
        "Gândită pentru două persoane — un city break în doi, o noapte între două drumuri sau o vizită scurtă în Alba Iulia.",
      ],
      en: [
        "The TANGO double room is the most intimate option: 21 sqm in graphite and cream, with white linen, wall sconces and oak flooring.",
        "Designed for two — a city break, a night between two journeys, or a short visit to Alba Iulia.",
      ],
    },
    maxGuests: 2,
    pricePerNight: 200,
    rooms: [
      { label: { ro: "Cameră", en: "Room" }, area: 21 },
      { label: { ro: "Baie cu duș", en: "Bathroom with shower" }, area: 6 },
    ],
    totalArea: 27,
    beds: {
      ro: ["Pat matrimonial"],
      en: ["Double bed"],
    },
    highlights: {
      ro: [
        "Pentru 2 persoane",
        "Design boutique",
        "Colț de cafea",
        "Parcare în curte",
      ],
      en: [
        "Sleeps 2",
        "Boutique design",
        "Coffee corner",
        "Parking in the courtyard",
      ],
    },
    amenities: [
      "smart-tv",
      "wifi",
      "fridge",
      "microwave",
      "espresso",
      "hairdryer",
      "parking",
      "toiletries",
      "towels",
      "linen",
      "lavazza",
      "water",
    ],
    cover: cover("tango"),
    photos: media["units/tango"],
  },
];

export const unitBySlug = (slug: string) => units.find((u) => u.slug === slug);

export const priceFrom = Math.min(...units.map((u) => u.pricePerNight));
