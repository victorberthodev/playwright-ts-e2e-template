import { expect, test } from '@/fixtures';
import { aUser } from '@/data/builders/user.builder';
import { PRODUCTS, SAUCEDEMO_USERS } from '@/data/users.data';
import { step } from '@/utils/logger';

/**
 * End-to-end checkout journey. Deliberately starts unauthenticated to
 * demonstrate the full login → browse → cart → checkout → confirmation
 * flow in a single spec.
 */
test.use({ storageState: { cookies: [], origins: [] } });

test(
  'completes full checkout journey end to end',
  {
    tag: ['@smoke', '@e2e'],
    annotation: [
      { type: 'feature', description: 'Checkout' },
      { type: 'story', description: 'User logs in, adds a product, and completes checkout' },
      { type: 'severity', description: 'blocker' },
    ],
  },
  async ({ loginPage, inventoryPage, cartPage, checkoutPage, page }) => {
    const customer = aUser().build();

    await step('Sign in as standard_user', async () => {
      await loginPage.goto();
      const { username, password } = SAUCEDEMO_USERS.standard;
      await loginPage.login(username, password);
      await expect(page).toHaveURL(/inventory\.html$/);
    });

    await step('Add backpack to cart', async () => {
      await inventoryPage.addToCart(PRODUCTS.backpack);
      await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    await step('Open cart', async () => {
      await inventoryPage.openCart();
      await expect(cartPage.items).toHaveCount(1);
      await expect(cartPage.itemNames.first()).toHaveText('Sauce Labs Backpack');
    });

    await step('Fill customer info and continue', async () => {
      await cartPage.checkout();
      await checkoutPage.fillCustomerInfo(
        customer.firstName,
        customer.lastName,
        customer.postalCode,
      );
      await checkoutPage.continue();
      await expect(checkoutPage.finishButton).toBeVisible();
    });

    await step('Finish checkout and reach confirmation', async () => {
      await checkoutPage.finish();
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
      await expect(page).toHaveURL(/checkout-complete\.html$/);
    });
  },
);
