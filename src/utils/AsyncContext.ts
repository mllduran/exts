import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

export function getRequestId() {
  return asyncLocalStorage.getStore();
}

export default asyncLocalStorage;