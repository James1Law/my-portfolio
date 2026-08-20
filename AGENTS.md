# James Law Portfolio

Next.js 16 / React 19 / TypeScript / Tailwind 4 portfolio, deployed on Vercel.
British English throughout, in code comments and copy alike.

## Commands

```bash
npm run dev
npm run lint
npm run test:run
npm run build
```

All three of lint, test and build must pass before work is considered done.

## Architecture

The UI is an Aqua / classic Mac OS X desktop metaphor. Four layers, kept distinct:

- `src/components/aqua/` — visual primitives vendored from
  [Aqua](https://github.com/igorfelipeduca/aqua) (MIT). Treat as application
  source, but keep upstream styling intact; local changes carry a `FORK` comment.
  The registry host is unreachable from CI, so update by copying from upstream
  rather than running `npx shadcn add @aqua/<name>`.
- `src/components/desktop/` — the OS shell: window manager, menu bar, Dock.
  Client components.
- `src/components/apps/` — portfolio applications. Server-rendered where possible;
  interactive parts are small client islands.
- `src/lib/` — content (`data.ts`) and window configuration. `data.ts` is the
  source of truth for career facts and must not be altered casually.

`src/app/page.tsx` stays a server component: it renders app content and passes it
into the client shell, so portfolio copy is in the initial HTML.

See `docs/aqua-redesign-plan.md` for the full plan and the reasoning behind it.
