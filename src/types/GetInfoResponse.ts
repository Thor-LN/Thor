export interface LNDGetInfoResponse {
  version: string;
  commit_hash: string;
  identity_pubkey: string;
  alias: string;
  color: string;
  num_pending_channels: number;
  num_active_channels: number;
  num_inactive_channels: number;
  num_peers: number;
  block_height: number;
  block_hash: string;
  best_header_timestamp: string;
  synced_to_chain: boolean;
  synced_to_graph: boolean;
  testnet: boolean;
  chains: LNDGetInfoResponseChains[];
  uris: string[];
  features: LNDGetInfoResponseFeatures;
}
export interface LNDGetInfoResponseChains {
  chain: string;
  network: string;
}
export interface LNDGetInfoResponseFeatures0 {
  name: string;
  is_required: boolean;
  is_known: boolean;
}
export interface LNDGetInfoResponseFeatures5 {
  name: string;
  is_required: boolean;
  is_known: boolean;
}
export interface LNDGetInfoResponseFeatures7 {
  name: string;
  is_required: boolean;
  is_known: boolean;
}
export interface LNDGetInfoResponseFeatures9 {
  name: string;
  is_required: boolean;
  is_known: boolean;
}
export interface LNDGetInfoResponseFeatures12 {
  name: string;
  is_required: boolean;
  is_known: boolean;
}
export interface LNDGetInfoResponseFeatures14 {
  name: string;
  is_required: boolean;
  is_known: boolean;
}
export interface LNDGetInfoResponseFeatures17 {
  name: string;
  is_required: boolean;
  is_known: boolean;
}
export interface LNDGetInfoResponseFeatures {
  0: LNDGetInfoResponseFeatures0;
  5: LNDGetInfoResponseFeatures5;
  7: LNDGetInfoResponseFeatures7;
  9: LNDGetInfoResponseFeatures9;
  12: LNDGetInfoResponseFeatures12;
  14: LNDGetInfoResponseFeatures14;
  17: LNDGetInfoResponseFeatures17;
}

export interface GetInfoTransformation {
  version: string;
  identity_pubkey: string;
  alias: string;
  color: string;
  num_pending_channels: number;
  num_active_channels: number;
  num_inactive_channels: number;
  num_peers: number;
  block_height: number;
  block_hash: string;
  best_header_timestamp: string;
  synced_to_chain: boolean;
  synced_to_graph: boolean;
  testnet: boolean;
  uris: string[];
}
