import { DomainEvents } from '../../../../core/events/domain-events';
import type { EventHandler } from '../../../../core/events/event-handler';
import { UserCreatedEvent } from '../../enterprise/events/user-created-event';
import type { IUserRepository } from '../repositories/user-repository';
import type { CreateBalanceUseCases } from '../use-cases/create-balance-use-case';

export class OnUserCreated implements EventHandler {
  constructor(
    private userRepository: IUserRepository,
    private createBalanceUseCase: CreateBalanceUseCases,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.createBalance.bind(this), UserCreatedEvent.name);
  }

  private async createBalance({ user }: UserCreatedEvent): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(user.email);

    if (!userAlreadyExists) {
      return;
    }

    await this.createBalanceUseCase.execute({
      userId: userAlreadyExists?.id.toString(),
      amount: 0,
      createdAt: new Date(),
    });
  }
}
