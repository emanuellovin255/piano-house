import type { L } from "@/lib/i18n";

export type Attraction = {
  id: string;
  name: L;
  blurb: L;
  /** Approximate walking time from Str. Iașilor 35. */
  walk: L;
  category: "cetate" | "muzee" | "practic";
};

export const attractions: Attraction[] = [
  {
    id: "cetatea-alba-carolina",
    category: "cetate",
    name: { ro: "Cetatea Alba Carolina", en: "Alba Carolina Citadel" },
    blurb: {
      ro: "Cea mai mare cetate bastionară de tip Vauban din România, cu șapte bastioane în formă de stea. Se plimbă la orice oră, e iluminată seara și găsiți terase și restaurante în interiorul zidurilor.",
      en: "Romania's largest Vauban-style bastion fortress, a seven-pointed star of ramparts. It is open to walk at any hour, lit at night, with terraces and restaurants inside the walls.",
    },
    walk: { ro: "10 minute pe jos", en: "10-minute walk" },
  },
  {
    id: "schimbarea-garzii",
    category: "cetate",
    name: { ro: "Schimbarea Gărzii", en: "Changing of the Guard" },
    blurb: {
      ro: "Ceremonia cu gărzi în uniforme habsburgice are loc în cetate, lângă Poarta a III-a. Verificați programul zilei la intrare — variază în funcție de sezon.",
      en: "The ceremony, performed by guards in Habsburg-era uniforms, takes place inside the citadel near the Third Gate. Check the day's schedule at the entrance — it varies by season.",
    },
    walk: { ro: "~12 minute pe jos", en: "~12-minute walk" },
  },
  {
    id: "catedrala-incoronarii",
    category: "cetate",
    name: { ro: "Catedrala Încoronării", en: "Coronation Cathedral" },
    blurb: {
      ro: "Ridicată pentru încoronarea regelui Ferdinand și a reginei Maria în 1922. Curtea interioară cu arcade e unul dintre cele mai fotografiate locuri din oraș.",
      en: "Built for the 1922 coronation of King Ferdinand and Queen Marie. Its arcaded inner courtyard is one of the most photographed spots in the city.",
    },
    walk: { ro: "~13 minute pe jos", en: "~13-minute walk" },
  },
  {
    id: "catedrala-sfantul-mihail",
    category: "cetate",
    name: {
      ro: "Catedrala Romano-Catolică Sfântul Mihail",
      en: "St. Michael's Roman Catholic Cathedral",
    },
    blurb: {
      ro: "Cea mai veche și mai lungă catedrală din România, cu părți romanice din secolul al XIII-lea. În interior se află mormântul lui Iancu de Hunedoara.",
      en: "The oldest and longest cathedral in Romania, with Romanesque sections from the 13th century. John Hunyadi's tomb lies inside.",
    },
    walk: { ro: "~13 minute pe jos", en: "~13-minute walk" },
  },
  {
    id: "muzeul-unirii",
    category: "muzee",
    name: {
      ro: "Muzeul Național al Unirii",
      en: "National Museum of the Union",
    },
    blurb: {
      ro: "Colecții de arheologie, istorie și etnografie care acoperă drumul de la Apulum romană până la 1918. Alături se află Sala Unirii, unde s-a semnat actul de la 1 Decembrie 1918.",
      en: "Archaeology, history and ethnography collections spanning Roman Apulum through to 1918. Next door stands the Union Hall, where the 1 December 1918 act was signed.",
    },
    walk: { ro: "~13 minute pe jos", en: "~13-minute walk" },
  },
  {
    id: "biblioteca-batthyaneum",
    category: "muzee",
    name: { ro: "Biblioteca Batthyaneum", en: "Batthyaneum Library" },
    blurb: {
      ro: "Bibliotecă din 1780, instalată într-o fostă biserică. Adăpostește Codex Aureus, un manuscris carolingian din secolul al VIII-lea.",
      en: "A 1780 library housed in a former church. It holds the Codex Aureus, an 8th-century Carolingian manuscript.",
    },
    walk: { ro: "~15 minute pe jos", en: "~15-minute walk" },
  },
  {
    id: "traseul-fortificatiilor",
    category: "cetate",
    name: {
      ro: "Traseul celor Trei Fortificații",
      en: "The Three Fortifications Route",
    },
    blurb: {
      ro: "Un traseu marcat care leagă castrul roman, cetatea medievală și cetatea Vauban. Cea mai bună introducere în oraș dacă aveți o singură dimineață liberă.",
      en: "A marked route linking the Roman castrum, the medieval fortress and the Vauban citadel. The best introduction to the city if you only have one free morning.",
    },
    walk: { ro: "~12 minute până la start", en: "~12 minutes to the start" },
  },
];

export type Practical = { id: string; label: L; value: L; icon: string };

/** Everything within a few minutes' walk, straight from the owner's notes. */
export const practical: Practical[] = [
  {
    id: "gara",
    icon: "TrainFront",
    label: { ro: "Gara Alba Iulia", en: "Alba Iulia train station" },
    value: { ro: "Câteva minute pe jos", en: "A few minutes on foot" },
  },
  {
    id: "autogara",
    icon: "BusFront",
    label: { ro: "Autogara", en: "Bus station" },
    value: { ro: "Câteva minute pe jos", en: "A few minutes on foot" },
  },
  {
    id: "supermarket",
    icon: "ShoppingCart",
    label: { ro: "Supermarketuri", en: "Supermarkets" },
    value: { ro: "În imediata apropiere", en: "Immediately nearby" },
  },
  {
    id: "restaurante",
    icon: "UtensilsCrossed",
    label: { ro: "Restaurante", en: "Restaurants" },
    value: { ro: "În imediata apropiere", en: "Immediately nearby" },
  },
  {
    id: "farmacii",
    icon: "Pill",
    label: { ro: "Farmacii", en: "Pharmacies" },
    value: { ro: "În imediata apropiere", en: "Immediately nearby" },
  },
  {
    id: "institutii",
    icon: "Landmark",
    label: {
      ro: "Tribunalul Alba, Consiliul Local, Poliția",
      en: "Alba Court, Local Council, Police",
    },
    value: { ro: "Câteva minute de plimbare", en: "A few minutes' walk" },
  },
];
