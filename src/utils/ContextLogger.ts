import {getRequestId} from './AsyncContext';
import logger from './Logger';

export default {
  info: (message: Object | string): void => {
    logger.info({requestId: getRequestId(), message});
  },
  error: (error: Object | string): void => {
    logger.error({requestId: getRequestId(), error})
  }
}
