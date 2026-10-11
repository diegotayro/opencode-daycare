interface FeedHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

/** Greeting block ("GUARDERÍA · SALA SOLES / Buenas, Caro / 12 niños · …"). */
export function FeedHeader({ eyebrow, title, subtitle }: FeedHeaderProps) {
  return (
    <div className="mb-6">
      <div className="text-[12.5px] font-extrabold tracking-[.8px] text-[#D9583C] mb-1">
        {eyebrow}
      </div>
      <h1 className="font-fredoka font-semibold text-[30px] text-[#3F362E] m-0">
        {title}
      </h1>
      <p className="mt-[5px] mb-0 text-[#94887B] text-[14.5px]">{subtitle}</p>
    </div>
  );
}