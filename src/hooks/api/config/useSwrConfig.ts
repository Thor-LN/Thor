import {useMemo} from 'react';
import {AppState, AppStateStatus} from 'react-native';

import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {SWRConfiguration} from 'swr';

export const useSwrConfig = () => {
  const {isConnected} = useNetInfo();

  return useMemo<SWRConfiguration>(
    () => ({
      provider: () => new Map(),
      isOnline() {
        /* Customize the network state detector */
        return true;
      },
      isVisible() {
        /* Customize the visibility state detector */
        return true;
      },
      initFocus(callback: any) {
        let appState = AppState.currentState;

        const onAppStateChange = (nextAppState: AppStateStatus) => {
          /* If it's resuming from background or inactive mode to active one */
          if (
            appState.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            callback();
          }
          appState = nextAppState;
        };

        // Subscribe to the app state change events
        const subscription = AppState.addEventListener(
          'change',
          onAppStateChange,
        );

        return () => {
          subscription.remove();
        };
      },
      initReconnect(callback: any) {
        /* Register the listener with your state provider */

        let currentConnectionState = isConnected;

        const onAppStateChange = (isNextStateConnected: boolean | null) => {
          /* If it's resuming from background or inactive mode to active one */
          if (!currentConnectionState && isNextStateConnected) {
            callback();
          }
          currentConnectionState = isNextStateConnected;
        };

        // Subscribe to the app state change events
        const unsubscribe = NetInfo.addEventListener(state => {
          onAppStateChange(state.isConnected);
        });

        return () => {
          unsubscribe();
        };
      },
    }),
    [isConnected],
  );
};
