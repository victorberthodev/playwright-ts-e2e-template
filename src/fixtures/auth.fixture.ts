import type { Page } from '@playwright/test';
import { LoginPage } from '@/pages/login.page';

/**
 * Authenticates `page` with the given credentials and dumps the resulting
 * storage state to `storageStatePath`. The setup project
 * (`tests/auth.setup.ts`) calls this once per run; UI projects then load
 * the saved state via `use.storageState` in `playwright.config.ts`.
 *
 * Constitution C2 — storage state lives at `playwright/.auth/` and is
 * gitignored. Never commit the generated file.
 *
 * This is a plain helper, not a Playwright fixture, because authentication
 * here is a one-shot bootstrap rather than a per-test resource.
 */
export async function authenticateAndSave(
  page: Page,
  storageStatePath: string,
  username: string,
  password: string,
): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
  // Wait for post-login redirect to settle before snapshotting cookies.
  await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: storageStatePath });
}
