import { Card } from "@/shared/components/Card";

export interface KidInfoRow {
  label: string;
  value: string;
}

interface KidInfoCardProps {
  rows: KidInfoRow[];
}

/** Data card: label/value rows separated by 1px dividers (last one open). */
export function KidInfoCard({ rows }: KidInfoCardProps) {
  return (
    <Card className="overflow-hidden">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex justify-between py-[15px] px-[18px] border-b border-[#F0E6D8] last:border-b-0"
        >
          <span className="text-[#94887B] text-[14.5px]">{row.label}</span>
          <span className="font-extrabold text-[#3F362E] text-[14.5px]">
            {row.value}
          </span>
        </div>
      ))}
    </Card>
  );
}
