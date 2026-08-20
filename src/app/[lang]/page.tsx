import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { HomeView } from "@/views/HomeView";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <HomeView locale={lang} />;
}
