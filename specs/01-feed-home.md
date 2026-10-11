# SPEC 01 — Home `/` como feed de OpenDayCare (responsive, screaming architecture)

> **Status:** Approved
> **Depends on:** (ninguna)
> **Date:** 2026-10-10
> **Objective:** Replicar la plantilla `references/pantallas/feed.dc.html` como la ruta `/` de OpenDayCare —sin autenticación ni base de datos— con estilo idéntico al mockup en desktop, versión móvil responsive con menú deslizante, organizado con screaming architecture en `src/`.

## Scope

**In:**

- Ruta `/` con el layout completo del feed: sidebar + main con scroll.
- Shell (Sidebar, Main, MobileNav) compartido en el layout raíz (`app/layout.tsx`), reutilizable para futuras rutas.
- Screaming architecture: `src/feed/` para todo lo del feed (página, componentes y mock data) y `src/shared/` para lo reutilizable (`components/`, `hooks/`, `lib/`), con nombres de carpeta en inglés.
- `app/` en la raíz con rutas finas: `app/page.tsx` renderiza `FeedPage` desde `src/feed/`.
- Alias de imports `@/*` → `./src/*` en `tsconfig.json`.
- Componentes reutilizables: `Sidebar`, `SidebarContent`, `Main`, `MobileNav`, `ComposeBox`, `PostCard`, `FeedHeader`.
- Mock data en `src/feed/data/feed-mock.ts` que alimenta `PostCard`.
- Estilos del template convertidos a Tailwind v4 con valores arbitrarios exactos (hex/rgba del mockup).
- Fuentes Fredoka y Nunito self-hosted vía `next/font/google`.
- `lang="es"` y título/metadata "OpenDayCare" en el layout raíz.
- Enlaces laterales inertes (`href="#"`) mientras las otras páginas no existen.
- **Versión móvil responsive** (< 768px, breakpoint `md`):
  - Barra superior sticky: hamburguesa + marca "OpenDayCare / Sala Soles" (hardcodeada).
  - La hamburguesa abre un drawer fullscreen que se desliza de izquierda a derecha con el mismo contenido de la sidebar; el mismo botón lo cierra (queda por encima en z-index). Con el drawer abierto, el scroll del fondo queda bloqueado (`useScrollLock`).
  - El contenido del feed (saludo, compose box, posts) scrollea debajo de la barra.
- Desde 768px (md): sidebar fija de 248px + main, idéntico al mockup.

**Out of scope (para futuros specs):**

- Autenticación, login, sesiones y cierre de sesión.
- Base de datos o cualquier persistencia. Los datos del feed son mock estáticos.
- Las demás pantallas del mockup (`ninos`, `avisos`, `mi-cuenta`, `crear-publicacion`, `detalle-publicacion`, `login`, etc.).
- Navegación real entre rutas (los enlaces apuntan a `#`).
- Fotos reales / upload; el placeholder de foto se mantiene tal cual el template.
- Animaciones del drawer más allá del deslizamiento izquierda→derecha.
- Cierre del drawer con tecla Escape u otras mejoras de accesibilidad.

## Data model

Una única estructura de datos mock (sin DB). Los estilos de cada badge se derivan del tipo de post y se centralizan en un mapa constante. El drawer móvil usa estado local de cliente (`useState`); no introduce estructura de datos.

```ts
// src/feed/data/feed-mock.ts
// Valores internos en inglés (reglas de código); los labels visibles en español se centralizan en POST_TYPE_META.
export type PostType = "ACHIEVEMENT" | "ACTIVITY" | "ANNOUNCEMENT";

export interface FeedPost {
  id: string;
  type: PostType;
  author: {
    name: string;         // "Mateo" | "Anuncio general"
    avatar: {
      text?: string;      // "M" (letra inicial), se muestra en un círculo
      icon?: "megaphone"; // alternativa a text (ícono de altavoz)
      bg: string;         // "#A9D9E8" | "#CCD8F4"
      color: string;      // "#1F7A93" | "#4E72C8"
    };
  };
  time: string;          // "14:20" — hora de publicación
  publishedBy: string;   // "vos" → renderiza "publicado por vos"
  audience: string;      // "familia de Mateo" | "toda la sala" → renderiza "Para: …"
  body: string;
  image?: { caption: string }; // placeholder de foto, ej. "Foto · pintando con témperas"
  likes: number;
  comments: number;
}
```

Convenciones:

- **Badges:** `POST_TYPE_META` mapea `PostType` (inglés) → `{ label, dot, bg }` con los colores del template y el label en español tal como se ve en el mockup (ACHIEVEMENT → "LOGRO"; ACTIVITY → "ACTIVIDAD"; ANNOUNCEMENT → "ANUNCIO"). Colores: ACHIEVEMENT: `#3E9B6C`/`#CFEBD8`; ACTIVITY: `#2E89A6`/`#C7E7F1`; ANNOUNCEMENT: `#4E72C8`/`#CCD8F4`. La data solo guarda el tipo (inglés); el español vive únicamente en `POST_TYPE_META`.
- **Colores:** valores arbitrarios Tailwind con hex/rgba exactos del template (fondo `#F6ECDF`, tarjetas `#FFFDF9`, bordes `#ECE0D0`, texto `#3F362E`, sombras `0 4px 16px -12px rgba(120,90,60,.5)`, etc.).
- **Íconos:** SVGs inline copiados del template. No se agrega librería de iconos.
- **Tipografía:** Fredoka para marca, títulos, iniciales de avatar y nombres; Nunito para el resto.
- **Responsive:** clases `md:` para el umbral de 768px; el drawer usa posición `fixed` + `translate-x` para el deslizamiento.

## Estructura de carpetas

```
app/                      # App Router (rutas finas, convención Next)
  layout.tsx              # shell: Sidebar + MobileNav + Main; fuentes, lang, metadata
  page.tsx                # renderiza <FeedPage /> de @/feed
  globals.css             # Tailwind v4, fuentes, scrollbar del template
src/
  feed/                   # feature: home feed
    FeedPage.tsx          # ensambla la página del feed (contenedor 760px + todo)
    components/
      FeedHeader.tsx      # saludo "Buenas, Caro" (props eyebrow/title/subtitle)
      ComposeBox.tsx      # tarjeta "Compartí un momento…" (props placeholder/avatar/icon)
      PostCard.tsx        # post (recibe FeedPost)
    data/
      feed-mock.ts        # FeedPost, PostType, POST_TYPE_META, posts[]
  shared/                 # reutilizable entre features
    components/
      Sidebar.tsx         # aside 248px (desktop) + exporta SidebarContent
      Main.tsx            # <main> con scroll interno
      MobileNav.tsx       # cliente: barra sticky + drawer fullscreen
    hooks/
      useScrollLock.ts    # bloquea el scroll del body mientras el drawer está abierto
    lib/                  # reservado para utilidades puras compartidas (ej. cn) cuando surjan
```

## Implementation plan

1. **Fuentes y base tipográfica.** En `app/layout.tsx`: `Fredoka` y `Nunito` desde `next/font/google` (Nunito 400–800, Fredoka 400–700) con variables CSS `--font-fredoka`/`--font-nunito`; `lang="es"` y `title: "OpenDayCare"`. En `app/globals.css`: variables en `@theme`, `body` con fondo `#F6ECDF`, color `#3F362E`, familia Nunito y scrollbar del template. Verificar: `npm run dev` compila.
2. **Alias y estructura.** En `tsconfig.json`, cambiar `"@/*": ["./src/*"]`. Crear las carpetas de `src/feed/` y `src/shared/` con sus primeros archivos (pasos siguientes).
3. **`src/feed/data/feed-mock.ts`.** Tipos `FeedPost`/`PostType`, `POST_TYPE_META` y `posts[]` con los 3 posts del template (ACHIEVEMENT de Mateo 14:20 · 3👍/1💬; ACTIVITY con placeholder de foto 09:40 · 5👍/2💬; ANUNCIO general — ANNOUNCEMENT — 07:50 · 8👍/0💬).
4. **`src/shared/components/Main.tsx`.** `<main>` reutilizable `flex-1 min-w-0 min-h-0 overflow-y-auto` (scroll interno; en desktop equivale a `height:100vh;overflow-y:auto` del template).
5. **`src/shared/components/Sidebar.tsx`.** Aside de 248px (logo, "Nueva publicación", nav Feed activo/Niños/Avisos/Mi cuenta, bloque Caro Giménez + logout; enlaces `href="#"`). Exporta `SidebarContent` para reutilizarlo en el drawer.
6. **`src/shared/hooks/useScrollLock.ts`** y **`src/shared/components/MobileNav.tsx`** (cliente). Barra `md:hidden` sticky: hamburguesa + marca hardcodeada ("OpenDayCare / Sala Soles"). `useState` controla el drawer (`fixed inset-0 z-40`, `translate-x`, deslizamiento izquierda→derecha) que renderiza `SidebarContent`; la hamburguesa queda en `z-50` para cerrar con el mismo botón; `useScrollLock` bloquea el scroll mientras está abierto.
7. **`src/feed/components/`**: `FeedHeader.tsx` (props `eyebrow`/`title`/`subtitle`, margen inferior 24px), `ComposeBox.tsx` (props `placeholder`/`avatar`/`icon`, en `<a href="#">`) y `PostCard.tsx` (recibe `FeedPost`: avatar, nombre, hora + "publicado por…", badge por tipo, "Para: …", texto, foto opcional, fila de reacciones/Editar).
8. **`src/feed/FeedPage.tsx`.** Ensambla: contenedor centrado `max-width:760px` con padding `34px 40px 80px` (reductores en móvil si hace falta), `FeedHeader`, `ComposeBox` (avatar "C" `#F2937A`, frase "Compartí un momento…", ícono cámara), separador "PUBLICADO HOY" y `posts.map(...)` → `PostCard`.
9. **Rutas finas.** `app/page.tsx`: renderiza `<FeedPage />` desde `@/feed/FeedPage`. `app/layout.tsx`: contenedor `flex min-h-screen h-screen flex-col overflow-hidden md:flex-row bg-[#F6ECDF]` con `<Sidebar className="hidden md:flex" />`, `<MobileNav />` (`md:hidden`) y `<Main>{children}</Main>`; limpiar remanentes del scaffold (Geist). La barra móvil queda fuera del contenedor de scroll de `Main` (por eso permanece visible al hacer scroll).
10. **Verificación visual.** `npx tsc --noEmit` y `npm run build`; con Playwright: desktop comparando contra `references/screenshots/feed.png`, y móvil (<768px) abriendo/cerrando el drawer (screenshots en `.playwright-mcp/`).

## Acceptance criteria

- [ ] `npm run dev` levanta sin errores de consola y `/` muestra el feed.
- [ ] Desktop (≥768px): `/` es idéntico a `references/screenshots/feed.png` (sidebar 248px, header, compose box, 3 posts con badges y contadores, colores y tipografía).
- [ ] `app/page.tsx` es una ruta fina que solo renderiza `FeedPage` de `src/feed/`.
- [ ] Los componentes del feed viven en `src/feed/components` y la mock data en `src/feed/data/feed-mock.ts`.
- [ ] El shell (Sidebar, Main, MobileNav) y `useScrollLock` viven en `src/shared/` y se comparten entre rutas.
- [ ] Los imports usan el alias `@/*` apuntando a `./src/*`.
- [ ] Los 3 posts se renderizan desde la mock data usando únicamente `PostCard`.
- [ ] `ComposeBox` acepta `placeholder`, `avatar` e `icon`; `FeedHeader` acepta `eyebrow`, `title` y `subtitle`.
- [ ] Móvil (<768px): la sidebar no se muestra; aparece la barra sticky con hamburguesa + marca "OpenDayCare / Sala Soles".
- [ ] La hamburguesa abre el drawer fullscreen deslizándose de izquierda a derecha con el mismo contenido de la sidebar; el mismo botón lo cierra; con el drawer abierto el fondo no scrollea.
- [ ] Los enlaces laterales usan `href="#"` y no rompen la navegación.
- [ ] `npx tsc --noEmit` pasa sin errores y `npm run build` termina OK.
- [ ] `lang="es"` y título "OpenDayCare" en el layout raíz.

## Decisions

- **Yes:** screaming architecture con `src/<feature>/` + `src/shared/` (decisión del usuario), con nombres de carpeta en inglés.
- **Yes:** `app/` en la raíz con rutas finas que importan desde `src/`; no se mueve el router a `src/app/`.
- **Yes:** alias `@/*` → `./src/*` para imports limpios (`@/feed/...`, `@/shared/...`).
- **Yes:** shell (Sidebar, SidebarContent, Main, MobileNav) y `useScrollLock` en `shared`; lo específico del feed (FeedPage, FeedHeader, ComposeBox, PostCard, mock data) en `src/feed/`.
- **Yes:** `src/shared/lib/` definido para utilidades puras compartidas (p. ej. `cn`) cuando surjan; no se crean carpetas vacías de más.
- **Yes:** responsive dentro de esta spec, con drawer fullscreen deslizante, hamburguesa por encima (z-index) para cerrar y scroll bloqueado al abrir.
- **Yes:** `FeedHeader` como componente reutilizable dentro del main en ambas vistas — no en el encabezado móvil (aclarado en preguntas).
- **Yes:** breakpoint `md` (768px); la barra móvil queda fija estructuralmente por estar fuera del contenedor de scroll del `Main`.
- **Yes:** Tailwind v4 con valores arbitrarios exactos; `next/font/google` para Fredoka/Nunito; mock data alimentando `PostCard`; enlaces inertes (`#`); SVGs inline sin librería.
- **Yes:** valores internos de `PostType` en inglés (`ACHIEVEMENT` / `ACTIVITY` / `ANNOUNCEMENT`); los labels visibles de los badges quedan en español ("LOGRO" / "ACTIVIDAD" / "ANUNCIO", como en el template) vía `POST_TYPE_META`. Reglas de código: identificadores en inglés, UI en español.
- **No:** estilos inline tal cual; base de datos; autenticación; resto de pantallas; `src/app/`; responsive quedaba fuera del scope inicial (corregido).

## Risks

| Riesgo | Mitigación |
| --- | --- |
| Cambiar el alias `@/*` rompe imports existentes | Verificar con grep que ningún archivo usa `@/` hacia la raíz antes de cambiarlo (hoy solo hay imports relativos). |
| La conversión manual a Tailwind se desvía de los valores del template | Solo valores arbitrarios con hex/rgba exactos; verificación por screenshot contra `feed.png`. |
| Faltar pesos de fuente cambia el grosor del texto | Cargar en `next/font` los pesos usados (Nunito 400–800, Fredoka 400–700). |
| La hamburguesa queda tapada por el drawer o el fondo scrollea con el drawer abierto | Z-index de la hamburguesa por encima del drawer y `useScrollLock`; verificado en Playwright móvil. |
| Doble scrollbar en móvil (body + main) | Contenedor `h-screen overflow-hidden flex-col`; solo `Main` scrollea. |
| Screaming arch vs App Router: las páginas deben seguir en `app/` | Patrón de ruta fina: `app/page.tsx` solo renderiza el componente de la feature. |

## What is **not** in this spec

- Autenticación, login y cierre de sesión.
- Base de datos o persistencia.
- Las demás pantallas del mockup (niños, avisos, mi cuenta, crear publicación, detalle, login…).
- Navegación real entre rutas (enlaces a `#`).
- Fotos reales / upload.
- Animaciones del drawer más allá del deslizamiento izquierda→derecha.
- Cierre del drawer con tecla Escape u otras mejoras de accesibilidad.
- Migrar el router a `src/app/`.

Cada uno de esos puntos, si llega, va en su propio spec.