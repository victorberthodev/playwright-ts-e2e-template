import { expect, test } from '@/fixtures';
import { UsersClient } from '@/api/clients/users.client';
import { aUser } from '@/data/builders/user.builder';

test.describe('Users API', () => {
  test(
    'GET /users returns a non-empty list matching the schema',
    {
      tag: ['@smoke', '@api'],
      annotation: [
        { type: 'feature', description: 'Users API' },
        { type: 'story', description: 'List endpoint returns a valid user collection' },
        { type: 'severity', description: 'critical' },
      ],
    },
    async ({ apiContext }) => {
      const client = new UsersClient(apiContext);
      const users = await client.list();

      // Schema validation happens inside the client; reaching here proves
      // every user in the list matches UserSchema.
      expect(users.length).toBeGreaterThan(0);
      expect(users[0]?.id).toBeGreaterThan(0);
    },
  );

  test(
    'GET /users/:id returns the expected user shape',
    {
      tag: ['@regression', '@api'],
      annotation: [
        { type: 'feature', description: 'Users API' },
        { type: 'story', description: 'Single user retrieval — happy path' },
        { type: 'severity', description: 'normal' },
      ],
    },
    async ({ apiContext }) => {
      const client = new UsersClient(apiContext);
      const user = await client.getById(1);

      expect(user.id).toBe(1);
      expect(user.email).toBeTruthy();
      expect(user.address.zipcode).toBeTruthy();
    },
  );

  test(
    'GET /users/:id returns 404 for an unknown id',
    {
      tag: ['@regression', '@api'],
      annotation: [
        { type: 'feature', description: 'Users API' },
        { type: 'story', description: 'Unknown id surfaces 404 — negative path' },
        { type: 'severity', description: 'normal' },
      ],
    },
    async ({ apiContext }) => {
      const client = new UsersClient(apiContext);
      const response = await client.getByIdRaw(999_999);

      expect(response.status()).toBe(404);
    },
  );

  test(
    'POST /users echoes the payload with a fresh id',
    {
      tag: ['@regression', '@api'],
      annotation: [
        { type: 'feature', description: 'Users API' },
        {
          type: 'story',
          description:
            'Create user — contract verification (JSONPlaceholder simulates persistence)',
        },
        { type: 'severity', description: 'normal' },
      ],
    },
    async ({ apiContext }) => {
      const client = new UsersClient(apiContext);
      const fake = aUser().build();

      const created = await client.create({
        name: fake.fullName,
        username: fake.firstName,
        email: fake.email,
      });

      expect(created.id).toBeGreaterThan(0);
      expect(created.name).toBe(fake.fullName);
      expect(created.email).toBe(fake.email);
    },
  );
});
