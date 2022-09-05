import IDbConnection from './lib/database/IDbConnection';
import MySql from './lib/database/MySql';
import UsersModel from './models/UsersModel';

type ModelsType = {
  users: UsersModel
}

export type ProvidersType = {
  models: ModelsType
}
class Providers {
  public config: object;
  public providers!: ProvidersType;

  constructor(config: object) {
    this.config = config;
  }

  public async initialize(): Promise<void> {
    const database = new MySql({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'testing',
      connectionLimit: 10,
    })
    await database.connect();

    this.providers = {
      models: {
        users: new UsersModel(database)
      }
    }
  }
}

export default Providers;