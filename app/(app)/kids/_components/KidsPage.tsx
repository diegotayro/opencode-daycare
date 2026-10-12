import { Button } from "@/shared/components/Button";
import { PageHeader } from "@/shared/components/PageHeader";
import { kids } from "../_data/kids-mock";
import { KidCard } from "./KidCard";

/** /kids: header + "Agregar niño", decorative search, the "SALA SOLES" group
 * header and the 8 kid rows. Centered 880px container. */
export function KidsPage() {
  return (
    <div className="max-w-[880px] w-full mx-auto pt-[34px] px-5 pb-20 md:px-10">
      <PageHeader
        className="mb-[22px]"
        eyebrow="GESTIÓN"
        title="Niños"
        action={
          <Button
            variant="primary"
            icon={<PlusIcon />}
            className="py-[11px] px-[18px]"
          >
            Agregar niño
          </Button>
        }
      />

      <div className="flex items-center gap-[11px] bg-[#FFFDF9] border border-[#ECE0D0] rounded-[14px] px-4 py-3 mb-[22px]">
        <SearchIcon />
        <input
          type="text"
          placeholder="Buscar niño…"
          className="flex-1 border-none bg-transparent text-[15px] text-[#3F362E] outline-none placeholder:text-[#B6A99B]"
        />
      </div>

      <div className="flex items-center gap-3 mb-[14px]">
        <span className="text-[12.5px] font-extrabold tracking-[.8px] text-[#3F362E]">
          SALA SOLES
        </span>
        <span className="text-[13px] text-[#A89A8B]">{kids.length} niños</span>
        <span className="flex-1 h-px bg-[#E7DAC8]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
        {kids.map((kid) => (
          <KidCard key={kid.slug} kid={kid} />
        ))}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B0A290"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
