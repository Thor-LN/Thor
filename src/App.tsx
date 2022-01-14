/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {useFlipper} from '@react-navigation/devtools';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import {SWRConfig} from 'swr';

import {useSwrConfig} from './hooks/api/useSwrConfig';
import ThemeProvider from './providers/ThemeProvider';
import Routes from './routes/Routes';

import './i18n.config';

const App = () => {
  const swrConfig = useSwrConfig();

  // react native flipper config
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  return (
    <>
      <FlipperAsyncStorage />
      <ThemeProvider>
        {({theme}) => (
          <SWRConfig value={swrConfig}>
            <SafeAreaProvider>
              <NativeBaseProvider theme={theme}>
                <NavigationContainer ref={navigationRef} theme={theme}>
                  <Routes />
                </NavigationContainer>
              </NativeBaseProvider>
            </SafeAreaProvider>
          </SWRConfig>
        )}
      </ThemeProvider>
    </>
  );
};
export default App;
