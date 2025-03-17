import { expect, it, describe, beforeEach } from 'vitest';
import { OnTransactionCreated } from './on-transaction-created';
import { Transaction } from '../../enterprise/entities/transaction';
import { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import { InMemoryTransactionRepository } from '../../../../../test/repositories/in-memory-transaction-repository';
import { CreateTransactionUseCases } from '../use-cases/create-transaction-use-case';
import { DomainEvents } from '../../../../core/events/domain-events';
import { InMemoryBalanceRepository } from '../../../../../test/repositories/in-memory-balance-repository';
import { UpdateBalanceUseCase } from '../use-cases/update-balance';
import { InMemoryUserRepository } from '../../../../../test/repositories/in-memory-user-repository';
import { CreateUserUseCases } from '../use-cases/create-user-use-case';
import { CreateBalanceUseCases } from '../use-cases/create-balance-use-case';
import { OnUserCreated } from './on-user-created';
import { User } from '../../enterprise/entities/user';

let userRepository: InMemoryUserRepository;
let balanceRepository: InMemoryBalanceRepository;
let createUserUseCases: CreateUserUseCases;
let createBalanceUseCase: CreateBalanceUseCases;

describe('OnTransactionCreated', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    balanceRepository = new InMemoryBalanceRepository();
    createBalanceUseCase = new CreateBalanceUseCases(balanceRepository);
    createUserUseCases = new CreateUserUseCases(userRepository);

    new OnUserCreated(userRepository, createBalanceUseCase);
  });

  it('should create a balance for the user', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'mail@mail.com',
      passwordHash: '123456',
    });

    await userRepository.create(user);

    await userRepository.save(user);

    DomainEvents.dispatchEventsForAggregate(user.id);

    await new Promise((resolve) => setTimeout(resolve, 10));

    const balance = await balanceRepository.findByUserId(user.id.toString());

    expect(balance).toBeTruthy();
    expect(balance?.amount).toBe(0);
  });
});
