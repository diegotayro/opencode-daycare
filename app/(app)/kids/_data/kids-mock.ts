// Mock data for the kids pages. No database — the same `kids` list feeds both
// the list (/kids) and the profile (/kids/[slug]). UI copy stays in Spanish;
// identifiers and internal values are in English (code rules).

/** Internal parent status. Visible Spanish labels live in PARENT_STATUS_META. */
export type ParentStatus = "ACTIVE" | "PENDING";

/** Internal relationship. Visible Spanish labels live in RELATIONSHIP_LABELS. */
export type Relationship = "MOTHER" | "FATHER";

export interface LinkedParent {
  id: string;
  name: string; // "Lucía Fernández"
  relationship: Relationship;
  status: ParentStatus;
  avatar: { bg: string; color: string };
}

export interface Kid {
  /** Kebab-case id used by the /kids/[slug] route. */
  slug: string;
  name: string; // "Mateo Fernández"
  avatar: { text: string; bg: string; color: string };
  age: number; // 3
  room: string; // "Soles"
  birthDate: string; // "12 mar 2022" (text as shown in the mockup)
  joinedAt: string; // "feb 2025"
  allergies: string[]; // ["maní"]; [] when none
  notes: string | null; // "Evitar frutos secos. Lleva inhalador en la mochila."
  parents: LinkedParent[];
}

export const RELATIONSHIP_LABELS: Record<Relationship, string> = {
  MOTHER: "Mamá",
  FATHER: "Papá",
};

/** Maps a ParentStatus to its badge + subtitle text, with the template colors. */
export const PARENT_STATUS_META: Record<
  ParentStatus,
  { label: string; text: string; bg: string; color: string }
> = {
  ACTIVE: {
    label: "ACTIVA",
    text: "activa",
    bg: "#CFEBD8",
    color: "#3E9B6C",
  },
  PENDING: {
    label: "PENDIENTE",
    text: "invitación enviada",
    bg: "#F7E7A6",
    color: "#9A7B1E",
  },
};

const KID_TAG_COLORS = { bg: "#FBD8CC", color: "#D9684A" };
const KID_LINK_COLORS = { bg: "#F9D2DE", color: "#C56486" };

/** Right-hand slot of a kid row: an allergy tag, the "VINCULAR" link badge or
 * a plain chevron. Derived from the data, never stored. */
export type KidBadge =
  | { kind: "tag"; label: string; bg: string; color: string }
  | { kind: "link"; label: string; bg: string; color: string }
  | { kind: "chevron" };

/** No parents → "VINCULAR"; allergies → first allergy uppercased; else chevron. */
export function getKidBadge(kid: Kid): KidBadge {
  if (kid.parents.length === 0) {
    return { kind: "link", label: "VINCULAR", ...KID_LINK_COLORS };
  }
  if (kid.allergies.length > 0) {
    return {
      kind: "tag",
      label: kid.allergies[0].toUpperCase(),
      ...KID_TAG_COLORS,
    };
  }
  return { kind: "chevron" };
}

/** "sin padres vinculados" | "1 padre vinculado" | "n padres vinculados". */
export function getParentsLabel(count: number): string {
  if (count === 0) return "sin padres vinculados";
  if (count === 1) return "1 padre vinculado";
  return `${count} padres vinculados`;
}

/** The 8 kids of the mockup, in the same order (Sala Soles). */
export const kids: Kid[] = [
  {
    slug: "mateo-fernandez",
    name: "Mateo Fernández",
    avatar: { text: "M", bg: "#A9D9E8", color: "#1F7A93" },
    age: 3,
    room: "Soles",
    birthDate: "12 mar 2022",
    joinedAt: "feb 2025",
    allergies: ["maní"],
    notes: "Evitar frutos secos. Lleva inhalador en la mochila.",
    parents: [
      {
        id: "parent-lucia-fernandez",
        name: "Lucía Fernández",
        relationship: "MOTHER",
        status: "ACTIVE",
        avatar: { bg: "#C9B6E8", color: "#fff" },
      },
      {
        id: "parent-diego-fernandez",
        name: "Diego Fernández",
        relationship: "FATHER",
        status: "PENDING",
        avatar: { bg: "#A9C7E8", color: "#fff" },
      },
    ],
  },
  {
    slug: "sofia-mendez",
    name: "Sofía Méndez",
    avatar: { text: "S", bg: "#F4B8CC", color: "#C44A7A" },
    age: 2,
    room: "Soles",
    birthDate: "28 abr 2023",
    joinedAt: "mar 2025",
    allergies: [],
    notes: null,
    parents: [
      {
        id: "parent-valeria-mendez",
        name: "Valeria Méndez",
        relationship: "MOTHER",
        status: "ACTIVE",
        avatar: { bg: "#F4B8CC", color: "#fff" },
      },
    ],
  },
  {
    slug: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    avatar: { text: "B", bg: "#B9DEC4", color: "#3E8B62" },
    age: 3,
    room: "Soles",
    birthDate: "3 ene 2022",
    joinedAt: "feb 2025",
    allergies: [],
    notes: null,
    parents: [
      {
        id: "parent-paula-ruiz",
        name: "Paula Ruiz",
        relationship: "MOTHER",
        status: "ACTIVE",
        avatar: { bg: "#B9DEC4", color: "#fff" },
      },
      {
        id: "parent-martin-ruiz",
        name: "Martín Ruiz",
        relationship: "FATHER",
        status: "ACTIVE",
        avatar: { bg: "#A9D9E8", color: "#fff" },
      },
    ],
  },
  {
    slug: "valentina-soto",
    name: "Valentina Soto",
    avatar: { text: "V", bg: "#F4DC8E", color: "#9A7B1E" },
    age: 2,
    room: "Soles",
    birthDate: "19 jun 2023",
    joinedAt: "may 2025",
    allergies: [],
    notes: null,
    parents: [],
  },
  {
    slug: "tomas-diaz",
    name: "Tomás Díaz",
    avatar: { text: "T", bg: "#C9B6E8", color: "#7B5FC0" },
    age: 3,
    room: "Soles",
    birthDate: "7 nov 2022",
    joinedAt: "feb 2025",
    allergies: ["lactosa"],
    notes: "Usar leche sin lactosa. Evitar yogures y quesos.",
    parents: [
      {
        id: "parent-mariana-diaz",
        name: "Mariana Díaz",
        relationship: "MOTHER",
        status: "ACTIVE",
        avatar: { bg: "#C9B6E8", color: "#fff" },
      },
    ],
  },
  {
    slug: "emma-castro",
    name: "Emma Castro",
    avatar: { text: "E", bg: "#F4B8CC", color: "#C44A7A" },
    age: 2,
    room: "Soles",
    birthDate: "2 sep 2023",
    joinedAt: "abr 2025",
    allergies: [],
    notes: null,
    parents: [
      {
        id: "parent-julieta-castro",
        name: "Julieta Castro",
        relationship: "MOTHER",
        status: "ACTIVE",
        avatar: { bg: "#F4B8CC", color: "#fff" },
      },
    ],
  },
  {
    slug: "lucas-romero",
    name: "Lucas Romero",
    avatar: { text: "L", bg: "#A9D9E8", color: "#1F7A93" },
    age: 3,
    room: "Soles",
    birthDate: "21 jul 2022",
    joinedAt: "feb 2025",
    allergies: [],
    notes: null,
    parents: [
      {
        id: "parent-carla-romero",
        name: "Carla Romero",
        relationship: "MOTHER",
        status: "ACTIVE",
        avatar: { bg: "#A9D9E8", color: "#fff" },
      },
    ],
  },
  {
    slug: "olivia-vega",
    name: "Olivia Vega",
    avatar: { text: "O", bg: "#B9DEC4", color: "#3E8B62" },
    age: 2,
    room: "Soles",
    birthDate: "15 dic 2023",
    joinedAt: "jun 2025",
    allergies: [],
    notes: null,
    parents: [
      {
        id: "parent-rocio-vega",
        name: "Rocío Vega",
        relationship: "MOTHER",
        status: "ACTIVE",
        avatar: { bg: "#B9DEC4", color: "#fff" },
      },
    ],
  },
];
