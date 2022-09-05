import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/Logger';
import asyncLocalStorage from '../utils/AsyncContext';

export default function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  let requestId: string;
  if (req.headers['request-id']) {
    requestId = req.headers['request-id'] as string;
  } else {
    requestId = uuidv4();
  }

  asyncLocalStorage.run(requestId, () => {
    logger.info({
      direction:'request',
      requestId: requestId,
      method: req.method,
      path: req.path,
      headers: req.headers,
      body: req.body
    });

    res.setHeader('Request-Id', requestId);

    logResponseBody(req, res, requestId)

    next();
  });
}

function logResponseBody(req: Request, res: Response, requestId: string) {
  const [oldWrite, oldEnd] = [res.write, res.end];
  const chunks: Buffer[] = [];

  (res.write as unknown) = function(chunk: Buffer) {
      chunks.push(Buffer.from(chunk));
      (oldWrite as Function).apply(res, arguments);
  };

  res.end = function(chunk) {
      if (chunk) {
          chunks.push(Buffer.from(chunk));
      }
      const body = Buffer.concat(chunks).toString('utf8');

      logger.info({
        direction: 'response',
        requestId,
        headers: res.getHeaders(),
        body: body
      });

      (oldEnd as Function).apply(res, arguments);
  };
}
