export enum PreferencesTypes {
  ADD_WALLET = '@preferences/ADD_WALLET',
  TOGGLE_CURRENCY_UNITS = '@preferences/TOGGLE_CURRENCY_UNITS',
  CHANGE_GENERAL_SETTINGS = '@preferences/CHANGE_GENERAL_SETTINGS',
}

export enum Units {
  'btc',
  'sats',
  'fiat',
}

export interface Wallets {
  name: string;
  implementation: string;
  host: string;
  port: string;
  tor: boolean;
  macaroonHex: string;
}

export type PreferencesState = {
  readonly unit: Units;
  readonly fiat: 'usd';
  readonly wallets: Wallets[];
  readonly generalSettings: {
    faceId: boolean;
  };
};

export interface PreferencesActions {
  type: PreferencesTypes;
  unit?: PreferencesState['unit'];
  fiat?: PreferencesState['fiat'];
  wallet?: Wallets;
  generalSettings?: Partial<PreferencesState['generalSettings']>;
}
