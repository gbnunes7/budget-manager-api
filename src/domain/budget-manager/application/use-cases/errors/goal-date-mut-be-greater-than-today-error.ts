export class GoalDateMustBeGreaterThanTodayError extends Error {
    constructor() {
      super('Goal date must be greater than today');
    }
  }
  