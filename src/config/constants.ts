/**
 * App-wide constants. Tweak here, never inline magic numbers in tests.
 */

export const STORAGE_STATE_PATH = 'playwright/.auth/user.json';

export const TIMEOUTS = {
  /** Single action (click, fill, etc) */
  action: 10_000,
  /** Page navigation / route */
  navigation: 30_000,
  /** Single expect web-first assertion */
  expect: 5_000,
  /** Per-test hard cap */
  test: 60_000,
} as const;

export const TAGS = {
  smoke: '@smoke',
  regression: '@regression',
  e2e: '@e2e',
  api: '@api',
  ui: '@ui',
  auth: '@auth',
} as const;
