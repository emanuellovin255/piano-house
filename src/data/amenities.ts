import type { L } from "@/lib/i18n";

export type AmenityCategory = "kitchen" | "comfort" | "outdoor" | "access";

export type Amenity = {
  id: string;
  /** lucide-react icon name, resolved in src/components/ui/Icon.tsx */
  icon: string;
  label: L;
  note?: L;
  category: AmenityCategory;
};

export const amenityCategories: { id: AmenityCategory; label: L; blurb: L }[] =
  [
    {
      id: "kitchen",
      label: { ro: "Bucătărie", en: "Kitchen" },
      blurb: {
        ro: "Gătiți sau doar încălziți ceva la orice oră — nu depindeți de programul niciunui restaurant.",
        en: "Cook properly or just reheat something at any hour — you never depend on a restaurant's schedule.",
      },
    },
    {
      id: "comfort",
      label: { ro: "Confort", en: "Comfort" },
      blurb: {
        ro: "Tot ce vă așteptați de la un hotel bun, într-un spațiu care e numai al dumneavoastră.",
        en: "Everything you would expect from a good hotel, in a space that is entirely yours.",
      },
    },
    {
      id: "outdoor",
      label: { ro: "Curte și parcare", en: "Courtyard & parking" },
      blurb: {
        ro: "Curtea familiei, amenajată pentru recreere în aer liber, cu loc de parcare pentru fiecare unitate.",
        en: "Our family courtyard, set up for open-air relaxation, with a parking space for every unit.",
      },
    },
    {
      id: "access",
      label: { ro: "Acces și siguranță", en: "Access & safety" },
      blurb: {
        ro: "Acces privat la întregul apartament, fără trepte la intrarea principală.",
        en: "Private access to the whole apartment, with no steps at the main entrance.",
      },
    },
  ];

export const amenities: Amenity[] = [
  // Kitchen
  {
    id: "fridge",
    icon: "Refrigerator",
    category: "kitchen",
    label: { ro: "Frigider", en: "Refrigerator" },
  },
  {
    id: "microwave",
    icon: "Microwave",
    category: "kitchen",
    label: { ro: "Cuptor cu microunde", en: "Microwave oven" },
  },
  {
    id: "espresso",
    icon: "Coffee",
    category: "kitchen",
    label: { ro: "Espressor", en: "Espresso machine" },
  },
  {
    id: "toaster",
    icon: "Sandwich",
    category: "kitchen",
    label: { ro: "Prăjitor de pâine", en: "Toaster" },
  },
  {
    id: "kitchenware",
    icon: "UtensilsCrossed",
    category: "kitchen",
    label: { ro: "Articole de bucătărie", en: "Kitchenware" },
  },
  {
    id: "lavazza",
    icon: "CupSoda",
    category: "kitchen",
    label: { ro: "Cafea Lavazza", en: "Lavazza coffee" },
    note: { ro: "Din partea casei", en: "On the house" },
  },
  {
    id: "water",
    icon: "GlassWater",
    category: "kitchen",
    label: { ro: "Apă plată", en: "Still water" },
    note: { ro: "Din partea casei", en: "On the house" },
  },

  // Comfort
  {
    id: "smart-tv",
    icon: "Tv",
    category: "comfort",
    label: { ro: "Smart TV", en: "Smart TV" },
    note: {
      ro: "Cu o multitudine de programe",
      en: "With a wide range of channels",
    },
  },
  {
    id: "wifi",
    icon: "Wifi",
    category: "comfort",
    label: { ro: "Wi-Fi rapid nelimitat", en: "Fast unlimited Wi-Fi" },
    note: { ro: "Gratuit", en: "Free" },
  },
  {
    id: "hairdryer",
    icon: "Wind",
    category: "comfort",
    label: { ro: "Uscător de păr", en: "Hair dryer" },
  },
  {
    id: "linen",
    icon: "BedDouble",
    category: "comfort",
    label: { ro: "Lenjerie curată", en: "Fresh bed linen" },
  },
  {
    id: "towels",
    icon: "Bath",
    category: "comfort",
    label: { ro: "Set de prosoape curate", en: "Fresh towel set" },
  },
  {
    id: "toiletries",
    icon: "Droplets",
    category: "comfort",
    label: { ro: "Articole de toaletă", en: "Toiletries" },
  },

  // Outdoor
  {
    id: "parking",
    icon: "CircleParking",
    category: "outdoor",
    label: {
      ro: "Parcare gratuită în curte",
      en: "Free parking in the courtyard",
    },
    note: { ro: "Loc pentru fiecare unitate", en: "One space per unit" },
  },
  {
    id: "courtyard",
    icon: "Trees",
    category: "outdoor",
    label: { ro: "Curte amenajată", en: "Landscaped courtyard" },
    note: {
      ro: "Zonă de recreere în aer liber",
      en: "Outdoor relaxation area",
    },
  },
  {
    id: "smoking-area",
    icon: "CigaretteOff",
    category: "outdoor",
    label: {
      ro: "Zonă de fumat în curte",
      en: "Smoking area in the courtyard",
    },
    note: { ro: "În interior nu se fumează", en: "No smoking indoors" },
  },

  // Access
  {
    id: "step-free",
    icon: "Accessibility",
    category: "access",
    label: { ro: "Acces fără trepte", en: "Step-free access" },
    note: {
      ro: "Intrarea principală e accesibilă cu scaunul cu rotile",
      en: "The main entrance is wheelchair accessible",
    },
  },
  {
    id: "private-access",
    icon: "KeyRound",
    category: "access",
    label: { ro: "Acces privat", en: "Private access" },
    note: {
      ro: "Aveți întregul apartament doar pentru dumneavoastră",
      en: "The whole apartment is yours alone",
    },
  },
  {
    id: "cctv",
    icon: "Video",
    category: "access",
    label: {
      ro: "Curte sub supraveghere video",
      en: "Courtyard under video surveillance",
    },
  },
];

export const amenityById = (id: string) => amenities.find((a) => a.id === id);

export const amenitiesByCategory = (category: AmenityCategory) =>
  amenities.filter((a) => a.category === category);
