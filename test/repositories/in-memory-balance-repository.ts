import type { IBalanceRepository } from '../../src/domain/budget-manager/application/repositories/balance-repository';
import type { Balance } from '../../src/domain/budget-manager/enterprise/entities/balance';

export class InMemoryBalanceRepository implements IBalanceRepository {
  public balances: Balance[] = [];

  async create(balance: Balance): Promise<Balance> {
    this.balances.push(balance);
    return balance;
  }

  async findByUserId(userId: string): Promise<Balance | null> {
    return (
      this.balances.find((balance) => balance.userId.toString() === userId) ||
      null
    );
  }

  async save(balance: Balance): Promise<void> {
    
    const index = this.balances.findIndex((b) => b.userId.toString() === balance.userId.toString());

    if (index !== -1) {
      this.balances[index] = balance; 
    } else {
      this.balances.push(balance); 
    }
  }
}
