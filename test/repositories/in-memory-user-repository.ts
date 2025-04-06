import { DomainEvents } from '../../src/core/events/domain-events';
import type { IUserRepository } from '../../src/domain/budget-manager/application/repositories/user-repository';
import type { User } from '../../src/domain/budget-manager/enterprise/entities/user';

export class InMemoryUserRepository implements IUserRepository {
  public user: User[] = [];

  async create(user: User): Promise<User> {
    this.user.push(user);
    DomainEvents.dispatchEventsForAggregate(user.id);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const foundUser = this.user.find((user) => user.email === email) || null;
    return foundUser;
  }

  async save(user: User): Promise<User> {
    const userIndex = this.user.findIndex((u) => u.id === user.id);

    this.user[userIndex] = user;

    DomainEvents.dispatchEventsForAggregate(user.id);

    return user;
  }
}
