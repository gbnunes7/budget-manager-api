export class InvalidTransactionTypeError extends Error {
  constructor() {
    super('Invalid transaction type');
  }
}
