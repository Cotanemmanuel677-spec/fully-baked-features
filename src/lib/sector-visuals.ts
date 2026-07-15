import {
  Briefcase,
  Building2,
  CalendarCheck,
  Car,
  GraduationCap,
  HeartPulse,
  Home as HomeIcon,
  PartyPopper,
  ShoppingBag,
  Sprout,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type SectorVisual = {
  color: string; // couleur dominante
  tint: string; // fond pastel
  Icon: LucideIcon;
};

export const sectorVisuals: Record<string, SectorVisual> = {
  "transport-mobilite":        { color: "#0B3D91", tint: "#EAF0FF", Icon: Car },
  "agriculture-vivrier":       { color: "#0A9A49", tint: "#EAF8EF", Icon: Sprout },
  "sante":                     { color: "#E63329", tint: "#FFF0EF", Icon: HeartPulse },
  "immobilier":                { color: "#C1521F", tint: "#FFF1EA", Icon: HomeIcon },
  "emploi-recrutement":        { color: "#F5821F", tint: "#FFF4E8", Icon: Briefcase },
  "services-artisans":         { color: "#3A5FA0", tint: "#EEF3FF", Icon: Wrench },
  "vente-produits":            { color: "#D9A400", tint: "#FFF9DB", Icon: ShoppingBag },
  "reservation-alimentation":  { color: "#C23B7C", tint: "#FFF0F7", Icon: CalendarCheck },
  "education-formation":       { color: "#4F8C3C", tint: "#EFF8EA", Icon: GraduationCap },
  "evenementiel-loisirs":      { color: "#7A3FBF", tint: "#F4EBFF", Icon: PartyPopper },
  "construction-btp":          { color: "#4A5568", tint: "#F1F5F9", Icon: Building2 },
  "energie-services-publics":  { color: "#E8A200", tint: "#FFF7DE", Icon: Zap },
};

export const brandStripe = ["#E63329", "#0B3D91", "#0A9A49", "#F7C600", "#F5821F"];
export const suguNavy = "#0B2D6D";
export const suguOrange = "#F5821F";

export function getSectorVisual(slug: string): SectorVisual {
  return sectorVisuals[slug] ?? { color: suguNavy, tint: "#F1F5F9", Icon: Building2 };
}
