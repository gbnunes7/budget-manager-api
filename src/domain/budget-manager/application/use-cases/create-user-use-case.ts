import { User } from '../../enterprise/entities/user';
import type { IUserRepository } from '../repositories/user-repository';
import * as bcrypt from 'bcryptjs';
import { userAlreadyExistsError } from './errors/user-already-exists-error';
import { type Either, left, right } from '../../../../core/types/either';

export interface CreateUserRequest {
  name: string;
  email: string;
  passwordHash: string;
}

interface CreateUserResponse {
  user: User;
}

class CreateUserUseCases {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    request: CreateUserRequest,
  ): Promise<Either<userAlreadyExistsError, CreateUserResponse>> {
    const userAlreadyExists = await this.userRepository.findByEmail(
      request.email,
    );

    if (userAlreadyExists) {
      return left(new userAlreadyExistsError());
    }

    const passwordHashed = await bcrypt.hash(request.passwordHash, 8);

    const user = User.create({
      name: request.name,
      email: request.email,
      passwordHash: passwordHashed,
    });

    await this.userRepository.create(user);

    return right({
      user,
    });
  }
}

export { CreateUserUseCases };
