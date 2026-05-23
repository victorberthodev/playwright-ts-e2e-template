import { expect, test } from '@/fixtures';
import { SAUCEDEMO_USERS } from '@/data/users.data';
import { step } from '@/utils/logger';

// Login flow must start unauthenticated — clear any inherited storage state
// from the ui-* project default.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Authentication', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test(
    'logs in with valid credentials',
    {
      tag: ['@smoke', '@auth'],
      annotation: [
        { type: 'feature', description: 'Authentication' },
        { type: 'story', description: 'Standard user signs in successfully' },
        { type: 'severity', description: 'critical' },
      ],
    },
    async ({ loginPage, page }) => {
      const { username, password } = SAUCEDEMO_USERS.standard;
      await step('Submit valid credentials', async () => {
        await loginPage.login(username, password);
      });
      await expect(page).toHaveURL(/inventory\.html$/);
    },
  );

  test(
    'blocks locked_out_user',
    {
      tag: ['@regression', '@auth'],
      annotation: [
        { type: 'feature', description: 'Authentication' },
        { type: 'story', description: 'Locked user sees explanatory error' },
        { type: 'severity', description: 'normal' },
      ],
    },
    async ({ loginPage, page }) => {
      const { username, password } = SAUCEDEMO_USERS.locked;
      await loginPage.login(username, password);

      await expect(loginPage.errorMessage).toContainText('locked out');
      await expect(page).not.toHaveURL(/inventory\.html$/);
    },
  );

  test(
    'rejects invalid credentials',
    {
      tag: ['@regression', '@auth'],
      annotation: [
        { type: 'feature', description: 'Authentication' },
        { type: 'story', description: 'Unknown credentials surface a generic error' },
        { type: 'severity', description: 'normal' },
      ],
    },
    async ({ loginPage }) => {
      await loginPage.login('not_a_user', 'wrong_password');

      await expect(loginPage.errorMessage).toContainText(
        'Username and password do not match any user',
      );
    },
  );
});
