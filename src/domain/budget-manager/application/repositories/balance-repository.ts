import type { Balance } from '../../enterprise/entities/balance';

export interface IBalanceRepository {
  create(balance: Balance): Promise<Balance>;
}
