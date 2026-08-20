import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import { locales, isLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { siteConfig } from "@/config/site";
import { lodgingJsonLd, absoluteUrl } from "@/lib/seo";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#12100f",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "ro";

  const title =
    locale === "ro"
      ? "Piano House — Cazare în apartamente la curte, Alba Iulia"
      : "Piano House — Courtyard apartments in Alba Iulia";
  const description =
    locale === "ro"
      ? "Trei spații renovate complet în centrul orașului Alba Iulia, la 10 minute de Cetatea Alba Carolina. Parcare gratuită în curte, bucătărie utilată, Wi-Fi nelimitat."
      : "Three fully renovated spaces in central Alba Iulia, a ten-minute walk from the Alba Carolina Citadel. Free courtyard parking, equipped kitchen, unlimited Wi-Fi.";

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s — ${siteConfig.name}` },
    description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.legalName }],
    keywords:
      locale === "ro"
        ? [
            "cazare Alba Iulia",
            "apartamente Alba Iulia",
            "pensiune Alba Iulia",
            "Piano House",
            "cazare Cetatea Alba Carolina",
          ]
        : [
            "accommodation Alba Iulia",
            "apartments Alba Iulia",
            "guest house Alba Iulia",
            "Piano House",
            "stay near Alba Carolina Citadel",
          ],
    alternates: {
      canonical: absoluteUrl(locale),
      languages: {
        ro: absoluteUrl("ro"),
        en: absoluteUrl("en"),
        "x-default": absoluteUrl("ro"),
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url: absoluteUrl(locale),
      title,
      description,
      locale: locale === "ro" ? "ro_RO" : "en_GB",
      images: [
        {
          url: "/media/new/pano-outside.jpg",
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={figtree.variable} suppressHydrationWarning>
      <body className="min-h-dvh bg-ink text-bone antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(lodgingJsonLd(locale)),
          }}
        />
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-magenta focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold"
        >
          {locale === "ro" ? "Sari la conținut" : "Skip to content"}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
        <MobileBar locale={locale} dict={dict} />
      </body>
    </html>
  );
}
