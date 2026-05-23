# 🤖 SDD Prompt — Playwright + TypeScript E2E Template

> **Como usar:** Cole este arquivo na raiz do repositório vazio. No Claude Code, execute `/specify` apontando para a seção [SPEC](#1-specify), depois `/plan` apontando para [PLAN](#2-plan), e por fim `/tasks` apontando para [TASKS](#3-tasks). Siga a regra **uma sessão por stage**.

---

## 🧭 Contexto do Projeto

Sou **QA Automation Engineer** e estou criando um **template público de automação E2E** no GitHub para servir como:

1. **Base reutilizável** para iniciar novos projetos de automação em squads
2. **Vitrine técnica** no meu portfólio (recrutadores e tech leads vão olhar este repo)
3. **Referência didática** para outros QAs que estão começando com Playwright + TS

O template precisa parecer escrito por um **QA sênior** — não um "hello world". Cada decisão arquitetural deve ter justificativa documentada.

---

## 📜 CONSTITUTION — Princípios Não-Negociáveis

Estes princípios **prevalecem sobre qualquer outra instrução**. Se algo no `/plan` ou `/tasks` violar a constitution, pare e me avise.

### C1. Determinismo > Velocidade
- **Zero `waitForTimeout` fixos.** Use `expect.poll`, `waitFor`, ou web-first assertions.
- **Zero seletores frágeis** (xpath posicional, classes geradas). Prioridade: `getByRole` → `getByLabel` → `getByTestId` → `getByText`.
- **Retries só no CI**, nunca local. Local deve falhar honestamente.

### C2. Isolamento de Testes
- Cada teste cria e descarta seu próprio estado (massa de dados, sessão, storage).
- **Proibido** `test.describe.serial` exceto com justificativa documentada via JSDoc.
- Storage state autenticado vive em `playwright/.auth/` e é gerado por `setup project`, nunca commitado.

### C3. Page Object Model Pragmático
- POM **sem herança profunda**. Composição > herança.
- Page Objects **não fazem assertions** — eles expõem locators e ações. Assertions ficam nos testes.
- Cada page object exporta locators como **getters tipados**, não strings.

### C4. Camadas Separadas
```
tests/        → especificações (.spec.ts) — só intenção de negócio
pages/        → page objects (UI)
api/          → clients de API (request fixtures)
fixtures/     → fixtures customizadas do Playwright
data/         → builders, factories, dados estáticos
utils/        → helpers genéricos (sem lógica de negócio)
config/       → environments, constants
```

### C5. Tipagem Estrita
- `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitAny: true`.
- **Proibido `any`** sem comentário `// eslint-disable-next-line` justificando.
- DTOs de API tipados com interfaces/types explícitos.

### C6. Observabilidade por Padrão
- Todo teste falho gera: **screenshot + video + trace** (retain-on-failure).
- Allure recebe: tags, severity, story, feature, descriptions.
- Logs estruturados via `test.step()` — nunca `console.log` direto.

### C7. Convenções de Commit e Branch
- Conventional Commits (`feat:`, `fix:`, `test:`, `chore:`, `docs:`, `refactor:`, `ci:`).
- Branches: `feat/`, `fix/`, `chore/`, `docs/`.
- Husky + lint-staged barram commits com erro de lint/format.

---

## 1. SPECIFY

### 🎯 Objetivo do Template

Entregar um **repositório template** (marcável como "Template repository" no GitHub) que permita a qualquer QA clonar e ter, em **menos de 5 minutos**:

- Suite E2E rodando contra **SauceDemo** (https://www.saucedemo.com)
- Suite API rodando contra uma API pública de exemplo (escolher entre **reqres.in** ou **JSONPlaceholder** — justificar escolha no PLAN)
- Relatório Allure publicado em GitHub Pages
- Pipeline CI/CD verde no primeiro push

### 👤 Personas de Uso

| Persona | Necessidade |
|---------|-------------|
| QA iniciando projeto novo | Clonar, trocar `baseURL`, escrever primeiro teste em até 1h |
| QA Sênior avaliando | Ler `README.md` + `CONTRIBUTING.md` e entender arquitetura em 10min |
| Recrutador técnico | Ver pipeline verde, relatório Allure online, código limpo |

### ✅ Critérios de Aceite (User Stories)

**US-01** — Como QA, quero clonar o repo e rodar `pnpm install && pnpm test:smoke` e ver a suíte smoke verde localmente.

**US-02** — Como QA, quero executar testes contra três ambientes (`dev`, `stg`, `prd`) trocando apenas uma variável (`TEST_ENV=stg pnpm test`).

**US-03** — Como QA, quero filtrar execução por tags: `pnpm test --grep @smoke` ou `pnpm test --grep @regression`.

**US-04** — Como QA, quero abrir um PR e ver o CI rodando em matrix (chromium, firefox, webkit) com Allure publicado em GitHub Pages.

**US-05** — Como QA, quero que ao tentar commitar código mal formatado o Husky bloqueie e mostre o erro.

**US-06** — Como QA, quero exemplos reais de:
- Login UI com fixture de autenticação (storageState)
- Fluxo de carrinho E2E (add → checkout → confirmation)
- Teste de API com schema validation
- Teste híbrido (setup via API, validação via UI)

### 🚫 Fora de Escopo (Não-Fazer)

- Component testing (`@playwright/experimental-ct-react`)
- Visual regression (Percy, Applitools, Argos)
- Mobile native (Appium)
- BDD/Cucumber/Gherkin (gera atrito desnecessário neste template)
- Docker (decidido fora do escopo nesta versão)

---

## 2. PLAN

### 🏗️ Stack Técnica

| Camada | Escolha | Justificativa |
|--------|---------|---------------|
| Runtime | Node.js 20 LTS | Estabilidade + suporte longo |
| Package Manager | **pnpm** | Mais rápido, monorepo-friendly, alinhado com práticas modernas |
| Linguagem | TypeScript 5.x strict | C5 da constitution |
| Test Runner | Playwright Test (latest) | Built-in parallel, fixtures, traces |
| Reporter | Allure + Playwright HTML | Allure como principal, HTML como fallback |
| Lint | ESLint + `eslint-plugin-playwright` | Pega anti-patterns específicos de Playwright |
| Format | Prettier | Padrão de mercado |
| Git Hooks | Husky + lint-staged + commitlint | Garantir qualidade pré-commit |
| CI/CD | GitHub Actions | Nativo do GitHub, gratuito para repos públicos |
| Env Management | `dotenv` + `dotenv-cli` | Suporte a `.env.dev`, `.env.stg`, `.env.prd` |
| Data Generation | `@faker-js/faker` | Padrão de mercado |
| Schema Validation | `zod` | Validação de contratos de API |

### 📁 Estrutura de Diretórios Final

```
playwright-ts-e2e-template/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # PR checks (lint + test matrix)
│   │   ├── nightly.yml               # Regression schedulada
│   │   └── publish-report.yml        # Deploy Allure em GH Pages
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml
├── .husky/
│   ├── pre-commit
│   └── commit-msg
├── src/
│   ├── api/
│   │   ├── clients/
│   │   │   └── users.client.ts
│   │   ├── schemas/
│   │   │   └── user.schema.ts        # Zod schemas
│   │   └── types/
│   │       └── api.types.ts
│   ├── pages/
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   ├── inventory.page.ts
│   │   ├── cart.page.ts
│   │   └── checkout.page.ts
│   ├── fixtures/
│   │   ├── auth.fixture.ts           # storageState
│   │   ├── api.fixture.ts            # request context
│   │   └── index.ts                  # merge fixtures
│   ├── data/
│   │   ├── builders/
│   │   │   └── user.builder.ts       # Builder pattern
│   │   └── users.data.ts             # Constantes (standard_user, etc)
│   ├── utils/
│   │   ├── logger.ts
│   │   └── env.ts                    # Validação de envs com zod
│   └── config/
│       ├── environments.ts
│       └── constants.ts
├── tests/
│   ├── ui/
│   │   ├── auth/
│   │   │   └── login.spec.ts
│   │   ├── cart/
│   │   │   └── checkout-flow.spec.ts
│   │   └── inventory/
│   │       └── product-sorting.spec.ts
│   ├── api/
│   │   └── users.spec.ts
│   └── hybrid/
│       └── api-setup-ui-validation.spec.ts
├── playwright/
│   └── .auth/                        # gitignored
├── .env.example
├── .env.dev.example
├── .env.stg.example
├── .env.prd.example
├── .gitignore
├── .prettierrc
├── .prettierignore
├── .editorconfig
├── eslint.config.js                  # flat config (ESLint 9+)
├── commitlint.config.js
├── tsconfig.json
├── playwright.config.ts
├── package.json
├── pnpm-lock.yaml
├── CLAUDE.md                         # contexto para Claude Code
├── CONTRIBUTING.md                   # PT-BR + EN
├── LICENSE                           # MIT
├── README.md                         # PT-BR + EN (bilíngue)
└── PROMPT.md                         # este arquivo (referência)
```

### 🎨 Padrões de Design

#### Page Object — Exemplo de Contrato

```typescript
// src/pages/login.page.ts
import type { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators expostos como getters — testes podem assertar neles
  get usernameInput(): Locator { return this.page.getByPlaceholder('Username'); }
  get passwordInput(): Locator { return this.page.getByPlaceholder('Password'); }
  get loginButton(): Locator   { return this.page.getByRole('button', { name: 'Login' }); }
  get errorMessage(): Locator  { return this.page.getByTestId('error'); }

  // Ações de negócio — sem assertions
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

#### Fixtures — Padrão de Extensão

```typescript
// src/fixtures/index.ts
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  inventoryPage: async ({ page }, use) => { await use(new InventoryPage(page)); },
});

export { expect };
```

### 🏷️ Estratégia de Tags e Projects

**Tags inline nos testes** (não no nome):
```typescript
test('login com credenciais válidas', { tag: ['@smoke', '@auth'] }, async () => {});
```

**Projects no `playwright.config.ts`:**
- `setup` — gera storageState (auth)
- `ui-chromium` / `ui-firefox` / `ui-webkit` — depende de `setup`
- `api` — sem browser
- `smoke` — grep `@smoke`, roda em PR
- `regression` — grep `@regression`, roda em nightly

### 🌎 Multi-ambiente

```
.env.dev    → baseURL=https://www.saucedemo.com, apiURL=https://reqres.in/api
.env.stg    → (placeholder para staging do usuário)
.env.prd    → (placeholder para produção do usuário)
```

Carregamento via `TEST_ENV=dev` (default) → `dotenv-cli -e .env.${TEST_ENV}`.
Validação dos envs no boot via `zod` (`src/utils/env.ts`) — falha rápido se faltar variável.

### 🔁 CI/CD — Workflows

**`ci.yml`** (em PRs):
1. `lint` (paralelo): ESLint + Prettier check + tsc --noEmit
2. `test` (matrix `[chromium, firefox, webkit]`): smoke + api
3. `upload-allure` (sempre): artifact com `allure-results`

**`publish-report.yml`** (após merge em `main`):
1. Roda regression completa
2. Gera Allure HTML
3. Deploy em `gh-pages` branch
4. Resultado visível em `https://<user>.github.io/<repo>/`

**`nightly.yml`** (cron `0 3 * * *` — 03h UTC):
1. Regression em todos browsers
2. Notifica via issue no GitHub se falhar

### 🛡️ Tratamento de Falhas no CI

- `retries: process.env.CI ? 2 : 0`
- `workers: process.env.CI ? 2 : undefined`
- `fullyParallel: true`
- `reporter` condicional: HTML local, Allure + GitHub no CI
- Upload de trace.zip como artifact (90 dias retention)

---

## 3. TASKS

> **Regra de ouro:** uma stage = uma sessão do Claude Code. Ao fim de cada stage, commit conventional, push, e abra nova sessão para a próxima. Atualize `CLAUDE.md` com o que foi feito.

### Stage 0 — Bootstrap do Repositório
**Acceptance:** `pnpm install` roda sem erros, `tsc --noEmit` passa.

- [ ] `pnpm init` + ajustar `package.json` (name, description, keywords, license MIT, author Victor)
- [ ] Instalar deps: `@playwright/test`, `typescript`, `@types/node`, `dotenv`, `dotenv-cli`, `zod`, `@faker-js/faker`, `allure-playwright`, `allure-commandline`
- [ ] Instalar devDeps: `eslint@9`, `@typescript-eslint/*`, `eslint-plugin-playwright`, `prettier`, `eslint-config-prettier`, `husky`, `lint-staged`, `@commitlint/cli`, `@commitlint/config-conventional`
- [ ] Criar `tsconfig.json` com `strict: true`, `noUncheckedIndexedAccess: true`, paths `@/*` apontando para `src/*`
- [ ] Criar `.gitignore` (node_modules, playwright-report, allure-results, allure-report, test-results, .env*, !.env.example, playwright/.auth)
- [ ] Criar `.editorconfig`
- [ ] Commit: `chore: bootstrap project structure`

### Stage 1 — Lint, Format e Git Hooks
**Acceptance:** Husky bloqueia commit com erro de lint; commitlint barra mensagem fora do padrão.

- [ ] `eslint.config.js` (flat config) com `eslint-plugin-playwright`
- [ ] `.prettierrc` e `.prettierignore`
- [ ] `commitlint.config.js` (extends conventional)
- [ ] `pnpm exec husky init` + scripts `pre-commit` (lint-staged) e `commit-msg` (commitlint)
- [ ] `lint-staged` config no `package.json`
- [ ] Scripts npm: `lint`, `lint:fix`, `format`, `format:check`, `type-check`
- [ ] Commit: `chore: setup lint, format and git hooks`

### Stage 2 — Configuração Playwright + Multi-env
**Acceptance:** `TEST_ENV=dev pnpm test --list` lista testes (mesmo sem nenhum criado, deve carregar config sem erros).

- [ ] `playwright.config.ts` com projects (setup, ui-chromium/firefox/webkit, api), reporters condicionais, retries, traces, screenshots, videos
- [ ] `src/utils/env.ts` — validação com zod das env vars obrigatórias
- [ ] `.env.example`, `.env.dev.example`, `.env.stg.example`, `.env.prd.example`
- [ ] `src/config/environments.ts` e `src/config/constants.ts`
- [ ] Scripts: `test`, `test:smoke`, `test:regression`, `test:ui`, `test:api`, `test:debug`, `test:headed`, `test:report` (allure serve)
- [ ] Commit: `feat: setup playwright config with multi-env support`

### Stage 3 — Estrutura Base (POM + Fixtures)
**Acceptance:** Estrutura criada, imports funcionam, `tsc` passa.

- [ ] `src/pages/base.page.ts` (classe abstrata mínima — só `page` e `goto` opcional)
- [ ] `src/pages/login.page.ts`, `inventory.page.ts`, `cart.page.ts`, `checkout.page.ts` para SauceDemo
- [ ] `src/fixtures/auth.fixture.ts` (storageState para `standard_user`)
- [ ] `src/fixtures/api.fixture.ts` (request context customizado)
- [ ] `src/fixtures/index.ts` (merge de fixtures)
- [ ] `src/data/users.data.ts` (constantes SauceDemo: standard_user, locked_out_user, problem_user, performance_glitch_user)
- [ ] `src/data/builders/user.builder.ts` (exemplo de Builder pattern com Faker)
- [ ] `src/utils/logger.ts` (wrapper simples sobre `test.step` + console)
- [ ] Commit: `feat: add page objects and fixtures structure`

### Stage 4 — Testes UI (SauceDemo)
**Acceptance:** `pnpm test:ui` verde local em chromium.

- [ ] `tests/ui/auth/login.spec.ts`:
  - login válido (`@smoke`)
  - login com locked_out_user (`@regression`)
  - login com credenciais inválidas (`@regression`)
- [ ] `tests/ui/inventory/product-sorting.spec.ts`:
  - ordenar por preço asc/desc (`@regression`)
  - ordenar por nome A-Z/Z-A (`@regression`)
- [ ] `tests/ui/cart/checkout-flow.spec.ts`:
  - fluxo completo: login → add ao carrinho → checkout → confirmação (`@smoke @e2e`)
- [ ] Usar fixture `auth` no inventory e cart specs (storageState pré-autenticado)
- [ ] Allure annotations em todos os testes: `feature`, `story`, `severity`
- [ ] Commit: `test: add UI E2E specs for SauceDemo`

### Stage 5 — Testes API
**Acceptance:** `pnpm test:api` verde, schema validation funcionando.

- [ ] **Decisão documentada no commit:** escolher `reqres.in` ou `JSONPlaceholder` e justificar (sugestão: reqres.in tem POST/PUT/DELETE com responses realistas, JSONPlaceholder é mais estável mas só fake)
- [ ] `src/api/types/api.types.ts` — DTOs
- [ ] `src/api/schemas/user.schema.ts` — schemas Zod
- [ ] `src/api/clients/users.client.ts` — client tipado usando `request` fixture
- [ ] `tests/api/users.spec.ts`:
  - GET list users — schema validation (`@smoke @api`)
  - GET single user — happy path + 404 (`@regression @api`)
  - POST create user (`@regression @api`)
- [ ] Commit: `test: add API specs with zod schema validation`

### Stage 6 — Teste Híbrido (API + UI)
**Acceptance:** Demonstra padrão "setup via API, validação via UI".

- [ ] `tests/hybrid/api-setup-ui-validation.spec.ts` — exemplo conceitual (já que SauceDemo não tem API real, criar um cenário documentado/mockado)
- [ ] Adicionar JSDoc explicando o padrão e quando usar
- [ ] Commit: `test: add hybrid api+ui test pattern example`

### Stage 7 — Allure Integration
**Acceptance:** `pnpm test:report` abre Allure local com dados.

- [ ] Configurar reporter `allure-playwright` no `playwright.config.ts`
- [ ] `allure.config.js` (categorias, environment.properties)
- [ ] Scripts: `allure:generate`, `allure:open`, `allure:serve`
- [ ] Adicionar attachments (screenshots, traces) via `testInfo.attach` em hook `afterEach`
- [ ] Commit: `feat: integrate allure reporting`

### Stage 8 — CI/CD GitHub Actions
**Acceptance:** PR mostra status check verde com matrix de 3 browsers + Allure artifact.

- [ ] `.github/workflows/ci.yml`:
  - Job `lint` (eslint + prettier + tsc)
  - Job `test` matrix `[chromium, firefox, webkit]` com cache do pnpm e browsers Playwright
  - Upload de `allure-results` como artifact
- [ ] `.github/workflows/publish-report.yml`:
  - Trigger em push para `main`
  - Gera Allure HTML, faz deploy em `gh-pages`
- [ ] `.github/workflows/nightly.yml`:
  - Cron `0 3 * * *`
  - Regression completa
  - Abre issue automática se falhar (via `actions/github-script`)
- [ ] `.github/dependabot.yml` (npm semanal + github-actions semanal)
- [ ] Badges no README: CI status, last nightly, Allure report link, license
- [ ] Commit: `ci: add github actions workflows`

### Stage 9 — Documentação Bilíngue
**Acceptance:** README abre limpo no GitHub, seções PT-BR e EN colapsáveis.

- [ ] `README.md` com seções:
  - 🇧🇷 Português / 🇬🇧 English (collapsibles `<details>`)
  - Badges no topo
  - Sumário, Stack, Estrutura de pastas, Quick Start (clone → install → test em 3 comandos), Como rodar (smoke/regression/debug), Multi-ambiente, Tags, CI/CD, Como contribuir, Licença
- [ ] `CONTRIBUTING.md` bilíngue:
  - Convenções de branch
  - Conventional Commits
  - Padrão de PR
  - Como adicionar novo Page Object / fixture / teste
- [ ] `CLAUDE.md` — contexto para uso futuro com Claude Code:
  - Visão geral do projeto
  - Comandos principais
  - Convenções (links para CONTRIBUTING)
  - Estrutura de pastas
- [ ] `.github/PULL_REQUEST_TEMPLATE.md` (checklist QA)
- [ ] `.github/ISSUE_TEMPLATE/bug_report.md` e `feature_request.md`
- [ ] `LICENSE` MIT
- [ ] Commit: `docs: add bilingual documentation`

### Stage 10 — Polish Final + Template
**Acceptance:** Repo marcado como Template, primeiro clone-teste de 5 minutos passa.

- [ ] Marcar o repo como **Template repository** nas settings do GitHub (instruir o usuário)
- [ ] Adicionar topics: `playwright`, `typescript`, `e2e-testing`, `qa-automation`, `test-automation`, `allure`, `github-actions`, `template`
- [ ] Adicionar `funding.yml` opcional
- [ ] Adicionar screenshot/GIF da execução no README
- [ ] Cleanup final: revisar todos os `TODO`, remover console.logs, garantir 0 warnings no `tsc` e ESLint
- [ ] Tag `v1.0.0` + GitHub Release
- [ ] Commit: `chore: release v1.0.0`

---

## 🔍 Checklist de Qualidade do Sênior

Antes de marcar como concluído, valide:

- [ ] `pnpm install && pnpm test:smoke` funciona em máquina limpa em < 5min
- [ ] CI verde em PR de teste
- [ ] Allure publicado em GitHub Pages e acessível
- [ ] Nenhum `any` sem justificativa
- [ ] Nenhum `waitForTimeout`
- [ ] Nenhum seletor por classe CSS gerada ou xpath posicional
- [ ] Page Objects sem assertions
- [ ] Todos os testes têm tags
- [ ] README abre limpo (sem links quebrados, sem typos)
- [ ] `tsc --noEmit`, `eslint .`, `prettier --check .` todos passam
- [ ] Husky bloqueia commit ruim (testar manualmente)
- [ ] Conventional commits em todo o histórico
- [ ] LICENSE presente
- [ ] `.env.example` documentado, `.env*` no `.gitignore`

---

## 🚦 Regras de Engajamento com o Agente

1. **Pergunte antes de assumir.** Se uma decisão técnica não estiver coberta aqui (ex: versão exata de uma lib, naming de variável de ambiente específica), pergunte.
2. **Uma stage por sessão.** Não pule stages. Não combine stages.
3. **Commit ao fim de cada stage.** Conventional commits obrigatórios.
4. **Atualize `CLAUDE.md`** ao fim de cada stage com o que foi feito e próximos passos.
5. **Se algo na constitution conflitar com uma task, pare e me consulte.**
6. **Validações reais:** ao fim de cada stage, execute o comando de acceptance e mostre o output. Não diga "deve funcionar" — rode.
7. **Não invente dependências.** Se precisar de uma lib não listada no PLAN, justifique e me peça aprovação.

---

## ▶️ Pronto para começar?

Quando estiver pronto, abra uma sessão nova no Claude Code, anexe este arquivo e diga:

> "Vamos começar pela **Stage 0 — Bootstrap do Repositório**. Siga a constitution e os critérios de acceptance."