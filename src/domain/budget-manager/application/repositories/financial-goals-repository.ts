import type { FinancialGoals } from "../../enterprise/entities/financial-goals";

export interface IFinancialGoalsRepository {
  create(financialGoals: FinancialGoals): Promise<void>;
}
