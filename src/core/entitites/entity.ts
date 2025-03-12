import { UniqueEntityId } from './unique-entity-id';

class Entity<Props> {
  protected props: Props;
  private _id: UniqueEntityId;

  get id(): UniqueEntityId {
    return this._id;
  }

  constructor(props: Props, id?: string) {
    this._id = new UniqueEntityId(id);
    this.props = props;
  }
}

export { Entity };