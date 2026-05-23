import { expect, test as setup } from '@playwright/test';
import { STORAGE_STATE_PATH } from '@/config/constants';
import { SAUCEDEMO_USERS } from '@/data/users.data';
import { authenticateAndSave } from '@/fixtures/auth.fixture';

/**
 * Setup project entry point. Generates `playwright/.auth/user.json` once
 * per run with a standard_user session. UI projects depend on this and
 * load the file via `use.storageState`.
 *
 * Constitution C2 — never commit the generated file (gitignored).
 */
setup('authenticate as standard_user', async ({ page }) => {
  const { username, password } = SAUCEDEMO_USERS.standard;
  await authenticateAndSave(page, STORAGE_STATE_PATH, username, password);
  // Post-condition: confirm we ended up on the authenticated landing page.
  await expect(page).toHaveURL(/inventory\.html$/);
});
