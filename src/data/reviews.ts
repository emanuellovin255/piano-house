import type { L } from "@/lib/i18n";

export type Review = {
  id: string;
  author: string;
  /** Country or city, as shown on the source platform. */
  origin?: string;
  rating: number;
  date: string;
  source: "booking" | "google" | "facebook";
  text: L;
};

/**
 * Intentionally empty. Reviews must be real, quoted from the platform the
 * guest actually wrote them on — nothing here is invented. Paste genuine
 * entries below and every review surface on the site fills in automatically;
 * while the list is empty those surfaces render an honest empty state instead.
 */
export const reviews: Review[] = [];

export const hasReviews = reviews.length > 0;

export const averageRating = hasReviews
  ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  : null;

export const reviewsEmptyState: { title: L; body: L } = {
  title: {
    ro: "Recenziile ajung aici în curând",
    en: "Reviews are coming here soon",
  },
  body: {
    ro: "Strângem părerile oaspeților noștri de pe platformele unde le-au scris. Dacă ați stat la Piano House, ne-ar ajuta mult o recenzie.",
    en: "We are gathering our guests' feedback from the platforms where they wrote it. If you have stayed at Piano House, a review would help us a great deal.",
  },
};
