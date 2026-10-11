import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { Main } from "@/shared/components/Main";
import { MobileNav } from "@/shared/components/MobileNav";
import { Sidebar } from "@/shared/components/Sidebar";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OpenDayCare",
  description: "OpenDayCare — guardería",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex min-h-screen h-screen flex-col overflow-hidden bg-[#F6ECDF] md:flex-row">
          <Sidebar className="hidden md:flex" />
          <MobileNav />
          <Main>{children}</Main>
        </div>
      </body>
    </html>
  );
}