import type { APIRequestContext, APIResponse } from '@playwright/test';
import { CreatedUserResponseSchema, UserListSchema, UserSchema } from '@/api/schemas/user.schema';
import type { CreatedUserResponse, CreateUserPayload, User, UserList } from '@/api/types/api.types';

/**
 * Typed client over the JSONPlaceholder /users endpoint. Each method that
 * expects a 2xx parses the response body against its Zod schema before
 * returning — so a contract drift fails the test loudly, not silently.
 *
 * For status-code assertions (negative paths like 404), use the `*Raw`
 * variants and inspect the returned `APIResponse` directly.
 */
export class UsersClient {
  constructor(private readonly request: APIRequestContext) {}

  async list(): Promise<UserList> {
    const response = await this.request.get('/users');
    if (!response.ok()) {
      throw new Error(`GET /users failed: ${response.status()} ${response.statusText()}`);
    }
    return UserListSchema.parse(await response.json());
  }

  async getById(id: number): Promise<User> {
    const response = await this.request.get(`/users/${id}`);
    if (!response.ok()) {
      throw new Error(`GET /users/${id} failed: ${response.status()} ${response.statusText()}`);
    }
    return UserSchema.parse(await response.json());
  }

  /** Raw GET — caller asserts status. Use for negative paths (e.g., 404). */
  async getByIdRaw(id: number): Promise<APIResponse> {
    return this.request.get(`/users/${id}`);
  }

  async create(payload: CreateUserPayload): Promise<CreatedUserResponse> {
    const response = await this.request.post('/users', { data: payload });
    if (!response.ok()) {
      throw new Error(`POST /users failed: ${response.status()} ${response.statusText()}`);
    }
    return CreatedUserResponseSchema.parse(await response.json());
  }
}
