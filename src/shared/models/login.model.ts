// This Class is presenting the model data that needed to be sent to login the user.
export class Login {
  username: string;
  password: string;

  // Class Consturctor that creates a new Object of the Current Class
  // Parameters: username as a string, password as a string.
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}
