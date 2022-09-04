import { Router } from "express";

interface IController {
  path: string;
  router: Router;
  initializeRoutes: Function;
}


export default IController;