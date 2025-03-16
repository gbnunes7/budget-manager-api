import { DomainEvents } from '../../src/core/events/domain-events';
import type { ITransactionRepository } from '../../src/domain/budget-manager/application/repositories/transaction-repository';
import type { Transaction } from '../../src/domain/budget-manager/enterprise/entities/transaction';

export class InMemoryTransactionRepository implements ITransactionRepository {
  public transaction: Transaction[] = [];

  async create(transaction: Transaction): Promise<Transaction> {
    this.transaction.push(transaction);
    DomainEvents.dispatchEventsForAggregate(transaction.id);
    return transaction;
  }

  async findById(id: string): Promise<Transaction | null> {
    return (
      this.transaction.find(
        (transaction) => transaction.id.toString() === id,
      ) || null
    );
  }

  async save(transaction: Transaction): Promise<void> {
    const index = this.transaction.findIndex((t) =>
      t.id.equals(transaction.id),
    );

    if (index !== -1) {
      this.transaction[index] = transaction;
    } else {
      this.transaction.push(transaction);
    }

    DomainEvents.dispatchEventsForAggregate(transaction.id);
}

async delete(transaction: Transaction): Promise<void> {

  this.transaction = this.transaction.filter(
    (t) => !t.id.equals(transaction.id),
  );

  DomainEvents.dispatchEventsForAggregate(transaction.id);
}
}
