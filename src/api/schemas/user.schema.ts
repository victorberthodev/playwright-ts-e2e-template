import { z } from 'zod';

/**
 * Zod schemas for the JSONPlaceholder /users endpoint. Source of truth
 * for runtime validation in API tests AND for the TypeScript types
 * exposed by `@/api/types/api.types` (`z.infer` keeps the two in sync).
 *
 * https://jsonplaceholder.typicode.com/users
 */

export const GeoSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});

export const AddressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: GeoSchema,
});

export const CompanySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

export const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  address: AddressSchema,
  phone: z.string().min(1),
  website: z.string().min(1),
  company: CompanySchema,
});

export const UserListSchema = z.array(UserSchema);

/** Payload sent on POST /users. */
export const CreateUserPayloadSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
});

/**
 * JSONPlaceholder echoes the payload back and assigns a synthetic id (11
 * since there are 10 seed users). Schema mirrors that contract.
 */
export const CreatedUserResponseSchema = CreateUserPayloadSchema.extend({
  id: z.number().int().positive(),
});
