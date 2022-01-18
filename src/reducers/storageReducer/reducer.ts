import {StorageTypes, StorageActions, StorageState} from './types';

const initialState: StorageState = {
  implementation: '',
};

export const storageReducer = (
  state: StorageState = initialState,
  action: StorageActions,
) => {
  switch (action.type) {
    case StorageTypes.SET_STORAGE:
      return {
        ...state,
        ...action.storage,
      };
    default:
      return state;
  }
};
