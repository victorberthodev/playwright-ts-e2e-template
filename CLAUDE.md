# CLAUDE.md

Living context file for Claude Code sessions on this repo. The authoritative
spec is [PROMPT.md](./PROMPT.md) — read its **Constitution** section before
touching anything.

## Project

Playwright + TypeScript E2E template. Public GitHub template repo. Targets
SauceDemo (UI) + a public REST API (TBD in Stage 5).

## Commands

| Command            | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `pnpm install`     | Install deps                             |
| `pnpm type-check`  | `tsc --noEmit` (strict mode)             |

More commands land in Stage 1 (lint/format) and Stage 2 (test scripts).

## Stage Progress

- [x] **Stage 0 — Bootstrap.** package.json, tsconfig (strict +
      noUncheckedIndexedAccess + exactOptionalPropertyTypes), .gitignore,
      .editorconfig. All deps installed as `devDependencies`. Commit `5e500a9`.
- [ ] Stage 1 — Lint, Format, Git Hooks
- [ ] Stage 2 — Playwright config + multi-env
- [ ] Stage 3 — Base structure (POM + fixtures)
- [ ] Stage 4 — UI tests (SauceDemo)
- [ ] Stage 5 — API tests
- [ ] Stage 6 — Hybrid API+UI tests
- [ ] Stage 7 — Allure integration
- [ ] Stage 8 — CI/CD (GitHub Actions)
- [ ] Stage 9 — Bilingual docs
- [ ] Stage 10 — Polish + template release

## Deviations from PROMPT (intentional)

- **All deps in `devDependencies`** (PROMPT split runtime vs dev). Reason: a
  test-only template has no production runtime — npm convention is devDeps.
- **ESLint 10** instead of 9 (latest stable, flat config default unchanged).
- **TypeScript pinned `^5.9.0`** (PROMPT says 5.x; TS 6 deprecates `baseUrl`
  needed for path aliases).
- **`src/index.ts` placeholder** added so `tsc` has inputs pre-Stage 3. Delete
  when real modules land.

## Next session

Open new session, attach PROMPT.md, say:
> "Vamos começar pela **Stage 1 — Lint, Format e Git Hooks**."
