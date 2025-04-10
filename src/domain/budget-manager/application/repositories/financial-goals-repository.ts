import type { FinancialGoals } from "../../enterprise/entities/financial-goals";

export interface IFinancialGoalsRepository {
  create(financialGoals: FinancialGoals): Promise<FinancialGoals>;
  delete(financialGoalsId: string): Promise<void>;
  findById(financialGoalsId: string): Promise<FinancialGoals | null>;
}
