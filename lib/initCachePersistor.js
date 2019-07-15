import { CachePersistor } from 'apollo-cache-persist';

let persistor = null;

const initCachePersistor = (cache) => {
  if (!persistor && typeof window !== 'undefined') {
    persistor = new CachePersistor({
      cache,
      storage: window.localStorage,
    });
  }

  return persistor;
};

export default initCachePersistor;
