// biome-ignore lint/complexity/noStaticOnlyClass:
export class UserPresenter {
  static toHTTP(user: { id: string; name: string; email: string }): {
    id: string;
    name: string;
    email: string;
  } {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
