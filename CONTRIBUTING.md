# Contributing

<details open>
<summary><strong>🇧🇷 Português</strong></summary>

Obrigado por contribuir. Este projeto é um **template** — qualidade do
código aqui vira default em todos os repos que partirem dele. Por isso
algumas regras são mais rígidas do que o típico.

## Convenções de branch

| Prefixo     | Quando usar                              |
| ----------- | ---------------------------------------- |
| `feat/`     | nova feature ou novo teste               |
| `fix/`      | correção de bug ou flake                 |
| `chore/`    | manutenção (deps, configs, scripts)      |
| `docs/`     | documentação                             |
| `ci/`       | mudanças em workflows / CI               |
| `test/`     | adição de testes sem mudança de prod     |
| `refactor/` | refatoração sem mudança de comportamento |

Exemplo: `feat/checkout-3ds-flow`, `fix/login-flaky-selector`.

## Conventional Commits

Header obrigatório no formato `tipo(escopo): descrição`. Tipos
permitidos (mesmo enum dos branches): `feat`, `fix`, `chore`, `docs`,
`ci`, `test`, `refactor`, `perf`, `build`, `style`, `revert`.

```
feat(checkout): add 3DS challenge step
fix(login): replace placeholder selector with role-based
docs(readme): document multi-env switching
```

Regras adicionais do commitlint:

- Header até 100 chars
- Subject não pode ser `PascalCase` nem `UPPER CASE`
- Corpo separado por linha em branco
- Trailers separados por linha em branco

Husky bloqueia commits que violarem. Para testar manualmente:

```bash
echo "feat: minha mensagem" | pnpm exec commitlint
```

## Template de Pull Request

PRs usam [.github/PULL_REQUEST_TEMPLATE.md](./.github/PULL_REQUEST_TEMPLATE.md).
Inclua:

- **Contexto** — por que essa mudança
- **O que mudou** — bullet curto
- **Como testar** — comandos exatos
- **Checklist QA** — todos os itens preenchidos

CI precisa estar verde: lint, tsc, Prettier, matriz UI nos 3 browsers
e API. PRs com check vermelho não merge.

## Como adicionar coisas

### Page Object

1. Crie `src/pages/<feature>.page.ts`.
2. Estenda `BasePage`.
3. Exponha locators como getters tipados (`get fooButton(): Locator`).
4. Adicione ações de negócio. **Não chame `expect()` dentro do POM** —
   ESLint bloqueia.
5. Sobrescreva `goto()` se a página for navegável por URL.
6. Registre no `src/fixtures/index.ts` como fixture do `test.extend`.

### Fixture

1. Crie `src/fixtures/<nome>.fixture.ts` exportando o objeto de fixtures
   tipado.
2. No `src/fixtures/index.ts`, use `mergeTests` para combinar com as
   fixtures existentes.
3. Importe sempre `test` e `expect` de `@/fixtures` nos specs, nunca
   diretamente de `@playwright/test`.

### Schema + cliente de API

1. Schema em `src/api/schemas/<recurso>.schema.ts` (Zod).
2. Types em `src/api/types/api.types.ts` via `z.infer`.
3. Cliente em `src/api/clients/<recurso>.client.ts` recebendo
   `APIRequestContext`. Cada método valida o body com o schema.
4. Para negative paths (404 etc), exponha variante `*Raw` que retorna
   `APIResponse` sem parse.

### Teste

1. Crie sob `tests/{ui,api,hybrid}/<feature>/<arquivo>.spec.ts`.
2. `import { test, expect } from '@/fixtures';`
3. Tag inline na metadata, nunca no nome:
   `test('...', { tag: ['@smoke'] }, async () => {})`.
4. Anotação Allure: `feature`, `story`, `severity`.
5. Use `step('descrição', async () => { ... })` para fases longas.
6. Para UI specs que precisam começar sem sessão:
   `test.use({ storageState: { cookies: [], origins: [] } })`.

## Constitution (não negociável)

Antes de PR, releia o **Constitution** em [CLAUDE.md](./CLAUDE.md).
Resumo:

- Determinismo > velocidade
- Isolamento de testes
- POM raso (composição > herança), sem assertions dentro
- Strict TypeScript (`no any`, `noUncheckedIndexedAccess`)
- Observabilidade por padrão (trace + screenshot + video em falha)

Se algo no PR colidir com a constitution, abra issue para discutir
**antes** de mergeá-lo.

</details>

---

<details>
<summary><strong>🇬🇧 English</strong></summary>

Thanks for contributing. This project is a **template** — code quality
here becomes the default for every repo that starts from it, so the
rules are stricter than typical.

## Branch conventions

| Prefix      | When to use                            |
| ----------- | -------------------------------------- |
| `feat/`     | new feature or new test                |
| `fix/`      | bug fix or flake fix                   |
| `chore/`    | maintenance (deps, configs, scripts)   |
| `docs/`     | documentation                          |
| `ci/`       | workflow / CI changes                  |
| `test/`     | tests added without production changes |
| `refactor/` | refactor with no behavior change       |

Examples: `feat/checkout-3ds-flow`, `fix/login-flaky-selector`.

## Conventional Commits

Header required as `type(scope): description`. Allowed types (same as
branch prefixes): `feat`, `fix`, `chore`, `docs`, `ci`, `test`,
`refactor`, `perf`, `build`, `style`, `revert`.

```
feat(checkout): add 3DS challenge step
fix(login): replace placeholder selector with role-based one
docs(readme): document multi-env switching
```

Extra commitlint rules:

- Header capped at 100 chars
- Subject not `PascalCase` nor `UPPER CASE`
- Blank line between body and trailers
- Blank line before footer

Husky blocks violations. Quick local check:

```bash
echo "feat: my message" | pnpm exec commitlint
```

## Pull Request template

PRs use [.github/PULL_REQUEST_TEMPLATE.md](./.github/PULL_REQUEST_TEMPLATE.md).
Include:

- **Context** — why this change
- **What changed** — short bullets
- **How to test** — exact commands
- **QA checklist** — every item filled in

CI must be green: lint, tsc, Prettier, UI matrix on all 3 browsers,
and API. Red checks block merge.

## How to add things

### Page Object

1. Create `src/pages/<feature>.page.ts`.
2. Extend `BasePage`.
3. Expose locators as typed getters (`get fooButton(): Locator`).
4. Add business actions. **No `expect()` inside the POM** — ESLint
   blocks it.
5. Override `goto()` if the page has a canonical URL.
6. Register in `src/fixtures/index.ts` as a `test.extend` fixture.

### Fixture

1. Create `src/fixtures/<name>.fixture.ts` exporting the typed fixture
   object.
2. In `src/fixtures/index.ts`, use `mergeTests` to combine with the
   existing fixtures.
3. Always import `test` and `expect` from `@/fixtures` in specs, never
   directly from `@playwright/test`.

### API schema + client

1. Schema in `src/api/schemas/<resource>.schema.ts` (Zod).
2. Types in `src/api/types/api.types.ts` via `z.infer`.
3. Client in `src/api/clients/<resource>.client.ts` taking an
   `APIRequestContext`. Each method validates the body against the
   schema.
4. For negative paths (404, etc.), expose a `*Raw` variant that returns
   `APIResponse` without parsing.

### Test

1. Create under `tests/{ui,api,hybrid}/<feature>/<file>.spec.ts`.
2. `import { test, expect } from '@/fixtures';`
3. Tag inline in metadata, never in the title:
   `test('...', { tag: ['@smoke'] }, async () => {})`.
4. Allure annotations: `feature`, `story`, `severity`.
5. Wrap long phases in `step('description', async () => { ... })`.
6. For UI specs that must start unauthenticated:
   `test.use({ storageState: { cookies: [], origins: [] } })`.

## Constitution (non-negotiable)

Before opening a PR, re-read the **Constitution** in
[CLAUDE.md](./CLAUDE.md). Summary:

- Determinism over speed
- Test isolation
- Thin POM (composition over inheritance), no assertions inside
- Strict TypeScript (`no any`, `noUncheckedIndexedAccess`)
- Observability by default (trace + screenshot + video on failure)

If something in your PR conflicts with the constitution, open an issue
to discuss **before** merging.

</details>
