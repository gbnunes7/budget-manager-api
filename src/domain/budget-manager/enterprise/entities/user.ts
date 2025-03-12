import { Entity } from "../../../../core/entitites/entity";

interface UserProps {
    name: string
    email: string
    passwordHash: string
}

class User extends Entity<UserProps> {
    private _name: string
    private _email: string
    private _passwordHash: string

    get name(): string {
        return this._name
    }

    get email(): string {
        return this._email
    }

    get passwordHash(): string {
        return this._passwordHash
    }

    constructor(props: UserProps, id?: string) {
        super(props, id)
        this._name = props.name
        this._email = props.email
        this._passwordHash = props.passwordHash
    }
}

export { User }