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

  // biome-ignore lint:
  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}

export { Entity };