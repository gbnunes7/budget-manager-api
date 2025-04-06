import type { UniqueEntityId } from '../../../../core/entitites/unique-entity-id';
import type { DomainEvents } from '../../../../core/events/domain-events';
import type { User } from '../entities/user';

export class UserCreatedEvent implements DomainEvents {
  public ocurredAt: Date;
  public user: User;

  constructor(user: User) {
    this.ocurredAt = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityId {
    return this.user.id;
  }
}
