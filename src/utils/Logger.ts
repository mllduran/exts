import pino from 'pino';

const logger = pino({
  base: null,
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
});

export default logger;