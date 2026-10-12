# SPEC 03 — Páginas `/kids` y `/kids/[slug]` (perfil del niño)

> **Status:** Approved
> **Depends on:** SPEC 02
> **Date:** 2026-10-11
> **Objective:** Replicar los diseños de `references/pantallas/ninos.dc.html` y `references/pantallas/perfil-nino.dc.html` como las rutas `/kids` y `/kids/[slug]` —sin persistencia, con mock data compartida— extrayendo los componentes reutilizables a `shared/`, con el sidebar activo según la ruta y versión móvil responsive.

## Scope

**In:**

- Ruta `/kids`: cabecera "GESTIÓN / Niños" + botón "Agregar niño", buscador decorativo, encabezado de grupo "SALA SOLES · 8 niños" y grid de 8 tarjetas de niño.
- Ruta dinámica `/kids/[slug]`: enlace "Volver a Niños", cabecera del perfil, caja "Alergias y notas", tarjeta de datos, botón "Resumen del día" y tarjeta "PADRES VINCULADOS".
- Mock compartida `app/kids/_data/kids-mock.ts` con los 8 niños y detalle completo.
- Componentes **compartidos** nuevos en `shared/components/`: `Avatar`, `Badge`, `Card`, `Button`, `PageHeader`.
- Componentes **de la feature** en `app/kids/_components/`: `KidsPage`, `KidCard`, `KidCardStatus`, `KidProfileHeader`, `KidAllergiesCard`, `KidInfoCard`, `LinkedListedParentsCard`, `ParentRow`, `KidProfilePage`.
- Sidebar route-aware (`usePathname`): "Feed" → `/feed`, "Niños" → `/kids`, activo según ruta; "Avisos"/"Mi cuenta" en `#`.
- Refactor de SPEC 01: `PostCard` usa el `Avatar` compartido y `FeedPage` usa el `PageHeader` compartido (se elimina `FeedHeader`); `MobileNav` cierra el drawer móvil al cambiar de ruta.
- Título de documento por página (`/kids` estático, `/kids/[slug]` con `generateMetadata`).
- Responsive < 768px en ambas páginas, reusando el shell móvil (el drawer se auto-cierra al navegar, para que no quede abierto sobre la página destino).
- Rutas finas `app/kids/page.tsx` y `app/kids/[slug]/page.tsx`.
- Tailwind v4 con valores arbitrarios exactos, Fredoka/Nunito y SVGs inline.

**Out of scope (para futuros specs):**

- Persistencia, base de datos y autenticación.
- Lógica del buscador (decorativo).
- Las pantallas `agregar-nino`, `resumen-dia`, `vincular-padre`, `avisos`, `mi-cuenta`, `crear-publicacion`, `detalle-publicacion`, `login`.
- Enlaces inertes (`#`): "Agregar niño", "Editar", "Resumen del día", "Vincular otro padre".
- Edición real, vinculación real de padres, subida de fotos.
- Agrupar la lista en varios grupos por sala.

## Data model

```ts
// app/kids/_data/kids-mock.ts
export type ParentStatus = "ACTIVE" | "PENDING";
export type Relationship = "MOTHER" | "FATHER";

export interface LinkedParent {
  id: string;
  name: string;               // "Lucía Fernández"
  relationship: Relationship; // MOTHER → "Mamá", FATHER → "Papá"
  status: ParentStatus;       // ACTIVE → "ACTIVA", PENDING → "PENDIENTE"
  avatar: { bg: string; color: string };
}

export interface Kid {
  slug: string;            // "mateo-fernandez" — id de la ruta [slug]
  name: string;            // "Mateo Fernández"
  avatar: { text: string; bg: string; color: string };
  age: number;             // 3
  room: string;            // "Soles"
  birthDate: string;       // "12 mar 2022" (texto tal cual el mockup)
  joinedAt: string;        // "feb 2025"
  allergies: string[];     // ["maní"] ; [] si no tiene
  notes: string | null;    // "Evitar frutos secos. Lleva inhalador en la mochila."
  parents: LinkedParent[];
}

export const kids: Kid[] = [ /* los 8 niños del mockup, mismo orden */ ];
```

Convenciones:

- **Mapas:** `RELATIONSHIP_LABELS` (MOTHER → "Mamá", FATHER → "Papá"), `PARENT_STATUS_META` (ACTIVE → `{ label: "ACTIVA", text: "activa", bg: "#CFEBD8", color: "#3E9B6C" }`, PENDING → `{ label: "PENDIENTE", text: "invitación enviada", bg: "#F7E7A6", color: "#9A7B1E" }`). Enums en inglés; el español vive solo en los mapas.
- **`getKidBadge(kid)`:** sin padres → `{ kind: "link", label: "VINCULAR" }`; con alergias → `{ kind: "tag", label: allergies[0].toUpperCase() }`; resto → `{ kind: "chevron" }`. Colores tag `#FBD8CC`/`#D9684A`, link `#F9D2DE`/`#C56486`. Coincide con las 8 filas del mockup.
- **`getParentsLabel(n)`:** `0` → "sin padres vinculados", `1` → "1 padre vinculado", resto → "n padres vinculados".
- **Caja de alergias:** con datos → variante rosa (`#FBDAD6`/`#F4A8A0`/`#C5413A`/`#B25249`); sin datos → variante neutra ("Sin alergias ni notas registradas").
- **Colores/tipografía:** paleta de SPEC 01 (`#F6ECDF`, `#FFFDF9`, `#ECE0D0`, `#3F362E`, `#94887B`, `#A89A8B`); Fredoka para nombres/títulos/iniciales, Nunito para el resto.
- **Contenido de referencia:** Mateo Fernández con el detalle exacto del mockup (`12 mar 2022`, `feb 2025`, alergia al maní, Lucía ACTIVA + Diego PENDIENTE); los otros 7 con detalle plausible inventado.
- **Slug inexistente:** `redirect("/kids")`.

## Estructura final

```
app/kids/
  page.tsx                  # `/kids`        → <KidsPage />
  [slug]/page.tsx           # `/kids/[slug]` → <KidProfilePage />
  _components/
    KidsPage.tsx  KidCard.tsx  KidCardStatus.tsx  KidProfileHeader.tsx
    KidAllergiesCard.tsx  KidInfoCard.tsx  LinkedListedParentsCard.tsx
    ParentRow.tsx  KidProfilePage.tsx
  _data/kids-mock.ts
shared/components/
  Avatar.tsx  Badge.tsx  Card.tsx  Button.tsx  PageHeader.tsx
  Sidebar.tsx (modificado)  SidebarNav.tsx (nuevo, cliente)
app/feed/_components/
  PostCard.tsx (modificado)  FeedPage.tsx (modificado)  FeedHeader.tsx (eliminado)
```

## Implementation plan

1. **Compartidos base.** Crear `Avatar`, `Badge`, `Card`, `Button` y `PageHeader` en `shared/components/` con las variantes y valores exactos del mockup. `Avatar` `{ text, bg, color, size?, icon?, className? }` (Fredoka ≈ 0.4× `size`); `Badge` `{ label, bg, color, size? ("sm" | "md") }`; `Button` `{ variant: "primary" | "secondary" | "dark", icon?, href?, className?, children }`; `PageHeader` `{ eyebrow, title, subtitle?, action? }`. Verificar: `npx tsc --noEmit`.
2. **Refactor de SPEC 01.** `PostCard` usa `Avatar` (incluido el caso ícono/label del anuncio); `FeedPage` usa `PageHeader`; eliminar `app/feed/_components/FeedHeader.tsx`. Verificar: `/feed` sigue idéntico vs `references/screenshots/feed.png`.
3. **`app/kids/_data/kids-mock.ts`.** Tipos, mapas, `getKidBadge`, `getParentsLabel` y `kids[]` con los 8 niños del mockup. Verificar: `npx tsc --noEmit`.
4. **`KidCard.tsx` + `KidCardStatus.tsx`.** `<Link href={`/kids/${slug}`}>`: `Avatar` 48, nombre Fredoka 16, meta "N años · … padres vinculados" y la ranura derecha (badge o chevron). Hover `hover:-translate-y-0.5 hover:border-[#F2A78E]` con `transition`.
5. **`KidsPage.tsx`.** Contenedor `max-w-[880px]` con `pt-[34px] px-5 pb-20 md:px-10`; `PageHeader` (eyebrow "GESTIÓN", title "Niños", action `Button` primary "Agregar niño" con ícono `+`); buscador decorativo (`input` con lupa, sin estado); encabezado de grupo "SALA SOLES" + `${kids.length} niños` + línea; grid `grid-cols-1 md:grid-cols-2` mapeando `kids` → `KidCard`.
6. **`app/kids/page.tsx`.** Ruta fina que renderiza `<KidsPage />`; `export const metadata = { title: "Niños · OpenDayCare" }`. Verificar: `/kids` renderiza 8 filas.
7. **`KidProfileHeader.tsx`.** Enlace "Volver a Niños" → `/kids`, `Avatar` 84, `h1` Fredoka 600 28px con el nombre, línea "3 años · Sala Soles", `Button` secondary "Editar" (`#`). Fila con `flex-wrap` para móvil.
8. **`KidAllergiesCard.tsx` + `KidInfoCard.tsx`.** Caja de alergias (variante rosa / neutra) y tarjeta de datos con filas label/valor (label a la izquierda, valor en negrita, divisores `#F0E6D8`). Verificar: `/kids/mateo-fernandez` muestra la caja rosa con el texto del mockup y las filas `12 mar 2022` / `Soles` / `feb 2025`.
9. **`ParentRow.tsx` + `LinkedListedParentsCard.tsx`.** Etiqueta "PADRES VINCULADOS"; por cada padre una `ParentRow` (Avatar 40, nombre, "Mamá · activa", `Badge` de estado); al final el CTA punteado "Vincular otro padre" (`#`).
10. **`KidProfilePage.tsx`.** Ensambla las dos columnas del mockup (`flex gap-[26px] items-start flex-wrap`; izquierda `flex-1 min-w-[300px]`, derecha `w-[300px] flex-none`): izquierda = header + alergias + datos; derecha = `Button` dark "Resumen del día" (con ícono) + tarjeta de padres. En móvil el `flex-wrap` apila ambas columnas.
11. **`app/kids/[slug]/page.tsx`.** Ruta fina con `PageProps<'/kids/[slug]'>` y `await params`; busca por slug y, si no existe, `redirect("/kids")`; `generateMetadata` devuelve `title: "<nombre> · OpenDayCare"`. Verificar: `/kids/valentina-soto` renderiza su perfil y `/kids/no-existe` redirige a `/kids`.
12. **Sidebar route-aware.** Extraer el nav a `shared/components/SidebarNav.tsx` (`"use client"`, `usePathname`): "Feed" → `/feed`, "Niños" → `/kids`, "Avisos"/"Mi cuenta" → `#`; activo cuando `pathname === "/feed"` (Feed) o `pathname === "/kids" || pathname.startsWith("/kids/")` (Niños). `SidebarContent` importa `SidebarNav`; el botón "Nueva publicación" pasa a usar el `Button` compartido. Ajuste del shell móvil: `MobileNav` observa `usePathname` y cierra el drawer al cambiar de ruta (ajuste de estado en render, sin `useEffect`), para que no quede abierto sobre la página destino.
13. **Verificación.** `npx tsc --noEmit`, `npm run build`, `npm run lint` (sin nuevos errores; el fallo conocido de `references/pantallas/support.js` no se toca); Playwright desktop (`/kids` vs `references/screenshots/ninos.png`, `/kids/[slug]`, `/feed` intacto) y móvil (< 768px) abriendo/cerrando el drawer y navegando `/kids` → `/kids/[slug]`; screenshots en `.playwright-mcp/spec03/`.

## Acceptance criteria

- [x] `/kids` renderiza 8 tarjetas desde `kids-mock.ts`, cada una con avatar (inicial y colores), nombre, "N años · … padres vinculados" y la ranura derecha. — Verificado: snapshot de `/kids` con 8 `a[href^="/kids/"]`; comparación campo a campo (nombre, meta, texto/colores del avatar, ranura) contra los 8 `a.kid` de `ninos.dc.html` servido por HTTP: **0 diffs**. Avatar 48px, inicial Fredoka 19px (`Avatar.tsx:43-48`).
- [x] Cada fila de `/kids` es un enlace real que navega a `/kids/<slug>`. — Verificado: `KidCard.tsx:14-16` (`<Link href={`/kids/${kid.slug}`}>`); los 8 hrefs son únicos (`/kids/mateo-fernandez` … `/kids/olivia-vega`); click en la fila de Mateo → URL `/kids/mateo-fernandez` + title "Mateo Fernández · OpenDayCare".
- [x] Badge derivado correcto: Mateo "MANÍ", Tomás "LACTOSA", Valentina "VINCULAR" y chevron en el resto. — Verificado: `getKidBadge` (`kids-mock.ts:68-80`); DOM: MANÍ `#FBD8CC`/`#D9684A`, LACTOSA `#FBD8CC`/`#D9684A`, VINCULAR `#F9D2DE`/`#C56486`, 5 chevrons (Sofía, Benjamín, Emma, Lucas, Olivia) — idéntico al mockup (0 diffs en la ranura).
- [x] `/kids` muestra eyebrow "GESTIÓN", título "Niños" y el botón "Agregar niño" con el gradiente del mockup. — Verificado: "GESTIÓN" 12.5px/800/letter-spacing .8px `#D9583C`; h1 "Niños" Fredoka 600 30px `#3F362E`; `Button variant="primary"` con `linear-gradient(180deg,#F4977E,#EE8164)`, radius 14px, padding 11px/18px, texto blanco 800 14.5px (== computed styles del mockup).
- [x] El buscador "Buscar niño…" se ve como el mockup y escribir en él no cambia el listado. — Verificado: caja `#FFFDF9`/`#ECE0D0` radius 14px padding 12px/16px mb 22px, input 15px, lupa SVG `#B0A290` (== mockup); `browser_type` "zzz" deja 8 links y los mismos 8 nombres (input sin estado, decorativo).
- [x] El encabezado de grupo muestra "SALA SOLES" y "8 niños" (conteo derivado de la mock). — Verificado: `KidsPage.tsx:36-40` (`{kids.length} niños` → "8 niños"); "SALA SOLES" 12.5/800/.8 `#3F362E`, "8 niños" 13px `#A89A8B`, línea `#E7DAC8` (== mockup).
- [x] `/kids/mateo-fernandez` muestra avatar "M" (`#A9D9E8`/`#1F7A93`), nombre, "3 años · Sala Soles" y botón "Editar". — Verificado: Avatar 84px "M" `#A9D9E8`/`#1F7A93` Fredoka 34px; h1 "Mateo Fernández" Fredoka 600 28px `#3F362E`; "3 años · Sala Soles" 15px `#94887B`; "Editar" secondary `#FFFDF9`/`#ECE0D0`/`#6E6359` 14px/700 radius 12px padding 9/16 (== mockup `perfil-nino.dc.html`).
- [x] La caja de alergias muestra el texto del mockup ("Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila."); para niños sin alergias aparece la variante neutra. — Verificado: caja rosa `#FBDAD6` radius 16px padding 16/18, ícono `#F4A8A0` 40px/11px, título `#C5413A` 15px/800, texto `#B25249` 14.5px/1.5 con el texto exacto del mockup; `/kids/sofia-mendez` → neutra `#F4ECE1`, ícono `#DBCDBA`, título `#6E6359` y "Sin alergias ni notas registradas" (`KidAllergiesCard.tsx:12-34`).
- [x] La tarjeta de datos muestra "Fecha de nacimiento 12 mar 2022", "Sala Soles" e "Ingreso feb 2025". — Verificado: `KidInfoCard` con esas 3 filas; padding 15px/18px, divisores 1px `#F0E6D8` (la última sin borde), label `#94887B` 14.5px, valor 800 `#3F362E` 14.5px (== mockup).
- [x] "PADRES VINCULADOS" lista Lucía (ACTIVA) y Diego (PENDIENTE) con sus subtítulos, y el CTA "Vincular otro padre". — Verificado: etiqueta `#8A7C6D` 12.5/800/.8 mb 14px; Lucía Fernández (avatar "L" 40px `#C9B6E8`/`#fff`) "Mamá · activa" + Badge ACTIVA `#CFEBD8`/`#3E9B6C` 10.5px; Diego Fernández (avatar "D" 40px `#A9C7E8`/`#fff`) "Papá · invitación enviada" + Badge PENDIENTE `#F7E7A6`/`#9A7B1E`; CTA punteado 40px `#D8CBBA` con "Vincular otro padre" `#C5503A` y `href="#"` (todo == mockup). `/kids/valentina-soto` (sin padres) muestra sólo el CTA.
- [x] `/kids/<slug-inexistente>` redirige a `/kids`. — Verificado: `app/kids/[slug]/page.tsx:23` (`redirect("/kids")`); `browser_navigate` a `/kids/no-existe` terminó en `/kids` (title "Niños · OpenDayCare", h1 "Niños", 8 tarjetas).
- [x] El sidebar marca "Niños" como activo en `/kids` y `/kids/*`, y "Feed" activo en `/feed`; "Feed" enlaza a `/feed` y "Niños" a `/kids`. — Verificado: `SidebarNav.tsx:10-17`; en `/kids` y `/kids/mateo-fernandez` "Niños" queda `background:#FBE3D8; color:#D9583C; font-weight:800` y "Feed" `#6E6359`/600; en `/feed` al revés. hrefs `/feed` y `/kids`; "Avisos"/"Mi cuenta" en `#`.
- [x] El botón "Agregar niño" y "Nueva publicación" son el mismo componente `Button` (variant primary) y ambos quedan inertes (`#`). — Verificado: `Sidebar.tsx:48-54` y `KidsPage.tsx:16-22` usan el mismo `shared/components/Button.tsx` con `variant="primary"`; `Button.tsx:27` default `href="#"`; en el DOM ambos son `a[href="#"]`.
- [x] `PostCard` usa el `Avatar` compartido y `FeedPage` usa `PageHeader`; `app/feed/_components/FeedHeader.tsx` ya no existe. — Verificado: `PostCard.tsx:1,17-25` (Avatar, incluye el caso `icon` megáfono); `FeedPage.tsx:3,27` (PageHeader); el archivo no existe y `grep -rn FeedHeader app shared` no devuelve referencias.
- [ ] `/feed` sigue siendo idéntico a `references/screenshots/feed.png` después del refactor. — Parcial: la comparación **estructural** contra `feed.dc.html` coincide (eyebrow `#D9583C` 12.5/800/.8 mb 4px; h1 Fredoka 30/600 `#3F362E`; subtítulo 14.5px `#94887B`; header mb 24px; contenedor 760px/34/40/80; 3 posts con avatares 44px Fredoka 17px, incluido el de anuncio `#CCD8F4`/`#4E72C8` con ícono SVG; compose `#FFFDF9`/`#ECE0D0` r18; "PUBLICADO HOY" `#8A7C6D`), y 0 errores de consola. Falta la comparación **pixel-level** contra el PNG → revisión visual manual (`.playwright-mcp/spec03/feed-desktop.png` ↔ `references/screenshots/feed.png`).
- [x] Móvil (< 768px): el grid de `/kids` es de 1 columna y el perfil apila sus columnas; la barra sticky + drawer siguen funcionando. — Verificado a 390×844: grid `grid-template-columns: 340px` (1 columna), `<aside>` `display:none`, header sticky `display:flex` h 56px z50; drawer `translate:-100%` (x=-390, aria-hidden) → al abrir `translate:0px` (x=0, aria-hidden=false, `body overflow:hidden`); click en "Feed" del drawer navegó a `/feed` y lo cerró; en `/kids/mateo-fernandez` las columnas se apilan (izquierda full-width y=90, derecha y=561.75) y el drawer sigue funcionando; boundary exacto 767px → 1 columna / 768px → 2 columnas. 0 errores de consola.
- [x] `document.title` es "Niños · OpenDayCare" en `/kids` y "<nombre> · OpenDayCare" en `/kids/[slug]`. — Verificado: `app/kids/page.tsx:4` y `generateMetadata` (`app/kids/[slug]/page.tsx:10-17`); Playwright: `/kids` → "Niños · OpenDayCare", `/kids/mateo-fernandez` → "Mateo Fernández · OpenDayCare", `/kids/sofia-mendez` → "Sofía Méndez · OpenDayCare".
- [x] `npx tsc --noEmit` pasa sin errores y `npm run build` termina OK. — Verificado: `npx tsc --noEmit` exit 0; `npm run build` → "✓ Compiled successfully", TypeScript OK, rutas `/`, `/_not-found`, `/feed`, `/kids` (static) y `/kids/[slug]` (Partial Prerender). `npx eslint app shared` → 0 problemas; `npm run lint` sólo reporta los 2 errores preexistentes de `references/pantallas/support.js` (no tocado).
- [x] `specs/01-feed-home.md` no fue modificado y SPEC 03 documenta todos los cambios sobre lo aprobado en SPEC 01. — Verificado: `git diff e1565c7..HEAD -- specs/01-feed-home.md` vacío → SPEC 01 intacto ✓. Todos los cambios sobre SPEC 01 están documentados: Scope (líneas 18 y 20), paso 12 del plan, decisión y tabla "Cambios sobre lo aprobado en SPEC 01" (nav del sidebar, `FeedHeader.tsx`, `PostCard.tsx`, `MobileNav.tsx`). El cambio de `shared/components/MobileNav.tsx` (+13/−1: `usePathname` cierra el drawer al cambiar de ruta, ajuste de estado en render) quedó documentado por decisión del usuario; no rompe ningún criterio de SPEC 01 (el drawer sigue abriéndose/cerrándose igual y la sticky bar/`useScrollLock` no cambian).

## Cambios sobre lo aprobado en SPEC 01

`specs/01-feed-home.md` no se modifica. SPEC 03 cambia estos artefactos ya aprobados e implementados:

| Artefacto | En SPEC 01 | Cambio en SPEC 03 |
| --- | --- | --- |
| Nav del sidebar | Enlaces `href="#"`, ítem activo fijo en "Feed" | `SidebarNav` (cliente) con `usePathname`: Feed → `/feed`, Niños → `/kids`, activo por ruta; Avisos/Mi cuenta siguen en `#` |
| `app/feed/_components/FeedHeader.tsx` | Componente propio del feed | Se elimina; lo reemplaza `PageHeader` (compartido en `shared/components/`) |
| `app/feed/_components/PostCard.tsx` | Avatar interno `AuthorAvatar` | Pasa a usar el `Avatar` compartido |
| `shared/components/MobileNav.tsx` | Drawer móvil que sólo se cerraba con el botón hamburguesa | Observa `usePathname` y cierra el drawer al cambiar de ruta (ajuste de estado en render). Estructura, sticky bar y `useScrollLock` intactos |

Consecuencia sobre criterios de SPEC 01: el criterio "`FeedHeader` acepta `eyebrow`/`title`/`subtitle`" se verifica ahora sobre `PageHeader`, y "todo idéntico a `feed.png`" se re-verifica en `/feed` (la URL `/` → `/feed` la cambió SPEC 02).

## Decisions

- **Yes:** rutas `/kids` (listado) y `/kids/[slug]` (perfil), saliendo del ítem "Niños" del sidebar y de cada fila de la lista.
- **Yes:** una sola mock `kids` con detalle completo para los 8, compartida por listado y perfil; `slug` en kebab-case como id de ruta.
- **Yes:** badge del listado derivado de los datos (`getKidBadge`), no un campo aparte.
- **Yes:** los colores de cada avatar viven en la mock (mismo criterio que `feed-mock.ts`).
- **Yes:** `redirect("/kids")` cuando el slug no existe (en vez de `notFound()`).
- **Yes:** enlaces a pantallas inexistentes inertes (`href="#"`); "Volver a Niños" sí enlaza a `/kids`.
- **Yes:** sidebar route-aware con `usePathname` (nuevo `SidebarNav` cliente); "Feed" → `/feed` y "Niños" → `/kids`; "Avisos"/"Mi cuenta" siguen inertes.
- **Yes:** componentes compartidos `Avatar`, `Badge`, `Card`, `Button`, `PageHeader` en `shared/components/`; lo específico de niños en `app/kids/_components/`.
- **Yes:** `Button` reutilizado por "Nueva publicación" y "Agregar niño" (variant primary); `Button` dark para "Resumen del día"; `Button` secondary para "Editar".
- **Yes:** refactorizar SPEC 01 para reusar (`PostCard` → `Avatar`, `FeedPage` → `PageHeader`, se retira `FeedHeader`).
- **Yes:** `KidProfileHeader` es propio del perfil (no reusa `PageHeader`); sí compone `Avatar` y `Button`.
- **Yes:** caja de alergias con variante neutra si el niño no tiene alergias ni notas.
- **Yes:** responsive en ambas páginas, reusando el shell móvil de SPEC 01, con un ajuste en `MobileNav`: el drawer se cierra al cambiar de ruta (era la única forma de que el menú no quedara abierto encima de `/kids/<slug>` al navegar desde el drawer).
- **Yes:** metadata por página (`/kids` estático, `/kids/[slug]` con `generateMetadata`).
- **Yes:** un único grupo "SALA SOLES" con el conteo derivado de la mock.
- **No:** persistencia, autenticación, buscador funcional, agrupar por sala, editar/vincular de verdad, subida de fotos, rutas placeholder.

## Risks

| Riesgo | Mitigación |
| --- | --- |
| El refactor de SPEC 01 (Avatar/PageHeader) altera el look verificado del feed | Playwright contra `references/screenshots/feed.png` en el paso 2; valores exactos del mockup. |
| Convertir el nav del sidebar en cliente afecta el drawer móvil | `SidebarNav` es solo el `<nav>`; `SidebarContent`/`MobileNav` mantienen su estructura (sticky bar, `useScrollLock`, animación). El único cambio en `MobileNav` es que observa `usePathname` para cerrar el drawer al navegar. |
| "MANÍ" derivado de `allergies[0].toUpperCase()` puede dar un label raro | `allergies` se guarda con el término visible en español ("maní", "lactosa") y la mock solo usa esos dos. |
| El detalle inventado para los 7 niños puede quedar inconsistente con la lista | El listado deriva todo (edad, conteo de padres, badge) de los mismos campos. |
| `redirect()` en un page con `cacheComponents`/params async | Usar `PageProps<'/kids/[slug]'>` con `await params` y `redirect` de `next/navigation`; verificar con build. |
| Layout a 2 columnas se rompe en móvil | `flex-wrap` + `min-w-[300px]` como el template; verificación Playwright < 768px. |

## What is **not** in this spec

- Persistencia, base de datos y autenticación.
- Funcionalidad del buscador.
- Las pantallas `agregar-nino`, `resumen-dia`, `vincular-padre`, `avisos`, `mi-cuenta`, `crear-publicacion`, `detalle-publicacion`, `login`.
- Editar un niño, vincular padres o subir fotos de verdad.
- Agrupar la lista en varios grupos por sala.

Cada uno de esos puntos, si llega, va en su propio spec.
