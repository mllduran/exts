class UserActions {
  async getUsers(providers: object): Promise<string> {
    return "Hello From Get Users";
  }
}

const userActions = new UserActions();

export default userActions;