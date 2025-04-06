import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';

import { TransactionsRepository } from '../../prisma/repositories/prisma-transactions-repository';
import { CreateTransactionUseCases } from '../../../domain/budget-manager/application/use-cases/create-transaction-use-case';
import { CreateTransactionController } from '../controller/create-transaction.controller-spec';
import { DeleteTransactionUseCases } from '../../../domain/budget-manager/application/use-cases/delete-transaction-use-case';
import { DeleteTransactionController } from '../controller/delete-transaction.controller';
import { FilterTransactionsUseCase } from '../../../domain/budget-manager/application/use-cases/filter-transactions-use-case';
import { FilterTransactionController } from '../controller/filter-transaction.controller';

export async function createAppTransaction() {
  const app = express();

  const prisma = new PrismaClient();
  app.use(express.json());
  app.use(cors());

  const transactionRepo = new TransactionsRepository(prisma);
  const createTransactionUseCase = new CreateTransactionUseCases(
    transactionRepo,
  );
  const controller = new CreateTransactionController(createTransactionUseCase);

  const deleteTransactionUseCase = new DeleteTransactionUseCases(
    transactionRepo,
  );

  const deleteTransactionController = new DeleteTransactionController(
    deleteTransactionUseCase,
  );

  const filterTransactionUseCase = new FilterTransactionsUseCase(
    transactionRepo,
  );

  const filterTransactionController = new FilterTransactionController(
    filterTransactionUseCase,
  );

  await prisma.user.create({
    data: {
      id: '1',
      name: 'John Doe',
      email: 'bielrj170@gmail.com',
      password_hash: '123456',
    },
  });

  await prisma.category.create({
    data: {
      id: '1',
      name: 'Alimentação',
      type: 'EXPENSE',
    },
  });

  await prisma.balance.create({
    data: {
      id: '1',
      amount: 0,
      user: {
        connect: {
          id: '1',
        },
      },
    },
  });

  await prisma.transactions.create({
    data: {
      id: '1',
      userId: '1',
      amount: 100,
      description: 'Invalid user, balance or category',
      type: 'INCOME',
      balanceId: '1',
      categoryId: '1',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.transactions.createMany({
    data: [
      {
        id: '2',
        userId: '1',
        amount: 200,
        description: 'Salary',
        type: 'INCOME',
        balanceId: '1',
        categoryId: '1',
        date: new Date('2023-01-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        userId: '1',
        amount: 50,
        description: 'Groceries',
        type: 'EXPENSE',
        balanceId: '1',
        categoryId: '1',
        date: new Date('2023-01-02'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        userId: '1',
        amount: 150,
        description: 'Freelance Work',
        type: 'INCOME',
        balanceId: '1',
        categoryId: '1',
        date: new Date('2023-01-03'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5',
        userId: '1',
        amount: 30,
        description: 'Transport',
        type: 'EXPENSE',
        balanceId: '1',
        categoryId: '1',
        date: new Date('2023-01-04'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  app.post('/transaction', controller.handle);
  app.delete('/transaction/:transactionId', deleteTransactionController.handle);
  app.post('/transaction/filter', filterTransactionController.handle);

  return app;
}
