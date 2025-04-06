import express from 'express';
import cors from 'cors';
import { CreateUserUseCases } from '../../../domain/budget-manager/application/use-cases/create-user-use-case';
import { UserRepository } from '../../prisma/repositories/prisma-user-repository';
import { CreateUserController } from '../controller/create-user.controller';
import { PrismaClient } from '@prisma/client';
import { BcryptHasher } from '../../cryptography/bcyprt-hasher';

export async function createApp() {
  const app = express();

  const prisma = new PrismaClient();
  app.use(express.json());
  app.use(cors());

  const userRepo = new UserRepository(prisma);
  const hashGenerator = new BcryptHasher();
  const useCase = new CreateUserUseCases(userRepo, hashGenerator);
  const controller = new CreateUserController(useCase);

  app.post('/register', controller.handle);

  return app;
}
