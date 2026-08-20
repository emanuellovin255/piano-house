"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";
import { href } from "@/lib/routes";
import { whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * Always-there action bar on phones. Hidden on the booking page, where the
 * form itself is the call to action.
 */
export function MobileBar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  if (pathname === href("booking", locale)) return null;

  const phone = siteConfig.phones[0];
  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.6875rem] font-semibold tracking-wide";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bone/10 bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl sm:hidden">
      <div className="flex items-stretch">
        <a href={`tel:${phone.raw}`} className={cn(item, "text-bone/75")}>
          <Icon name="Phone" className="size-5" />
          {dict.common.call}
        </a>
        <a
          href={whatsappUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(item, "text-bone/75")}
        >
          <Icon name="MessageCircle" className="size-5" />
          {dict.common.whatsapp}
        </a>
        <Link
          href={href("booking", locale)}
          className={cn(item, "bg-magenta text-bone")}
        >
          <Icon name="Calendar" className="size-5" />
          {dict.common.book}
        </Link>
      </div>
    </div>
  );
}
