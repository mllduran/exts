import express, {Request, Response} from 'express';
import { ProvidersType } from '../providers/Providers';

class PostsController {
  public path = '/posts';
  public router = express.Router();
  private providers;

  constructor(private readonly prov: ProvidersType) {
    this.providers = prov;
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(this.path, this.getPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
  }

  getPosts = async (req: Request, res: Response): Promise<void> => {
    res.send('OKOKOKO');
  }

  getPostById(req: Request, res: Response) {
    res.send("IDIDID")
  }
}

export default PostsController;
