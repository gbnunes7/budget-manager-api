import { randomUUID } from 'node:crypto';

class UniqueEntityId {
  private _value: string;

  get value(): string {
    return this._value;
  }

  constructor(id?: string) {
    this._value = id ?? randomUUID();
  }
}

export { UniqueEntityId };
