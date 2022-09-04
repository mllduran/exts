class UsersValidations {
  async getUsers(providers: object): Promise<string> {
    return "Hello From Get Users";
  }
}

const userValidations = new UsersValidations();

export default userValidations;