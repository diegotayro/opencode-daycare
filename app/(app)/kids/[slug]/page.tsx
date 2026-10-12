import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { KidProfilePage } from "../_components/KidProfilePage";
import { kids } from "../_data/kids-mock";

/** Sidebar/nav read `usePathname()`, which cannot be prerendered into the shell
 * of this dynamic route, so the route renders blocking instead of instant. */
export const instant = false;

export async function generateMetadata(
  props: PageProps<"/kids/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const kid = kids.find((item) => item.slug === slug);

  return { title: kid ? `${kid.name} · OpenDayCare` : "Niños · OpenDayCare" };
}

export default async function KidProfile(props: PageProps<"/kids/[slug]">) {
  const { slug } = await props.params;
  const kid = kids.find((item) => item.slug === slug);

  if (!kid) redirect("/kids");

  return <KidProfilePage kid={kid} />;
}
