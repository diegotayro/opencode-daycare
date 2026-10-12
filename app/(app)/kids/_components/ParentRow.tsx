import { Avatar } from "@/shared/components/Avatar";
import { Badge } from "@/shared/components/Badge";
import {
  PARENT_STATUS_META,
  RELATIONSHIP_LABELS,
  type LinkedParent,
} from "../_data/kids-mock";

interface ParentRowProps {
  parent: LinkedParent;
}

/** One linked parent: avatar with the initial, name, "Mamá/Papá · estado" and
 * the status badge. */
export function ParentRow({ parent }: ParentRowProps) {
  const status = PARENT_STATUS_META[parent.status];

  return (
    <div className="flex items-center gap-3">
      <Avatar
        size={40}
        bg={parent.avatar.bg}
        color={parent.avatar.color}
        text={parent.name.charAt(0)}
      />
      <div className="flex-1 min-w-0">
        <div className="font-extrabold text-[14.5px] text-[#3F362E]">
          {parent.name}
        </div>
        <div className="text-[12.5px] text-[#A89A8B]">
          {RELATIONSHIP_LABELS[parent.relationship]} · {status.text}
        </div>
      </div>
      <Badge
        label={status.label}
        bg={status.bg}
        color={status.color}
        size="sm"
      />
    </div>
  );
}
