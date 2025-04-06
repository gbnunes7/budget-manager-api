export class GoalValueMustBeGreaterThanZeroError extends Error {
    constructor() {
      super('Goal value must be greater than 0');
    }
  }
  