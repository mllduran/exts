import mysql2 from 'mysql2/promise';
import IDbConnection from "./IDbConnection";

type DbConfig = {
  host: string,
  user: string,
  password: string,
  database: string,
  connectionLimit: number
}
class MySql implements IDbConnection {
  private readonly config;
  private connection: any;

  constructor(config: DbConfig) {
    this.config = config;
    this.connection = null;
  }

  async connect(): Promise<void> {
    console.log("Connection to MYSQL DB");
    this.connection = await mysql2.createConnection(this.config);
  }

  async query(sql: string): Promise<any> {
    const [result] = await this.connection.execute(sql)

    return result;
  }
}

export default MySql;