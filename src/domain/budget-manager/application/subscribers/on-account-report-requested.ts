import { DomainEvents } from '../../../../core/events/domain-events';
import type { EventHandler } from '../../../../core/events/event-handler';
import { AccountReportRequestedEvent } from '../../enterprise/events/account-report-requested-event';
import type { ITransactionRepository } from '../repositories/transaction-repository';
import type { IBalanceRepository } from '../repositories/balance-repository';
import type { GenerateAccountReportUseCase } from '../use-cases/create-account-report-use-case';

export class OnAccountReportRequested implements EventHandler {
  constructor(
    private transactionRepository: ITransactionRepository,
    private balanceRepository: IBalanceRepository,
    private generateAccountReportUseCases: GenerateAccountReportUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.fetchReportData.bind(this),
      AccountReportRequestedEvent.name,
    );
  }

  private async fetchReportData(
    event: AccountReportRequestedEvent,
  ): Promise<void> {
    console.log(
      '[DEBUG] Buscando dados para o relatório do usuário:',
      event.accountReport.id.toString(),
    );

    const balance = await this.balanceRepository.findByUserId(
      event.accountReport.id.toString(),
    );

    if (!balance) {
      console.log('[ERROR] User balance not found.');
      return;
    }

    const transactions =
      await this.transactionRepository.getTransactionsByUserIdAndDataRange(
        event.accountReport.userId.toString(),
        event.accountReport.startDate,
        event.accountReport.endDate,
      );

    const totalIncome = transactions
      .filter((t) => t.type === 'INCOME')
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((acc, t) => acc + t.amount, 0);

    await this.generateAccountReportUseCases.execute({
      userId: event.accountReport.userId.toString(),
      totalBalance: balance.amount,
      totalIncome,
      totalExpense,
      startDate: event.accountReport.startDate,
      endDate: event.accountReport.endDate,
    });
  }
}
