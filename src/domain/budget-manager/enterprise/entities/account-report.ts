import { AggregateRoot } from '../../../../core/entitites/aggregate-root';
import { Entity } from '../../../../core/entitites/entity';
import { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import { AccountReportRequestedEvent } from '../events/account-report-requested-event';

export interface AccountReportProps {
  userId: UniqueEntityId;
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

class AccountReport extends AggregateRoot<AccountReportProps> {
  get userId(): UniqueEntityId {
    return this.props.userId;
  }

  get totalBalance(): number {
    return this.props.totalBalance;
  }

  get totalIncome(): number {
    return this.props.totalIncome;
  }

  get totalExpense(): number {
    return this.props.totalExpense;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get endDate(): Date {
    return this.props.endDate;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: AccountReportProps, id?: string) {
    super(props, id);
  }

  static create(props: AccountReportProps, id?: string): AccountReport {
  const reportId = id ? new UniqueEntityId(id) : new UniqueEntityId(); 

  const report = new AccountReport(props, reportId.toString());

  report.addDomainEvent(new AccountReportRequestedEvent(report));

  return report;
}


  static generateReport(
    userId: UniqueEntityId,
    totalBalance: number,
    totalIncome: number,
    totalExpense: number,
    startDate: Date,
    endDate: Date
  ): AccountReport {
    return new AccountReport({
      userId,
      totalBalance,
      totalIncome,
      totalExpense,
      startDate,
      endDate,
      createdAt: new Date(),
    });
  }
}

export { AccountReport };
