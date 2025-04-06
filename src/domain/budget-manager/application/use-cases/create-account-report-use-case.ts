import { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import { AccountReport } from '../../enterprise/entities/account-report';
import type { IAccountReportRepository } from '../repositories/account-report-repository';

interface GenerateAccountReportInput {
  userId: string;
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  startDate: Date;
  endDate: Date;
}

class GenerateAccountReportUseCase {
  constructor(private accountReportRepository: IAccountReportRepository) {}

  async execute(input: GenerateAccountReportInput): Promise<void> {

    const report = AccountReport.generateReport(
      new UniqueEntityId(input.userId),
      input.totalBalance,
      input.totalIncome,
      input.totalExpense,
      input.startDate,
      input.endDate,
    );

    await this.accountReportRepository.create(report);
  }
}

export { GenerateAccountReportUseCase };
