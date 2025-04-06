import { expect, it, describe, beforeEach } from 'vitest';
import { OnTransactionCreated } from './on-transaction-created';
import { Transaction } from '../../enterprise/entities/transaction';
import { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import { InMemoryTransactionRepository } from '../../../../../test/repositories/in-memory-transaction-repository';
import { CreateTransactionUseCases } from '../use-cases/create-transaction-use-case';
import { DomainEvents } from '../../../../core/events/domain-events';
import { InMemoryBalanceRepository } from '../../../../../test/repositories/in-memory-balance-repository';
import { UpdateBalanceUseCase } from '../use-cases/update-balance';
import { DeleteTransactionUseCases } from '../use-cases/delete-transaction-use-case';
import { OnTransactionDeleted } from './on-transaction-deleted';
import { Balance } from '../../enterprise/entities/balance';

let transactionRepository: InMemoryTransactionRepository;
let balanceRepository: InMemoryBalanceRepository;
let deleteTransactionUseCases: DeleteTransactionUseCases;
let updateBalanceUseCase: UpdateBalanceUseCase;

describe('OnTransactionDeleted', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
    balanceRepository = new InMemoryBalanceRepository();
    updateBalanceUseCase = new UpdateBalanceUseCase(balanceRepository);
    deleteTransactionUseCases = new DeleteTransactionUseCases(
      transactionRepository,
    );

    new OnTransactionDeleted(balanceRepository, updateBalanceUseCase);
  });

  it('should update balance when a transaction is deleted', async () => {

    const balanceAnt = await balanceRepository.create(
      Balance.create({
        amount: 0,
        userId: new UniqueEntityId('user-1'),
        createdAt: new Date(),
      })
    )

    const transaction = Transaction.create({
      amount: 352,
      balanceId: balanceAnt.id,
      categoryId: new UniqueEntityId('category-1'),
      date: new Date(),
      description: 'Test transaction',
      type: 'INCOME',
      userId: new UniqueEntityId('user-1'),
    });
  

    await transactionRepository.save(transaction);  

    const savedTransaction = await transactionRepository.findById(transaction.id.toString());

    if (!savedTransaction) throw new Error('Transaction was not saved!');

    await deleteTransactionUseCases.execute(transaction.id.toString());
  
    DomainEvents.dispatchEventsForAggregate(transaction.id);
  
    await new Promise((resolve) => setTimeout(resolve, 10));
  
    const balance = await balanceRepository.findByUserId('user-1');
  
    expect(balance).toBeTruthy();
    expect(balance?.amount).toBe(0); 
  });
});
