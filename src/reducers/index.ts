import {preferencesReducer} from '@/reducers/preferencesReducer/reducer';
import {combineReducers} from 'redux';

import {storageReducer} from './storageReducer/reducer';

const rootReducers = combineReducers({
  preferences: preferencesReducer,
  storage: storageReducer,
});

export default rootReducers;
export type RootState = ReturnType<typeof rootReducers>;
