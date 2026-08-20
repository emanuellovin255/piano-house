export const siteConfig = {
  name: "Piano House",
  legalName: "Pensiunea Piano House",
  url: "https://www.pianohouse.ro",

  address: {
    street: "Str. Iașilor 35",
    city: "Alba Iulia",
    county: "Alba",
    postalCode: "510146",
    country: "RO",
  },
  /** Verified against OpenStreetMap — Piano House is mapped at this node. */
  geo: { lat: 46.0627799, lng: 23.5809727 },

  phones: [
    { display: "0742 009 998", raw: "+40742009998", primary: true },
    { display: "0742 009 995", raw: "+40742009995", primary: false },
  ],
  email: "office@pianohouse.ro",
  whatsapp: "40742009998",

  social: {
    facebook: "https://www.facebook.com/pianohousecazare/",
  },

  /**
   * Not published on the old site — confirm with the owner before launch.
   * Everything that surfaces these reads from here, so one edit updates all.
   */
  checkIn: "14:00",
  checkOut: "11:00",
  quietHours: "22:00 – 08:00",

  /**
   * Hero video. The client supplies the two files later; until they land in
   * public/media/video/ this stays false and the hero renders its poster with
   * a slow Ken Burns pan instead. No layout change either way.
   */
  hero: {
    videoEnabled: false,
    desktop: "/media/video/hero-desktop.mp4",
    mobile: "/media/video/hero-mobile.mp4",
    desktopWebm: "/media/video/hero-desktop.webm",
    mobileWebm: "/media/video/hero-mobile.webm",
    poster: "/media/new/pano-outside.jpg",
  },
} as const;

export const mapsUrl = `https://www.openstreetmap.org/?mlat=${siteConfig.geo.lat}&mlon=${siteConfig.geo.lng}#map=18/${siteConfig.geo.lat}/${siteConfig.geo.lng}`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${siteConfig.geo.lat},${siteConfig.geo.lng}`;
