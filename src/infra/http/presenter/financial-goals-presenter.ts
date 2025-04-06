import type { FinancialGoals } from '../../../domain/budget-manager/enterprise/entities/financial-goals';

// biome-ignore lint/complexity/noStaticOnlyClass:
export class FinancialGoalsPresenter {
  static toHTTP(financialGoals: FinancialGoals) {
    return {
      id: financialGoals.id.toString(),
      goalValue: financialGoals.goalValue,
      goalDate: financialGoals.goalDate,
      description: financialGoals.description,
    };
  }
}
