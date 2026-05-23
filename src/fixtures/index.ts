import { mergeTests, test as base } from '@playwright/test';
import { CartPage } from '@/pages/cart.page';
import { CheckoutPage } from '@/pages/checkout.page';
import { InventoryPage } from '@/pages/inventory.page';
import { LoginPage } from '@/pages/login.page';
import { apiTest, type ApiFixtures } from './api.fixture';

/**
 * Canonical `test` export for the suite. Merges page-object fixtures with
 * the API fixture. Always import `test` and `expect` from here, never
 * directly from `@playwright/test`.
 *
 *   import { test, expect } from '@/fixtures';
 */
export type PageFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

const pageTest = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export const test = mergeTests(pageTest, apiTest);

/**
 * Failure-only afterEach — attaches quick failure context to Allure and
 * the HTML reporter without re-attaching the trace / screenshot / video
 * that the reporter already grabs automatically (those are wired via
 * `use.trace|screenshot|video: retain-on-failure` in playwright.config).
 *
 * Skipped on the `api` project where there's no Page to inspect.
 */
test.afterEach(async ({ page }, testInfo) => {
  const failed = testInfo.status !== testInfo.expectedStatus;
  const isUiProject = testInfo.project.name.startsWith('ui-');
  if (!failed || !isUiProject) return;

  await testInfo.attach('final-url', {
    body: page.url(),
    contentType: 'text/plain',
  });
  await testInfo.attach('viewport-html', {
    body: await page.content(),
    contentType: 'text/html',
  });
});

export { expect } from '@playwright/test';
export type { ApiFixtures };
