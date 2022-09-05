import pino from 'pino';
import {getRequestId} from './AsyncContext';

const logger = pino({
  base: null,
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
});

export function logInfo(message: Object | string) {
  return logger.info({requestId: getRequestId(), message});
}

export function logError(error: Object | string) {
  return logger.error({requestId: getRequestId(), error})
}

export default logger;