interface KidAllergiesCardProps {
  allergies: string[];
  notes: string | null;
}

/** "Alergias y notas" box: pink when the kid has allergies or notes, neutral
 * otherwise. */
export function KidAllergiesCard({
  allergies,
  notes,
}: KidAllergiesCardProps) {
  const hasData = allergies.length > 0 || notes !== null;

  if (!hasData) {
    return (
      <div className="flex gap-[14px] bg-[#F4ECE1] rounded-[16px] py-4 px-[18px]">
        <div className="w-10 h-10 rounded-[11px] bg-[#DBCDBA] flex items-center justify-center flex-none">
          <CheckIcon />
        </div>
        <div>
          <div className="font-extrabold text-[#6E6359] text-[15px] mb-0.5">
            Alergias y notas
          </div>
          <div className="text-[#94887B] text-[14.5px] leading-[1.5]">
            Sin alergias ni notas registradas
          </div>
        </div>
      </div>
    );
  }

  const allergyText =
    allergies.length > 0 ? `Alergia al ${allergies.join(", ")}.` : "";
  const detail = [allergyText, notes ?? ""].filter(Boolean).join(" ");

  return (
    <div className="flex gap-[14px] bg-[#FBDAD6] rounded-[16px] py-4 px-[18px]">
      <div className="w-10 h-10 rounded-[11px] bg-[#F4A8A0] flex items-center justify-center flex-none">
        <AlertIcon />
      </div>
      <div>
        <div className="font-extrabold text-[#C5413A] text-[15px] mb-0.5">
          Alergias y notas
        </div>
        <div className="text-[#B25249] text-[14.5px] leading-[1.5]">
          {detail}
        </div>
      </div>
    </div>
  );
}

function AlertIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
