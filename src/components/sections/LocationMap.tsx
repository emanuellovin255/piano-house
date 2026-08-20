import { siteConfig, directionsUrl, mapsUrl } from "@/config/site";
import type { Dictionary } from "@/dictionaries";
import { Icon } from "@/components/ui/Icon";

const D = 0.004;
const { lat, lng } = siteConfig.geo;
const bbox = [lng - D, lat - D / 2, lng + D, lat + D / 2].join("%2C");
const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

/**
 * OpenStreetMap's own embed — no API key, no third-party cookies, and no
 * mapping library in the bundle. The old site used OSM too, so nothing is lost.
 */
export function LocationMap({ dict }: { dict: Dictionary }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-bone/12 bg-ink-soft">
      {/* The fallback sits underneath: if a privacy extension or a strict
          network blocks the OSM embed, the panel still says something useful
          instead of showing an empty rectangle. */}
      <div className="relative aspect-16/10 w-full md:aspect-21/9">
        <div className="absolute inset-0 grid place-items-center bg-ink-soft px-6 text-center">
          <div>
            <Icon name="MapPin" className="mx-auto size-7 text-magenta" />
            <p className="mt-3 font-semibold">
              {siteConfig.address.street}, {siteConfig.address.city}
            </p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm text-bone/60 underline underline-offset-4"
            >
              {dict.common.getDirections}
            </a>
          </div>
        </div>
        <iframe
          src={embedSrc}
          title={`${dict.contact.mapTitle} — ${siteConfig.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Icon name="MapPin" className="mt-0.5 size-5 shrink-0 text-magenta" />
          <div>
            <p className="font-semibold">
              {siteConfig.address.street}, {siteConfig.address.city}
            </p>
            <p className="mt-0.5 text-sm text-bone/50">
              {dict.contact.mapNote}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-bone/20 px-5 text-sm font-semibold transition-colors hover:border-bone hover:bg-bone hover:text-ink"
          >
            {dict.common.getDirections}
            <Icon name="ExternalLink" className="size-4" />
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="OpenStreetMap"
            className="grid size-11 place-items-center rounded-full border border-bone/20 text-bone/60 transition-colors hover:border-bone/50 hover:text-bone"
          >
            <Icon name="MapPin" className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
