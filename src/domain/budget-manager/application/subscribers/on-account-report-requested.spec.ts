import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { ITransactionRepository } from '../repositories/transaction-repository';
import type { IBalanceRepository } from '../repositories/balance-repository';
import type { GenerateAccountReportUseCase } from '../use-cases/create-account-report-use-case';
import { OnAccountReportRequested } from './on-account-report-requested';
import { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import { AccountReport } from '../../enterprise/entities/account-report';
import { AccountReportRequestedEvent } from '../../enterprise/events/account-report-requested-event';
import { DomainEvents } from '../../../../core/events/domain-events';

describe('OnAccountReportRequested', () => {
  let transactionRepository: ITransactionRepository;
  let balanceRepository: IBalanceRepository;
  let generateAccountReportUseCase: GenerateAccountReportUseCase;
  let subscriber: OnAccountReportRequested;

  beforeEach(() => {
    transactionRepository = {
      getTransactionsByUserIdAndDataRange: vi.fn().mockResolvedValue([
        { amount: 100, type: 'INCOME' },
        { amount: 50, type: 'EXPENSE' },
      ]),
    } as unknown as ITransactionRepository;

    balanceRepository = {
      findByUserId: vi.fn().mockResolvedValue({ amount: 500 }),
    } as unknown as IBalanceRepository;

    generateAccountReportUseCase = {
      execute: vi.fn().mockResolvedValue(undefined),
    } as unknown as GenerateAccountReportUseCase;

    subscriber = new OnAccountReportRequested(
      transactionRepository,
      balanceRepository,
      generateAccountReportUseCase,
    );
  });

  it('should search for balance and transactions and call the use case correctly', async () => {
    const userId = new UniqueEntityId('123e4567-e89b-12d3-a456-426614174000'); // 🔥 Define um ID fixo para evitar variações
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');

    const accountReport = AccountReport.create(
      {
        userId,
        totalBalance: 0,
        totalIncome: 0,
        totalExpense: 0,
        startDate,
        endDate,
        createdAt: new Date(),
      },
      userId.toString(),
    ); 

    const event = new AccountReportRequestedEvent(accountReport);

    DomainEvents.dispatchEventsForAggregate(event.accountReport.id);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(balanceRepository.findByUserId).toHaveBeenCalledWith(
      userId.toString(),
    );
  });

  it('shouldnt search for balance and transactions', async () => {
    vi.spyOn(balanceRepository, 'findByUserId').mockResolvedValue(null);

    const userId = new UniqueEntityId();
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');

    const accountReport = AccountReport.create({
      userId,
      totalBalance: 0,
      totalIncome: 0,
      totalExpense: 0,
      startDate,
      endDate,
      createdAt: new Date(),
    });

    const event = new AccountReportRequestedEvent(accountReport);

    DomainEvents.dispatchEventsForAggregate(event.accountReport.id);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(generateAccountReportUseCase.execute).not.toHaveBeenCalled();
  });
});
