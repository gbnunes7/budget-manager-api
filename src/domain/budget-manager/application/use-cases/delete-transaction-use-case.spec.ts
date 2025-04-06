import { expect, it, describe, beforeEach } from 'vitest';
import { InMemoryTransactionRepository } from '../../../../../test/repositories/in-memory-transaction-repository';
import { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import { DeleteTransactionUseCases } from './delete-transaction-use-case';
import { Transaction } from '../../enterprise/entities/transaction';

let transactionRepository: InMemoryTransactionRepository;
let sut: DeleteTransactionUseCases;

describe('DeleteTransactionUseCases', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
    sut = new DeleteTransactionUseCases(transactionRepository);
  });

  it('should be able to delete a transaction', async () => {
    const transaction = Transaction.create({
      amount: 100,
      type: 'EXPENSE',
      balanceId: new UniqueEntityId('1'),
      categoryId: new UniqueEntityId('1'),
      date: new Date(),
      description: 'Test transaction',
      userId: new UniqueEntityId('1'),
    });

    await transactionRepository.create(transaction);

    await sut.execute(transaction.id.toString());

    const foundTransaction = await transactionRepository.findById(
      transaction.id.toString(),
    );
    expect(foundTransaction).toBeNull();
  });

  it('should throw an error if the transaction does not exist', async () => {
    const transactionId = 'non-existing-transaction-id';

    const transactionDeleted = await sut.execute(transactionId);

    expect(transactionDeleted.isLeft()).toBe(true);
  });
});
