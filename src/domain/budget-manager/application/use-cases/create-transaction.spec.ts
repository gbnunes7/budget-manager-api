import { expect, it, describe, beforeEach } from 'vitest';
import { InMemoryTransactionRepository } from '../../../../../test/repositories/in-memory-transaction-repository';
import { CreateTransactionUseCases } from './create-transaction';
import { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';

let transactionRepository: InMemoryTransactionRepository;
let sut: CreateTransactionUseCases;

describe('CreateTransactionUseCases', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
    sut = new CreateTransactionUseCases(transactionRepository);
  });

  it('should be able to create a transaction', async () => {
    const response = await sut.execute({
      amount: 1000,
      balanceId: new UniqueEntityId('1'),
      categoryId: new UniqueEntityId('1'),
      date: new Date(),
      description: 'Test',
      type: 'EXPENSE',
      userId: new UniqueEntityId('1'),
    });

    expect(response.isRight()).toBe(true);
    expect(transactionRepository.transaction.length).toBe(1);
  });

  it("shouldn't be able to create a transaction with a negative value", async () => {
    const response = await sut.execute({
      amount: -1000,
      balanceId: new UniqueEntityId('1'),
      categoryId: new UniqueEntityId('1'),
      date: new Date(),
      description: 'Test',
      type: 'EXPENSE',
      userId: new UniqueEntityId('1'),
    });

    expect(response.isLeft()).toBe(true);
    expect(transactionRepository.transaction.length).toBe(0);
  });

  it("shouldn't be able to create a transaction with no type", async () => {
    const response = await sut.execute({
      amount: 1000,
      balanceId: new UniqueEntityId('1'),
      categoryId: new UniqueEntityId('1'),
      date: new Date(),
      description: 'Test',
      // biome-ignore lint: this is a test to check if the error is being thrown
      type: '' as any,
      userId: new UniqueEntityId('1'),
    });

    expect(response.isLeft()).toBe(true);
    expect(transactionRepository.transaction.length).toBe(0);
  });

  it("shouldn't be able to create a transaction with an invalid category id", async () => {
    const response = await sut.execute({
      amount: 1000,
      balanceId: new UniqueEntityId('1'),
      categoryId: new UniqueEntityId(''),
      date: new Date(),
      description: 'Test',
      type: 'EXPENSE',
      userId: new UniqueEntityId('1'),
    });

    expect(response.isLeft()).toBe(true);
    expect(transactionRepository.transaction.length).toBe(0);
  });

  it("shouldn't be able to create a transaction if date is greater than today ", async () => {
    const response = await sut.execute({
      amount: 1000,
      balanceId: new UniqueEntityId('1'),
      categoryId: new UniqueEntityId('1'),
      date: new Date('2028-01-01'),
      description: 'a',
      type: 'EXPENSE',
      userId: new UniqueEntityId('1'),
    });

    expect(response.isLeft()).toBe(true);
    expect(transactionRepository.transaction.length).toBe(0);
  });

  it("shouldn't be able to create a transaction if balance id isn't valid ", async () => {
    const response = await sut.execute({
      amount: 1000,
      balanceId: new UniqueEntityId(''),
      categoryId: new UniqueEntityId('1'),
      date: new Date(),
      description: 'a',
      type: 'EXPENSE',
      userId: new UniqueEntityId('1'),
    });

    expect(response.isLeft()).toBe(true);
    expect(transactionRepository.transaction.length).toBe(0);
  });

  it("shouldn't be able to create a transaction without a description", async () => {
    const response = await sut.execute({
      amount: 1000,
      balanceId: new UniqueEntityId('1'),
      categoryId: new UniqueEntityId('1'),
      date: new Date(),
      description: '',
      type: 'EXPENSE',
      userId: new UniqueEntityId('1'),
    });

    expect(response.isLeft()).toBe(true);
    expect(transactionRepository.transaction.length).toBe(0);
  });
});
