<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Ignore routine debugging and unverified changes. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Keep a qualifying candidate through the reporting pass even if you resolve or work around it. A successful fix changes the report outcome; it does not erase the friction that qualified it.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `node node_modules/next/dist/bin/next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->

## Project

OpenDayCare — a daycare (guardería) app for staff and families, with a Spanish UI. It is still the `create-next-app` scaffold; app code lives in `app/` (App Router). `references/pantallas/*.dc.html` are the interactive design mockups (Spanish, the real source of truth for UI) and `references/screenshots/*.png` are captures. Treat `references/` as read-only design source, not app code (`references/pantallas/support.js` is generated and says "do not edit").

## Stack gotchas

- Next.js 16.4 (App Router) + React 19.3 + TypeScript (`strict`). Turbopack is the default bundler.
- `next.config.ts` enables `cacheComponents: true` and `partialPrefetching: true`. These change caching and `<Link>` prefetch behavior versus older Next — read the bundled docs first (see the block at the top).
- Route props are async and globally typed: use `PageProps<'/route'>`, `LayoutProps<'/route'>`, `RouteContext<'/route'>` (generated in `.next/dev/types/routes.d.ts`); `params`/`searchParams` are Promises. Do not hand-write `{ params: { id: string } }`.
- Tailwind v4 is wired only through the `@tailwindcss/turbopack` rule in `next.config.ts` plus `@import "tailwindcss"` in `app/globals.css`. There is no `postcss.config.*` — don't add one.

## Commands

- `npm run dev` — dev server (Turbopack), http://localhost:3000
- `npm run build` / `npm run start`
- `npm run lint` — ESLint flat config
- `npx tsc --noEmit` — typecheck (no npm script exists for it)

No test runner is configured. `npm run lint` currently fails with 2 errors from the generated `references/pantallas/support.js`; that is design-tool output, not app code — don't "fix" it.

## Spec workflow

`.agents/skills/spec` and `.agents/skills/spec-impl` (locked in `skills-lock.json`) drive a spec-driven flow; specs go in `specs/` (not created yet). `/spec` designs one, `/spec-impl <NN-slug>` only proceeds when the spec status means "Approved" (any language) and then branches to `spec-NN-slug`. Branch auto-creation is controlled by `specs/.spec-config.yml` (`AutoCreateBranch`, default `true`). Neither skill writes code until approved.

## Spec verification

- `.opencode/agents/spec-verifier.md` (project agent, `mode: all`) verifies a spec's acceptance criteria: static code checks, Next.js conventions (via Context7) and UI/behavior (via the Playwright MCP).
- It marks the checklist with evidence, fixes code that fails verification, and never changes the spec `Status`.
- Run it with `/verify-spec <NN-slug>` or select the agent directly.
- It runs on `opencode/big-pickle` (no vision): pixel-level fidelity against `references/screenshots/*.png` is **not** verified by it — it leaves a "⚠️ Revisión visual manual requerida" block listing the captures to review by hand. Structural comparisons are done against `references/pantallas/*.dc.html` plus computed styles.
- Evidence artifacts follow the same `.playwright-mcp/specNN/` conventions as the rest of the project.

## MCPs & tooling conventions

- Playwright output (screenshots, console logs, snapshots) goes in `.playwright-mcp/` (gitignored); the server is configured in `opencode.json`. Group it by spec and step, mirroring the per-step commits:
  - One folder per spec: `.playwright-mcp/specNN/` (e.g. `.playwright-mcp/spec01/`).
  - Inside a spec folder, one subfolder per step/commit that produced output, named after the commit: `.playwright-mcp/specNN/pasoN/` (e.g. `spec01/paso10/`).
  - If all files were created in the latest step (i.e. only one step has output), skip the `pasoN` subfolder and put them directly in `.playwright-mcp/specNN/`.
  - Files created before any spec existed stay in the root of `.playwright-mcp/`.
- Use the Context7 MCP for up-to-date framework documentation.
- `next-env.d.ts` is generated and gitignored; don't edit it.

## Reglas de codigo

- Usar codigo limpio, nombres, funciones, variables, etc en ingles.