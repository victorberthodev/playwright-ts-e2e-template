import type { z } from 'zod';
import type {
  AddressSchema,
  CompanySchema,
  CreatedUserResponseSchema,
  CreateUserPayloadSchema,
  GeoSchema,
  UserListSchema,
  UserSchema,
} from '@/api/schemas/user.schema';

/**
 * DTOs inferred from the Zod schemas. Importing types from here (rather
 * than the schema module) keeps consumers free of a Zod runtime
 * dependency where they only need the shape.
 */

export type Geo = z.infer<typeof GeoSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type User = z.infer<typeof UserSchema>;
export type UserList = z.infer<typeof UserListSchema>;
export type CreateUserPayload = z.infer<typeof CreateUserPayloadSchema>;
export type CreatedUserResponse = z.infer<typeof CreatedUserResponseSchema>;
