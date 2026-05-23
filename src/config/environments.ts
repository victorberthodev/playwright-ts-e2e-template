/**
 * Environment registry. Defaults shipped here; per-env overrides land in
 * .env.{dev,stg,prd}. The dev defaults point at the public SauceDemo +
 * reqres.in so the template works out-of-the-box on first clone.
 */

export const ENVIRONMENTS = ['dev', 'stg', 'prd'] as const;
export type Environment = (typeof ENVIRONMENTS)[number];

export interface EnvironmentConfig {
  baseUrl: string;
  apiUrl: string;
}

export const ENVIRONMENT_DEFAULTS: Record<Environment, EnvironmentConfig> = {
  dev: {
    baseUrl: 'https://www.saucedemo.com',
    apiUrl: 'https://reqres.in/api',
  },
  stg: {
    baseUrl: '',
    apiUrl: '',
  },
  prd: {
    baseUrl: '',
    apiUrl: '',
  },
};

export function isEnvironment(value: string): value is Environment {
  return (ENVIRONMENTS as readonly string[]).includes(value);
}
