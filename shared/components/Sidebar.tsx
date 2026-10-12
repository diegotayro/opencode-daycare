import { Button } from "./Button";
import { SidebarNav } from "./SidebarNav";

interface SidebarProps {
  className?: string;
}

/** Desktop sidebar (248px). The shell renders it only from md up; the mobile
 * drawer reuses SidebarContent inside its own container. */
export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={`w-[248px] flex-none bg-[#FFFDF9] border-r border-[#ECE0D0] flex flex-col px-4 py-6 sticky top-0 h-screen ${className ?? ""}`}
    >
      <SidebarContent />
    </aside>
  );
}

/** Sidebar inner content, shared between the desktop aside and the mobile drawer. */
export function SidebarContent() {
  return (
    <>
      <a href="#" className="flex items-center gap-[11px] px-2 pb-[22px]">
        <div className="w-[38px] h-[38px] rounded-[12px] bg-[linear-gradient(155deg,#F8C3A8,#F2937A)] flex items-center justify-center flex-none">
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </div>
        <div>
          <div className="font-fredoka font-semibold text-[17px] text-[#3F362E] leading-none">
            OpenDayCare
          </div>
          <div className="text-[11.5px] text-[#A89A8B] mt-0.5">Sala Soles</div>
        </div>
      </a>

      <Button
        variant="primary"
        icon={<PlusIcon />}
        className="w-full py-3 mb-[18px]"
      >
        Nueva publicación
      </Button>

      <SidebarNav />

      <div className="border-t border-[#ECE0D0] pt-[14px] mt-2.5">
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <div className="w-[38px] h-[38px] rounded-full bg-[#F2937A] text-white font-fredoka font-semibold text-base flex items-center justify-center flex-none">
            C
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-sm text-[#3F362E]">Caro Giménez</div>
            <div className="text-xs text-[#A89A8B]">Maestra · Soles</div>
          </div>
          <a
            href="#"
            title="Cerrar sesión"
            className="flex-none w-8 h-8 rounded-[10px] bg-[#F6ECDF] text-[#94887B] flex items-center justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </a>
        </div>
      </div>
    </>
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