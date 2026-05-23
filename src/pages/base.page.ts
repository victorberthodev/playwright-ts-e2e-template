import type { Page } from '@playwright/test';

/**
 * Minimal POM base. Holds only the Playwright `Page` handle.
 *
 * Constitution C3 — composition > inheritance. Deliberately thin:
 *   - subclasses expose locators via typed getters;
 *   - subclasses define their own `goto()` when reachable by URL;
 *   - subclasses do NOT call `expect()` (enforced by ESLint).
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Navigate to the page's canonical URL. Default implementation throws so
   * we fail loud if a non-navigable page (modal, fragment) is misused.
   * Override per-page when navigation makes sense.
   */
  async goto(): Promise<void> {
    throw new Error(
      `${this.constructor.name}.goto() is not implemented — override it or navigate via UI.`,
    );
  }
}
