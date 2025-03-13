import type { IBalanceRepository } from '../../src/domain/budget-manager/application/repositories/balance-repository';
import type { Balance } from '../../src/domain/budget-manager/enterprise/entities/balance';

export class InMemoryBalanceRepository implements IBalanceRepository {
  public balances: Balance[] = [];

  async create(balance: Balance): Promise<Balance> {
    this.balances.push(balance);
    return balance;
  }
}
