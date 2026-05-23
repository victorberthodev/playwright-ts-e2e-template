import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * SauceDemo checkout flow — three steps modeled as one page object since
 * PROMPT lists a single checkout.page.ts. Locators are grouped by step.
 *
 * Step 1 (/checkout-step-one.html): customer info (firstName, lastName, zip)
 * Step 2 (/checkout-step-two.html): order overview (subtotal, tax, total)
 * Step 3 (/checkout-complete.html): confirmation
 */
export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ─── Step 1 — customer info ───────────────────────────────────────────
  get firstNameInput(): Locator {
    return this.page.getByTestId('firstName');
  }
  get lastNameInput(): Locator {
    return this.page.getByTestId('lastName');
  }
  get postalCodeInput(): Locator {
    return this.page.getByTestId('postalCode');
  }
  get continueButton(): Locator {
    return this.page.getByTestId('continue');
  }
  get cancelButton(): Locator {
    return this.page.getByTestId('cancel');
  }
  get errorMessage(): Locator {
    return this.page.getByTestId('error');
  }

  // ─── Step 2 — order overview ──────────────────────────────────────────
  get finishButton(): Locator {
    return this.page.getByTestId('finish');
  }
  get subtotalLabel(): Locator {
    return this.page.getByTestId('subtotal-label');
  }
  get taxLabel(): Locator {
    return this.page.getByTestId('tax-label');
  }
  get totalLabel(): Locator {
    return this.page.getByTestId('total-label');
  }

  // ─── Step 3 — complete ────────────────────────────────────────────────
  get completeHeader(): Locator {
    return this.page.getByTestId('complete-header');
  }
  get completeText(): Locator {
    return this.page.getByTestId('complete-text');
  }
  get backHomeButton(): Locator {
    return this.page.getByTestId('back-to-products');
  }

  // ─── Actions ──────────────────────────────────────────────────────────
  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
