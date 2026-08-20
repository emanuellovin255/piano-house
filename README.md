# Piano House — pianohouse.ro

Site-ul Pensiunii Piano House, Alba Iulia. Next.js 16 (App Router) + Tailwind v4 +
Motion, bilingv RO/EN, generat static.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producție
```

---

## Ce trebuie completat înainte de lansare

| Ce | Unde | Observație |
|---|---|---|
| **Videoclipurile hero** | `public/media/video/` | Vezi secțiunea de mai jos |
| **Cheia Resend** | `.env.local` | Fără ea, formularele nu trimit emailuri |
| **Ora de check-in / check-out** | `src/config/site.ts` | Momentan `14:00` / `11:00` — **de confirmat cu proprietarul**, nu erau publicate pe site-ul vechi |
| **Recenzii reale** | `src/data/reviews.ts` | Lista e goală intenționat; nimic nu e inventat |
| **Instagram / TikTok** | `src/config/site.ts` → `social` | Doar Facebook e configurat |

---

## Videoclipul din hero

Componenta [`HeroMedia`](src/components/hero/HeroMedia.tsx) rulează pe fallback
până când fișierele există: un slideshow cu efect Ken Burns peste patru
fotografii alese din galerie. Aceleași imagini rămân fallback permanent pentru
vizitatorii cu *reduce motion* sau *data saver*. Layout-ul e identic în ambele
cazuri, deci activarea video-ului nu mișcă nimic în pagină.

**Ca să activezi video-ul:**

1. Pune fișierele în `public/media/video/`:
   - `hero-desktop.mp4` — **16:9**, 1920×1080, ≤ 4 MB
   - `hero-mobile.mp4` — **9:16**, 1080×1920, ≤ 2 MB
   - opțional `hero-desktop.webm` / `hero-mobile.webm` (VP9) — se servesc primele
2. În `src/config/site.ts`, pune `hero.videoEnabled: true`.

**Specificații de producție:** 8–15 secunde, buclă fără cusătură (primul și
ultimul cadru identice), **fără sunet**, H.264 High profile, ~4 Mbps desktop /
~2 Mbps mobil, 25–30 fps. Deschiderea trebuie să fie luminoasă — textul alb stă
peste partea de jos a cadrului.

Dacă un fișier lipsește sau nu poate fi redat, componenta revine singură la
slideshow — nu apare niciodată un dreptunghi negru.

---

## Structură

```
src/
├─ app/[lang]/            layout rădăcină, home, rută catch-all, 404
├─ views/                 câte un component per pagină
├─ components/
│  ├─ hero/               hero-ul cu video + fallback
│  ├─ layout/             header, footer, bara mobilă, wordmark
│  ├─ sections/           blocuri reutilizabile între pagini
│  ├─ gallery/            masonry + lightbox
│  ├─ booking/            calendar, formulare
│  ├─ motion/             reveal, parallax, marquee, smooth scroll
│  └─ ui/                 buton, secțiune, câmp, iconițe
├─ data/                  conținutul site-ului (vezi mai jos)
├─ dictionaries/          textele de interfață RO/EN
├─ lib/                   rutare, SEO, scheme de validare, utilitare
└─ actions/               server actions pentru formulare
```

### Unde se editează conținutul

| Fișier | Ce conține |
|---|---|
| `src/config/site.ts` | Telefoane, email, adresă, coordonate, social, flag video |
| `src/data/units.ts` | Cele trei spații: descrieri, suprafețe, paturi, **prețuri** |
| `src/data/amenities.ts` | Dotările, grupate pe categorii |
| `src/data/faq.ts` | Întrebări frecvente + regulile casei |
| `src/data/city-guide.ts` | Ghidul Alba Iulia |
| `src/data/reviews.ts` | Recenzii (goală — se completează cu recenzii reale) |
| `src/data/gallery.ts` | Etichetele galeriei, ordinea și pozele alese pentru hero |
| `src/data/legal.ts` | Termeni, confidențialitate, cookies |
| `src/dictionaries/` | Toate textele de interfață, RO și EN |

Fiecare text de conținut e un obiect `{ ro: "…", en: "…" }`, deci ambele limbi
se editează în același loc și nu pot ieși din sincron.

---

## Imagini

Cele 100 de fotografii au fost preluate de pe site-ul vechi în `public/media/`.
`src/data/images.generated.ts` e generat — conține dimensiunile reale și un
placeholder blur base64 pentru fiecare poză.

După ce adaugi sau înlocuiești fotografii:

```bash
node scripts/generate-image-manifest.mjs
```

`next/image` servește apoi automat AVIF/WebP la dimensiunea potrivită.

---

## Rutare și limbi

Fiecare pagină are slug tradus, definit într-un singur loc:
[`src/lib/routes.ts`](src/lib/routes.ts). `/ro/apartamente/city` și
`/en/apartments/city` sunt aceeași pagină, iar switcher-ul de limbă păstrează
vizitatorul pe loc în loc să-l trimită acasă.

[`src/proxy.ts`](src/proxy.ts) redirecționează orice adresă fără prefix de limbă
către `/ro/…` — asta acoperă și URL-urile vechi de Joomla care și-au păstrat
slug-ul (`/despre-noi`, `/contact`, `/termeni-si-conditii`). Restul redirect-urilor
301 de pe site-ul vechi sunt în `next.config.ts`.

---

## SEO

- `generateMetadata` per pagină, în ambele limbi, cu `hreflang` ro/en/x-default
- JSON-LD: `LodgingBusiness`, `Accommodation` per unitate, `FAQPage`, `BreadcrumbList`
- `sitemap.xml` și `robots.txt` generate automat, cu alternate pe fiecare intrare
- Toate paginile sunt pre-generate static

---

## Formulare

Formularul de rezervare și cel de contact folosesc server actions, validate cu
aceeași schemă Zod pe client și pe server. Protecția anti-spam e un honeypot plus
o verificare de timp — **fără reCAPTCHA**, deci fără frecare pentru oaspete și
fără cookie-uri terțe.

Fără `RESEND_API_KEY` setat, cererea e scrisă în consola serverului și
utilizatorului i se arată un mesaj de eroare cu numărul de telefon — nimic nu se
pierde tăcut.

Butonul de WhatsApp compune mesajul din ce a completat vizitatorul (spațiu, date,
număr de persoane, total estimat), deci proprietarul primește cererea completă
chiar dacă oaspetele nu apasă "Trimite".

---

## Deploy

Recomandat Vercel (import repo → deploy). Setează `RESEND_API_KEY` și
`BOOKING_FROM_EMAIL` în variabilele de mediu ale proiectului.

La mutarea domeniului, verifică redirect-urile vechi:

```bash
curl -sI https://www.pianohouse.ro/app/apartamente-inchiriat/apartament-city | head -3
```
