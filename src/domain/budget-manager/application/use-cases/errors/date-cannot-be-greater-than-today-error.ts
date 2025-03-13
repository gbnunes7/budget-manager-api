export class DateCannotBeGreaterThanTodayError extends Error {
    constructor() {
      super('Date cannot be greater than today');
    }
  }
  