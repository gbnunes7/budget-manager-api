import { expect, it, describe, beforeEach } from 'vitest';
import { OnTransactionCreated } from './on-transaction-created';
import { Transaction } from '../../enterprise/entities/transaction';
import { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import { InMemoryTransactionRepository } from '../../../../../test/repositories/in-memory-transaction-repository';
import { CreateTransactionUseCases } from '../use-cases/create-transaction-use-case';
import { DomainEvents } from '../../../../core/events/domain-events';
import { InMemoryBalanceRepository } from '../../../../../test/repositories/in-memory-balance-repository';
import { UpdateBalanceUseCase } from '../use-cases/update-balance';

let transactionRepository: InMemoryTransactionRepository;
let balanceRepository: InMemoryBalanceRepository;
let createTransactionUseCase: CreateTransactionUseCases;
let updateBalanceUseCase: UpdateBalanceUseCase;

describe('OnTransactionCreated', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
    balanceRepository = new InMemoryBalanceRepository();
    updateBalanceUseCase = new UpdateBalanceUseCase(balanceRepository);
    createTransactionUseCase = new CreateTransactionUseCases(transactionRepository);

    
    new OnTransactionCreated(balanceRepository, updateBalanceUseCase);
  });

  it('should update balance when a transaction is created', async () => {
    const transaction = Transaction.create({
      amount: 100,
      balanceId: new UniqueEntityId('balance-1'),
      categoryId: new UniqueEntityId('category-1'),
      date: new Date(),
      description: 'Test transaction',
      type: 'INCOME',
      userId: new UniqueEntityId('user-1'),
    });

    // saving transaction to trigger the event
    await transactionRepository.save(transaction);

    // Dispatching events
    DomainEvents.dispatchEventsForAggregate(transaction.id);

    // waiting for the event to be processed
    await new Promise((resolve) => setTimeout(resolve, 10));

    const balance = await balanceRepository.findByUserId('user-1');

    expect(balance).toBeTruthy();
    expect(balance?.amount).toBe(100);
  });

  it('should be subtract my balance', async () => {
    
    const transaction = Transaction.create({
      amount: 100,
      balanceId: new UniqueEntityId('balance-1'),
      categoryId: new UniqueEntityId('category-1'),
      date: new Date(),
      description: 'Test transaction',
      type: 'EXPENSE',
      userId: new UniqueEntityId('user-1'),
    });

    // saving transaction to trigger the event
    await transactionRepository.save(transaction);

    // Dispatching events
    DomainEvents.dispatchEventsForAggregate(transaction.id);

    // waiting for the event to be processed
    await new Promise((resolve) => setTimeout(resolve, 10));

    const balance = await balanceRepository.findByUserId('user-1');

    expect(balance).toBeTruthy();
    expect(balance?.amount).toBe(-100);


  });
});