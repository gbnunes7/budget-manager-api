import { Entity } from '../../../../core/entitites/entity';
import type { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';

export interface BalanceProps {
  userId: UniqueEntityId;
  amount: number;
  createdAt: Date;
}

class Balance extends Entity<BalanceProps> {
  get userId(): UniqueEntityId {
    return this.props.userId;
  }

  get amount(): number {
    return this.props.amount;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set amount(amount: number) {
    this.props.amount = amount;
  }

  private constructor(props: BalanceProps, id?: string) {
    super(props, id);
  }

  static create(props: BalanceProps, id?: string): Balance {
    return new Balance(props, id);
  }

  updateAmount(amountDelta: number, updatedAt: Date, operationType: "INCOME" | "EXPENSE"): Balance {
    if (operationType === 'INCOME') {
      this.props.amount += amountDelta;
    } else if (operationType === 'EXPENSE') {
      this.props.amount -= amountDelta;
    }
  
    this.props.createdAt = updatedAt;
    return this;
  }

  static createEmpty(userId: UniqueEntityId): Balance {
    return new Balance({
      userId,
      amount: 0,
      createdAt: new Date(),
    });
  }
}

export { Balance };
