import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The project sits outside a git repo, so Turbopack has to be told where
  // the workspace root is or it walks up and finds the wrong lockfile.
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },
  async redirects() {
    // The old Joomla URLs. Slugs that survived unchanged (/despre-noi,
    // /contact, /termeni-si-conditii) are handled by the locale middleware.
    return [
      { source: "/app", destination: "/ro/apartamente", permanent: true },
      { source: "/galerie-foto", destination: "/ro/galerie", permanent: true },
      { source: "/rezervari-2", destination: "/ro/rezervari", permanent: true },
      { source: "/cookies", destination: "/ro/politica-cookies", permanent: true },
      {
        source: "/app/apartamente-inchiriat/apartament-city",
        destination: "/ro/apartamente/city",
        permanent: true,
      },
      {
        source: "/app/apartamente-inchiriat/apartament-travel",
        destination: "/ro/apartamente/travel",
        permanent: true,
      },
      {
        source: "/app/apartamente-inchiriat/camera-matrimoniala-tango",
        destination: "/ro/apartamente/tango",
        permanent: true,
      },
      { source: "/index.php/:path*", destination: "/ro", permanent: true },
    ];
  },
};

export default nextConfig;
