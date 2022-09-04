import express from 'express';
import IController from './controllers/IController';
import loggerMiddleware from './middlewares/loggerMiddleware';

class App {
  public app: express.Application;

  constructor(controllers: IController[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(loggerMiddleware);
  }

  private initializeControllers(controllers: object[]) {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router)
    });
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`PORT ${port}`);
    });
  }
}

export default App;