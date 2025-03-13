import type { IFinancialGoalsRepository } from '../../src/domain/budget-manager/application/repositories/financial-goals-repository';
import type { FinancialGoals } from '../../src/domain/budget-manager/enterprise/entities/financial-goals';

export class InMemoryFinancialGoalsRepository
  implements IFinancialGoalsRepository
{
  public financialGoals: FinancialGoals[] = [];

  async create(financialGoals: FinancialGoals): Promise<void> {
    this.financialGoals.push(financialGoals);
  }
}
