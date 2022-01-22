import {
  GetBlockchainBalanceTransformation,
  LNDGetBlockchainBalanceResponse,
} from '@/types/GetBlockchainBalanceResponse';
import {
  GetChannelsBalanceTransformation,
  LNDGetChannelsBalanceResponse,
} from '@/types/GetChannelsBalanceResponse';
import {
  GetInfoTransformation,
  LNDGetInfoResponse,
} from '@/types/GetInfoResponse';
import Currency from '@/utils/currency';
import restUtils from '@/utils/RESTUtils';

class ParserUtils {
  implementation: string;
  constructor() {
    this.implementation = restUtils.storage.implementation;
  }

  getBlockchainBalance = (
    data: LNDGetBlockchainBalanceResponse,
  ): GetBlockchainBalanceTransformation => {
    switch (this.implementation) {
      default:
        return {
          total_balance: data.total_balance,
          confirmed_balance: data.confirmed_balance,
          unconfirmed_balance: data.unconfirmed_balance,
        };
    }
  };

  getChannelsBalance = (
    data: LNDGetChannelsBalanceResponse,
  ): GetChannelsBalanceTransformation => {
    switch (this.implementation) {
      default:
        return {
          localBalance: Currency(data.local_balance.sat).value,
          remoteBalance: Currency(data.remote_balance.sat).value,
        };
    }
  };

  getInfo = (data: LNDGetInfoResponse): GetInfoTransformation => {
    switch (this.implementation) {
      default:
        return {
          version: data.version,
          identity_pubkey: data.identity_pubkey,
          alias: data.alias,
          color: data.color,
          num_pending_channels: data.num_pending_channels,
          num_active_channels: data.num_active_channels,
          num_inactive_channels: data.num_inactive_channels,
          num_peers: data.num_peers,
          block_height: data.block_height,
          block_hash: data.block_hash,
          best_header_timestamp: data.best_header_timestamp,
          synced_to_chain: data.synced_to_chain,
          synced_to_graph: data.synced_to_graph,
          testnet: data.testnet,
          uris: data.uris,
        };
    }
  };
}

const parserUtils = new ParserUtils();
export default parserUtils;
