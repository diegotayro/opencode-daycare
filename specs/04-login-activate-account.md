# Spec 04: Páginas Login y Activar Cuenta (Solo Diseño)

## Información General

- **Número**: 04
- **Slug**: 04-login-activate-account
- **Título**: Login y Activar Cuenta (Maquetado estático)
- **Estado**: Approved
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

- [ ] Existe el archivo `app/(auth)/login/page.tsx` como Server Component.
- [ ] **Sin sidebar menu**: la página `/login` **no renderiza** el `Sidebar` ni el `MobileNav` (ni el menú lateral de escritorio ni el drawer mobile) en ninguna resolución.
- [ ] **Desktop (lg+)**: Layout en 2 columnas (`lg:grid lg:grid-cols-[1.05fr_1fr]`). Columna izquierda con panel de gradiente naranja, círculos decorativos, logo, headline, subtítulo y pie "Guardería Sala Soles". Columna derecha con formulario "Iniciar sesión".
- [ ] **Mobile**: Layout apilado verticalmente (`flex flex-col`). El panel izquierdo pasa a ser una **franja horizontal en la parte superior** con menor padding/altura. Debajo de esta franja aparece **todo el formulario** de "Iniciar sesión".
- [ ] **Bloque "Ingreso como"**: Está **completamente eliminado**. No debe maquetarse (ni botones Personal/Familia, ni su label).
- [ ] Fondo general es `#FBF4EC`.
- [ ] Panel izquierdo utiliza gradiente `linear-gradient(155deg, #F6A98E 0%, #F2937A 45%, #EC7E62 100%)` aplicado con Tailwind (`bg-gradient-to-br from-[#F6A98E] via-[#F2937A] to-[#EC7E62]`).
- [ ] Círculos decorativos son absolutos, con `pointer-events-none select-none` y escalan correctamente en mobile (`scale-75 sm:scale-90 lg:scale-100`) sin desbordar.
- [ ] Logo "OpenDayCare" con tipografía Fredoka (600) y ícono de sol presente.
- [ ] Headline "El día de cada niño, compartido con su familia." y subtítulo descriptivo presentes con estilos del mock.
- [ ] Formulario centrado con ancho máximo `392px`.
- [ ] Labels "EMAIL" y "CONTRASEÑA" con mayúsculas, tracking y peso 700.
- [ ] Inputs con bordes `#EADFD0`, redondeados `14px`, fondo blanco y tipografía correcta.
- [ ] Link "¿Olvidaste tu contraseña?" visible con color `#C5503A` (solo maquetado, sin funcionalidad).
- [ ] Botón primario "Iniciar sesión" con gradiente vertical `#F4977E → #EE8164`, texto blanco, peso 800, bordes redondeados `15px` y sombra `0 10px 22px -8px rgba(238,129,100,0.7)`.
- [ ] Texto "¿Te invitó la guardería?" con link **"Activá tu cuenta"** apuntando a **`/activate-account`**.
- [ ] Tipografías: Fredoka para logo/headings, Nunito para cuerpo (pesos 400–800 según mock).

### 2. Página Activar cuenta (`/activate-account`)

- [ ] Existe el archivo `app/(auth)/activate-account/page.tsx` como Server Component.
- [ ] **Sin sidebar menu**: la página `/activate-account` **no renderiza** el `Sidebar` ni el `MobileNav` (ni el menú lateral de escritorio ni el drawer mobile) en ninguna resolución.
- [ ] **Contenedor**: Centrado vertical y horizontalmente, ocupa `min-h-screen` con fondo `#FBF4EC` y padding responsive.
- [ ] **Card**: Ancho máximo `440px`, `w-full`.
- [ ] **Ícono circular superior**: Tamaño 58x58, gradiente `#F8C3A8 → #F2937A`, sombra `0 12px 26px -10px rgba(238,129,100,0.65)`.
- [ ] **Alineación del ícono**: En **mobile** debe estar **centrado** (`mx-auto`). En **desktop (lg+)** debe estar **alineado a la izquierda** (`lg:mx-0`).
- [ ] **Formulario ocupa toda la pantalla en mobile**: El contenedor permite que el card ocupe el ancho disponible con padding adecuado (`px-4 sm:px-6 lg:px-10`) para lograr este comportamiento.
- [ ] Título "Bienvenida a OpenDayCare" con tipografía Fredoka (600).
- [ ] Subtítulo "Te invitaron a seguir el día de tu hijo..." presente con color `#94887B`.
- [ ] Pill de invitación con avatar circular "M" (color `#A9D9E8`, texto `#1F7A93`), texto "Te invitaron a seguir a Mateo · Sala Soles".
- [ ] Campo "Código de invitación": Valor mostrado `7K4P9`, con `tracking-[3px]`, peso 700, tipografía Fredoka y tamaño acorde al mock.
- [ ] Campo "Email": Valor mostrado `lucia.fernandez@gmail.com`, tipo email.
- [ ] Campo "Crear contraseña": Valor mostrado `contraseña`, tipo password, con borde resaltado `#F2A78E`.
- [ ] Checkbox de autorización: Pill con fondo `#FBF1D6`, check verde `#5FB97E`, texto "Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app." con color `#8A7234`.
- [ ] Botón primario "Activar mi cuenta" con mismo gradiente vertical `#F4977E → #EE8164`, sombra `0 10px 22px -8px rgba(238,129,100,0.7)`.
- [ ] Texto "¿Ya tenés cuenta?" con link **"Iniciar sesión"** apuntando a **`/login`**.
- [ ] Todos los textos de la UI permanecen en **español**.
- [ ] Código limpio, nombres de clases/archivos en **inglés**.

### 3. Común a ambas páginas (sin sidebar menu)

- [ ] `app/layout.tsx` queda como **root layout mínimo** (`<html>`, `<body>`, fuentes y `globals.css`) **sin** `Sidebar`, `MobileNav` ni `Main`.
- [ ] El shell de la app (`Sidebar` + `MobileNav` + `Main`) vive en `app/(app)/layout.tsx` y solo lo reciben las rutas dentro de `(app)` (`/feed`, `/kids`).
- [ ] Existe `app/(auth)/layout.tsx` que renderiza **únicamente** `{children}`, sin `Sidebar` ni `MobileNav`.
- [ ] `/login` y `/activate-account` conservan su URL (el route group no la modifica) y **no** muestran sidebar menu ni drawer mobile, en ninguna resolución.
- [ ] `/feed` y `/kids` conservan URL, diseño y comportamiento (los route groups no cambian las URLs); los criterios de SPEC 01/02/03 siguen pasando.

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