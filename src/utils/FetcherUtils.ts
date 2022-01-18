import HTTPService from '@/services/HTTPService';
import tor from '@/services/tor';
import {store} from '@/store/Store';

import restUtils from './RESTUtils';

class FetcherUtils {
  useTor: boolean;
  storage: Record<string, any>;

  constructor() {
    this.useTor = store.getState().storage.tor;
    this.storage = store.getState().storage;
  }

  setState = (storage: Record<string, any>, useTor: boolean) => {
    this.useTor = useTor;
    this.storage = storage;
  };

  fetcher = async (url: string) => {
    const host = this.storage.host;
    const port = this.storage.port;

    const fetchUrl = `${host}:${port}${url}`;
    const headers = restUtils.getHeaders();

    if (this.useTor) {
      await tor.startIfNotStarted();

      return tor.get(url).then(res => res.json);
    }

    return HTTPService.fetch('GET', fetchUrl, headers).then(response =>
      response.json(),
    );
  };
}

const fetcherUtils = new FetcherUtils();

store.subscribe(() => {
  const storage = store.getState().storage;
  fetcherUtils.setState(storage, storage.tor);
});

export default fetcherUtils;
