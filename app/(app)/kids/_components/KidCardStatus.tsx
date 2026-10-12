import { Badge } from "@/shared/components/Badge";
import type { KidBadge } from "../_data/kids-mock";

interface KidCardStatusProps {
  badge: KidBadge;
}

/** Right-hand slot of a kid row: allergy tag, "VINCULAR" badge or a chevron. */
export function KidCardStatus({ badge }: KidCardStatusProps) {
  if (badge.kind === "chevron") {
    return <ChevronIcon />;
  }
  return <Badge label={badge.label} bg={badge.bg} color={badge.color} />;
}

function ChevronIcon() {
  return (
    <svg
      className="flex-none"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#CBB89F"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
