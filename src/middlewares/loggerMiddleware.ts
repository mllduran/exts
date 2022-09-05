import { AsyncLocalStorage } from 'node:async_hooks';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const asyncLocalStorage = new AsyncLocalStorage();

const logger = pino({
  base: null,
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
});

function loggerMiddleware (req: Request, res: Response, next: NextFunction): void {
  let requestId: string;
  if (req.headers['request-id']) {
    requestId = req.headers['request-id'] as string;
  } else {
    requestId = uuidv4();
  }

  asyncLocalStorage.run(requestId, () => {
    const reqid: string = asyncLocalStorage.getStore() as string;

    logger.info({
      request:'request',
      requestId: reqid,
      method: req.method,
      path: req.path,
      headers: req.headers,
      body: req.body
    });

    res.setHeader('Request-Id', reqid);

    logResponseBody(req, res, requestId)

    next();
  });
}

function logResponseBody(req: Request, res: Response, requestId: string) {
  const [oldWrite, oldEnd] = [res.write, res.end];
  const chunks: Buffer[] = [];

  (res.write as unknown) = function(chunk) {
      chunks.push(Buffer.from(chunk));
      (oldWrite as Function).apply(res, arguments);
  };

  res.end = function(chunk) {
      if (chunk) {
          chunks.push(Buffer.from(chunk));
      }
      const body = Buffer.concat(chunks).toString('utf8');

      logger.info({
        response: 'response',
        requestId,
        headers: res.getHeaders(),
        body: body
      });



      (oldEnd as Function).apply(res, arguments);
  };

}

export function getRequestId() {
  return asyncLocalStorage.getStore();
}

export function logInfo(message: Object | string) {
  return logger.info({requestId: getRequestId(), message});
}

export function logError(error: Object | string) {
  return logger.error({requestId: getRequestId(), error})
}


export default loggerMiddleware;
