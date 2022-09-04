import IDbConnection from "./IDbConnection";

class MySql implements IDbConnection {
  connect(config: object): void {
    console.log("Connection to MYSQL DB")
  }

  async query(): Promise<any> {
    return "FOOBAR"
  }
}

export default MySql;