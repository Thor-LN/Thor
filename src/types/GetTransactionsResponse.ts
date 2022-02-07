export interface LNDGetTransactionsResponse {
  transactions: LNDGetTransactions[];
}

export interface LNDGetTransactions {
  tx_hash: string;
  amount: string;
  num_confirmations: number;
  block_hash: string;
  block_height: number;
  time_stamp: string;
  total_fees: string;
  dest_addresses: string[];
  raw_tx_hex: string;
  label: string;
}

export type GetTransactionsTransformation = GetTransactions[];

export interface GetTransactions {
  txHash: string;
  amount: string;
  numConfirmations: number;
  timeStamp: string;
  totalFees: string;
  label: string;
  address: string;
}
