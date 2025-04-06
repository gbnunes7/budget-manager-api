import type { NextFunction, Request, Response } from 'express';
import { CreateUserUseCases } from '../../../domain/budget-manager/application/use-cases/create-user-use-case';
import { prismaInstance } from '../../prisma/prisma';
import { UserRepository } from '../../prisma/repositories/prisma-user-repository';
import { z } from 'zod';
import { BcryptHasher } from '../../cryptography/bcyprt-hasher';

const bcryptHasher = new BcryptHasher();
const createUserRepository = new UserRepository(prismaInstance);
const createUserUseCases = new CreateUserUseCases(
  createUserRepository,
  bcryptHasher,
);

export class CreateUserController {
  constructor(private createAccount: CreateUserUseCases) {
    this.handle = this.handle.bind(this);
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const createUserBodySchema = z.object({
      name: z.string().nonempty(),
      email: z.string().email(),
      passwordHash: z.string(),
    });

    try {
      const { email, name, passwordHash } = createUserBodySchema.parse(
        request.body,
      );

      const user = await this.createAccount.execute({
        name,
        email,
        passwordHash,
      });

      if (user.isLeft()) {
        response.status(409).json({ error: user.value.message });
        return;
      }

      response.status(201).json({ message: 'User Created' });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';
      response.status(400).json({ error: errorMessage });
    }
  }
}

export const createUserController = new CreateUserController(
  createUserUseCases,
);
