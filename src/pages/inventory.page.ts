import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * SauceDemo /inventory.html page (post-login product list).
 *
 * Item slugs follow the SauceDemo convention — e.g.,
 *   `sauce-labs-backpack`, `sauce-labs-bike-light`. The `add-to-cart-<slug>`
 * and `remove-<slug>` data-test attributes mirror these.
 */
export type SortOption =
  | 'az' // Name (A → Z)
  | 'za' // Name (Z → A)
  | 'lohi' // Price (low → high)
  | 'hilo'; // Price (high → low)

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get title(): Locator {
    return this.page.getByText('Products', { exact: true });
  }

  get items(): Locator {
    // .inventory_item is a stable hand-written class on SauceDemo — not
    // framework-generated, so allowed under C1.
    return this.page.locator('.inventory_item');
  }

  get itemNames(): Locator {
    return this.page.getByTestId('inventory-item-name');
  }

  get itemPrices(): Locator {
    return this.page.getByTestId('inventory-item-price');
  }

  get sortDropdown(): Locator {
    return this.page.getByTestId('product-sort-container');
  }

  get cartLink(): Locator {
    return this.page.getByTestId('shopping-cart-link');
  }

  get cartBadge(): Locator {
    return this.page.locator('.shopping_cart_badge');
  }

  override async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  async addToCart(itemSlug: string): Promise<void> {
    await this.page.getByTestId(`add-to-cart-${itemSlug}`).click();
  }

  async removeFromCart(itemSlug: string): Promise<void> {
    await this.page.getByTestId(`remove-${itemSlug}`).click();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
