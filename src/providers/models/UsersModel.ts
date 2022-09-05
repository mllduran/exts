import IDbConnection from "../lib/database/IDbConnection";

class UsersModel {
  private database;

  constructor(database: IDbConnection) {
    this.database = database;
  }

  async getUsers() {
    const result = await this.database.query("SELECT * FROM role LIMIT 1");

    return result;
  }
}

export default UsersModel;