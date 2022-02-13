import { Request, Response, NextFunction } from 'express';

function loggerMiddleware (req: Request, res: Response, next: NextFunction): void {
  console.log('LOGGER MIDDLEWARE');
  next();
}

export default loggerMiddleware;