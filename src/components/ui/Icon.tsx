import {
  Accessibility,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bath,
  BedDouble,
  BusFront,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CigaretteOff,
  CircleParking,
  Clock,
  Coffee,
  CupSoda,
  Droplets,
  ExternalLink,
  GlassWater,
  KeyRound,
  Landmark,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Microwave,
  Moon,
  PartyPopper,
  Phone,
  Pill,
  Refrigerator,
  Sandwich,
  ShoppingCart,
  Sofa,
  Star,
  TrainFront,
  Trees,
  Tv,
  Users,
  UtensilsCrossed,
  Video,
  Wifi,
  Wind,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * Explicit map rather than a dynamic import: only the icons the site actually
 * uses end up in the bundle, and a typo becomes a build error instead of a
 * silent blank space.
 */
const icons = {
  Accessibility,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bath,
  BedDouble,
  BusFront,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CigaretteOff,
  CircleParking,
  Clock,
  Coffee,
  CupSoda,
  Droplets,
  ExternalLink,
  GlassWater,
  KeyRound,
  Landmark,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Microwave,
  Moon,
  PartyPopper,
  Phone,
  Pill,
  Refrigerator,
  Sandwich,
  ShoppingCart,
  Sofa,
  Star,
  TrainFront,
  Trees,
  Tv,
  Users,
  UtensilsCrossed,
  Video,
  Wifi,
  Wind,
  X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Component = icons[name as IconName];
  if (!Component) return null;
  return (
    <Component className={className} strokeWidth={strokeWidth} aria-hidden />
  );
}

/** lucide-react dropped brand marks, so Facebook ships as its own path. */
export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z" />
    </svg>
  );
}
