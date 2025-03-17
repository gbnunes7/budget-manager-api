import type { User } from '../../enterprise/entities/user';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
}
