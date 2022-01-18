import fetcherUtils from '../utils/FetcherUtils';

export default class Lnd {
  getInfo = () => '/v1/getinfo';

  testConnection = () => {
    return fetcherUtils.fetcher(this.getInfo());
  };
}
