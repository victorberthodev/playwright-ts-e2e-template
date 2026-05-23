# playwright-ts-e2e-template

[![CI](https://github.com/victorberthodev/playwright-ts-e2e-template/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/victorberthodev/playwright-ts-e2e-template/actions/workflows/ci.yml)
[![Nightly](https://github.com/victorberthodev/playwright-ts-e2e-template/actions/workflows/nightly.yml/badge.svg)](https://github.com/victorberthodev/playwright-ts-e2e-template/actions/workflows/nightly.yml)
[![Allure Report](https://img.shields.io/badge/Allure-report-orange?logo=allure&logoColor=white)](https://victorberthodev.github.io/playwright-ts-e2e-template/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](tsconfig.json)
[![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

Production-grade Playwright + TypeScript E2E template — multi-env, Allure
reporting, GitHub Actions CI/CD, strict QA conventions.

> Full bilingual documentation lands in Stage 9 of the SDD plan.
> This stub exists so CI badges resolve.

## Quick start

```bash
pnpm install
pnpm exec playwright install chromium
pnpm test:smoke
```

## Useful scripts

| Command                 | Purpose                       |
| ----------------------- | ----------------------------- |
| `pnpm test`             | Run every project             |
| `pnpm test:smoke`       | `--grep @smoke`               |
| `pnpm test:regression`  | `--grep @regression`          |
| `pnpm test:ui:chromium` | UI tests on Chromium only     |
| `pnpm test:api`         | API tests                     |
| `pnpm test:report`      | `allure serve allure-results` |
| `pnpm lint`             | ESLint                        |
| `pnpm format`           | Prettier                      |
| `pnpm type-check`       | `tsc --noEmit`                |

## License

MIT — see [LICENSE](LICENSE) (lands in Stage 9).
