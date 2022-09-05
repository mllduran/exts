import express, {Request, Response, IRouter} from 'express';
import logger from '../utils/ContextLogger';
import IController from './IController';
import { userValidations, userActions } from '../services/users'

class UsersController implements IController {
  public path: string = '/users';
  public router: IRouter = express.Router();

  constructor(
    private readonly providers: Object
  ) {
    this.providers = providers;
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(this.path, this.getUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
  }

  getUsers = async (req: Request, res: Response): Promise<void> => {
    userValidations.getUsers(req);
    const resp = await userActions.getUsers(this.providers);

    logger.info("FOOBARRBAZZZ")

    res.send(resp);
  }

  getUserById = async (req: Request, res: Response): Promise<void> => {
    res.send("IDIDID");
  }
}

export default UsersController;
