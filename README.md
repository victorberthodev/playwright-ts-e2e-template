# playwright-ts-e2e-template

[![CI](https://github.com/victorberthodev/playwright-ts-e2e-template/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/victorberthodev/playwright-ts-e2e-template/actions/workflows/ci.yml)
[![Nightly](https://github.com/victorberthodev/playwright-ts-e2e-template/actions/workflows/nightly.yml/badge.svg)](https://github.com/victorberthodev/playwright-ts-e2e-template/actions/workflows/nightly.yml)
[![Allure Report](https://img.shields.io/badge/Allure-report-orange?logo=allure&logoColor=white)](https://victorberthodev.github.io/playwright-ts-e2e-template/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](tsconfig.json)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

Production-grade Playwright + TypeScript E2E template. Multi-env, Allure,
GitHub Actions CI/CD, strict QA conventions. Use it as the "Template
repository" starting point for new automation projects.

---

<details open>
<summary><strong>🇧🇷 Português</strong></summary>

## Sumário

1. [Stack](#stack)
2. [Estrutura de pastas](#estrutura-de-pastas)
3. [Quick Start](#quick-start)
4. [Como rodar](#como-rodar)
5. [Multi-ambiente](#multi-ambiente)
6. [Tags](#tags)
7. [CI/CD](#cicd)
8. [Como contribuir](#como-contribuir)
9. [Licença](#licença)

## Stack

| Camada            | Escolha                              |
| ----------------- | ------------------------------------ |
| Runtime           | Node.js 20 LTS                       |
| Package manager   | pnpm 10                              |
| Linguagem         | TypeScript 5 (strict + flags)        |
| Test runner       | Playwright Test                      |
| Reporter          | Allure + Playwright HTML             |
| Lint              | ESLint 10 + eslint-plugin-playwright |
| Format            | Prettier 3                           |
| Git hooks         | Husky + lint-staged + commitlint     |
| CI/CD             | GitHub Actions                       |
| Schema validation | Zod                                  |
| Data generation   | @faker-js/faker                      |

## Estrutura de pastas

```
src/
├── api/         # clients, schemas (zod), DTO types
├── pages/       # Page Objects (POM)
├── fixtures/    # fixtures Playwright + test/expect canônicos
├── data/        # constantes + builders com faker
├── utils/       # logger, env loader
└── config/      # environments, constants, allure config
tests/
├── *.setup.ts   # setup project (gera storageState)
├── ui/          # specs de UI
├── api/         # specs de API
└── hybrid/      # specs API + UI
playwright/.auth/  # storageState gerado (gitignored)
```

## Quick Start

```bash
git clone https://github.com/victorberthodev/playwright-ts-e2e-template.git
cd playwright-ts-e2e-template
pnpm install
pnpm exec playwright install chromium
pnpm test:smoke
```

Tempo total: < 5 min.

## Como rodar

```bash
pnpm test                    # roda tudo
pnpm test:smoke              # apenas @smoke
pnpm test:regression         # apenas @regression
pnpm test:ui                 # UI em chromium + firefox + webkit
pnpm test:ui:chromium        # UI só chromium (mais rápido)
pnpm test:api                # API só
pnpm test:headed             # UI com browser visível
pnpm test:debug              # Playwright Inspector
pnpm test:list               # lista testes (não executa)
pnpm test:report             # abre Allure local
```

## Multi-ambiente

Três ambientes suportados via variável `TEST_ENV`: `dev`, `stg`, `prd`.
Defaults vivem em `src/config/environments.ts`. Para sobrescrever, copie
o `.env.${env}.example` correspondente para `.env.${env}` e edite.

```bash
# bash
TEST_ENV=stg pnpm test

# PowerShell
$env:TEST_ENV='stg'; pnpm test
```

Validação dos envs acontece via [`zod`](https://zod.dev/) em
`src/utils/env.ts` — falha rápido se faltar variável obrigatória.

## Tags

Tags vivem inline na metadata do teste, não no nome:

```ts
test(
  'logs in with valid credentials',
  {
    tag: ['@smoke', '@auth'],
  },
  async ({ loginPage }) => {
    /* ... */
  },
);
```

Tags em uso: `@smoke`, `@regression`, `@e2e`, `@api`, `@ui`, `@auth`,
`@inventory`, `@hybrid`.

## CI/CD

Três workflows no `.github/workflows/`:

- **ci.yml** — roda em cada PR e push para `main`. Jobs: lint
  (eslint + prettier + tsc), api-test, ui-test matrix
  `[chromium, firefox, webkit]`. Upload de `allure-results-*` como
  artifact (90 dias).
- **publish-report.yml** — em push para `main`. Roda regression, mescla
  histórico Allure anterior, publica em GitHub Pages.
- **nightly.yml** — cron `0 3 * * *`. Matrix completa. Abre issue
  automática se falhar.

Dependabot configurado para npm semanal e github-actions semanal, com
grupos para `playwright`, `eslint`, `typescript`.

## Como contribuir

Consulte [CONTRIBUTING.md](./CONTRIBUTING.md) — convenções de branch,
Conventional Commits, template de PR, como adicionar page objects /
fixtures / testes.

## Licença

[MIT](./LICENSE) © 2026 Victor Bertho.

</details>

---

<details>
<summary><strong>🇬🇧 English</strong></summary>

## Table of contents

1. [Stack](#stack-1)
2. [Folder layout](#folder-layout)
3. [Quick Start](#quick-start-1)
4. [How to run](#how-to-run)
5. [Multi-environment](#multi-environment)
6. [Tags](#tags-1)
7. [CI/CD](#cicd-1)
8. [Contributing](#contributing)
9. [License](#license)

## Stack

| Layer             | Choice                               |
| ----------------- | ------------------------------------ |
| Runtime           | Node.js 20 LTS                       |
| Package manager   | pnpm 10                              |
| Language          | TypeScript 5 (strict + extras)       |
| Test runner       | Playwright Test                      |
| Reporter          | Allure + Playwright HTML             |
| Lint              | ESLint 10 + eslint-plugin-playwright |
| Format            | Prettier 3                           |
| Git hooks         | Husky + lint-staged + commitlint     |
| CI/CD             | GitHub Actions                       |
| Schema validation | Zod                                  |
| Data generation   | @faker-js/faker                      |

## Folder layout

```
src/
├── api/         # clients, zod schemas, DTO types
├── pages/       # Page Objects (POM)
├── fixtures/    # Playwright fixtures + canonical test/expect
├── data/        # constants + faker-backed builders
├── utils/       # logger, env loader
└── config/      # environments, constants, allure config
tests/
├── *.setup.ts   # setup project (generates storageState)
├── ui/          # UI specs
├── api/         # API specs
└── hybrid/      # API + UI hybrid specs
playwright/.auth/  # generated storageState (gitignored)
```

## Quick Start

```bash
git clone https://github.com/victorberthodev/playwright-ts-e2e-template.git
cd playwright-ts-e2e-template
pnpm install
pnpm exec playwright install chromium
pnpm test:smoke
```

Total time: under 5 minutes.

## How to run

```bash
pnpm test                    # run everything
pnpm test:smoke              # @smoke only
pnpm test:regression         # @regression only
pnpm test:ui                 # UI on chromium + firefox + webkit
pnpm test:ui:chromium        # UI on chromium only (fastest)
pnpm test:api                # API only
pnpm test:headed             # UI with visible browser
pnpm test:debug              # Playwright Inspector
pnpm test:list               # list tests (no execution)
pnpm test:report             # open local Allure
```

## Multi-environment

Three environments are supported via `TEST_ENV`: `dev`, `stg`, `prd`.
Defaults live in `src/config/environments.ts`. To override, copy the
matching `.env.${env}.example` to `.env.${env}` and edit.

```bash
# bash
TEST_ENV=stg pnpm test

# PowerShell
$env:TEST_ENV='stg'; pnpm test
```

Env validation runs via [`zod`](https://zod.dev/) in `src/utils/env.ts`
— fails fast if a required variable is missing.

## Tags

Tags live inline in the test metadata, never in the test name:

```ts
test(
  'logs in with valid credentials',
  {
    tag: ['@smoke', '@auth'],
  },
  async ({ loginPage }) => {
    /* ... */
  },
);
```

In use: `@smoke`, `@regression`, `@e2e`, `@api`, `@ui`, `@auth`,
`@inventory`, `@hybrid`.

## CI/CD

Three workflows under `.github/workflows/`:

- **ci.yml** — runs on every PR and push to `main`. Jobs: lint
  (eslint + prettier + tsc), api-test, ui-test matrix
  `[chromium, firefox, webkit]`. Uploads `allure-results-*` artifacts
  (90-day retention).
- **publish-report.yml** — on push to `main`. Runs regression, merges
  previous Allure history, publishes to GitHub Pages.
- **nightly.yml** — cron `0 3 * * *`. Full matrix. Opens an issue
  automatically on failure.

Dependabot is configured for weekly npm and GitHub Actions updates,
grouped for `playwright`, `eslint`, `typescript`.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) — branch conventions,
Conventional Commits, PR template, how to add page objects / fixtures
/ tests.

## License

[MIT](./LICENSE) © 2026 Victor Bertho.

</details>
