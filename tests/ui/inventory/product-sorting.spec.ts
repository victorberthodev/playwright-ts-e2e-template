import type { Locator } from '@playwright/test';
import { expect, test } from '@/fixtures';

/**
 * Inventory sorting — exercises all four SauceDemo sort options.
 * Relies on the ui-* project default storageState (authenticated as
 * standard_user via tests/auth.setup.ts).
 *
 * Strategy: read the post-sort texts once to derive the *expected* order,
 * then assert via `toHaveText` (web-first) so any flaky render auto-
 * retries. The plain read is the only non-web-first call and is contained
 * here so the rest of the test stays declarative.
 */
async function currentTexts(loc: Locator): Promise<string[]> {
  return loc.allTextContents();
}

function parsePrice(label: string): number {
  return Number(label.replace('$', ''));
}

test.describe('Product sorting', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await expect(inventoryPage.title).toBeVisible();
  });

  test(
    'sorts by name A→Z',
    {
      tag: ['@regression', '@inventory'],
      annotation: [
        { type: 'feature', description: 'Inventory' },
        { type: 'story', description: 'Sort by name ascending' },
        { type: 'severity', description: 'normal' },
      ],
    },
    async ({ inventoryPage }) => {
      await inventoryPage.sortBy('az');
      const names = await currentTexts(inventoryPage.itemNames);
      const expected = [...names].sort((a, b) => a.localeCompare(b));

      await expect(inventoryPage.itemNames).toHaveText(expected);
    },
  );

  test(
    'sorts by name Z→A',
    {
      tag: ['@regression', '@inventory'],
      annotation: [
        { type: 'feature', description: 'Inventory' },
        { type: 'story', description: 'Sort by name descending' },
        { type: 'severity', description: 'normal' },
      ],
    },
    async ({ inventoryPage }) => {
      await inventoryPage.sortBy('za');
      const names = await currentTexts(inventoryPage.itemNames);
      const expected = [...names].sort((a, b) => b.localeCompare(a));

      await expect(inventoryPage.itemNames).toHaveText(expected);
    },
  );

  test(
    'sorts by price low→high',
    {
      tag: ['@regression', '@inventory'],
      annotation: [
        { type: 'feature', description: 'Inventory' },
        { type: 'story', description: 'Sort by price ascending' },
        { type: 'severity', description: 'normal' },
      ],
    },
    async ({ inventoryPage }) => {
      await inventoryPage.sortBy('lohi');
      const labels = await currentTexts(inventoryPage.itemPrices);
      const numeric = labels.map(parsePrice);

      expect(numeric).toEqual([...numeric].sort((a, b) => a - b));
    },
  );

  test(
    'sorts by price high→low',
    {
      tag: ['@regression', '@inventory'],
      annotation: [
        { type: 'feature', description: 'Inventory' },
        { type: 'story', description: 'Sort by price descending' },
        { type: 'severity', description: 'normal' },
      ],
    },
    async ({ inventoryPage }) => {
      await inventoryPage.sortBy('hilo');
      const labels = await currentTexts(inventoryPage.itemPrices);
      const numeric = labels.map(parsePrice);

      expect(numeric).toEqual([...numeric].sort((a, b) => b - a));
    },
  );
});
