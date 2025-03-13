import type { Transaction } from '../../enterprise/entities/transaction';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
}
