import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Right slot (e.g. a primary Button). */
  action?: ReactNode;
  className?: string;
}

/** Page title block: eyebrow, Fredoka title, optional subtitle and right slot. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={`flex items-end justify-between gap-4 ${className ?? ""}`}
    >
      <div>
        <div className="text-[12.5px] font-extrabold tracking-[.8px] text-[#D9583C] mb-1">
          {eyebrow}
        </div>
        <h1 className="font-fredoka font-semibold text-[30px] text-[#3F362E] m-0">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-[5px] mb-0 text-[#94887B] text-[14.5px]">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
