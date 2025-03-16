import { AggregateRoot } from '../../../../core/entitites/aggregate-root';
import type { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import { DomainEvents } from '../../../../core/events/domain-events';
import { TransactionCreatedEvent } from '../events/transaction-created-event';
import { TransactionDeletedEvent } from '../events/transaction-deleted-event';

export interface TransactionProps {
  categoryId: UniqueEntityId;
  amount: number;
  description: string;
  date: Date;
  balanceId: UniqueEntityId;
  type: 'EXPENSE' | 'INCOME';
  userId: UniqueEntityId;
}

class Transaction extends AggregateRoot<TransactionProps> {
  get categoryId(): UniqueEntityId {
    return this.props.categoryId;
  }

  get amount(): number {
    return this.props.amount;
  }

  get balanceId(): UniqueEntityId {
    return this.props.balanceId;
  }

  get description(): string {
    return this.props.description;
  }

  get date(): Date {
    return this.props.date;
  }

  get type(): 'EXPENSE' | 'INCOME' {
    return this.props.type;
  }

  get userId(): UniqueEntityId {
    return this.props.userId;
  }

  set categoryId(categoryId: UniqueEntityId) {
    this.props.categoryId = categoryId;
  }

  set amount(amount: number) {
    this.props.amount = amount;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set type(type: 'EXPENSE' | 'INCOME') {
    this.props.type = type;
  }

  private constructor(props: TransactionProps, id?: string) {
    super(props, id);
  }

  public static create(props: TransactionProps, id?: string): Transaction {

    const transaction = new Transaction(props, id);

    transaction.addDomainEvent(new TransactionCreatedEvent(transaction));

    return transaction;
  }

  public delete(): void {
    this.addDomainEvent(new TransactionDeletedEvent(this));
  }
}

export { Transaction };
