export enum PreferencesTypes {
  TOGGLE_CURRENCY_UNITS = '@preferences/TOGGLE_CURRENCY_UNITS',
}

export enum Units {
  'btc',
  'sats',
  'fiat',
}

export type PreferencesState = {
  readonly unit: Units;
  readonly fiat: 'usd';
};

export interface PreferencesActions {
  type: PreferencesTypes;
  unit?: PreferencesState['unit'];
  fiat?: PreferencesState['fiat'];
}
