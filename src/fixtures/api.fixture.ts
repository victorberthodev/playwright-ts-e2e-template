import { test as base, type APIRequestContext } from '@playwright/test';
import { env } from '@/utils/env';

/**
 * `apiContext` fixture — a typed Playwright `APIRequestContext` bound to
 * `env.API_URL` and JSON headers. Merged into the main `test` export via
 * `mergeTests` in `./index.ts`.
 *
 * Use this in API specs (or hybrid tests that need an out-of-band API
 * call) instead of constructing a request context per test.
 */
export type ApiFixtures = {
  apiContext: APIRequestContext;
};

export const apiTest = base.extend<ApiFixtures>({
  apiContext: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: env.API_URL,
      extraHTTPHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    await use(context);
    await context.dispose();
  },
});
