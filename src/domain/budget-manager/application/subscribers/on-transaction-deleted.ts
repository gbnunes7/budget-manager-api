import { DomainEvents } from '../../../../core/events/domain-events';
import type { EventHandler } from '../../../../core/events/event-handler';
import { TransactionCreatedEvent } from '../../enterprise/events/transaction-created-event';
import { TransactionDeletedEvent } from '../../enterprise/events/transaction-deleted-event';
import type { IBalanceRepository } from '../repositories/balance-repository';
import type { DeleteTransactionUseCases } from '../use-cases/delete-transaction-use-case';
import type { UpdateBalanceUseCase } from '../use-cases/update-balance';

export class OnTransactionDeleted implements EventHandler {
  //biome-ignore lint:
  constructor(
    private balanceRepository: IBalanceRepository,
    private updateBalanceUseCase: UpdateBalanceUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.updateBalance.bind(this),
      TransactionDeletedEvent.name,
    );
  }

  private async updateBalance({
    transaction,
  }: TransactionDeletedEvent): Promise<void> {
    const balance = await this.balanceRepository.findByUserId(
      transaction.userId.toString(),
    );
    const effectiveAmount = transaction.type === 'INCOME' ? -transaction.amount : transaction.amount;

    if (!balance) {
      console.log('teste', effectiveAmount)
      await this.updateBalanceUseCase.execute({
        userId: transaction.userId.toString(),
        amount: transaction.amount,
        operationType: transaction.type,
        createdAt: transaction.date,
      });
    } else {
      console.log('teste', effectiveAmount)
      await this.updateBalanceUseCase.execute({
        userId: transaction.userId.toString(),
        amount: effectiveAmount,
        operationType: transaction.type,
        createdAt: transaction.date,
      });
    }
  }
}
