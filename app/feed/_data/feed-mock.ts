// Mock data for the feed. No database — static posts that mirror the template
// (references/pantallas/feed.dc.html). UI copy stays in Spanish; identifiers
// and internal values are in English (code rules).

/** Internal post type. Visible Spanish labels live in POST_TYPE_META. */
export type PostType = "ACHIEVEMENT" | "ACTIVITY" | "ANNOUNCEMENT";

export interface FeedPost {
  id: string;
  type: PostType;
  author: {
    name: string; // "Mateo" | "Anuncio general"
    avatar: {
      text?: string; // "M" initial, rendered inside a circle
      icon?: "megaphone"; // alternative to text (megaphone icon)
      bg: string; // "#A9D9E8" | "#CCD8F4"
      color: string; // "#1F7A93" | "#4E72C8"
    };
  };
  time: string; // "14:20" — publish time
  publishedBy: string; // "vos" → renders "publicado por vos"
  audience: string; // "familia de Mateo" | "toda la sala" → renders "Para: …"
  body: string;
  image?: { caption: string }; // photo placeholder, e.g. "Foto · pintando con témperas"
  likes: number;
  comments: number;
}

/** Maps a PostType to its badge presentation, with the template's exact colors. */
export const POST_TYPE_META: Record<
  PostType,
  { label: string; dot: string; bg: string }
> = {
  ACHIEVEMENT: { label: "LOGRO", dot: "#3E9B6C", bg: "#CFEBD8" },
  ACTIVITY: { label: "ACTIVIDAD", dot: "#2E89A6", bg: "#C7E7F1" },
  ANNOUNCEMENT: { label: "ANUNCIO", dot: "#4E72C8", bg: "#CCD8F4" },
};

export const posts: FeedPost[] = [
  {
    id: "post-1",
    type: "ACHIEVEMENT",
    author: {
      name: "Mateo",
      avatar: { text: "M", bg: "#A9D9E8", color: "#1F7A93" },
    },
    time: "14:20",
    publishedBy: "vos",
    audience: "familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "post-2",
    type: "ACTIVITY",
    author: {
      name: "Mateo",
      avatar: { text: "M", bg: "#A9D9E8", color: "#1F7A93" },
    },
    time: "09:40",
    publishedBy: "vos",
    audience: "familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    image: { caption: "Foto · pintando con témperas" },
    likes: 5,
    comments: 2,
  },
  {
    id: "post-3",
    type: "ANNOUNCEMENT",
    author: {
      name: "Anuncio general",
      avatar: { icon: "megaphone", bg: "#CCD8F4", color: "#4E72C8" },
    },
    time: "07:50",
    publishedBy: "vos",
    audience: "toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
];