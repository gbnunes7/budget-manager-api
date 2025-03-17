import { type Either, left, right } from '../../../../core/types/either';
import type { IUserRepository } from '../repositories/user-repository';
import * as bcrypt from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

class CreateSessionToUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    email: string,
    passwordHash: string,
  ): Promise<
    Either<
      InvalidCredentialsError,
      { userWithoutPassword: { id: string; name: string; email: string } }
    >
  > {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const passwordMatch = await bcrypt.compare(passwordHash, user.passwordHash);

    if (!passwordMatch) {
      return left(new InvalidCredentialsError());
    }

    const userWithoutPassword = {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
    };

    return right({ userWithoutPassword });
  }
}

export { CreateSessionToUserUseCase };
