import type { L } from "@/lib/i18n";
import { siteConfig } from "@/config/site";

export type FaqItem = { q: L; a: L };

export const faq: FaqItem[] = [
  {
    q: {
      ro: "La ce oră sunt check-in-ul și check-out-ul?",
      en: "What are the check-in and check-out times?",
    },
    a: {
      ro: `Check-in de la ${siteConfig.checkIn}, check-out până la ${siteConfig.checkOut}. Dacă ajungeți mai devreme sau plecați mai târziu, sunați-ne — de cele mai multe ori găsim o soluție.`,
      en: `Check-in from ${siteConfig.checkIn}, check-out by ${siteConfig.checkOut}. If you arrive earlier or leave later, give us a call — we can usually work something out.`,
    },
  },
  {
    q: { ro: "Aveți parcare?", en: "Is there parking?" },
    a: {
      ro: "Da. Fiecare spațiu de cazare are locul lui de parcare în curte, gratuit. Nu trebuie să căutați loc pe stradă.",
      en: "Yes. Every unit has its own free parking space inside the courtyard. You never have to look for a spot on the street.",
    },
  },
  {
    q: { ro: "Se poate fuma?", en: "Can I smoke?" },
    a: {
      ro: "În interiorul apartamentelor NU se fumează. Puteți fuma, bea cafeaua de dimineață sau savura un vin bun în curtea pensiunii, într-o zonă amenajată special pentru recreere în aer liber.",
      en: "There is no smoking inside the apartments. You are welcome to smoke, have your morning coffee or enjoy a glass of wine in the courtyard, in an area set up specifically for open-air relaxation.",
    },
  },
  {
    q: {
      ro: "Cât durează până la Cetatea Alba Carolina?",
      en: "How far is the Alba Carolina Citadel?",
    },
    a: {
      ro: "10 minute de mers pe jos. Suntem în zona centrală, foarte aproape și de gară, autogară, supermarketuri, restaurante și farmacii.",
      en: "A 10-minute walk. We are in the central area, also very close to the train and bus stations, supermarkets, restaurants and pharmacies.",
    },
  },
  {
    q: { ro: "Câte persoane încap?", en: "How many people can stay?" },
    a: {
      ro: "Apartamentele CITY și TRAVEL primesc până la 4 persoane fiecare — pat matrimonial în dormitor plus canapea extensibilă în living pentru 2 copii. Camera matrimonială TANGO e pentru 2 persoane.",
      en: "The CITY and TRAVEL apartments each sleep up to 4 — a double bed in the bedroom plus a sofa bed in the living room for 2 children. The TANGO double room sleeps 2.",
    },
  },
  {
    q: { ro: "Pot găti în apartament?", en: "Can I cook in the apartment?" },
    a: {
      ro: "În CITY și TRAVEL aveți bucătărie complet utilată, cu frigider, cuptor cu microunde, espressor, prăjitor de pâine și articole de bucătărie. În TANGO aveți frigider, cuptor cu microunde și espressor.",
      en: "CITY and TRAVEL have a fully equipped kitchen with a refrigerator, microwave, espresso machine, toaster and kitchenware. TANGO has a refrigerator, microwave and espresso machine.",
    },
  },
  {
    q: { ro: "Wi-Fi-ul e inclus?", en: "Is Wi-Fi included?" },
    a: {
      ro: "Da — internet Wi-Fi rapid, nelimitat și gratuit în toate spațiile de cazare.",
      en: "Yes — fast, unlimited Wi-Fi, free in every unit.",
    },
  },
  {
    q: {
      ro: "Locația e accesibilă cu scaunul cu rotile?",
      en: "Is the property wheelchair accessible?",
    },
    a: {
      ro: "Accesul e facilitat: nu există scări la intrarea principală. Pentru detalii despre o situație anume, sunați-ne înainte de rezervare.",
      en: "Access is straightforward: there are no steps at the main entrance. For details about a specific situation, please call us before booking.",
    },
  },
  {
    q: { ro: "Ce e inclus în preț?", en: "What is included in the price?" },
    a: {
      ro: "Lenjeria și prosoapele curate, articolele de toaletă, parcarea, Wi-Fi-ul — și cafeaua Lavazza și apa plată din partea casei.",
      en: "Fresh linen and towels, toiletries, parking, Wi-Fi — plus Lavazza coffee and still water on the house.",
    },
  },
  {
    q: { ro: "Acceptați animale de companie?", en: "Do you accept pets?" },
    a: {
      ro: "Vă rugăm să ne întrebați înainte de a rezerva, la 0742 009 998. Răspundem la fiecare situație în parte.",
      en: "Please ask us before booking, at +40 742 009 998. We handle each situation individually.",
    },
  },
  {
    q: { ro: "Cum rezerv?", en: "How do I book?" },
    a: {
      ro: "Completați formularul de pe pagina de Rezervări, scrieți-ne pe WhatsApp sau sunați direct la 0742 009 998. Vă confirmăm disponibilitatea în cel mai scurt timp.",
      en: "Fill in the form on the Booking page, message us on WhatsApp, or call +40 742 009 998 directly. We confirm availability as quickly as we can.",
    },
  },
];

export type HouseRule = { icon: string; text: L };

/** Verbatim from the owner's "Reguli de ordine internă". */
export const houseRules: HouseRule[] = [
  {
    icon: "PartyPopper",
    text: {
      ro: "Orice fel de petrecere este complet interzisă.",
      en: "Parties of any kind are strictly forbidden.",
    },
  },
  {
    icon: "Video",
    text: {
      ro: "Intrarea în curte este sub supraveghere video.",
      en: "The courtyard entrance is under video surveillance.",
    },
  },
  {
    icon: "Users",
    text: {
      ro: "Numărul de persoane trebuie să fie același cu cel din rezervarea confirmată.",
      en: "The number of guests must match the confirmed reservation.",
    },
  },
  {
    icon: "Sofa",
    text: {
      ro: "Oaspeții nu vor muta și nu vor face modificări la mobilier sau la obiectele decorative.",
      en: "Guests may not move or alter the furniture or decorative objects.",
    },
  },
  {
    icon: "Moon",
    text: {
      ro: `Deranjarea vecinilor este interzisă în intervalul orar ${siteConfig.quietHours}.`,
      en: `Disturbing the neighbours is not permitted between ${siteConfig.quietHours}.`,
    },
  },
  {
    icon: "CigaretteOff",
    text: {
      ro: "În interiorul apartamentelor nu se fumează. Fumatul este permis în curte.",
      en: "No smoking inside the apartments. Smoking is allowed in the courtyard.",
    },
  },
];

export const rulesWarning: L = {
  ro: "Producerea oricărui zgomot sau orice zarvă ar duce la anularea rezervării, în consecință oaspeții fiind rugați să părăsească locația noastră, pierzând întreaga sumă plătită pentru rezervare.",
  en: "Any noise or commotion leads to the cancellation of the reservation; guests will be asked to leave the property and will forfeit the entire amount paid for the booking.",
};
