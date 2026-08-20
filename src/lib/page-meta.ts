import type { L } from "@/lib/i18n";
import type { PageKey } from "@/lib/routes";

/**
 * Search-facing title and description for every page. Kept apart from the UI
 * dictionary because these are written for result snippets, not for the page.
 */
export const pageMeta: Record<PageKey, { title: L; description: L }> = {
  home: {
    title: {
      ro: "Cazare în apartamente la curte, Alba Iulia",
      en: "Courtyard apartments in Alba Iulia",
    },
    description: {
      ro: "Trei spații renovate complet în centrul orașului Alba Iulia, la 10 minute de Cetatea Alba Carolina. Parcare gratuită, bucătărie utilată, Wi-Fi nelimitat.",
      en: "Three fully renovated spaces in central Alba Iulia, a ten-minute walk from the Alba Carolina Citadel. Free parking, equipped kitchen, unlimited Wi-Fi.",
    },
  },
  about: {
    title: { ro: "Despre noi", en: "About us" },
    description: {
      ro: "Piano House, în curtea familiei noastre din centrul orașului Alba Iulia, renovat complet în februarie 2022 împreună cu un designer de interior.",
      en: "Piano House, in our family courtyard in central Alba Iulia, fully renovated in February 2022 together with an interior designer.",
    },
  },
  units: {
    title: { ro: "Apartamente și camere", en: "Apartments and rooms" },
    description: {
      ro: "Apartamentele CITY și TRAVEL pentru până la 4 persoane și camera matrimonială TANGO pentru 2. Suprafețe, dotări și prețuri.",
      en: "The CITY and TRAVEL apartments for up to 4 guests and the TANGO double room for 2. Sizes, amenities and prices.",
    },
  },
  amenities: {
    title: { ro: "Facilități și dotări", en: "Facilities and amenities" },
    description: {
      ro: "Bucătărie complet utilată, Smart TV, Wi-Fi nelimitat gratuit, parcare în curte, acces fără trepte. Cafeaua Lavazza și apa sunt din partea casei.",
      en: "Fully equipped kitchen, Smart TV, free unlimited Wi-Fi, courtyard parking, step-free access. Lavazza coffee and water on the house.",
    },
  },
  gallery: {
    title: { ro: "Galerie foto", en: "Photo gallery" },
    description: {
      ro: "Interioarele, curtea și fiecare dintre cele trei spații de cazare de la Piano House, Alba Iulia.",
      en: "The interiors, the courtyard, and each of the three places to stay at Piano House, Alba Iulia.",
    },
  },
  city: {
    title: { ro: "Ce vizitezi în Alba Iulia", en: "What to see in Alba Iulia" },
    description: {
      ro: "Cetatea Alba Carolina, Schimbarea Gărzii, Catedrala Încoronării, Muzeul Unirii — toate la o plimbare de Piano House.",
      en: "The Alba Carolina Citadel, the Changing of the Guard, the Coronation Cathedral, the Museum of the Union — all a walk from Piano House.",
    },
  },
  reviews: {
    title: { ro: "Recenzii", en: "Reviews" },
    description: {
      ro: "Ce spun oaspeții care au stat la Piano House, Alba Iulia.",
      en: "What guests who have stayed at Piano House in Alba Iulia say.",
    },
  },
  booking: {
    title: { ro: "Rezervări", en: "Booking" },
    description: {
      ro: "Verificați disponibilitatea la Piano House Alba Iulia. Alegeți datele, primiți estimarea de preț și trimiteți cererea sau scrieți-ne pe WhatsApp.",
      en: "Check availability at Piano House Alba Iulia. Pick your dates, see the price estimate, and send your request or message us on WhatsApp.",
    },
  },
  contact: {
    title: { ro: "Contact", en: "Contact" },
    description: {
      ro: "Piano House, str. Iașilor 35, Alba Iulia. Telefon 0742 009 998, office@pianohouse.ro, WhatsApp și hartă.",
      en: "Piano House, 35 Iașilor Street, Alba Iulia. Phone +40 742 009 998, office@pianohouse.ro, WhatsApp and map.",
    },
  },
  faq: {
    title: { ro: "Întrebări frecvente", en: "Frequently asked questions" },
    description: {
      ro: "Check-in, parcare, fumat, bucătărie, Wi-Fi, accesibilitate și regulile casei — răspunsuri la ce ne întrebați cel mai des.",
      en: "Check-in, parking, smoking, kitchen, Wi-Fi, accessibility and house rules — answers to what you ask us most.",
    },
  },
  terms: {
    title: { ro: "Termeni și condiții", en: "Terms and conditions" },
    description: {
      ro: "Termenii care se aplică rezervărilor făcute la Piano House Alba Iulia.",
      en: "The terms that apply to bookings made at Piano House Alba Iulia.",
    },
  },
  privacy: {
    title: { ro: "Politica de confidențialitate", en: "Privacy policy" },
    description: {
      ro: "Ce date personale colectăm prin site, de ce, cât timp le păstrăm și ce drepturi aveți conform GDPR.",
      en: "What personal data we collect through the site, why, how long we keep it, and your rights under the GDPR.",
    },
  },
  cookies: {
    title: { ro: "Politica de cookies", en: "Cookie policy" },
    description: {
      ro: "Acest site nu folosește cookie-uri de urmărire, publicitate sau profilare.",
      en: "This site uses no tracking, advertising or profiling cookies.",
    },
  },
};
