import { env } from '@/utils/env';

/**
 * Allure reporter configuration extracted from `playwright.config.ts`
 * so the latter stays focused on Playwright concerns.
 *
 * - `allureEnvironmentInfo` lands on Allure's "Environment" widget so
 *   reviewers see which env / URLs the run hit.
 * - `allureCategories` controls Allure's defect bucketing on the
 *   "Categories" tab. Tweak rules here; no JSON file to maintain.
 */

export const allureEnvironmentInfo: Record<string, string> = {
  TEST_ENV: env.TEST_ENV,
  BASE_URL: env.BASE_URL,
  API_URL: env.API_URL,
  CI: env.CI ? 'true' : 'false',
  Node: process.version,
  Platform: `${process.platform} (${process.arch})`,
};

export interface AllureCategory {
  name: string;
  matchedStatuses?: Array<'passed' | 'failed' | 'broken' | 'skipped' | 'unknown'>;
  messageRegex?: string;
  traceRegex?: string;
}

export const allureCategories: AllureCategory[] = [
  {
    name: 'Ignored tests',
    matchedStatuses: ['skipped'],
  },
  {
    name: 'Infrastructure problems',
    matchedStatuses: ['broken', 'failed'],
    messageRegex: '.*ECONNREFUSED.*|.*ENOTFOUND.*|.*ETIMEDOUT.*|.*net::ERR_.*',
  },
  {
    name: 'Selector / locator drift',
    matchedStatuses: ['failed'],
    messageRegex: '.*locator\\..*Timeout.*|.*waiting for locator.*|.*strict mode violation.*',
  },
  {
    name: 'Assertion failures',
    matchedStatuses: ['failed'],
    messageRegex: '.*expect\\(.*',
  },
  {
    name: 'Product defects',
    matchedStatuses: ['failed'],
  },
  {
    name: 'Test defects',
    matchedStatuses: ['broken'],
  },
];
