import {PreferencesTypes} from '@/reducers/preferencesReducer/types';
import {Dispatch} from 'redux';

export const toggleUnits =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: PreferencesTypes.TOGGLE_CURRENCY_UNITS,
    });
  };
