import type { ReactNode } from "react";

interface ComposeBoxProps {
  placeholder: string;
  avatar: { text: string; bg: string; color: string };
  icon: ReactNode;
}

/** Composer card ("Compartí un momento…") linking to the create-post page. */
export function ComposeBox({ placeholder, avatar, icon }: ComposeBoxProps) {
  return (
    <a
      href="#"
      className="flex items-center gap-[14px] bg-[#FFFDF9] border border-[#ECE0D0] rounded-[18px] px-[18px] py-[14px] mb-6 shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]"
    >
      <div
        className="w-10 h-10 rounded-full font-fredoka font-semibold text-base flex items-center justify-center flex-none"
        style={{ background: avatar.bg, color: avatar.color }}
      >
        {avatar.text}
      </div>
      <span className="flex-1 text-[#A89A8B] text-[15px]">{placeholder}</span>
      <span className="w-[38px] h-[38px] rounded-[12px] bg-[#FBE3D8] text-[#E0654A] flex items-center justify-center">
        {icon}
      </span>
    </a>
  );
}