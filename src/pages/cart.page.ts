import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * SauceDemo /cart.html page.
 */
export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get title(): Locator {
    return this.page.getByText('Your Cart', { exact: true });
  }

  get items(): Locator {
    return this.page.locator('.cart_item');
  }

  get itemNames(): Locator {
    return this.page.getByTestId('inventory-item-name');
  }

  get checkoutButton(): Locator {
    return this.page.getByTestId('checkout');
  }

  get continueShoppingButton(): Locator {
    return this.page.getByTestId('continue-shopping');
  }

  override async goto(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async removeItem(itemSlug: string): Promise<void> {
    await this.page.getByTestId(`remove-${itemSlug}`).click();
  }
}
