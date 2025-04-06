import express from 'express';
import cors from 'cors';
import { UserRepository } from '../../prisma/repositories/prisma-user-repository';
import { PrismaClient } from '@prisma/client';
import { BcryptHasher } from '../../cryptography/bcyprt-hasher';
import { CreateSessionToUserUseCase } from '../../../domain/budget-manager/application/use-cases/create-session-to-user-use-case';
import { CreateSessionController } from '../controller/create-session.controller';

export async function createAppSession() {
  const app = express();

  const prisma = new PrismaClient();
  app.use(express.json());
  app.use(cors());

  const userRepo = new UserRepository(prisma);
  const hashGenerator = new BcryptHasher();
  const useCase = new CreateSessionToUserUseCase(userRepo, hashGenerator);
  const controller = new CreateSessionController(useCase);

  const password = await hashGenerator.hash('password123');

  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: password,
    },
  });

  app.post('/session', controller.handle);

  return app;
}
