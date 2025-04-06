import { OnTransactionCreated } from '../../../domain/budget-manager/application/subscribers/on-transaction-created';
import { OnTransactionDeleted } from '../../../domain/budget-manager/application/subscribers/on-transaction-deleted';
import { OnUserCreated } from '../../../domain/budget-manager/application/subscribers/on-user-created';
import { CreateBalanceUseCases } from '../../../domain/budget-manager/application/use-cases/create-balance-use-case';
import { UpdateBalanceUseCase } from '../../../domain/budget-manager/application/use-cases/update-balance';
import { prismaInstance } from '../../prisma/prisma';
import { BalanceRepository } from '../../prisma/repositories/prisma-balance-repository';
import { UserRepository } from '../../prisma/repositories/prisma-user-repository';

export function registerEventHandlers() {
  const userRepository = new UserRepository(prismaInstance);
  const balanceRepository = new BalanceRepository(prismaInstance);
  const createBalanceUseCase = new CreateBalanceUseCases(balanceRepository);
  const updateBalanceUseCase = new UpdateBalanceUseCase(balanceRepository);

  new OnUserCreated(userRepository, createBalanceUseCase);
  new OnTransactionDeleted(balanceRepository, updateBalanceUseCase);
  new OnTransactionCreated(balanceRepository, updateBalanceUseCase);
}
