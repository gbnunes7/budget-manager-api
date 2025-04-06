import { expect, it, describe, beforeEach } from 'vitest';
import { InMemoryUserRepository } from '../../../../../test/repositories/in-memory-user-repository';
import { CreateUserUseCases } from './create-user-use-case';
import { FakeHasher } from '../../../../../test/cryptography/fake-hasher';

let userRepository: InMemoryUserRepository;
let sut: CreateUserUseCases;
let fakeHasher: FakeHasher;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    fakeHasher = new FakeHasher();
    sut = new CreateUserUseCases(userRepository, fakeHasher);
  });

  it('should create a user', async () => {
    const response = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      passwordHash: 'any_password',
    });

    expect(response.isRight()).toBe(true);
  });
});
