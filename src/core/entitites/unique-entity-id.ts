import { randomUUID } from 'node:crypto';

class UniqueEntityId {
  private _value: string;

  get value(): string {
    return this._value;
  }

  constructor(id?: string) {
    this._value = id ?? randomUUID();
  }

  toString(): string {
    return this._value; 
  }

  equals(id: UniqueEntityId): boolean {
    return this.value === id.value;
  }
}

export { UniqueEntityId };
