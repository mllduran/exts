class Providers {
  public config: object;
  private _providers: object;

  constructor(config: object) {
    this.config = config;
    this._providers = {};
  }

  public initialize(): void {
    this._providers = {
      foobar: (x: string) => console.log(x)
    }
  }

  public get providers(): object {
    return this._providers;
  }
}

export default Providers;