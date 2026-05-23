import { faker } from '@faker-js/faker';

/**
 * Builder pattern example. Produces a random user with sane defaults that
 * any field can override fluently. Useful for:
 *   - SauceDemo checkout (firstName / lastName / postalCode)
 *   - API tests that need a realistic payload (reqres.in users want
 *     name + job)
 *
 * Faker is deterministic when seeded; tests can call `faker.seed(N)` in
 * a `beforeAll` if reproducibility matters.
 */
export interface RandomUser {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  postalCode: string;
  job: string;
}

export class UserBuilder {
  private state: Partial<RandomUser> = {};

  withFirstName(firstName: string): this {
    this.state.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): this {
    this.state.lastName = lastName;
    return this;
  }

  withEmail(email: string): this {
    this.state.email = email;
    return this;
  }

  withPhone(phone: string): this {
    this.state.phone = phone;
    return this;
  }

  withPostalCode(postalCode: string): this {
    this.state.postalCode = postalCode;
    return this;
  }

  withJob(job: string): this {
    this.state.job = job;
    return this;
  }

  build(): RandomUser {
    const firstName = this.state.firstName ?? faker.person.firstName();
    const lastName = this.state.lastName ?? faker.person.lastName();
    return {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: this.state.email ?? faker.internet.email({ firstName, lastName }).toLowerCase(),
      phone: this.state.phone ?? faker.phone.number(),
      postalCode: this.state.postalCode ?? faker.location.zipCode(),
      job: this.state.job ?? faker.person.jobTitle(),
    };
  }
}

/** Fluent entry point — read as "a user (...)". */
export const aUser = (): UserBuilder => new UserBuilder();
