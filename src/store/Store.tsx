import React from 'react';
import {Provider} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnyAction, applyMiddleware, createStore, Reducer, Store} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {PersistGate} from 'redux-persist/integration/react';
import thunk from 'redux-thunk';

import rootReducers from '../reducers';
import {StorageActions} from '../reducers/storageReducer/types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducers as Reducer<unknown, StorageActions>,
);

const middlewares = [thunk];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store: Store<any, AnyAction> = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);
const persistor = persistStore(store);

const StoreProvider: React.FC = ({children}) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
