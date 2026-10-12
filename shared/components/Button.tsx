import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "dark";

interface ButtonProps {
  variant: ButtonVariant;
  icon?: ReactNode;
  /** Inert links fall back to "#" until their screen exists. */
  href?: string;
  className?: string;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "flex items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] text-white font-extrabold text-[14.5px] shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)]",
  secondary:
    "flex items-center justify-center gap-2 rounded-[12px] border-[1.5px] border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359] font-bold text-[14px]",
  dark: "flex items-center justify-center gap-[9px] rounded-[14px] bg-[#3F362E] text-white font-extrabold text-[15px]",
};

/** Shared action link. Sizing (padding, width) comes from `className` because
 * each usage in the mockups differs. */
export function Button({
  variant,
  icon,
  href = "#",
  className,
  children,
}: ButtonProps) {
  return (
    <a href={href} className={`${VARIANT_CLASSES[variant]} ${className ?? ""}`}>
      {icon}
      {children}
    </a>
  );
}
