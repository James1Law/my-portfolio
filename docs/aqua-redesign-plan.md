# Aqua Redesign — Implementation Plan

Companion to the PRD *"James Law Portfolio — Aqua / Classic Mac OS X Redesign"*.
Branch: `claude/aqua-retro-ui-plan-r689l4`

This plan records what the Aqua library actually provides, where that diverges from the
PRD's assumptions, and the concrete build order. It is written to be picked up by a
future session without re-doing the research.

---

## 1. What Aqua actually is (verified, not assumed)

Source: `github.com/igorfelipeduca/aqua` (MIT), registry at `https://aqua.duca.dev/r/{name}.json`,
26 items (1 theme + 25 UI components). Read the registry manifest and component sources directly.

Four findings materially change the shape of the work.

### 1.1 `Window` is cosmetic only — the window manager is entirely ours

`registry/aqua/ui/window.tsx` is 79 lines of styled `div`s: `Window`, `WindowTitlebar`,
`WindowTitle`, `WindowContent`, `TrafficLights`. There is no state, no drag, no resize, no
focus handling, and no close/minimise/zoom behaviour.

`TrafficLights` in particular is a single `div` rendering **three non-interactive `<span>`s**
with no props — no per-light handler, no `<button>`, no accessible name. It cannot satisfy
PRD §13 (close/minimise/zoom) or §30 ("Window controls have accessible labels").

**Decision:** fork `TrafficLights` into `WindowControls`, rendering three real `<button>`s with
`aria-label` of the form `Close Experience` / `Minimise Experience` / `Maximise Experience`,
keeping Aqua's gel gradients verbatim. Every behaviour in PRD §13 is our own code. This is the
"clear UX reason" exception in PRD §45.

### 1.2 `Dock` is hover-only and not keyboard reachable

`DockItem` is a `div`; its label is a `<span>` revealed by `opacity` on `group-hover`, so it
provides no accessible name and no keyboard affordance. The hover effect is self-lift and
scale — there is no neighbour magnification. It does already ship `motion-reduce:` variants.

**Decision:** fork `DockItem` to render a `<button>` with the label as always-present
`sr-only` text (visually revealed on hover/focus), a real `:focus-visible` ring, and the
running-indicator dot driven by our window state. Magnification is disabled under
`(hover: none)` per PRD §21.

### 1.3 The registry host is unreachable from this environment

`aqua.duca.dev` is blocked by the session's egress proxy, so
`npx shadcn@latest add @aqua/...` **cannot run here**. `raw.githubusercontent.com` is reachable.

**Decision:** vendor the needed components from the repo into `src/components/aqua/`, each file
carrying a provenance header (upstream path, commit, MIT notice). Still add a `components.json`
registering the `@aqua` namespace, so the CLI works for anyone running it locally and future
upstream diffs are easy to pull. End state is identical — Aqua is copy-into-source by design.

### 1.4 The theme is CSS variables only, and light-only

The `theme` item ships no component files. It sets `--aqua-accent: #2f7de0` plus six derived
vars (`--aqua-gel-hi/light/mid/deep`, `--aqua-edge`, `--aqua-ring`) computed with `color-mix`,
the shadcn semantic tokens (`background`, `foreground`, `card`, `primary`, `border`, `ring`, …)
for **light only**, and `font-sans: 'Lucida Grande', 'Lucida Sans Unicode', 'Helvetica Neue',
Verdana, sans-serif`.

That font stack and accent already match PRD §25/§26, so no invention needed. But the current
`src/app/globals.css` defines a bespoke dark-first token set (`--bg-primary`, `--accent`,
`--accent-purple`, …) that every existing component consumes. The two systems do not overlap;
this is a **replacement**, not a merge.

---

## 2. Current baseline

| Area | State |
|---|---|
| Framework | Next.js 16.2.1, React 19.2.4, TypeScript, Tailwind 4, Motion 12 |
| Content | `src/lib/data.ts` (212 lines) — already structured, already matches PRD §42 |
| Types | `src/lib/types.ts` — interfaces + type guards, keep |
| Sections | `Hero`, `About`, `Experience`, `Projects`, `Skills`, `Contact` (scrolling page) |
| Layout | `Header` (fixed nav + burger), `Footer`, `ThemeProvider`, `ThemeToggle` |
| Animations | `AnimatedText`, `CountUp`, `MouseGlow`, `ScrollReveal`, `TypewriterText` |
| Tests | 13 files — 10 component, 3 lib (`data`, `types`, `utils`) |
| SEO | `app/robots.ts`, `app/sitemap.ts`, metadata + Person JSON-LD in `page.tsx` |
| Radix | **none installed** — all Radix-backed Aqua components need new deps |

`src/lib/data.ts` is the single biggest asset here: the redesign is largely a new presentation
layer over data that is already in the right shape. PRD §35 (do not alter factual content) is
therefore cheap to honour — the data file should come out of this work almost untouched.

**Incidental defect:** `CLAUDE.md` is a single line, `@AGENTS.md`, and `AGENTS.md` does not
exist. Fix in Phase 1 by writing a real `AGENTS.md` covering the new architecture.

---

## 3. Decisions taken

1. **Dark mode is dropped.** Remove `next-themes`, `ThemeProvider`, `ThemeToggle` and
   `ThemeToggle.test.tsx`. One canonical Aqua light appearance. No invented dark palette.
2. **Delivery pauses after the OS shell.** Phases 1–2 ship first with placeholder app content
   for review of the *feel*; Phases 3–7 follow once the shell is agreed.
3. **Assets are hand-authored SVG/CSS.** Wallpaper as a CSS/SVG gradient-and-curves
   composition; Dock and project icons as inline SVG with gel gradients, recolourable from
   `--aqua-accent`. No binary assets in git — protects the PRD §34 Lighthouse targets.

---

## 4. Target architecture

```text
src/
  app/
    layout.tsx              # Aqua font stack, metadata, no ThemeProvider
    page.tsx                # SERVER component — renders app content, passes into Desktop
    globals.css             # Aqua theme vars + wallpaper + pinstripe utilities
    not-found.tsx           # NEW — Aqua dialog 404 (PRD §40)
    robots.ts, sitemap.ts   # unchanged

  components/
    aqua/                   # vendored upstream primitives (minimally forked)
      window.tsx  dock.tsx  button.tsx  badge.tsx  tabs.tsx
      dialog.tsx  dropdown-menu.tsx  tooltip.tsx  cursor.tsx

    desktop/                # the OS shell — client
      Desktop.tsx           # workspace, wallpaper, mode switch (desktop|tablet|mobile)
      MenuBar.tsx           # JL / Portfolio / View / Window / Help + clock
      Clock.tsx             # hydration-safe local time
      Dock.tsx              # our Dock, driven by window state
      DesktopIcon.tsx       # 3–4 wallpaper shortcuts, single click
      PortfolioWindow.tsx   # chrome + controls + drag, wraps one app
      WindowManager.tsx     # provider: reducer, z-order, hash sync
      MobileShell.tsx       # single-view model + bottom nav
      CommandPalette.tsx    # V2, deferred

    apps/                   # portfolio content — server components where possible
      WelcomeApp.tsx  AboutApp.tsx  ExperienceApp.tsx
      ProjectsApp.tsx SkillsApp.tsx ContactApp.tsx

    icons/
      AppIcons.tsx          # gel SVG icons: Home About Experience Projects Skills Contact
      ProjectIcons.tsx      # per-project glossy document icons

  lib/
    data.ts                 # UNCHANGED content; may gain icon keys / categories
    types.ts                # extend, do not rewrite
    window-config.ts        # app registry: id, title, hash, default size + position
    window-state.ts         # reducer + pure helpers (clamping, cascade, z-order)
    use-device-mode.ts      # matchMedia: width + (hover)/(pointer)
    use-drag.ts             # pointer-events drag, no dependency
```

### 4.1 Server/client boundary (PRD §33 + §44)

This is the highest-risk part of the design and is settled deliberately:

- `app/page.tsx` stays a **server component**. It renders each app's content
  (`<AboutApp />`, `<ExperienceApp />`, …) and passes them as `children` into the client
  `<Desktop>`. App bodies are therefore server-rendered HTML; only the chrome is client.
- **All six app bodies are always present in the HTML.** Closed windows are hidden with the
  `hidden` attribute rather than unmounted, so crawlers and the accessibility tree see real
  semantic content — no critical copy appears only after a click (PRD §33).
- One real `<h1>` ("James Law") lives in the Welcome app and is never unmounted. Apps use
  `<section>` + `<h2>`, preserving the current heading hierarchy.
- No Canvas, no text-as-image. Window chrome is the only client-rendered layer.
- Interactive leaves inside apps (the Experience sidebar selector, the Projects detail view)
  are small `"use client"` islands, not whole-app client components.

### 4.2 Window manager contract

```ts
type AppId = "welcome" | "about" | "experience" | "projects" | "skills" | "contact";

interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimised: boolean;
  isMaximised: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

// context API, per PRD §43
openWindow(id) closeWindow(id) minimiseWindow(id) restoreWindow(id)
focusWindow(id) toggleMaximise(id) moveWindow(id, position)
minimiseAll() resetDesktop() centreActive()
```

A `useReducer` + context. No Redux, no window-management dependency (PRD §34/§43).
Pure helpers live in `window-state.ts` so they are unit-testable without rendering:
`clampToWorkspace()`, `cascadePosition()`, `bringToFront()`.

**Drag** is our own `useDrag` on the titlebar using pointer events with `setPointerCapture` —
no library. Clamped so the titlebar always stays inside the workspace (below the 26px menu bar,
above the Dock), with at least ~80px of titlebar horizontally visible. A `resize` listener
re-clamps every open window, satisfying PRD §50.

**Resize** (arbitrary) is out of scope for V1 per PRD §13 — Aqua gives us nothing for it and
it is pure cost.

### 4.3 Responsive model (PRD §23)

`useDeviceMode()` returns `"mobile" | "tablet" | "desktop"` from **behaviour, not device names**:

- `< 768px` → mobile: `MobileShell`, single active view, no drag, red control acts as Back.
- `768–1023px` → tablet: windows allowed, limited overlap; drag enabled only when
  `(hover: hover) and (pointer: fine)` matches.
- `≥ 1024px` → desktop: full model.

Mobile is a **different component tree**, not the desktop tree under media queries (PRD §20).

### 4.4 Deep linking (PRD §32)

`#about` `#experience` `#projects` `#skills` `#contact` — only the frontmost app is in the URL.
Opening an app pushes a history entry; focus changes use `replaceState`. A `popstate`/`hashchange`
listener syncs back into the reducer, so browser Back works. Initial hash is read on mount and
opens that app in addition to Welcome. Window positions may go in `sessionStorage`; nothing
persists across visits.

---

## 5. New dependencies

Required by the Aqua components we need:

```
@radix-ui/react-dropdown-menu   # menu bar
@radix-ui/react-tabs            # skills / mobile category switch
@radix-ui/react-dialog          # project detail, 404
@radix-ui/react-tooltip         # dock labels on pointer devices
@radix-ui/react-slot            # button, badge
class-variance-authority        # button, badge, alert
```

Removed: `next-themes`.
Already present and reused: `motion`, `clsx`, `tailwind-merge`, `lucide-react`.

**Verification step:** `lucide-react` is pinned at `^1.7.0` here; Aqua's sources were written
against a different major. Confirm every icon Aqua imports still exists before vendoring, and
substitute our own SVG where it does not.

---

## 6. Build order

Effort figures are relative sizing, not calendar estimates.

### Phase 1 — Foundation *(small)*
1. Add `components.json` with the `@aqua` registry namespace.
2. Install the Radix + CVA deps; remove `next-themes`.
3. Vendor `theme` CSS vars into `globals.css`, replacing the dark-first token block. Keep the
   Tailwind 4 `@theme inline` pattern already in use.
4. Swap the Inter `next/font` for the Aqua font stack; keep a system fallback (PRD §25 — no
   proprietary font files shipped).
5. Vendor `button`, `badge`, `window`, `dock`, `cursor` into `src/components/aqua/` with
   provenance headers.
6. Author the wallpaper (CSS/SVG) and the pinstripe/brushed-metal utilities.
7. Write a real `AGENTS.md` (fixes the broken `CLAUDE.md` import).
8. **Gate:** `npm run lint && npm run test:run && npm run build` all pass, old site still renders.

### Phase 2 — OS shell *(large)* ← **review pause here**
1. `window-config.ts`, `window-state.ts` + its unit tests (written first — the reducer is pure
   and the repo's existing habit is TDD).
2. `WindowManager` provider, `Desktop` workspace, `useDeviceMode`, `useDrag`.
3. `PortfolioWindow`: Aqua chrome + forked accessible `WindowControls` + titlebar drag.
4. `MenuBar` (Radix dropdown menus, live clock) and our forked `Dock`.
5. `DesktopIcon` ×3–4, single-click to open.
6. Placeholder app bodies only.
7. Prove: open, close, focus/z-order, minimise, restore, maximise, drag-clamping, resize
   re-clamp, `prefers-reduced-motion`.
8. **Gate:** quality gates pass; push for review of the feel before content conversion.

### Phase 3 — Portfolio applications *(large)*
Convert each section into an app, reusing the existing markup and copy wholesale where it
already works — `data.ts` is the source of truth and must not change factually (PRD §35).

- **Welcome** — replaces `Hero`. Name, "Product Leader & Builder", the existing tagline, three
  CTAs. Carries the page `<h1>`.
- **About** — replaces `About`. About-This-Mac-flavoured layout, `aboutStats` as an inset panel.
  Drop `CountUp` here: animated zeros hurt SEO and a11y (PRD §15) — render final values.
- **Experience** — Finder sidebar (Product / Maritime, grouped by the existing `era` field) +
  detail panel. Metrics as Aqua badges. Richest app.
- **Projects** — icon grid → detail view with a Back button (PRD §17's "acceptable" option,
  chosen deliberately over five child windows).
- **Skills** — System-Profiler sidebar over the four existing categories, ticked lists, no
  percentage bars (PRD §18).
- **Contact** — mail-app framing, `mailto` as the primary CTA, LinkedIn + GitHub. No form.

Then delete the obsolete `components/sections/*`, `components/layout/{Header,Footer,ThemeProvider,ThemeToggle}`,
and the animation utilities the new shell does not use (`MouseGlow`, `ScrollReveal`,
`TypewriterText` are all scroll/hero-page concepts). Keep `AnimatedText` only if a window
entrance genuinely uses it (PRD §46 — review before deleting, then delete rather than hoard).

### Phase 4 — Mobile *(medium)*
`MobileShell` with a single active view, Aqua-styled bottom nav (magnification off, ≥44×44px
targets), red control as Back, app-open transitions. Verified at 320px with no horizontal
overflow.

### Phase 5 — Deep linking & accessibility *(medium)*
Hash routing + `popstate`. Then a full a11y pass: focus moves into a window on open and returns
to the invoking Dock item on close; Escape closes menus and dialogs; visible focus rings
everywhere; accessible names on all window controls and Dock apps; `prefers-reduced-motion`
honoured for Dock magnification, window scale and the minimise transform.

### Phase 6 — Visual polish *(medium)*
Gel icon set, wallpaper refinement, shadow/gradient tuning, window-open motion (scale 0.97→1,
fade, 150–220ms per PRD §28), minimise-toward-Dock, menu transitions. Easter eggs last:
Help → "About this website", a small "JamesOS Version 2.0" panel. Nothing that obstructs
navigation, no audio, no fake crashes.

### Phase 7 — QA *(medium)*
Quality gates, Lighthouse mobile against the PRD §34 targets, keyboard-only walkthrough,
Safari and iOS Safari, orientation change, hydration-warning check.

---

## 7. Test plan

Existing `lib/{data,types,utils}` tests stay and are extended. The 7 component tests for
deleted sections are replaced by equivalent-or-better coverage — no net loss (PRD §47).

| File | Covers |
|---|---|
| `lib/window-state.test.ts` | reducer: open, close, minimise, restore, focus→z-order, maximise toggle; `clampToWorkspace`, `cascadePosition` |
| `desktop/WindowManager.test.tsx` | provider integration; a closed app's content stays in the DOM |
| `desktop/PortfolioWindow.test.tsx` | control `aria-label`s; close/minimise/maximise fire; focus on click |
| `desktop/Dock.test.tsx` | launches its app, shows active state, restores a minimised app, keyboard activation via Enter/Space |
| `desktop/MenuBar.test.tsx` | dropdown opens, item launches the right app, keyboard navigation, Escape closes |
| `desktop/hash-routing.test.tsx` | loading with `#experience` opens Experience; opening updates the hash |
| `desktop/MobileShell.test.tsx` | single active view; opening replaces it; no drag handles rendered |
| `apps/*.test.tsx` | each app renders its `data.ts` content — the factual-preservation guard for PRD §35 |
| `a11y` assertions | roles, accessible names and keyboard behaviour, asserted inside the above rather than as a separate suite |

Reduced motion is tested by stubbing `matchMedia`; device mode likewise. Behaviour is tested,
not pixel layout (PRD §47).

---

## 8. Risks

| Risk | Handling |
|---|---|
| Aqua is young (33 commits, 8 stars) and its primitives are thin | We vendor with provenance headers and own the forks. No runtime dependency on upstream. |
| `aqua.duca.dev` blocked in this environment | Vendor from `raw.githubusercontent.com`; `components.json` keeps the CLI path open locally. |
| `AquaCursor` sets I-beam on bare `<span>`s and arrow on everything | Scope it to window *content* only — never the desktop, Dock or menu bar, where it would fight the chrome. Disabled under `(hover: none)`. |
| Paint cost: pinstripe `repeating-linear-gradient` + 4-layer box-shadows × 6 windows | Cap simultaneously-open heavy surfaces; avoid `backdrop-filter`; measure in Phase 7 before adding polish. |
| Replacing the token system touches every component at once | Phase 1 leaves the old site rendering; components are cut over in Phase 3, not mid-Phase-1. |
| Hidden-but-present app content could read as cloaking | Content is genuinely user-reachable in one click, semantically marked up, and identical to what the user sees — the standard progressive-disclosure pattern, not hidden keyword text. |
| Deleting section components loses tested behaviour | Each deletion is paired with its replacement app test in the same commit. |

---

## 9. Out of scope (PRD §52)

No emulator, terminal, file system, login, auth, Trash, fake browser, games, music player,
iPod, drag-and-drop desktop organisation, or backend. No arbitrary window resizing in V1.
The Cmd/Ctrl+K command palette is V2.

---

## 10. Quality gates

```bash
npm run lint
npm run test:run
npm run build
```

All three green, plus: no TypeScript errors, no console errors, no hydration warnings. The
clock is the one obvious hydration trap — render it client-only after mount.

---

## 11. Implementation notes — Phases 1 and 2

Recorded as built, so later phases don't re-derive these.

**Confirmed against the real packages**

- `lucide-react@1.7.0` does export `CheckIcon`, `ChevronRightIcon` and
  `CircleIcon`, so Aqua's `dropdown-menu` vendors unchanged. The risk flagged in
  §5 is closed.
- Upstream Aqua pinned at `d72926188b9b`. Vendored: `window`, `dock`, `button`,
  `badge`, `dropdown-menu`, `cursor`. `tooltip` waits for Phase 3, when something
  actually uses it.

**Forks made, and why**

1. `TrafficLights` → `WindowControls`: three real buttons with labels of the form
   `Close Experience`. Upstream's gel styling is reused verbatim.
2. `DockItem` → `<button>`, label revealed on hover *or* focus, magnification
   behind a `pointer-fine` custom variant.
3. Upstream's `tailwindcss-animate` classes on menus swapped for a local
   `.aqua-fade`, rather than adding the plugin for one transition.

**Decisions taken during the build**

- **A window's left edge never leaves the workspace.** The original plan only
  guaranteed `MIN_TITLEBAR_VISIBLE` on either side; in the browser that let a
  window be dragged left until its close, minimise and maximise controls were
  off-screen — reachable but not usable. The right edge may still overhang.
- **Closed windows use `inert`, not `hidden`.** `hidden` applied a frame before
  the close animation ran, so windows blinked out. `inert` keeps content in the
  HTML for crawlers while removing it from the tab order and the accessibility
  tree, which was the actual goal.
- **`createInitialState` stacks by `DEFAULT_OPEN` order, not `APP_ORDER`**, so the
  last window listed is the one in front.
- **Opening positions are pulled fully on screen**; only dragging may overhang.
- `CountUp` now starts at its real value rather than `"0"` — it was the one
  pre-existing lint error on `main`, and the fix is what §15 wanted anyway.

**Interim, not final**

- **Mobile** (`< 768px`) currently renders one full-bleed, undraggable window with
  the menu bar hidden and a scaled-down Dock: no overflow at 320px, 44px targets,
  close-only controls. The designed mobile shell is still Phase 4.
- **`DEFAULT_OPEN` opens Experience as well as Welcome** so the review build shows
  window overlap without a click. Phase 3 restores `["welcome"]` per PRD §12.
- Deep linking, programmatic focus management and the full keyboard pass remain
  Phase 5 as planned.

**Open question for Phase 3**

`data.ts` marks MSC Cruises (Maritime Support Officer) as `era: "product"`, so it
groups under Product in the sidebar, while PRD §16 lists it under Maritime. The
data is the existing record and hasn't been touched; Phase 3 needs a decision on
which grouping is right.

---

## 12. Implementation notes — Phase 3

**Content taxonomy**

`Experience.era: "sea" | "product"` became `Experience.group: "product" | "maritime"`.
The old field mixed two axes — chronology and discipline — which is why MSC Cruises
(a shore-based maritime role) sat under Product. The sidebar groups by discipline,
so the field now says that, and MSC groups under Maritime with the sea-going role.
No dates, employers, metrics or descriptions changed.

`navLinks` and `heroSubtitles` are gone: they served the deleted header and the
typewriter hero, and the Dock and menu bar replace them.

**Applications**

- **Welcome** — carries the page's only `<h1>`.
- **About** — About This Mac framing: the JL mark, a plain table of the four
  headline metrics at their real values, and a small `JamesOS 2.0` line as the
  one piece of era personality (PRD §37).
- **Experience** — Finder sidebar grouped Product / Maritime, detail panel with
  metrics as Aqua badges.
- **Projects** — Finder icon view with an original icon per project, opening into
  a detail view with a Back button.
- **Skills** — System Profiler layout, ticked lists, no percentage bars.
- **Contact** — mail-app framing with email as the primary action. No form.

`MasterDetail` backs Experience and Skills. It's built on Radix's tab primitives
so roving focus and arrow keys come from a tested implementation, but the styling
is ours from the `--aqua-*` tokens — Aqua's own `tabs` is a horizontal segmented
control, which is the wrong shape for a sidebar, so it was not vendored.

Every panel is force-mounted and hidden when inactive, so the full career history,
all five projects and every skill are in the served HTML. Verified on the build:
one `<h1>`, all six employers, all five projects, contact links.

**Deliberately not built**

PRD §17 also asks each project detail for Problem / What it does / What James
contributed. `data.ts` holds none of that copy, and writing it would mean
inventing portfolio claims — so the detail shows what the data actually has, and
those sections wait for real content.

**Layout gotcha, hit three times**

A Tailwind `@container` element styles its *descendants*, never itself. Putting
`@md:flex-row` or `@md:h-full` on the same element as `@container` silently does
nothing: the split panes stayed stacked and the sidebar didn't fill its window.
Every `@md:` class now sits on a child of the container.

Side by side, each pane scrolls itself; stacked, the window scrolls as one —
nested scroll areas on a phone are miserable.

**Still to come**

Phase 4 (designed mobile shell), Phase 5 (deep linking, focus management, full
keyboard pass), Phase 6 (polish, remaining easter eggs), Phase 7 (QA and
Lighthouse).

## 13. Implementation notes — Phase 4

**The mobile model**

`MobileShell` is its own component tree, as the plan required — `Desktop` returns
it before any window, menu bar or drag logic is reached. One view fills the
screen, nothing overlaps, nothing is draggable, and every view stays mounted and
inert when inactive so the portfolio copy is in the served HTML here too.

- **Single-app model.** A new reducer action, `activateSolo`, opens the requested
  app and closes any other except Welcome, which is the home view and is never
  closed. `activateApp` in the window manager picks `activateSolo` on mobile and
  `open` elsewhere, so the Dock, menu bar, wallpaper shortcuts and the launcher
  buttons inside Welcome all get the right behaviour without knowing which model
  is running.
- **Back, not close.** The red control is labelled "Back to Welcome" and Welcome
  has no control at all — there is nowhere to go back to from home. Minimise and
  maximise are absent everywhere in the shell rather than decorative.
- **Navigation carries five apps.** Six at 320px leaves no room for readable
  labels, so `inMobileNav` drops About, and Welcome gained an "About James"
  launcher. Placement is config, not a hardcoded exclusion.

**Fixes this phase turned up**

- **Wallpaper shortcuts were unclickable.** The Phase 2 fix that put windows
  above the desktop icons gave the windows layer `z-20` — but that layer spans
  the whole workspace, so it swallowed every click over the icons. It is now
  `pointer-events-none` with each window opting back in. There is a test for
  clicking a shortcut; the earlier browser pass had never tried it.
- **Window controls are now their own target.** The 13px gel dot relied on an
  invisible `before:` pseudo-element for its hit area, which cannot be measured
  and so cannot be tested. The dot moved into a `<span>` inside a sized button:
  21px on a fine pointer, 30px on a coarse one, and 44px for the lone mobile back
  control. Buttons sit flush so the dots stay exactly 8px apart — verified
  identical to upstream.
- **Dock labels were invisible on touch.** Upstream reveals them on hover, and
  a phone has no hover, so the nav was five unlabelled icons. `DockItem` gained
  an `alwaysShowLabel` mode that renders the label permanently beneath the icon.
  The first test only checked the text was in the DOM, which passed while the
  label was transparent — the browser check now measures computed opacity.
- **Selecting a role scrolls to it.** Stacked on a phone, the detail sits below
  the sidebar and off-screen. `MasterDetail` scrolls the newly selected panel
  into view, which is a no-op in the side-by-side layout, so one code path
  serves both.

**Tablet**, per PRD §23, needed no new code: windows are retained with the menu
bar, and dragging was already gated behind a fine pointer. Confirmed in the
browser both ways — `hasTouch` tablets get windows without dragging, mouse
tablets get both.

**Verified** at 320, 375 and 414px: no horizontal overflow, nav fits with
targets of at least 44px, exactly one view on screen, opening replaces rather
than stacks, back returns home, About reachable, and no console errors.

Deep linking, programmatic focus on window open, and the full keyboard and
screen-reader pass remain Phase 5.
