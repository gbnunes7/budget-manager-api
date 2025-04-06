import { type Either, left, right } from '../../../../core/types/either';
import type { IUserRepository } from '../repositories/user-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import type { HashComparer } from '../crypthography/hash-comparer';

class CreateSessionToUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashComparer: HashComparer,
  ) {}

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

    const passwordMatch = await this.hashComparer.compare(
      passwordHash,
      user.passwordHash,
    );

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
