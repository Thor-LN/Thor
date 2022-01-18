import {Dispatch} from 'redux';

import {StorageActions, StorageTypes} from '../reducers/storageReducer/types';

export const setStorage =
  (obj: StorageActions['storage']) =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: StorageTypes.SET_STORAGE,
      storage: {...obj},
    });
  };
