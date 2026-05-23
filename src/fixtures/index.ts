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
export { expect } from '@playwright/test';
export type { ApiFixtures };
