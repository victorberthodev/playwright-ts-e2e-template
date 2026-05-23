import { env } from '@/utils/env';

/**
 * SauceDemo public test users. Usernames come from env so they can be
 * swapped per-environment. The password is shared across all users — a
 * SauceDemo quirk, not a security claim.
 */
export interface Credentials {
  username: string;
  password: string;
}

export const SAUCEDEMO_USERS = {
  standard: { username: env.STANDARD_USER, password: env.STANDARD_PASSWORD },
  locked: { username: env.LOCKED_USER, password: env.STANDARD_PASSWORD },
  problem: { username: env.PROBLEM_USER, password: env.STANDARD_PASSWORD },
  performance: { username: env.PERFORMANCE_USER, password: env.STANDARD_PASSWORD },
} as const satisfies Record<string, Credentials>;

export type SauceDemoUserKey = keyof typeof SAUCEDEMO_USERS;

/** SauceDemo product slugs — match the data-test suffixes on the inventory page. */
export const PRODUCTS = {
  backpack: 'sauce-labs-backpack',
  bikeLight: 'sauce-labs-bike-light',
  boltTshirt: 'sauce-labs-bolt-t-shirt',
  fleeceJacket: 'sauce-labs-fleece-jacket',
  onesie: 'sauce-labs-onesie',
  redTshirt: 'test.allthethings()-t-shirt-(red)',
} as const;

export type ProductKey = keyof typeof PRODUCTS;
