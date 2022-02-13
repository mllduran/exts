import express from 'express';
import loggerMiddleware from './middlewares/loggerMiddleware';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: object[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(loggerMiddleware);
  }

  private initializeControllers(controllers: object[]) {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router)
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`PORT ${this.port}`);
    });
  }
}

export default App;