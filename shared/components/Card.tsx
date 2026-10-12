import type { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

/** White surface card (bg/border/radius from the mock). Padding and layout
 * stay with the caller, since each card differs. */
export function Card({ className, children }: CardProps) {
  return (
    <div
      className={`bg-[#FFFDF9] border border-[#ECE0D0] rounded-[16px] ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}
