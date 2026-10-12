import { Button } from "@/shared/components/Button";
import type { Kid } from "../_data/kids-mock";
import { KidAllergiesCard } from "./KidAllergiesCard";
import { KidInfoCard } from "./KidInfoCard";
import { KidProfileHeader } from "./KidProfileHeader";
import { LinkedListedParentsCard } from "./LinkedListedParentsCard";

interface KidProfilePageProps {
  kid: Kid;
}

/** /kids/[slug]: two columns (header + allergies + data on the left, the day
 * summary button + linked parents on the right). Stacks below 768px. */
export function KidProfilePage({ kid }: KidProfilePageProps) {
  return (
    <div className="max-w-[820px] w-full mx-auto pt-[34px] px-5 pb-20 md:px-10">
      <div className="flex gap-[26px] items-start flex-wrap">
        <div className="flex-1 min-w-[300px] flex flex-col gap-[18px]">
          <KidProfileHeader kid={kid} />
          <KidAllergiesCard allergies={kid.allergies} notes={kid.notes} />
          <KidInfoCard
            rows={[
              { label: "Fecha de nacimiento", value: kid.birthDate },
              { label: "Sala", value: kid.room },
              { label: "Ingreso", value: kid.joinedAt },
            ]}
          />
        </div>

        <div className="w-[300px] flex-none flex flex-col gap-[14px]">
          <Button
            variant="dark"
            icon={<SunIcon />}
            className="py-[13px] w-full"
          >
            Resumen del día
          </Button>
          <LinkedListedParentsCard parents={kid.parents} />
        </div>
      </div>
    </div>
  );
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
