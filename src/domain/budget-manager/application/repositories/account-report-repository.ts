import type { AccountReport } from '../../enterprise/entities/account-report';

export interface IAccountReportRepository {
  create(accountReport: AccountReport): Promise<AccountReport>;
}
