import type { ITransactionRepository } from '../../src/domain/budget-manager/application/repositories/transaction-repository';
import type { Transaction } from '../../src/domain/budget-manager/enterprise/entities/transaction';

export class InMemoryTransactionRepository implements ITransactionRepository {
  public transaction: Transaction[] = [];

  async create(transaction: Transaction): Promise<Transaction> {
    this.transaction.push(transaction);
    return transaction
  }
}
