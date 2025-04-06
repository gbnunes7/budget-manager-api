import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { CreateSessionToUserUseCase } from '../../../domain/budget-manager/application/use-cases/create-session-to-user-use-case';
import { JwtEncrypter } from '../../cryptography/jwt-encrypter';
import { env } from '../../env';
import { UserRepository } from '../../prisma/repositories/prisma-user-repository';
import { prismaInstance } from '../../prisma/prisma';
import { BcryptHasher } from '../../cryptography/bcyprt-hasher';
import { UserPresenter } from '../presenter/user-presenter';

const hashComparer = new BcryptHasher();
const createSessionRepository = new UserRepository(prismaInstance);
const createSessionToUserUseCases = new CreateSessionToUserUseCase(
  createSessionRepository,
  hashComparer,
);

export class CreateSessionController {
  constructor(private createSession: CreateSessionToUserUseCase) {
    this.handle = this.handle.bind(this);
  }

  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const createSessionBodySchema = z.object({
      email: z.string().email(),
      passwordHash: z.string(),
    });

    try {
      const { email, passwordHash } = createSessionBodySchema.parse(
        request.body,
      );

      const session = await this.createSession.execute(email, passwordHash);

      if (session.isLeft()) {
        response.status(401).json({ error: session.value.message });
        return;
      }

      const userLogged = session.value.userWithoutPassword;

      const jwtEncrypter = new JwtEncrypter(env.SECRET, { expiresIn: '1d' });

      const token = await jwtEncrypter.encrypt({
        userLogged,
      });

      const userToHttp = UserPresenter.toHTTP(userLogged);

      response.status(200).json({ user: userToHttp, token });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred';

      response.status(400).json({ error: errorMessage });
    }
  }
}

export const createSessionController = new CreateSessionController(
  createSessionToUserUseCases,
);
