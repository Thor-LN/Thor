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
import {Provider as PaperProvider, Text} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {useFlipper} from '@react-navigation/devtools';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {SWRConfig} from 'swr';

import Body from './components/Body/Body';
import SafeAreaView from './components/SafeAreaView/SafeAreaView';
import {useSwrConfig} from './hooks/api/useSwrConfig';
import ThemeProvider from './providers/ThemeProvider';

const App = () => {
  const swrConfig = useSwrConfig();

  // react native flipper config
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  return (
    <ThemeProvider>
      {({theme}) => (
        <SWRConfig value={swrConfig}>
          <SafeAreaProvider>
            <PaperProvider theme={theme}>
              <NavigationContainer ref={navigationRef} theme={theme}>
                <SafeAreaView>
                  <Body>
                    <Text>It works</Text>
                  </Body>
                </SafeAreaView>
              </NavigationContainer>
            </PaperProvider>
          </SafeAreaProvider>
        </SWRConfig>
      )}
    </ThemeProvider>
  );
};
export default App;
