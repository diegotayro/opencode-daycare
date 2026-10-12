interface BadgeProps {
  label: string;
  bg: string;
  color: string;
  size?: "sm" | "md";
}

const BADGE_SIZES = {
  sm: "text-[10.5px] px-[9px] py-[4px]",
  md: "text-[11px] px-[9px] py-[5px]",
} as const;

/** Pill label with the mock's colors (kid allergy/link badge, parent status). */
export function Badge({ label, bg, color, size = "md" }: BadgeProps) {
  return (
    <span
      className={`flex-none font-extrabold rounded-full ${BADGE_SIZES[size]}`}
      style={{ background: bg, color }}
    >
      {label}
    </span>
  );
}
