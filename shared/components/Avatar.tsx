import type { ReactNode } from "react";

interface AvatarProps {
  /** Initial rendered inside the circle (e.g. "M"). */
  text?: string;
  bg: string;
  color: string;
  /** Diameter in px; the initial scales with it (Fredoka, ≈0.4×). Default 44. */
  size?: number;
  /** Replaces the initial when set (e.g. the announcement megaphone). */
  icon?: ReactNode;
  className?: string;
}

/** Circular avatar: an initial in Fredoka, or an icon, over the mock's colors. */
export function Avatar({
  text,
  bg,
  color,
  size = 44,
  icon,
  className,
}: AvatarProps) {
  return (
    <div
      className={`rounded-full flex items-center justify-center flex-none font-fredoka font-semibold ${
        className ?? ""
      }`}
      style={{
        width: size,
        height: size,
        fontSize: avatarFontSize(size),
        background: bg,
        color,
      }}
    >
      {icon ?? text}
    </div>
  );
}

/** Hand-tuned sizes from the mockups (40→16, 44→17, 48→19, 84→34). */
const AVATAR_FONT_SIZES: Record<number, number> = {
  40: 16,
  44: 17,
  48: 19,
  84: 34,
};

/** Font size for the initial: the template's value when known, else ≈0.4×size. */
function avatarFontSize(size: number): number {
  return AVATAR_FONT_SIZES[size] ?? Math.round(size * 0.4);
}
