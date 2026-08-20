import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { href } from "@/lib/routes";
import { houseRules, rulesWarning } from "@/data/faq";
import { practical } from "@/data/city-guide";
import { media } from "@/data/images.generated";
import { gateShot, courtyardLounge } from "@/data/gallery";

import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";

const story = {
  ro: [
    "Poziționată în zona CENTRU a orașului Alba Iulia, PIANO HOUSE, situată în curtea familiei noastre, vă așteaptă în orice moment al zilei, oferindu-vă cazare într-o atmosferă liniștită, confortabilă și sigură.",
    "PIANO HOUSE super-central a fost complet renovat în februarie 2022. Acest spațiu a fost creat cu dorința de a satisface toate cerințele oaspeților. Am investit multă dragoste și entuziasm și am lucrat cu un designer de interior profesionist pentru ca și tu să te simți ACASĂ.",
    "Situată la 10 minute de mers pe jos de Cetatea Alba Carolina, Piano House este foarte aproape de gara și autogara orașului, de supermarketuri, restaurante, farmacii, de Tribunalul Alba, Consiliul Local și Poliție, putând ajunge pe jos la acestea în câteva minute de plimbare relaxantă.",
  ],
  en: [
    "Set in the CENTRAL area of Alba Iulia, PIANO HOUSE — inside our family courtyard — welcomes you at any hour of the day, offering accommodation in a quiet, comfortable and safe atmosphere.",
    "PIANO HOUSE, right in the centre, was completely renovated in February 2022. This space was created to meet every need our guests might have. We invested a great deal of love and enthusiasm, and worked with a professional interior designer, so that you too would feel AT HOME.",
    "A ten-minute walk from the Alba Carolina Citadel, Piano House is very close to the city's train and bus stations, to supermarkets, restaurants and pharmacies, and to the Alba Court, the Local Council and the Police — all a few minutes of relaxed walking away.",
  ],
};

const courtyard = {
  ro: {
    title: "Curtea, terasa și regula fumatului",
    body: "În interiorul apartamentelor NU se fumează. Puteți fuma, bea cafeaua de dimineață sau savura un vin bun în serile călduroase în curtea pensiunii, într-o zonă amenajată special pentru recreere în aer liber.",
    access:
      "Fiecare spațiu de cazare are loc de parcare în curte, iar accesul persoanelor în scaune cu rotile este facilitat, deoarece nu există scări la intrarea principală. Aveți acces privat la întregul apartament și la dotările acestuia.",
  },
  en: {
    title: "The courtyard, the terrace and the smoking rule",
    body: "There is NO smoking inside the apartments. You are welcome to smoke, have your morning coffee, or enjoy a good glass of wine on warm evenings in the courtyard, in an area set up specifically for open-air relaxation.",
    access:
      "Every unit has its own parking space in the courtyard, and access for wheelchair users is straightforward, since there are no steps at the main entrance. You have private access to the whole apartment and everything in it.",
  },
};

export function AboutView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  // Portrait originals, so the 3:4 parallax frames crop nothing important.
  const portraitOne = media.gallery.find((p) =>
    p.src.endsWith("img_5252.jpg"),
  )!;
  const portraitTwo = media.gallery.find((p) =>
    p.src.endsWith("img_5276.jpg"),
  )!;

  return (
    <>
      <PageHero
        eyebrow={dict.about.eyebrow}
        title={dict.about.title}
        subtitle={dict.about.subtitle}
        image={gateShot}
        crumbs={[
          { label: dict.nav.home, href: href("home", locale) },
          { label: dict.nav.about },
        ]}
      />

      <Section tone="light">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="space-y-6 text-lg leading-relaxed text-ink/70">
                {story[locale].map((paragraph, i) => (
                  <p
                    key={i}
                    className={i === 0 ? "text-xl text-ink/85" : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="mt-10 border-l-2 border-magenta pl-6 text-2xl font-bold tracking-tight text-ink">
                {dict.about.closing}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal direction="left" className="grid gap-4 sm:grid-cols-2">
              <Parallax className="aspect-3/4 rounded-2xl sm:mt-10" amount={6}>
                <Image
                  src={portraitOne.src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 25vw, 100vw"
                  placeholder="blur"
                  blurDataURL={portraitOne.blurDataURL}
                  className="object-cover"
                />
              </Parallax>
              <Parallax className="aspect-3/4 rounded-2xl" amount={9}>
                <Image
                  src={portraitTwo.src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 25vw, 100vw"
                  placeholder="blur"
                  blurDataURL={portraitTwo.blurDataURL}
                  className="object-cover"
                />
              </Parallax>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Courtyard + access */}
      <Section tone="dark">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="display text-[clamp(1.75rem,4vw,2.75rem)]">
                {courtyard[locale].title}
              </h2>
              <p className="mt-7 text-lg leading-relaxed text-bone/65">
                {courtyard[locale].body}
              </p>
              <p className="mt-5 leading-relaxed text-bone/55">
                {courtyard[locale].access}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal direction="left">
              <Parallax className="aspect-16/10 rounded-2xl" amount={7}>
                <Image
                  src={courtyardLounge.src}
                  alt={courtyardLounge.alt[locale]}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  placeholder="blur"
                  blurDataURL={courtyardLounge.blurDataURL}
                  className="object-cover"
                />
              </Parallax>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Neighbourhood */}
      <Section tone="soft">
        <div className="shell">
          <SectionHeading
            eyebrow={dict.city.eyebrow}
            title={dict.city.practicalTitle}
            action={
              <ButtonLink
                href={href("city", locale)}
                variant="outline"
                icon="ArrowRight"
              >
                {dict.nav.city}
              </ButtonLink>
            }
          />
          <RevealGroup className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {practical.map((item) => (
              <RevealItem
                key={item.id}
                className="flex items-start gap-4 border-t border-bone/10 pt-5"
              >
                <Icon
                  name={item.icon}
                  className="mt-0.5 size-5 shrink-0 text-magenta"
                />
                <div>
                  <p className="font-medium">{item.label[locale]}</p>
                  <p className="mt-1 text-sm text-bone/45">
                    {item.value[locale]}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* House rules */}
      <Section tone="light">
        <div className="shell">
          <SectionHeading
            title={dict.about.rulesTitle}
            body={dict.about.rulesBody}
            tone="light"
          />
          <RevealGroup className="mt-12 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {houseRules.map((rule, i) => (
              <RevealItem
                key={i}
                className="flex items-start gap-4 border-t border-ink/10 pt-5"
              >
                <Icon
                  name={rule.icon}
                  className="mt-0.5 size-5 shrink-0 text-magenta"
                />
                <p className="leading-relaxed text-ink/75">
                  {rule.text[locale]}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1}>
            <p className="mt-10 flex items-start gap-3 rounded-2xl bg-ink/5 p-6 text-sm leading-relaxed text-ink/70">
              <Icon
                name="AlertCircle"
                className="mt-0.5 size-5 shrink-0 text-magenta"
              />
              {rulesWarning[locale]}
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
