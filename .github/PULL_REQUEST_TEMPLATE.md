<!-- 🇧🇷 PT-BR e 🇬🇧 EN no mesmo template. Preencha o que se aplica. -->

## Context / Contexto

<!-- Por que essa mudança? Link para issue, ticket ou conversa. -->

## What changed / O que mudou

<!-- Bullet curto. Foque no "o quê", não no "como" — o diff já mostra o como. -->

-
-

## How to test / Como testar

<!-- Comandos exatos. Se exige env específica, documente. -->

```bash
TEST_ENV=dev pnpm test:smoke
```

## QA checklist

- [ ] `pnpm type-check` passa
- [ ] `pnpm lint` passa
- [ ] `pnpm format:check` passa
- [ ] Testes novos ou alterados têm tags (`@smoke` / `@regression` / etc)
- [ ] Anotações Allure (`feature`, `story`, `severity`) preenchidas
- [ ] Sem `waitForTimeout`, sem `any` injustificado, sem assertions em
      Page Objects
- [ ] Specs novas usam `import { test, expect } from '@/fixtures'`
- [ ] Storage state e arquivos sensíveis seguem no `.gitignore`
- [ ] Mensagem de commit segue Conventional Commits
- [ ] CI verde (lint + api + ui matrix em chromium/firefox/webkit)

## Screenshots / GIFs (se UI)

<!-- Opcional para mudanças visuais. -->

## Breaking changes

<!-- Se sim, descreva impacto e plano de migração. Caso contrário, "none". -->

none
