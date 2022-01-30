import {
  PreferencesActions,
  PreferencesState,
  PreferencesTypes,
  Units,
} from '@/reducers/preferencesReducer/types';
import enumToArray from '@/utils/enumToArray';

const initialState: PreferencesState = {
  unit: Units.sats,
  fiat: 'usd',
  wallets: [],
};

export const preferencesReducer = (
  state: PreferencesState = initialState,
  action: PreferencesActions,
) => {
  switch (action.type) {
    case PreferencesTypes.TOGGLE_CURRENCY_UNITS:
      const units = enumToArray(Units);
      const next = (state.unit + 1) % units.length;
      return {
        ...state,
        unit: next,
      };

    case PreferencesTypes.ADD_WALLET:
      const walletsArr = [...state.wallets];
      walletsArr.push(action.wallet!);
      return {
        ...state,
        wallets: walletsArr,
      };
    default:
      return state;
  }
};
