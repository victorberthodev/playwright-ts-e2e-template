import type { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * SauceDemo /login page.
 *
 * Selector priority follows Constitution C1: getByRole / getByPlaceholder /
 * getByTestId. SauceDemo's inputs have no associated <label>, so we fall
 * back to placeholder for username/password.
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get usernameInput(): Locator {
    return this.page.getByPlaceholder('Username');
  }

  get passwordInput(): Locator {
    return this.page.getByPlaceholder('Password');
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get errorMessage(): Locator {
    return this.page.getByTestId('error');
  }

  override async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
