import express from 'express';
import loggerMiddleware from './middlewares/loggerMiddleware';
import IController from './controllers/IController';

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

  private initializeControllers(controllers: IController[]): void {
    controllers.forEach((controller: IController) => {
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