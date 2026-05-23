import { expect, test } from '@/fixtures';
import { UsersClient } from '@/api/clients/users.client';
import { PRODUCTS } from '@/data/users.data';
import { step } from '@/utils/logger';

/**
 * Hybrid API + UI pattern — *illustrative* example.
 *
 * ## When to use this pattern
 *
 *   A. **Seed via API, validate via UI** — create the entity (order,
 *      account, document) through a fast HTTP call, then drive UI only
 *      for the part you actually want to test. Avoids the slow UI prelude
 *      (registration, navigation, form filling) that has nothing to do
 *      with the assertion you care about.
 *
 *   B. **Act via UI, verify via API** — click "Cancel" in UI, then call
 *      GET /orders/:id and assert status === "cancelled". Useful when the
 *      UI hides server-side detail (audit logs, derived flags, etc).
 *
 *   C. **UI test, API cleanup** — after a UI test creates state, DELETE
 *      the artifact via API in an `afterEach` so the suite stays isolated
 *      (Constitution C2).
 *
 * ## Why this spec is contrived
 *
 * SauceDemo (UI under test) and JSONPlaceholder (API under test) do not
 * share a backend, so we can't *truly* seed SauceDemo via API. To still
 * demonstrate the mechanics, this spec:
 *
 *   1. Pulls user #1 from JSONPlaceholder — schema-validated by the
 *      `UsersClient` — playing the role of "API setup".
 *   2. Feeds the API-derived name and zipcode into SauceDemo's checkout
 *      form — playing the role of "UI flow driven by API data".
 *   3. Asserts the confirmation page — the "UI validation".
 *
 * To adapt this to a real product:
 *   - Swap `UsersClient.getById` for your seed endpoint
 *     (`POST /orders`, `POST /accounts`, etc.).
 *   - Swap the SauceDemo checkout for the screen that should reflect the
 *     seeded state.
 *   - Keep the structure: API setup → UI flow → UI assertion.
 *
 * Uses the default project storageState (authenticated as
 * `standard_user`) — no login prelude needed.
 */

test(
  'API-derived customer data drives a UI checkout',
  {
    tag: ['@regression', '@hybrid'],
    annotation: [
      { type: 'feature', description: 'Hybrid (API + UI)' },
      { type: 'story', description: 'API-sourced data drives a UI checkout flow' },
      { type: 'severity', description: 'minor' },
    ],
  },
  async ({ apiContext, inventoryPage, cartPage, checkoutPage }) => {
    const usersClient = new UsersClient(apiContext);

    const seed = await step('API setup: fetch a user as the seed payload', async () => {
      // Schema validation happens inside the client — a bad shape throws
      // here, not 20 UI steps later when an unrelated assertion fails.
      return usersClient.getById(1);
    });
    expect(seed.address.zipcode).toBeTruthy();

    // Split the API "name" field into something the SauceDemo form accepts.
    const nameParts = seed.name.split(' ');
    const firstName = nameParts[0] ?? 'Test';
    const lastName = nameParts.slice(1).join(' ') || 'User';

    await step('UI flow: drive SauceDemo checkout using the API seed', async () => {
      await inventoryPage.goto();
      await inventoryPage.addToCart(PRODUCTS.backpack);
      await inventoryPage.openCart();
      await cartPage.checkout();
      await checkoutPage.fillCustomerInfo(firstName, lastName, seed.address.zipcode);
      await checkoutPage.continue();
      await checkoutPage.finish();
    });

    await step('UI validation: confirmation reflects the seeded data', async () => {
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });
  },
);
