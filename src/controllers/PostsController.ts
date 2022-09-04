import express, {Request, Response, IRouter} from 'express';
import IController from './IController';

class PostsController implements IController {
  public path: string = '/posts';
  public router: IRouter = express.Router();
  private providers: Object;

  constructor(providers: Object) {
    this.providers = providers;
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(this.path, this.getPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
  }

  getPosts = async (req: Request, res: Response): Promise<void> => {
    res.send('OKOKOKO');
  }

  getPostById = async (req: Request, res: Response): Promise<void> => {
    res.send("IDIDID");
  }
}

export default PostsController;
