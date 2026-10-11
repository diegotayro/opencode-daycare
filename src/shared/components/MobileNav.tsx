"use client";

import { useState } from "react";
import { SidebarContent } from "./Sidebar";
import { useScrollLock } from "../hooks/useScrollLock";

/** Mobile-only sticky top bar with hamburger + brand. The hamburger opens a
 * fullscreen drawer that slides in from the left reusing SidebarContent; the
 * same button closes it (it sits above the drawer in z-index). */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <>
      <header className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 h-14 bg-[#FFFDF9] border-b border-[#ECE0D0]">
        <button
          type="button"
          onClick={toggle}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="flex items-center justify-center w-10 h-10 -ml-2 rounded-[12px] text-[#D9583C]"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
        <div className="text-right">
          <div className="font-fredoka font-semibold text-[17px] text-[#3F362E] leading-none">
            OpenDayCare
          </div>
          <div className="text-[11.5px] text-[#A89A8B] mt-0.5">Sala Soles</div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col h-full bg-[#FFFDF9] px-4 py-6 overflow-y-auto transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <SidebarContent />
      </div>
    </>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}