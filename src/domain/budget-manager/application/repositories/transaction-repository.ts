import type { Transaction } from '../../enterprise/entities/transaction';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findById(id: string): Promise<Transaction | null>;
  delete(transaction: Transaction): Promise<void>
  save(transaction: Transaction): Promise<void>;
}
