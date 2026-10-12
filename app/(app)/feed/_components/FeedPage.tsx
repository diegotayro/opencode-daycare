import { ComposeBox } from "./ComposeBox";
import { PostCard } from "./PostCard";
import { PageHeader } from "@/shared/components/PageHeader";
import { posts } from "../_data/feed-mock";

const composeIcon = (
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
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

/** Home feed page: greeting, compose box, "PUBLICADO HOY" divider and the
 * mock posts. Centered 760px container (smaller padding on mobile). */
export function FeedPage() {
  return (
    <div className="max-w-[760px] w-full mx-auto pt-[34px] px-5 pb-20 md:px-10">
      <PageHeader
        className="mb-6"
        eyebrow="GUARDERÍA · SALA SOLES"
        title="Buenas, Caro"
        subtitle="12 niños · martes 17 jun"
      />

      <ComposeBox
        placeholder="Compartí un momento…"
        avatar={{ text: "C", bg: "#F2937A", color: "#fff" }}
        icon={composeIcon}
      />

      <div className="flex items-center gap-[14px] mb-[14px]">
        <span className="text-[12.5px] font-extrabold tracking-[.8px] text-[#8A7C6D]">
          PUBLICADO HOY
        </span>
        <span className="flex-1 h-px bg-[#E7DAC8]" />
      </div>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}