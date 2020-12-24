// This Class is presenting the model data for a User.
export class User {
  constructor(
    public username: string,
    public email: string,
    public role: string,
    public id?: number,
    public password?: string) {
  }
}

