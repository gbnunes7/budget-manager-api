export class AmountMustBeGreaterThanZeroError extends Error {
  constructor() {
    super('Amount must be greater than 0');
  }
}
