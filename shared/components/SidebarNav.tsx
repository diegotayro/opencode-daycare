"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Route-aware nav. "Feed" → /feed, "Niños" → /kids (active on /kids and
 * /kids/*); "Avisos" and "Mi cuenta" stay inert until their screens exist. */
export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/feed"
      ? pathname === "/feed"
      : href === "/kids"
        ? pathname === "/kids" || pathname.startsWith("/kids/")
        : false;

  return (
    <nav className="flex flex-col gap-1 flex-1">
      <NavLink href="/feed" active={isActive("/feed")} icon={<FeedIcon />}>
        Feed
      </NavLink>
      <NavLink href="/kids" active={isActive("/kids")} icon={<KidsIcon />}>
        Niños
      </NavLink>
      <NavLink href="#" active={false} icon={<BellIcon />}>
        Avisos
      </NavLink>
      <NavLink href="#" active={false} icon={<UserIcon />}>
        Mi cuenta
      </NavLink>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  active: boolean;
  icon: ReactNode;
  children: ReactNode;
}

function NavLink({ href, active, icon, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 py-[11px] px-3 rounded-[12px] text-[14.5px] ${
        active
          ? "bg-[#FBE3D8] text-[#D9583C] font-extrabold"
          : "text-[#6E6359] font-semibold"
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}

function FeedIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function KidsIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 20a5 5 0 0 1 5.5-4.9" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}