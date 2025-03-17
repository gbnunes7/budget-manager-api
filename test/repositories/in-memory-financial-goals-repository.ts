import type { IFinancialGoalsRepository } from '../../src/domain/budget-manager/application/repositories/financial-goals-repository';
import type { FinancialGoals } from '../../src/domain/budget-manager/enterprise/entities/financial-goals';

export class InMemoryFinancialGoalsRepository
  implements IFinancialGoalsRepository
{
  public financialGoals: FinancialGoals[] = [];

  async create(financialGoals: FinancialGoals): Promise<void> {
    this.financialGoals.push(financialGoals);
  }

  async delete(financialGoalsId: string): Promise<void> {
    this.financialGoals = this.financialGoals.filter(
      (financialGoal) => financialGoal.id.toString() !== financialGoalsId,
    );
  }

  async findById(financialGoalsId: string): Promise<FinancialGoals | null> {
    return this.financialGoals.find(
      (financialGoal) => financialGoal.id.toString() === financialGoalsId,
    ) || null;
  }
}
