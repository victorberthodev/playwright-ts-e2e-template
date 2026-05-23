/**
 * Env loader + validator. Single source of truth for any env var the suite
 * touches. Fails fast at boot when something required is missing.
 *
 * Loading order:
 *   1. `.env` (defaults shared across environments) — optional.
 *   2. `.env.${TEST_ENV}` (per-environment overrides) — optional but
 *      strongly recommended. `TEST_ENV` defaults to `dev`.
 *   3. Real process.env wins over everything (so CI / shell exports win).
 *
 * Cross-platform: no shell prefix syntax needed. Set `TEST_ENV` however
 * your OS prefers (bash: `TEST_ENV=stg pnpm test`, PowerShell:
 * `$env:TEST_ENV='stg'; pnpm test`).
 */
import { config as loadDotenv } from 'dotenv';
import path from 'node:path';
import { z } from 'zod';
import { ENVIRONMENT_DEFAULTS, ENVIRONMENTS, isEnvironment } from '@/config/environments';

const testEnv = process.env.TEST_ENV ?? 'dev';
if (!isEnvironment(testEnv)) {
  console.error(`[env] Invalid TEST_ENV="${testEnv}". Expected one of: ${ENVIRONMENTS.join(', ')}`);
  process.exit(1);
}

const cwd = process.cwd();
loadDotenv({ path: path.resolve(cwd, '.env'), quiet: true });
loadDotenv({ path: path.resolve(cwd, `.env.${testEnv}`), override: false, quiet: true });

const defaults = ENVIRONMENT_DEFAULTS[testEnv];

const EnvSchema = z.object({
  TEST_ENV: z.enum(ENVIRONMENTS).default('dev'),
  BASE_URL: z
    .string()
    .url()
    .default(defaults.baseUrl || 'http://invalid'),
  API_URL: z
    .string()
    .url()
    .default(defaults.apiUrl || 'http://invalid'),
  CI: z
    .string()
    .optional()
    .transform((v) => v === 'true' || v === '1'),
  STANDARD_USER: z.string().default('standard_user'),
  STANDARD_PASSWORD: z.string().default('secret_sauce'),
  LOCKED_USER: z.string().default('locked_out_user'),
  PROBLEM_USER: z.string().default('problem_user'),
  PERFORMANCE_USER: z.string().default('performance_glitch_user'),
});

export type Env = z.infer<typeof EnvSchema>;

const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('[env] Invalid environment variables:');
  console.error(JSON.stringify(parsed.error.format(), null, 2));
  process.exit(1);
}

export const env: Env = parsed.data;
