import { AggregateRoot } from '../../../../core/entitites/aggregate-root';
import { Entity } from '../../../../core/entitites/entity';
import { UserCreatedEvent } from '../events/user-created-event';

interface UserProps {
  name: string;
  email: string;
  passwordHash: string;
}

class User extends AggregateRoot<UserProps> {
  private _name: string;
  private _email: string;
  private _passwordHash: string;

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  constructor(props: UserProps, id?: string) {
    super(props, id);
    this._name = props.name;
    this._email = props.email;
    this._passwordHash = props.passwordHash;
  }

  static create(props: UserProps, id?: string): User {
    const user = new User(props, id);
    
    user.addDomainEvent(new UserCreatedEvent(user));

    return user;
  }
}

export { User };
