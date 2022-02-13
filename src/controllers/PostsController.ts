import express, {Request, Response} from 'express';

class PostsController {
  public path = '/posts';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(this.path, this.getPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
  }

  getPosts = (req: Request, res: Response): void => {
    res.send("OKOKOKOKOKOK")
  }

  getPostById(req: Request, res: Response) {
    res.send("IDIDID")
  }
}

export default PostsController;