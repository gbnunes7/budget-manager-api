import { DomainEvents } from '../../../../core/events/domain-events';
import { Transaction } from '../../enterprise/entities/transaction';
import type { ITransactionRepository } from '../repositories/transaction-repository';
import { TransactionNotFoundError } from './errors/transaction-not-found-error';

class DeleteTransactionUseCases {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(transactionId: string): Promise<void> {
    const transaction =
      await this.transactionRepository.findById(transactionId);


    if (!transaction) {
      throw new TransactionNotFoundError();
    }

    transaction.delete();

    await this.transactionRepository.delete(transaction);

    DomainEvents.dispatchEventsForAggregate(transaction.id);

  }
}

export { DeleteTransactionUseCases };
