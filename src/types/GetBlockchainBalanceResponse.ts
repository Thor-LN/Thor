export interface LNDGetBlockchainBalanceResponse {
  total_balance: string;
  confirmed_balance: string;
  unconfirmed_balance: string;
}

export type GetBlockchainBalanceTransformation =
  LNDGetBlockchainBalanceResponse;
