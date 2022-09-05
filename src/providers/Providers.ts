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
  private _providers: ProvidersType | null;

  constructor(config: object) {
    this.config = config;
    this._providers = null;
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

    this._providers = {
      models: {
        users: new UsersModel(database)
      }
    }
  }

  public get providers(): ProvidersType {
    return this._providers as ProvidersType;
  }
}

export default Providers;