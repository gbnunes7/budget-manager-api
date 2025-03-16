import type { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import type { DomainEvents } from '../../../../core/events/domain-events';
import type { Transaction } from '../entities/transaction';

export class TransactionDeletedEvent implements DomainEvents {
  public ocurredAt: Date;
  public transaction: Transaction;

  constructor(transaction: Transaction) {
    this.ocurredAt = new Date();
    this.transaction = transaction;
  }

  getAggregateId(): UniqueEntityId {
    return this.transaction.id;
  }
}
