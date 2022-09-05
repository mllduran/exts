import express, {Request, Response, IRouter} from 'express';
import logger from '../utils/ContextLogger';
import IController from './IController';
import { userValidations, userActions } from '../services/users'
import { ProvidersType } from '../providers/Providers';

class UsersController implements IController {
  public router: IRouter = express.Router();
  public path: string = '/users';
  private readonly providers;

  constructor(
    private readonly prov: ProvidersType
  ) {
    this.providers = prov;
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(this.path, this.getUsers.bind(this));
    this.router.get(`${this.path}/:id`, this.getUserById.bind(this));
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    userValidations.getUsers(req);
    const resp = await userActions.getUsers(this.providers);
    logger.info("FOOBARRBAZZZ")
    res.json(resp);
  }

   async getUserById(req: Request, res: Response): Promise<void> {
    console.log(this);
    res.send("IDIDID");
  }
}

export default UsersController;
