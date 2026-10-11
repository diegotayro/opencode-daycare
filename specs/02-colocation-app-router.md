# SPEC 02 — Colocation en `app/` (sin `src/`) y feed en `/feed`

> **Status:** Implemented
> **Depends on:** SPEC 01
> **Date:** 2026-10-11
> **Objective:** Sacar `src/`, colocar las features dentro de `app/` con carpetas privadas, llevar el feed a `/feed`, dejar `/` con un `redirect("/feed")` y actualizar alias e imports, sin cambiar ningún diseño.

## Scope

**In:**

- Eliminar la carpeta `src/`. El código queda en `app/` (rutas + feature colocateada) y `shared/` en la raíz.
- Colocation del feed: `app/feed/` con `page.tsx` (fino) + `_components/` + `_data/`.
- `app/page.tsx` deja de renderizar el feed y pasa a ser `redirect("/feed")` (+ `export const instant = false` para silenciar el aviso de validación *instant* en dev; ver **Decisions**).
- `shared/` en la raíz, junto a `app/` (mover `src/shared/**`).
- Alias `@/*` pasa de `./src/*` a `./*` en `tsconfig.json`; reescribir los imports de SPEC 01.
- El feed conserva su diseño y comportamiento **idénticos**; solo cambian ubicación y URL.
- Este spec documenta los deltas sobre lo aprobado en SPEC 01.

**Out of scope (para futuros specs):**

- Componentes nuevos compartidos (`Avatar`, `Badge`, `Card`, `Button`, `PageHeader`).
- Refactor de `PostCard` (avatar) y reemplazo de `FeedHeader` por `PageHeader`.
- El sidebar route-aware con `usePathname` y la ruta `/kids` (todo eso va en SPEC 03).
- El dispatcher por rol en `/` (requiere autenticación, que no existe).
- Cualquier cambio visual.

## Data model

Esta feature no introduce estructuras de datos. Reusa `feed-mock.ts` de SPEC 01, que solo cambia de carpeta a `app/feed/_data/feed-mock.ts`.

## Estructura final

```
app/                            # raíz: rutas + feature colocateada
  layout.tsx
  page.tsx                      # `/`     → redirect("/feed") + instant = false
  globals.css
  favicon.ico
  feed/
    page.tsx                    # `/feed` → <FeedPage />
    _components/
      FeedPage.tsx
      PostCard.tsx
      ComposeBox.tsx
    _data/
      feed-mock.ts
shared/                         # reutilizable, junto a app/
  components/{Sidebar,Main,MobileNav}.tsx
  hooks/useScrollLock.ts
```

`src/` deja de existir.

## Implementation plan

1. **Mover `shared/`.** `git mv src/shared shared` y actualizar sus imports internos. Verificar: `npx tsc --noEmit`.
2. **Colocation del feed.** `git mv src/feed app/feed`; reubicar `FeedPage.tsx` y `components/*` en `app/feed/_components/` y `data/feed-mock.ts` en `app/feed/_data/`. Verificar: los archivos quedan solo ahí.
3. **Ruta `/feed`.** Crear `app/feed/page.tsx` (fino) que renderiza `<FeedPage />`; ajustar los imports internos del feed a relativos (`./PostCard`, `../_data/feed-mock`).
4. **Ruta `/` → redirect.** Reemplazar el contenido de `app/page.tsx` por `redirect("/feed")` (`next/navigation`) y añadir `export const instant = false` (opt-out de la validación *instant* en dev; ver **Decisions**). Verificar: entrar a `/` termina en `/feed`.
5. **Alias.** En `tsconfig.json`, cambiar `"@/*": ["./src/*"]` por `"@/*": ["./*"]`.
6. **Reescribir imports.** Todo `@/shared/...` sigue funcionando; cualquier `@/feed/...` pasa a relativo dentro de `app/feed/`. Verificar con `grep` que no queda ninguna referencia a `@/src` ni a `src/`.
7. **Limpiar.** Eliminar el `src/` vacío. Verificar: `ls` sin `src/`.
8. **Verificación.** `npx tsc --noEmit`, `npm run build`; Playwright: `/` redirige a `/feed`, `/feed` idéntico a `references/screenshots/feed.png`, y el drawer móvil sigue funcionando; screenshots en `.playwright-mcp/spec02/`.

## Acceptance criteria

- [ ] No existe la carpeta `src/` en el repo.
- [ ] Config e imports no quedan con referencias a `./src/*`.
- [ ] Entrar a `/` redirige a `/feed`.
- [ ] En `next dev`, `/` redirige a `/feed` **sin** el aviso `Could not validate 'instant'` (`export const instant = false` en `app/page.tsx`).
- [ ] `/feed` renderiza el feed idéntico a SPEC 01 (sidebar 248px, header, compose box, 3 posts): verificado vs `references/screenshots/feed.png`.
- [ ] `shared/` está en la raíz y `app/` contiene solo rutas + feature colocateada.
- [ ] `app/feed/_components/` y `app/feed/_data/` existen; el resto de `app/feed/` no tiene páginas extra.
- [ ] El alias `@/*` apunta a `./*` y `@/shared/...` resuelve.
- [ ] El drawer móvil sigue abriendo/cerrando tras el refactor.
- [ ] `npx tsc --noEmit` pasa y `npm run build` termina OK.
- [ ] `specs/01-feed-home.md` no fue modificado y SPEC 02 documenta todos los cambios sobre lo aprobado en SPEC 01.

## Cambios sobre lo aprobado en SPEC 01

`specs/01-feed-home.md` no se modifica. SPEC 02 cambia estos artefactos ya aprobados e implementados:

| Artefacto | En SPEC 01 | Cambio en SPEC 02 |
| --- | --- | --- |
| URL del feed | `/` | `/feed` |
| `app/page.tsx` | Renderiza `<FeedPage />` | `redirect("/feed")` |
| `app/page.tsx` (segment config) | — | `export const instant = false` (opt-out de la validación *instant* en dev) |
| Ubicación de la feature del feed | `src/feed/**` | `app/feed/_components` + `app/feed/_data` |
| `src/shared/**` | En `src/` | `shared/` en la raíz |
| Alias `@/*` | `./src/*` | `./*` |
| Carpeta `src/` | Existe | Se elimina |

Consecuencia sobre criterios de SPEC 01: donde decía "`/` muestra el feed" ahora aplica a `/feed`, y `/` pasa a redirigir. El resto (diseño, drawer, mock) se re-verifica sin cambios.

## Decisions

- **Yes:** colocation dentro de `app/` con carpetas privadas `_components`/`_data` (decisión del usuario), en vez de features en `src/`.
- **Yes:** eliminar `src/` y poner `shared/` en la raíz, junto a `app/`.
- **Yes:** el feed pasa a `/feed` y `/` queda con `redirect("/feed")` (futuro dispatcher por rol cuando exista auth).
- **Yes:** `export const instant = false` en `app/page.tsx`. El `redirect()` deliberado lanza `NEXT_REDIRECT` durante la validación *instant* de Cache Components y Next lo reporta como fallo de render (`Could not validate 'instant' because an error prevented the target segment from rendering`, falso positivo conocido: [vercel/next.js#98711](https://github.com/vercel/next.js/issues/98711)). Como `/` no tiene UI que validar (solo redirige), se excluye el segmento; es dev-only y no afecta al build ni al comportamiento del redirect.
- **Yes:** alias `@/*` → `./*`; dentro de cada carpeta de ruta, imports relativos.
- **No:** "hola mundo" en `/` (se prefirió el redirect, sin UI muerta).
- **No:** mover componentes, refactor de UI y sidebar en este spec (van en SPEC 03).
- **No:** el dispatcher por rol (necesita autenticación).

## Risks

| Riesgo | Mitigación |
| --- | --- |
| Cambiar el alias rompe imports de SPEC 01 | `grep` de `@/` y de `src/` antes y después; `npx tsc --noEmit` + `npm run build`. |
| `redirect()` en `/` con `cacheComponents` | Verificado: `/` da `307` → `/feed` (sin loop) y `npm run build` sale OK. Además, el `redirect()` dispara en dev el aviso `Could not validate 'instant'` (falso positivo de framework, vercel/next.js#98711); mitigado con `export const instant = false` en `app/page.tsx`. |
| Perder fidelidad visual del feed al moverlo | Solo cambian rutas de archivos; verificación vs `feed.png`. |
| Dejar `src/` a medias | Paso 7 dedicado a borrarlo; criterio de aceptación explícito. |

## What is **not** in this spec

- Componentes compartidos nuevos y su refactor (`PostCard`, `FeedHeader`).
- El sidebar route-aware y la ruta `/kids`.
- El dispatcher por rol en `/`.
- Cualquier cambio de diseño.

Cada uno de esos puntos, si llega, va en su propio spec.

## Nota de implementación

Delta posterior a la aprobación (surgido al implementar, 2026-10-11):

- **`export const instant = false` en `app/page.tsx`.** No formaba parte del plan original. Al levantar `next dev`, `/` redirigía bien (`307` → `/feed`) pero en cada request caliente el terminal y la consola del navegador mostraban:

  ```
  Error: Route "/": Could not validate 'instant' because an error prevented the target segment from rendering.
    [cause]: Error: NEXT_REDIRECT   at Home (app/page.tsx:4:11)
  ```

  Es un falso positivo de la validación *instant* de Cache Components (dev-only, `validationLevel: 'warning'`): `redirect()` lanza `NEXT_REDIRECT` durante la simulación de render y la validación no filtra los sentinelas del router ([vercel/next.js#98711](https://github.com/vercel/next.js/issues/98711), abierto). Se excluye el segmento con `instant = false`.

  - No afecta al build (`npm run build` OK) ni al runtime (`/` sigue dando `307` → `/feed`).
  - Se descartó mover el redirect a `next.config.ts` (`redirects()`): resolvería este caso, pero `/` será un dispatcher por rol con `redirect()` en render cuando exista auth, y el config no puede leer la sesión.
  - Verificado tras el cambio: `/` → `307` en 3 requests (fría + calientes) sin el aviso en terminal ni en consola (`next dev` y Playwright, 0 errores).
