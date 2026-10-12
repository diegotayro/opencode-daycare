import type { Metadata } from "next";
import { KidsPage } from "./_components/KidsPage";

export const metadata: Metadata = { title: "Niños · OpenDayCare" };

export default function Kids() {
  return <KidsPage />;
}
