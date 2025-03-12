import { Entity } from '../../../../core/entitites/entity';

interface FinancialGoalsProps {
  goalValue: number;
  goalDate: Date;
  createdAt: Date;
  description: string;
}

class FinancialGoals extends Entity<FinancialGoalsProps> {
  get goalValue(): number {
    return this.props.goalValue;
  }

  get goalDate(): Date {
    return this.props.goalDate;
  }

  get description(): string {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: FinancialGoalsProps, id?: string) {
    super(props, id);
  }

  static create(props: FinancialGoalsProps, id?: string): FinancialGoals {
    return new FinancialGoals(props, id);
  }
}

export { FinancialGoals };
