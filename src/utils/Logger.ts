import pino from 'pino';
import {getRequestId} from './AsyncContext';

const logger = pino({
  base: null,
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
});

export default logger;