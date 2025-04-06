import { expect, it, describe, beforeEach } from 'vitest';
import { InMemoryTransactionRepository } from '../../../../../test/repositories/in-memory-transaction-repository';
import { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import { FilterTransactionsUseCase } from './filter-transactions-use-case';
import { Transaction } from '../../enterprise/entities/transaction';

let transactionRepository: InMemoryTransactionRepository;
let sut: FilterTransactionsUseCase;

describe('FilterTransactionsUseCase', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
    sut = new FilterTransactionsUseCase(transactionRepository);
  });

  it('should be able to filter transactions by userId', async () => {
    const transaction1 = Transaction.create({
      amount: 1000,
      balanceId: new UniqueEntityId('1'),
      categoryId: new UniqueEntityId('1'),
      date: new Date(),
      description: 'Test 1',
      type: 'EXPENSE',
      userId: new UniqueEntityId('1'),
    });

    const transaction2 = Transaction.create({
      amount: 500,
      balanceId: new UniqueEntityId('2'),
      categoryId: new UniqueEntityId('2'),
      date: new Date(),
      description: 'Test 2',
      type: 'INCOME',
      userId: new UniqueEntityId('2'),
    });

    await transactionRepository.create(transaction1);
    await transactionRepository.create(transaction2);

    const response = await sut.execute({ userId: '1' });

    expect(response.isRight()).toBe(true);

    if (response.isRight()) {
      expect(response.value.transactions).toHaveLength(1);
      expect(response.value.transactions[0].userId.toString()).toBe('1');
    }
  });

  it('should return an empty array if no transactions match the filter', async () => {
    const response = await sut.execute({ userId: 'non-existent' });

    expect(response.isRight()).toBe(true);

    if (response.isRight()) {
      expect(response.value.transactions).toHaveLength(0);
    }
  });

  it('should be able to filter transactions by multiple criteria', async () => {
    const transaction1 = Transaction.create({
      amount: 1000,
      balanceId: new UniqueEntityId('1'),
      categoryId: new UniqueEntityId('1'),
      date: new Date(),
      description: 'Filtered transaction',
      type: 'EXPENSE',
      userId: new UniqueEntityId('1'),
    });

    const transaction2 = Transaction.create({
      amount: 2000,
      balanceId: new UniqueEntityId('1'),
      categoryId: new UniqueEntityId('1'),
      date: new Date(),
      description: 'Different transaction',
      type: 'INCOME',
      userId: new UniqueEntityId('1'),
    });

    await transactionRepository.create(transaction1);
    await transactionRepository.create(transaction2);

    const response = await sut.execute({
      userId: '1',
      type: 'EXPENSE',
    });

    expect(response.isRight()).toBe(true);

    if (response.isRight()) {
      expect(response.value.transactions).toHaveLength(1);
      expect(response.value.transactions[0].type).toBe('EXPENSE');
    }
  });
});
