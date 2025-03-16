import type { Balance } from '../../enterprise/entities/balance';

export interface IBalanceRepository {
  create(balance: Balance): Promise<Balance>;
  findByUserId(userId: string): Promise<Balance | null>;
  save(balance: Balance): Promise<void>;
}
