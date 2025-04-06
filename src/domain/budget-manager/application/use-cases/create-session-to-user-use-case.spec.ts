import { expect, it, describe, beforeEach } from 'vitest';
import { InMemoryUserRepository } from '../../../../../test/repositories/in-memory-user-repository';
import { CreateSessionToUserUseCase } from './create-session-to-user-use-case';
import * as bcrypt from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import { User } from '../../enterprise/entities/user';
import { FakeHasher } from '../../../../../test/cryptography/fake-hasher';

let userRepository: InMemoryUserRepository;
let sut: CreateSessionToUserUseCase;
let fakeComparer: FakeHasher;

describe('CreateSessionToUserUseCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    fakeComparer = new FakeHasher();
    sut = new CreateSessionToUserUseCase(userRepository, fakeComparer);
  });

  it('should authenticate a user with correct credentials', async () => {
    const email = 'test@example.com';
    const password = 'securepassword';
    const hashedPassword = await fakeComparer.hash(password);

    const user = User.create(
      {
        name: 'Test User',
        email,
        passwordHash: hashedPassword,
      },
      new UniqueEntityId('user_id').toString(),
    );

    await userRepository.create(user);

    const response = await sut.execute(email, password);

    expect(response.isRight()).toBe(true);
    if (response.isRight()) {
      expect(response.value.userWithoutPassword).toEqual({
        id: 'user_id',
        name: 'Test User',
        email,
      });
    }
  });

  it('should return an error if the email does not exist', async () => {
    const response = await sut.execute('invalid@example.com', 'password');

    expect(response.isLeft()).toBe(true);
    if (response.isLeft()) {
      expect(response.value).toBeInstanceOf(InvalidCredentialsError);
    }
  });

  it('should return an error if the password is incorrect', async () => {
    const email = 'test@example.com';
    const password = 'securepassword';
    const wrongPassword = 'wrongpassword';
    const hashedPassword = await fakeComparer.hash(password);

    const user = User.create(
      {
        name: 'Test User',
        email,
        passwordHash: hashedPassword,
      },
      new UniqueEntityId('user_id').toString(),
    );

    await userRepository.create(user);

    const response = await sut.execute(email, wrongPassword);

    expect(response.isLeft()).toBe(true);
    if (response.isLeft()) {
      expect(response.value).toBeInstanceOf(InvalidCredentialsError);
    }
  });
});
