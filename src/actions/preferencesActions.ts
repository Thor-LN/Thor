import {
  PreferencesTypes,
  Wallets,
  PreferencesActions,
} from '@/reducers/preferencesReducer/types';
import {Dispatch} from 'redux';

export const toggleUnits =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: PreferencesTypes.TOGGLE_CURRENCY_UNITS,
    });
  };

export const addWallet =
  (wallet: Wallets) =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: PreferencesTypes.ADD_WALLET,
      wallet,
    });
  };

export const changeGeneralSettings =
  (generalSettings: PreferencesActions['generalSettings']) =>
  (dispatch: Dispatch) => {
    dispatch({
      type: PreferencesTypes.CHANGE_GENERAL_SETTINGS,
      generalSettings,
    });
  };
