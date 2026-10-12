import Link from "next/link";
import { Avatar } from "@/shared/components/Avatar";
import { Button } from "@/shared/components/Button";
import type { Kid } from "../_data/kids-mock";

interface KidProfileHeaderProps {
  kid: Kid;
}

/** Profile header: "Volver a Niños", the 84px avatar, name and age/room line,
 * plus the "Editar" action (inert). Wraps on narrow screens. */
export function KidProfileHeader({ kid }: KidProfileHeaderProps) {
  return (
    <div>
      <Link
        href="/kids"
        className="flex items-center gap-[7px] text-[#94887B] font-bold text-[14px] mb-5"
      >
        <ChevronLeftIcon />
        Volver a Niños
      </Link>

      <div className="flex items-center gap-[18px] flex-wrap">
        <Avatar
          size={84}
          bg={kid.avatar.bg}
          color={kid.avatar.color}
          text={kid.avatar.text}
        />
        <div className="flex-1">
          <h1 className="font-fredoka font-semibold text-[28px] text-[#3F362E] m-0">
            {kid.name}
          </h1>
          <p className="mt-[3px] mb-0 text-[#94887B] text-[15px]">
            {kid.age} años · Sala {kid.room}
          </p>
        </div>
        <Button variant="secondary" className="py-[9px] px-4">
          Editar
        </Button>
      </div>
    </div>
  );
}

function ChevronLeftIcon() {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
