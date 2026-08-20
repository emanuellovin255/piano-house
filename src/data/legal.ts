import type { L, Locale } from "@/lib/i18n";
import { siteConfig } from "@/config/site";

export type LegalSection = { heading: L; body: Record<Locale, string[]> };
export type LegalDoc = { updated: string; intro: L; sections: LegalSection[] };

const contactLine = {
  ro: `${siteConfig.legalName}, ${siteConfig.address.street}, ${siteConfig.address.city}, jud. ${siteConfig.address.county} · ${siteConfig.phones[0].display} · ${siteConfig.email}`,
  en: `${siteConfig.legalName}, ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.county} County, Romania · ${siteConfig.phones[0].display} · ${siteConfig.email}`,
};

/** Reviewed alongside the owner before launch — see README for what is pending. */
export const LEGAL_UPDATED = "2026-08-20";

export const terms: LegalDoc = {
  updated: LEGAL_UPDATED,
  intro: {
    ro: "Acești termeni se aplică rezervărilor făcute prin site-ul pianohouse.ro, prin telefon sau prin WhatsApp.",
    en: "These terms apply to bookings made through pianohouse.ro, by phone, or via WhatsApp.",
  },
  sections: [
    {
      heading: { ro: "Cine suntem", en: "Who we are" },
      body: {
        ro: [
          `Site-ul pianohouse.ro este operat de ${contactLine.ro}.`,
          "Piano House oferă cazare în trei spații situate în curtea proprietății: apartamentele CITY și TRAVEL și camera matrimonială TANGO.",
        ],
        en: [
          `pianohouse.ro is operated by ${contactLine.en}.`,
          "Piano House offers accommodation in three units located in the property's courtyard: the CITY and TRAVEL apartments, and the TANGO double room.",
        ],
      },
    },
    {
      heading: {
        ro: "Cereri de rezervare și confirmare",
        en: "Booking requests and confirmation",
      },
      body: {
        ro: [
          "Formularul de pe pagina de Rezervări este o cerere de disponibilitate, nu o rezervare confirmată. Rezervarea devine fermă doar după ce o confirmăm explicit, prin e-mail, telefon sau WhatsApp.",
          "Condițiile de plată, avansul (dacă este cazul) și condițiile de anulare se comunică la momentul confirmării, înainte de a vă asuma vreo obligație.",
          "Prețurile afișate pe site sunt exprimate în lei, per noapte, pentru unitatea selectată, și sunt aceleași de luni până vineri și în weekend.",
        ],
        en: [
          "The form on the Booking page is an availability request, not a confirmed reservation. A booking becomes firm only once we explicitly confirm it by e-mail, phone or WhatsApp.",
          "Payment terms, any deposit, and cancellation conditions are communicated at the moment of confirmation, before you take on any obligation.",
          "Prices shown on the site are in Romanian lei, per night, for the selected unit, and are the same Monday to Friday and at the weekend.",
        ],
      },
    },
    {
      heading: { ro: "Reguli de ordine internă", en: "House rules" },
      body: {
        ro: [
          "Prin confirmarea rezervării acceptați regulile casei: nu se organizează petreceri de niciun fel; intrarea în curte este sub supraveghere video; numărul de persoane cazate trebuie să corespundă rezervării confirmate; mobilierul și obiectele decorative nu se mută și nu se modifică; deranjarea vecinilor este interzisă între orele 22:00 și 08:00.",
          "În interiorul spațiilor de cazare nu se fumează. Fumatul este permis în curte, în zona amenajată pentru recreere în aer liber.",
          "Producerea oricărui zgomot sau orice zarvă poate duce la anularea rezervării, oaspeții fiind rugați să părăsească locația, cu pierderea sumei plătite pentru rezervare.",
        ],
        en: [
          "By confirming a booking you accept the house rules: no parties of any kind; the courtyard entrance is under video surveillance; the number of guests staying must match the confirmed reservation; furniture and decorative objects may not be moved or altered; disturbing the neighbours is not permitted between 22:00 and 08:00.",
          "There is no smoking inside the units. Smoking is allowed in the courtyard, in the area set up for open-air relaxation.",
          "Any noise or commotion may lead to the cancellation of the booking, with guests asked to leave the property and forfeiting the amount paid for the reservation.",
        ],
      },
    },
    {
      heading: { ro: "Răspundere", en: "Liability" },
      body: {
        ro: [
          "Oaspeții răspund pentru eventualele pagube produse spațiului de cazare, dotărilor sau curții pe durata sejurului.",
          "Ne rezervăm dreptul de a refuza cazarea în cazul nerespectării regulilor de mai sus.",
        ],
        en: [
          "Guests are responsible for any damage caused to the unit, its equipment, or the courtyard during their stay.",
          "We reserve the right to refuse accommodation if the rules above are not respected.",
        ],
      },
    },
    {
      heading: { ro: "Conținutul site-ului", en: "Site content" },
      body: {
        ro: [
          "Fotografiile, textele și elementele grafice de pe acest site aparțin Pensiunii Piano House și nu pot fi reproduse fără acordul nostru scris.",
          "Ne străduim să menținem informațiile actualizate, însă disponibilitatea și prețul final se confirmă întotdeauna direct de către noi.",
        ],
        en: [
          "The photographs, texts and graphic elements on this site belong to Pensiunea Piano House and may not be reproduced without our written consent.",
          "We work to keep the information up to date, but availability and the final price are always confirmed directly by us.",
        ],
      },
    },
    {
      heading: {
        ro: "Legea aplicabilă și contact",
        en: "Governing law and contact",
      },
      body: {
        ro: [
          "Acestor termeni li se aplică legea română. Pentru orice nelămurire, scrieți-ne la " +
            siteConfig.email +
            " sau sunați la " +
            siteConfig.phones[0].display +
            ".",
          "Consumatorii pot folosi și platforma europeană de soluționare online a litigiilor (SOL) pusă la dispoziție de Comisia Europeană.",
        ],
        en: [
          "These terms are governed by Romanian law. For any question, write to " +
            siteConfig.email +
            " or call " +
            siteConfig.phones[0].display +
            ".",
          "Consumers may also use the European Online Dispute Resolution (ODR) platform provided by the European Commission.",
        ],
      },
    },
  ],
};

export const privacy: LegalDoc = {
  updated: LEGAL_UPDATED,
  intro: {
    ro: "Această politică explică ce date personale colectăm prin site, de ce, cât timp le păstrăm și ce drepturi aveți, conform Regulamentului (UE) 2016/679 (GDPR).",
    en: "This policy explains what personal data we collect through the site, why, how long we keep it, and what rights you have, under Regulation (EU) 2016/679 (GDPR).",
  },
  sections: [
    {
      heading: { ro: "Operatorul de date", en: "Data controller" },
      body: {
        ro: [`Operatorul datelor dumneavoastră este ${contactLine.ro}.`],
        en: [`The controller of your data is ${contactLine.en}.`],
      },
    },
    {
      heading: {
        ro: "Ce date colectăm și de ce",
        en: "What we collect and why",
      },
      body: {
        ro: [
          "Prin formularul de rezervare: nume și prenume, telefon, adresă de e-mail, spațiul dorit, datele de check-in și check-out, numărul de adulți și copii și mesajul opțional. Le folosim exclusiv pentru a verifica disponibilitatea și a vă răspunde la cerere.",
          "Prin formularul de contact: nume și prenume, telefon, adresă de e-mail și mesajul dumneavoastră, folosite pentru a vă răspunde.",
          "Temeiul legal este executarea unor măsuri precontractuale la cererea dumneavoastră (art. 6 alin. 1 lit. b GDPR) și interesul nostru legitim de a răspunde solicitărilor primite (art. 6 alin. 1 lit. f GDPR).",
          "La cazarea efectivă, legislația în vigoare ne obligă să înregistrăm datele din actul de identitate. Acea prelucrare are ca temei obligația legală (art. 6 alin. 1 lit. c GDPR) și se face la fața locului, nu prin acest site.",
        ],
        en: [
          "Through the booking form: full name, phone, e-mail address, chosen unit, check-in and check-out dates, number of adults and children, and your optional message. We use these solely to check availability and reply to your request.",
          "Through the contact form: full name, phone, e-mail address and your message, used to reply to you.",
          "The legal basis is taking steps at your request prior to entering into a contract (Art. 6(1)(b) GDPR) and our legitimate interest in responding to enquiries (Art. 6(1)(f) GDPR).",
          "At actual check-in, Romanian law requires us to record identity document details. That processing rests on our legal obligation (Art. 6(1)(c) GDPR) and happens on site, not through this website.",
        ],
      },
    },
    {
      heading: { ro: "Cui transmitem datele", en: "Who we share data with" },
      body: {
        ro: [
          "Mesajele trimise prin formulare ne sunt livrate prin e-mail de furnizorul nostru de servicii de e-mail tranzacțional, care acționează ca persoană împuternicită și prelucrează datele doar pentru a livra mesajul.",
          "Site-ul este găzduit de furnizorul nostru de hosting. Nu vindem și nu închiriem datele dumneavoastră nimănui.",
        ],
        en: [
          "Messages sent through the forms reach us by e-mail via our transactional e-mail provider, which acts as a processor and handles the data only to deliver the message.",
          "The site is hosted by our hosting provider. We never sell or rent your data to anyone.",
        ],
      },
    },
    {
      heading: { ro: "Cât timp păstrăm datele", en: "How long we keep data" },
      body: {
        ro: [
          "Cererile de rezervare și mesajele de contact se păstrează pe durata corespondenței și cel mult 12 luni de la ultimul schimb de mesaje, apoi se șterg.",
          "Documentele impuse de legislația fiscală și de cea privind evidența turiștilor se păstrează pe termenele prevăzute de lege.",
        ],
        en: [
          "Booking requests and contact messages are kept for the duration of the correspondence and for at most 12 months after the last exchange, then deleted.",
          "Documents required by tax and tourist-registration legislation are kept for the periods those laws prescribe.",
        ],
      },
    },
    {
      heading: { ro: "Drepturile dumneavoastră", en: "Your rights" },
      body: {
        ro: [
          "Aveți dreptul de acces, de rectificare, de ștergere, de restricționare a prelucrării, de portabilitate a datelor și de opoziție. Vă puteți exercita oricare dintre aceste drepturi scriindu-ne la " +
            siteConfig.email +
            ".",
          "Aveți de asemenea dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), www.dataprotection.ro.",
        ],
        en: [
          "You have the right of access, rectification, erasure, restriction of processing, data portability and objection. You can exercise any of these by writing to " +
            siteConfig.email +
            ".",
          "You also have the right to lodge a complaint with the Romanian National Supervisory Authority for Personal Data Processing (ANSPDCP), www.dataprotection.ro.",
        ],
      },
    },
    {
      heading: { ro: "Securitate", en: "Security" },
      body: {
        ro: [
          "Site-ul este servit exclusiv prin HTTPS. Formularele sunt protejate împotriva trimiterilor automate fără a folosi servicii terțe de urmărire.",
        ],
        en: [
          "The site is served exclusively over HTTPS. The forms are protected against automated submissions without relying on third-party tracking services.",
        ],
      },
    },
  ],
};

export const cookies: LegalDoc = {
  updated: LEGAL_UPDATED,
  intro: {
    ro: "Pe scurt: acest site nu folosește cookie-uri de urmărire, de publicitate sau de profilare, așa că nu vă întâmpină niciun banner de consimțământ.",
    en: "In short: this site uses no tracking, advertising or profiling cookies, which is why no consent banner greets you.",
  },
  sections: [
    {
      heading: { ro: "Ce cookie-uri folosim", en: "What cookies we use" },
      body: {
        ro: [
          "Nu plasăm cookie-uri de analiză sau de marketing. Nu există Google Analytics, pixel de Facebook sau instrumente similare.",
          "Preferința dumneavoastră de limbă este reflectată direct în adresa paginii (/ro sau /en), deci nu are nevoie de niciun cookie.",
        ],
        en: [
          "We place no analytics or marketing cookies. There is no Google Analytics, no Facebook pixel, and nothing similar.",
          "Your language preference lives in the page address itself (/ro or /en), so it needs no cookie at all.",
        ],
      },
    },
    {
      heading: { ro: "Conținut de la terți", en: "Third-party content" },
      body: {
        ro: [
          "Harta de pe pagina de Contact este furnizată de OpenStreetMap. Când o încărcați, browserul dumneavoastră contactează serverele OpenStreetMap pentru a descărca imaginile hărții. Harta se încarcă leneș, doar când ajungeți la ea.",
          "Butoanele de WhatsApp și Facebook sunt simple linkuri. Nu se încarcă niciun script de la aceste servicii atât timp cât nu apăsați pe ele.",
        ],
        en: [
          "The map on the Contact page is provided by OpenStreetMap. When it loads, your browser contacts OpenStreetMap's servers to fetch the map tiles. The map is lazy-loaded, so this only happens when you scroll to it.",
          "The WhatsApp and Facebook buttons are plain links. No script from those services loads unless you click them.",
        ],
      },
    },
    {
      heading: { ro: "Controlul din browser", en: "Browser controls" },
      body: {
        ro: [
          "Puteți oricând să blocați sau să ștergeți cookie-urile din setările browserului. Site-ul funcționează normal și fără ele.",
        ],
        en: [
          "You can always block or delete cookies from your browser settings. The site works normally without them.",
        ],
      },
    },
  ],
};

export const legalDocs = { terms, privacy, cookies } as const;
export type LegalKey = keyof typeof legalDocs;
