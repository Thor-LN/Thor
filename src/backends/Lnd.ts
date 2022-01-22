import fetcherUtils from '../utils/FetcherUtils';

export default class Lnd {
  getInfo = () => '/v1/getinfo';
  getBlockchainBalance = () => '/v1/balance/blockchain';

  testConnection = () => {
    return fetcherUtils.fetcher(this.getInfo());
  };
}
