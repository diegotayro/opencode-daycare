import type { ReactNode } from "react";
import { Main } from "@/shared/components/Main";
import { MobileNav } from "@/shared/components/MobileNav";
import { Sidebar } from "@/shared/components/Sidebar";

/** App shell for authenticated routes: desktop sidebar + mobile drawer + main. */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen h-screen flex-col overflow-hidden bg-[#F6ECDF] md:flex-row">
      <Sidebar className="hidden md:flex" />
      <MobileNav />
      <Main>{children}</Main>
    </div>
  );
}
