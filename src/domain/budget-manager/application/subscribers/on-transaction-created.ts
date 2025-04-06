import { DomainEvents } from '../../../../core/events/domain-events';
import type { EventHandler } from '../../../../core/events/event-handler';
import { TransactionCreatedEvent } from '../../enterprise/events/transaction-created-event';
import type { IBalanceRepository } from '../repositories/balance-repository';
import type { UpdateBalanceUseCase } from '../use-cases/update-balance';

export class OnTransactionCreated implements EventHandler {
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
      TransactionCreatedEvent.name,
    );
  }

  private async updateBalance({
    transaction,
  }: TransactionCreatedEvent): Promise<void> {
    const balance = await this.balanceRepository.findByUserId(
      transaction.userId.toString(),
    );

    if (!balance) {
      const result = await this.updateBalanceUseCase.execute({
        userId: transaction.userId.toString(),
        amount: transaction.amount,
        operationType: transaction.type,
        createdAt: transaction.date,
      });
    } else {
      const result = await this.updateBalanceUseCase.execute({
        userId: transaction.userId.toString(),
        amount: transaction.amount,
        operationType: transaction.type,
        createdAt: transaction.date,
      });
    }
  }
}
