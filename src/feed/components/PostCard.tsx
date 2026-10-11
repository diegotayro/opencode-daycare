import type { FeedPost } from "../data/feed-mock";
import { POST_TYPE_META } from "../data/feed-mock";

interface PostCardProps {
  post: FeedPost;
}

/** A single feed post card: avatar, author, badge, body, optional photo
 * placeholder and the reactions row (likes / comments / edit). */
export function PostCard({ post }: PostCardProps) {
  const meta = POST_TYPE_META[post.type];

  return (
    <article className="bg-[#FFFDF9] border border-[#ECE0D0] rounded-[20px] py-5 px-[22px] shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)]">
      <div className="flex items-center gap-3 mb-[14px]">
        <AuthorAvatar avatar={post.author.avatar} />
        <div className="flex-1 min-w-0">
          <div className="font-fredoka font-semibold text-[16.5px] text-[#3F362E]">
            {post.author.name}
          </div>
          <div className="text-[12.5px] text-[#A89A8B]">
            {post.time} · publicado por {post.publishedBy}
          </div>
        </div>
        <div
          className="flex items-center gap-[7px] px-3 py-1.5 rounded-full"
          style={{ background: meta.bg }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: meta.dot }}
          />
          <span
            className="text-xs font-extrabold tracking-[.5px]"
            style={{ color: meta.dot }}
          >
            {meta.label}
          </span>
        </div>
      </div>

      <div className="text-[12.5px] text-[#A89A8B] mb-2.5">
        Para: {post.audience}
      </div>
      <p className="text-[15.5px] leading-[1.55] text-[#4A4038] m-0">{post.body}</p>

      {post.image && (
        <a
          href="#"
          className="flex flex-col items-center justify-center gap-2 mt-[14px] border-[1.5px] border-dashed border-[#DBCDBA] rounded-[16px] bg-[#F4ECE1] h-[200px] text-[#B0A290]"
        >
          <CameraIcon />
          <span className="text-[13.5px]">{post.image.caption}</span>
        </a>
      )}

      <div className="flex items-center gap-[18px] mt-4 pt-[14px] border-t border-[#F0E6D8]">
        <span className="flex items-center gap-[7px] text-[#E0654A] font-bold text-sm">
          <HeartIcon />
          {post.likes}
        </span>
        <a
          href="#"
          className="flex items-center gap-[7px] text-[#94887B] font-bold text-sm"
        >
          <CommentIcon />
          {post.comments}
        </a>
        <span className="flex-1" />
        <a href="#" className="text-[#C5503A] font-extrabold text-sm">
          Editar
        </a>
      </div>
    </article>
  );
}

function AuthorAvatar({ avatar }: { avatar: FeedPost["author"]["avatar"] }) {
  const base =
    "w-[44px] h-[44px] rounded-full flex items-center justify-center flex-none";
  if (avatar.icon === "megaphone") {
    return (
      <div
        className={base}
        style={{ background: avatar.bg, color: avatar.color }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
      </div>
    );
  }
  return (
    <div
      className={`${base} font-fredoka font-semibold text-[17px]`}
      style={{ background: avatar.bg, color: avatar.color }}
    >
      {avatar.text}
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="#E0654A"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
    </svg>
  );
}