import type { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import type { DomainEvents } from '../../../../core/events/domain-events';
import type { AccountReport } from '../entities/account-report';

export class AccountReportRequestedEvent implements DomainEvents {
  public ocurredAt: Date;
  public accountReport: AccountReport;

  constructor(accountReport: AccountReport) {
    this.ocurredAt = new Date();
    this.accountReport = accountReport;
  }

  getAggregateId(): UniqueEntityId {
    return this.accountReport.id;
  }
}
