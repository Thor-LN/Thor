export interface LNDGetChannelsBalanceResponse {
  balance: string;
  pending_open_balance: string;
  local_balance: LNDGetChannelsBalanceResponseLocal_balance;
  remote_balance: LNDGetChannelsBalanceResponseRemote_balance;
  unsettled_local_balance: LNDGetChannelsBalanceResponseUnsettled_local_balance;
  unsettled_remote_balance: LNDGetChannelsBalanceResponseUnsettled_remote_balance;
  pending_open_local_balance: LNDGetChannelsBalanceResponsePending_open_local_balance;
  pending_open_remote_balance: LNDGetChannelsBalanceResponsePending_open_remote_balance;
}
export interface LNDGetChannelsBalanceResponseLocal_balance {
  sat: string;
  msat: string;
}
export interface LNDGetChannelsBalanceResponseRemote_balance {
  sat: string;
  msat: string;
}
export interface LNDGetChannelsBalanceResponseUnsettled_local_balance {
  sat: string;
  msat: string;
}
export interface LNDGetChannelsBalanceResponseUnsettled_remote_balance {
  sat: string;
  msat: string;
}
export interface LNDGetChannelsBalanceResponsePending_open_local_balance {
  sat: string;
  msat: string;
}
export interface LNDGetChannelsBalanceResponsePending_open_remote_balance {
  sat: string;
  msat: string;
}

export interface GetChannelsBalanceTransformation {
  localBalance: number;
  remoteBalance: number;
}
