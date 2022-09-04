import express from 'express';
import IController from './controllers/IController';
import loggerMiddleware from './middlewares/loggerMiddleware';

class App {
  private app: express.Application;

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
    controllers.forEach((crt: IController) => {
      this.app.use('/', crt.router)
    });
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`PORT ${port}`);
    });
  }
}

export default App;