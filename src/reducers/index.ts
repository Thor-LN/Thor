import {combineReducers} from 'redux';

import {storageReducer} from './storageReducer/reducer';

const rootReducers = combineReducers({
  storage: storageReducer,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
