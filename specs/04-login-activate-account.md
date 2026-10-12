# Spec 04: Páginas Login y Activar Cuenta (Solo Diseño)

## Información General

- **Número**: 04
- **Slug**: 04-login-activate-account
- **Título**: Login y Activar Cuenta (Maquetado estático)
- **Estado**: Implemented
- **Prioridad**: Alta
- **Tipo**: UI/Design

## Objetivo

Recrear fielmente el diseño de `references/pantallas/login.dc.html` y `references/pantallas/activar-cuenta.dc.html`, respetando el comportamiento responsive solicitado. Solo se enfocará en la parte de diseño. Lógica, validaciones, estado, base de datos, autenticación, conexiones y demás quedan fuera del scope.

Ambas páginas son pantallas de acceso: se muestran **sin el sidebar menu** de la app (ni el sidebar de escritorio ni el drawer mobile). No deben incluir el shell de navegación (menú lateral / nav), solo el contenido de cada pantalla.

## Alcance

**Incluido:**
- Maquetado estático de las páginas `/login` y `/activate-account`
- Estructura HTML/CSS utilizando Tailwind CSS v4
- Tipografías Fredoka y Nunito
- Comportamiento responsive mobile-first según lo especificado
- Colores, espaciados, bordes, sombras y decoración tal cual los mocks
- Ambas páginas **sin sidebar menu**: `/login` y `/activate-account` no renderizan el `Sidebar` ni el `MobileNav` de la app
- Reubicación mínima de layouts mediante route groups para aislar el shell de navegación de las páginas de acceso (ver *Notas Técnicas*)

**Excluido:**
- Lógica de formularios (`onSubmit`, `onChange`, validaciones)
- Manejo de estado o datos
- Autenticación, autorización o llamadas a API
- Base de datos, cookies o almacenamiento
- Navegación con comportamiento dinámico
- Cualquier funcionalidad interactiva

## Rutas a Crear

```text
app/
├── layout.tsx                 # root layout mínimo: <html>/<body>, fuentes y globals
├── (app)/
│   ├── layout.tsx             # shell de la app: Sidebar + MobileNav + Main
│   ├── feed/                  # se mueve desde app/feed (URL /feed sin cambios)
│   └── kids/                  # se mueve desde app/kids (URL /kids sin cambios)
└── (auth)/
    ├── layout.tsx             # SIN Sidebar ni MobileNav
    ├── login/
    │   └── page.tsx           # URL /login
    └── activate-account/
        └── page.tsx           # URL /activate-account
```

Ambas páginas deben ser **Server Components** (por defecto). No utilizar `"use client"` a menos que resulte estrictamente necesario para un detalle puramente visual.

El route group `(auth)` es **solo organizativo**: no altera las URLs (`/login` y `/activate-account` se sirven igual). Su función es agrupar las páginas de acceso bajo un layout propio que **no** incluye el shell de navegación.

## Plan de Implementación

1. **Reestructura de route groups (shell).** Dejar `app/layout.tsx` como root layout mínimo (`<html>`, `<body>`, fuentes y `globals.css`, sin `Sidebar`/`MobileNav`/`Main`); crear `app/(app)/layout.tsx` con el shell (`Sidebar` + `MobileNav` + `Main`); mover `app/feed/` → `app/(app)/feed/` y `app/kids/` → `app/(app)/kids/` (`git mv`, sin cambio de URL); crear `app/(auth)/layout.tsx` que solo renderiza `{children}`. Verificar: `npx tsc --noEmit`; `/feed` y `/kids` conservan URL y diseño; `/login` y `/activate-account` no muestran sidebar.
2. **Página Login** (`app/(auth)/login/page.tsx`, Server Component). Desktop `lg:grid lg:grid-cols-[1.05fr_1fr]` con panel de gradiente a la izquierda y formulario a la derecha; mobile `flex flex-col` con la franja superior (panel) y el formulario debajo; sin bloque "Ingreso como"; formulario `max-w-[392px]` con labels, inputs, link "¿Olvidaste tu contraseña?", botón primario y link a `/activate-account`. Verificar: criterios de la sección 1 (login) y responsive (mobile + `lg`).
3. **Página Activar cuenta** (`app/(auth)/activate-account/page.tsx`, Server Component). Contenedor `min-h-screen` centrado con fondo `#FBF4EC`; card `max-w-[440px] w-full`; ícono circular 58×58 `mx-auto lg:mx-0`; pill de invitación; campos con valores del mock; checkbox de autorización; botón primario y link a `/login`. Verificar: criterios de la sección 2 (activate-account) y responsive.

## Criterios de Aceptación

### 1. Página Login (`/login`)

- [x] Existe el archivo `app/(auth)/login/page.tsx` como Server Component. — Evidencia: `app/(auth)/login/page.tsx:1-4`; `grep "use client" app/(auth)` → 0 resultados; `npx tsc --noEmit` sin errores.
- [x] **Sin sidebar menu**: la página `/login` **no renderiza** el `Sidebar` ni el `MobileNav` (ni el menú lateral de escritorio ni el drawer mobile) en ninguna resolución. — Evidencia: Playwright en 1440×900 y 390×844 → `aside=0`, `header=0`, `nav=0`, sin botón "Abrir menú" ni drawer `position:fixed`; `/login` solo aplica `app/(auth)/layout.tsx:4-6` (`{children}`).
- [x] **Desktop (lg+)**: Layout en 2 columnas (`lg:grid lg:grid-cols-[1.05fr_1fr]`). Columna izquierda con panel de gradiente naranja, círculos decorativos, logo, headline, subtítulo y pie "Guardería Sala Soles". Columna derecha con formulario "Iniciar sesión". — Evidencia: 1440×900 → `main { display:grid, grid-template-columns: 737.5px 702.45px }` (ratio 1.05:1); panel con logo (Fredoka 600 21px), h1 42px/47.04px, subtítulo 17px/27.2px/max 430px y pie "🌿 Guardería Sala Soles"; columna derecha con h2 "Iniciar sesión" (Fredoka 600 30px).
- [x] **Mobile**: Layout apilado verticalmente (`flex flex-col`). El panel izquierdo pasa a ser una **franja horizontal en la parte superior** con menor padding/altura. Debajo de esta franja aparece **todo el formulario** de "Iniciar sesión". — Evidencia: 390×844 → `main { display:flex, flex-direction:column }`; panel = franja de 390×142px con `padding:24px` (vs 56px/60px en lg); el formulario arranca exactamente al terminar la franja (`form.top=142 = panel.bottom`), con h2, 2 inputs, botón y link visibles.
- [x] **Bloque "Ingreso como"**: Está **completamente eliminado**. No debe maquetarse (ni botones Personal/Familia, ni su label). — Evidencia: `document.body.innerText` no contiene "INGRESO COMO" ni "Personal"/"Familia" (1440×900 y 390×844).
- [x] Fondo general es `#FBF4EC`. — Evidencia: `main` → `background-color: rgb(251, 244, 236)`.
- [x] Panel izquierdo utiliza gradiente `linear-gradient(155deg, #F6A98E 0%, #F2937A 45%, #EC7E62 100%)` aplicado con Tailwind (`bg-gradient-to-br from-[#F6A98E] via-[#F2937A] to-[#EC7E62]`). — Evidencia: `app/(auth)/login/page.tsx:8` usa exactamente `bg-gradient-to-br from-[#F6A98E] via-[#F2937A] to-[#EC7E62]`; computed `linear-gradient(to bottom right in oklab, rgb(246,169,142) 0%, rgb(242,147,122) 50%, rgb(236,126,98) 100%)` = los 3 HEX exactos. Ver nota de ángulo en *Revisión visual manual*.
- [x] Círculos decorativos son absolutos, con `pointer-events-none select-none` y escalan correctamente en mobile (`scale-75 sm:scale-90 lg:scale-100`) sin desbordar. — Evidencia: 2 divs `aria-hidden` absolutos de 420×420 y 300×300 con `pointer-events:none`, `user-select:none`; `scale` computado = **0.75** (390px, rect 315px) / **0.9** (768px, rect 378px) / **1** (1440px); panel con `overflow:hidden` y `document.documentElement.scrollWidth == innerWidth` en los 3 breakpoints (sin desborde).
- [x] Logo "OpenDayCare" con tipografía Fredoka (600) y ícono de sol presente. — Evidencia: `font-family: Fredoka`, `font-weight:600`, 21px, `letter-spacing:0.5px`; `<SunIcon>` (svg sol 26×26) en `app/(auth)/login/page.tsx:110-124`.
- [x] Headline "El día de cada niño, compartido con su familia." y subtítulo descriptivo presentes con estilos del mock. — Evidencia: `app/(auth)/login/page.tsx:29-38`; computed 42px / `line-height:47.04px` / 600 / #fff y subtítulo 17px / 27.2px / max 430px — idénticos al mock (`references/pantallas/login.dc.html:36-37`). Nota: ocultos en mobile (`hidden lg:block`), ver *Revisión visual manual*.
- [x] Formulario centrado con ancho máximo `392px`. — Evidencia: contenedor con `max-width:392px` y ancho renderizado 392px; mock `login.dc.html:43` → `max-width:392px`.
- [x] Labels "EMAIL" y "CONTRASEÑA" con mayúsculas, tracking y peso 700. — Evidencia: ambos labels 12px, `font-weight:700`, `letter-spacing:0.7px`, `color: rgb(148,136,123)` (#94887B) — idénticos al mock.
- [x] Inputs con bordes `#EADFD0`, redondeados `14px`, fondo blanco y tipografía correcta. — Evidencia: `border-color: rgb(234,223,208)` (#EADFD0), `border-radius:14px`, `background: rgb(255,255,255)`, 15px `Nunito`; la clase declara `border-[1.5px]` = mock (el navegador usa 1px al redondear a píxel entero, verificado con una sonda de control).
- [x] Link "¿Olvidaste tu contraseña?" visible con color `#C5503A` (solo maquetado, sin funcionalidad). — Evidencia: `color: rgb(197,80,58)` (#C5503A), `font-weight:700`, 13.5px; elemento `<span>` sin handler (`app/(auth)/login/page.tsx:82-86`).
- [x] Botón primario "Iniciar sesión" con gradiente vertical `#F4977E → #EE8164`, texto blanco, peso 800, bordes redondeados `15px` y sombra `0 10px 22px -8px rgba(238,129,100,0.7)`. — Evidencia: `linear-gradient(rgb(244,151,126), rgb(238,129,100))`, `color:#fff`, `font-weight:800`, `border-radius:15px`, `box-shadow: rgba(238,129,100,0.7) 0px 10px 22px -8px` — idéntico al mock.
- [x] Texto "¿Te invitó la guardería?" con link **"Activá tu cuenta"** apuntando a **`/activate-account`**. — Evidencia: `<a href="/activate-account">Activá tu cuenta</a>` (`app/(auth)/login/page.tsx:97-102`), `next/link` inspeccionado en DOM.
- [x] Tipografías: Fredoka para logo/headings, Nunito para cuerpo (pesos 400–800 según mock). — Evidencia: `document.fonts.check` → Fredoka 600 y Nunito 400/700/800 OK; `body` font-family `Nunito`, headings/logo/código `Fredoka`; cargadas con `next/font/google` en `app/layout.tsx:5-15`.

### 2. Página Activar cuenta (`/activate-account`)

- [x] Existe el archivo `app/(auth)/activate-account/page.tsx` como Server Component. — Evidencia: `app/(auth)/activate-account/page.tsx:1-4`; sin `"use client"`; `npx tsc --noEmit` sin errores.
- [x] **Sin sidebar menu**: la página `/activate-account` **no renderiza** el `Sidebar` ni el `MobileNav` (ni el menú lateral de escritorio ni el drawer mobile) en ninguna resolución. — Evidencia: 1440×900 y 390×844 → `aside=0`, `header=0`, `nav=0`, sin hamburguesa.
- [x] **Contenedor**: Centrado vertical y horizontalmente, ocupa `min-h-screen` con fondo `#FBF4EC` y padding responsive. — Evidencia: `display:flex; align-items:center; justify-content:center; min-height:900px` (=viewport), `background: rgb(251,244,236)`; padding `40px` en lg y `40px 16px` en mobile.
- [x] **Card**: Ancho máximo `440px`, `w-full`. — Evidencia: `max-width:440px`, ancho 440px en desktop y 348px en mobile (390 − 2×16 de padding).
- [x] **Ícono circular superior**: Tamaño 58x58, gradiente `#F8C3A8 → #F2937A`, sombra `0 12px 26px -10px rgba(238,129,100,0.65)`. — Evidencia: 58×58, radio 18px, `linear-gradient(155deg, rgb(248,195,168), rgb(242,147,122))`, `box-shadow: rgba(238,129,100,0.65) 0px 12px 26px -10px` — idéntico al mock.
- [x] **Alineación del ícono**: En **mobile** debe estar **centrado** (`mx-auto`). En **desktop (lg+)** debe estar **alineado a la izquierda** (`lg:mx-0`). — Evidencia: mobile → `margin-left/right: 145px` y centro del ícono (190) = centro del card (190); desktop → `margin-left: 0` y borde izquierdo del ícono (500) = borde izquierdo del card (500).
- [x] **Formulario ocupa toda la pantalla en mobile**: El contenedor permite que el card ocupe el ancho disponible con padding adecuado (`px-4 sm:px-6 lg:px-10`) para lograr este comportamiento. — Evidencia: `app/(auth)/activate-account/page.tsx:6` con `px-4 py-10 sm:px-6 lg:px-10`; mobile `padding:40px 16px` y card 348px sin scroll horizontal (`scrollWidth == innerWidth`).
- [x] Título "Bienvenida a OpenDayCare" con tipografía Fredoka (600). — Evidencia: `font-family: Fredoka`, `font-weight:600`, 32px, `line-height:36.8px`, #3F362E — idéntico al mock.
- [x] Subtítulo "Te invitaron a seguir el día de tu hijo..." presente con color `#94887B`. — Evidencia: `color: rgb(148,136,123)`, 15.5px, `line-height:24.025px` — idéntico al mock.
- [x] Pill de invitación con avatar circular "M" (color `#A9D9E8`, texto `#1F7A93`), texto "Te invitaron a seguir a Mateo · Sala Soles". — Evidencia: avatar 44×44, `background: rgb(169,217,232)` (#A9D9E8), `color: rgb(31,122,147)` (#1F7A93), Fredoka 600 19px, contenido "M"; texts internos "Te invitaron a seguir a" / "Mateo · Sala Soles"; wrapper borde #EADFD0, radio 16px, fondo blanco.
- [x] Campo "Código de invitación": Valor mostrado `7K4P9`, con `tracking-[3px]`, peso 700, tipografía Fredoka y tamaño acorde al mock. — Evidencia: `value="7K4P9"`, `letter-spacing:3px`, `font-weight:700`, `font-family: Fredoka`, 18px — idéntico al mock.
- [x] Campo "Email": Valor mostrado `lucia.fernandez@gmail.com`, tipo email. — Evidencia: `type="email"`, `value="lucia.fernandez@gmail.com"`.
- [x] Campo "Crear contraseña": Valor mostrado `contraseña`, tipo password, con borde resaltado `#F2A78E`. — Evidencia: `type="password"`, `value="contraseña"`, `border-color: rgb(242,167,142)` (#F2A78E).
- [x] Checkbox de autorización: Pill con fondo `#FBF1D6`, check verde `#5FB97E`, texto "Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app." con color `#8A7234`. — Evidencia: pill `background: rgb(251,241,214)` (#FBF1D6) radio 14px; check 24×24 `rgb(95,185,126)` (#5FB97E) radio 8px con svg de tilde blanco; texto 14px `color: rgb(138,114,52)` (#8A7234) — idéntico al mock.
- [x] Botón primario "Activar mi cuenta" con mismo gradiente vertical `#F4977E → #EE8164`, sombra `0 10px 22px -8px rgba(238,129,100,0.7)`. — Evidencia: `linear-gradient(rgb(244,151,126), rgb(238,129,100))`, radio 15px, peso 800, `box-shadow rgba(238,129,100,0.7) 0px 10px 22px -8px` — idéntico al mock.
- [x] Texto "¿Ya tenés cuenta?" con link **"Iniciar sesión"** apuntando a **`/login`**. — Evidencia: `<a href="/login">Iniciar sesión</a>` (`app/(auth)/activate-account/page.tsx:109`).
- [x] Todos los textos de la UI permanecen en **español**. — Evidencia: `innerText` de ambas páginas en español (incluidos labels y mensajes de error nativos del navegador).
- [x] Código limpio, nombres de clases/archivos en **inglés**. — Evidencia: `LoginPage`, `ActivateAccountPage`, `AppLayout`, `AuthLayout`, `SunIcon`; carpetas `login/`, `activate-account/`; cero identificadores de código en español.

### 3. Común a ambas páginas (sin sidebar menu)

- [x] `app/layout.tsx` queda como **root layout mínimo** (`<html>`, `<body>`, fuentes y `globals.css`) **sin** `Sidebar`, `MobileNav` ni `Main`. — Evidencia: `app/layout.tsx:22-31` solo `<html lang="es">` con las 2 variables de fuente + `<body>{children}</body>`; `grep -n "Sidebar\|MobileNav" app/layout.tsx` → 0 resultados.
- [x] El shell de la app (`Sidebar` + `MobileNav` + `Main`) vive en `app/(app)/layout.tsx` y solo lo reciben las rutas dentro de `(app)` (`/feed`, `/kids`). — Evidencia: `app/(app)/layout.tsx:1-14` importa y renderiza `Sidebar`, `MobileNav` y `Main`; `app/feed/` y `app/kids/` ya no existen (movidos por `git mv` a `app/(app)/`).
- [x] Existe `app/(auth)/layout.tsx` que renderiza **únicamente** `{children}`, sin `Sidebar` ni `MobileNav`. — Evidencia: `app/(auth)/layout.tsx:4-6` → `return <>{children}</>`.
- [x] `/login` y `/activate-account` conservan su URL (el route group no la modifica) y **no** muestran sidebar menu ni drawer mobile, en ninguna resolución. — Evidencia: HTTP 200 en `http://localhost:3000/login` y `/activate-account`; `location.pathname` = `/login` y `/activate-account`; `aside/header/nav = 0` en 1440×900 y 390×844. Convención validada con Context7 (`/vercel/next.js` → *Route groups*: "the folder is for organizational purposes and should **not be included** in the route's URL path" / "Opting specific route segments into sharing a layout, while keeping others out").
- [x] `/feed` y `/kids` conservan URL, diseño y comportamiento (los route groups no cambian las URLs); los criterios de SPEC 01/02/03 siguen pasando. — Evidencia: `/feed` y `/kids` responden 200 con la misma URL; en desktop `aside` de 248px visible + `header` oculto, en mobile `aside` oculto + `header` visible con hamburguesa; contenido intacto ("Buenas, Caro" / "Niños", 12 niños / 8 niños) y 0 errores de consola. El `git show` del commit `eebc7b0` muestra los 17 archivos movidos con **100% similarity** (renames puros, 0 inserciones/borrados), por lo que el diseño/comportamiento interno no cambió. *(Alcance: smoke-check de shell/URL/contenido; no re-ejecuta la verificación completa de SPEC 01/02/03.)*

## Diseño y Estilos

### Paleta de Colores (Valores exactos)

| Uso | Color HEX |
|---|---|
| Fondo general | `#FBF4EC` |
| Gradiente Login (inicio) | `#F6A98E` |
| Gradiente Login (medio) | `#F2937A` |
| Gradiente Login (fin) | `#EC7E62` |
| Botón primario (inicio) | `#F4977E` |
| Botón primario (fin) | `#EE8164` |
| Bordes/Inputs | `#EADFD0` |
| Texto principal | `#3F362E` |
| Texto secundario | `#94887B` |
| Links/CTA destacado | `#C5503A` |
| Fondo checkbox | `#FBF1D6` |
| Texto checkbox | `#8A7234` |
| Check verde | `#5FB97E` |
| Avatar invitación bg | `#A9D9E8` |
| Avatar invitación texto | `#1F7A93` |
| Input contraseña resaltado | `#F2A78E` |

### Tipografías

- **Fredoka**: Para logo, headings (h1, h2), código de invitación y elementos destacados. Peso utilizado: `600` (y 700 para código).
- **Nunito**: Para body, labels, inputs, botones, párrafos. Pesos utilizados: `400, 500, 600, 700, 800`.

### Breakpoints

- Mobile-first: estilos base para mobile.
- `sm`: Ajustes intermedios (tablets pequeñas).
- `lg`: Desktop (layout 2 columnas, alineaciones específicas).

## Notas Técnicas

- Utilizar **Tailwind CSS v4** únicamente. El proyecto ya cuenta con `@import "tailwindcss"` en `app/globals.css` y `@tailwindcss/turbopack` en `next.config.ts`. No agregar `postcss.config.*`.
- Cargar tipografías Google Fonts (Fredoka y Nunito) en cada página, o preferentemente mediante `next/font/google` en `app/layout.tsx` para optimización.
- Elementos decorativos (círculos absolutos) deben tener `pointer-events-none select-none` para evitar interferencias.
- Tratar `references/` como **solo lectura**. No copiar lógica JavaScript de los archivos `.dc.html` (incluyendo scripts de DC Logic). Solo extraer estructura visual, estilos y textos.
- Mantener código limpio en **inglés** (nombres de componentes, carpetas, clases si se extraen). La **UI debe permanecer en español** tal cual los mocks.
- Priorizar **fidelidad visual** respecto a `login.dc.html` y `activar-cuenta.dc.html`.
- **Sin sidebar menu (route groups)**: hoy `Sidebar`, `MobileNav` y `Main` viven en `app/layout.tsx` (root layout), que envuelve **todas** las rutas; un layout anidado no puede quitar la UI de un layout padre. Solución idiomática:
  - Dejar `app/layout.tsx` como **root layout mínimo**: solo `<html>`, `<body>`, las fuentes y `globals.css`.
  - Mover el shell de la app (`Sidebar` + `MobileNav` + `Main`) a un nuevo `app/(app)/layout.tsx`, y mover `/feed` y `/kids` dentro de `app/(app)/`.
  - Poner las páginas de acceso en `app/(auth)/` con un `app/(auth)/layout.tsx` que solo renderiza `{children}` (sin shell).
  - Los route groups no afectan la URL; se usan para "optar" unos segmentos a compartir un layout y dejar otros afuera. Referencia: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route-groups.md`.
  - No usar `usePathname()` en un cliente para ocultar el sidebar: se prefiere no introducir un límite cliente en el shell y omitir el DOM directamente (verificable).

## Referencias

- [login.dc.html](references/pantallas/login.dc.html)
- [activar-cuenta.dc.html](references/pantallas/activar-cuenta.dc.html)
- [Screenshots](references/screenshots/)

## Evidencia para Verificación

Al implementar, se deberá verificar contra los criterios listados arriba. La verificación visual final (pixel-perfect contra screenshots) queda como **revisión manual** tal como indica la configuración del proyecto.

## Estado de Implementación

- **Archivos a crear**: 3
  - `app/(auth)/layout.tsx`
  - `app/(auth)/login/page.tsx`
  - `app/(auth)/activate-account/page.tsx`
- **Archivos a crear (shell)**: 1
  - `app/(app)/layout.tsx` — shell de la app (`Sidebar` + `MobileNav` + `Main`)
- **Archivos a modificar**: 1
  - `app/layout.tsx` — pasa a root layout mínimo (se le quita el shell)
- **Archivos a mover** (sin cambio de URL ni de diseño):
  - `app/feed/` → `app/(app)/feed/`
  - `app/kids/` → `app/(app)/kids/`
- **Líneas estimadas**: ~200–250 total para las dos páginas (maquetado estático con Tailwind), más los tres layouts (root, `(app)` y `(auth)`)
- **Dependencias nuevas**: Ninguna