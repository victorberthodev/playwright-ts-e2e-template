import { test } from '@playwright/test';

/**
 * Structured step logging. Wraps a body in `test.step()` so HTML / Allure
 * reports get a timed entry with the given label.
 *
 * Constitution C6 — use this instead of `console.log` inside tests and
 * page objects.
 *
 * @example
 *   await step('User adds backpack to cart', async () => {
 *     await inventoryPage.addToCart(PRODUCTS.backpack);
 *   });
 */
export async function step<T>(label: string, body: () => Promise<T> | T): Promise<T> {
  return test.step(label, async () => body());
}
