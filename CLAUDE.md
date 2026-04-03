# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type-check (tsc -b) then build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

No test runner is configured in this project.

## Architecture

Personal portfolio site built with **React 19 + TypeScript + Vite** (SWC).

### Key components

- **`src/App.tsx`** — Root component, composes `Header` and `HeroBackground`.
- **`src/components/Header/`** — Fixed navigation bar (Inicio, About me, Skills, My projects, Contact) with a "SEGUIR" button. Styled via `Header.css`.
- **`src/components/HeroBackground/`** — Full-viewport hero section with an animated starfield driven by **Matter.js** physics. 250 particles flow outward from center with variable speeds, sizes, and opacity fade-in/fade-out. Displays the hero title "SEBASTIAN CALDERON / @Blasecato". Handles window resize.

### Physics/animation pattern

`HeroBackground` uses `useEffect` + `useRef` to manage a Matter.js engine and a `requestAnimationFrame` render loop on a `<canvas>`. Particles are respawned when they leave the viewport. If modifying the animation, be aware that cleanup (engine clear + RAF cancel) happens in the effect's return function.

### TypeScript strictness

`tsconfig.app.json` enables `strict`, `noUnusedLocals`, and `noUnusedParameters` — the build will fail on unused variables.

`HeroBackground` stores per-particle data via `star.plugin` (a Matter.js extension point) and suppresses TypeScript errors with `// @ts-ignore`. This is intentional — Matter.js types don't expose `plugin` on `Body`.
