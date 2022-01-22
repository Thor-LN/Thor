import fetcherUtils from '../utils/FetcherUtils';

export default class Lnd {
  getBlockchainBalance = () => '/v1/balance/blockchain';
  getChannelsBalance = () => '/v1/balance/channels';
  getInfo = () => '/v1/getinfo';

  testConnection = () => {
    return fetcherUtils.fetcher(this.getInfo());
  };
}
