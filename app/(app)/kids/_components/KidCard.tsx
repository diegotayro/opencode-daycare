import Link from "next/link";
import { Avatar } from "@/shared/components/Avatar";
import { getKidBadge, getParentsLabel, type Kid } from "../_data/kids-mock";
import { KidCardStatus } from "./KidCardStatus";

interface KidCardProps {
  kid: Kid;
}

/** A kid row in /kids: avatar, name, "N años · … padres" and the status slot.
 * The whole row links to the kid profile. */
export function KidCard({ kid }: KidCardProps) {
  return (
    <Link
      href={`/kids/${kid.slug}`}
      className="flex items-center gap-[14px] min-w-0 bg-[#FFFDF9] border border-[#ECE0D0] rounded-[18px] p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,0.5)] transition hover:-translate-y-0.5 hover:border-[#F2A78E]"
    >
      <Avatar
        size={48}
        bg={kid.avatar.bg}
        color={kid.avatar.color}
        text={kid.avatar.text}
      />
      <div className="flex-1 min-w-0">
        <div className="font-fredoka font-semibold text-[16px] text-[#3F362E]">
          {kid.name}
        </div>
        <div className="text-[13px] text-[#A89A8B]">
          {kid.age} años · {getParentsLabel(kid.parents.length)}
        </div>
      </div>
      <KidCardStatus badge={getKidBadge(kid)} />
    </Link>
  );
}
