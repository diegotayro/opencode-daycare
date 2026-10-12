import { Card } from "@/shared/components/Card";
import type { LinkedParent } from "../_data/kids-mock";
import { ParentRow } from "./ParentRow";

interface LinkedListedParentsCardProps {
  parents: LinkedParent[];
}

/** "PADRES VINCULADOS" card: one row per parent plus the dashed "Vincular otro
 * padre" call to action (inert). */
export function LinkedListedParentsCard({
  parents,
}: LinkedListedParentsCardProps) {
  return (
    <Card className="px-[18px] py-4">
      <div className="text-[12.5px] font-extrabold tracking-[.8px] text-[#8A7C6D] mb-[14px]">
        PADRES VINCULADOS
      </div>
      <div className="flex flex-col gap-[14px]">
        {parents.map((parent) => (
          <ParentRow key={parent.id} parent={parent} />
        ))}
        <a href="#" className="flex items-center gap-3 pt-2">
          <span className="w-10 h-10 rounded-full border-[1.5px] border-dashed border-[#D8CBBA] text-[#B0A290] flex items-center justify-center flex-none">
            <PlusIcon />
          </span>
          <span className="font-extrabold text-[14.5px] text-[#C5503A]">
            Vincular otro padre
          </span>
        </a>
      </div>
    </Card>
  );
}

function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
