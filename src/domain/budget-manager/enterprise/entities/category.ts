import { Entity } from '../../../../core/entitites/entity';

interface CategoryProps {
  name: string;
  type: 'INCOME' | 'EXPENSE';
  createdAt: Date;
}

class Category extends Entity<CategoryProps> {
  get name(): string {
    return this.props.name;
  }

  get type(): 'INCOME' | 'EXPENSE' {
    return this.props.type;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: CategoryProps, id?: string) {
    super(props, id);
  }

  static create(props: CategoryProps, id?: string): Category {
    return new Category(props, id);
  }
}

export { Category };
