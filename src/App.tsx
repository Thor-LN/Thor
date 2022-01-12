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
import {View} from 'react-native';
import {Provider as PaperProvider, Text} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {SWRConfig} from 'swr';

import {useSwrConfig} from './hooks/api/useSwrConfig';

const App = () => {
  const swrConfig = useSwrConfig();

  return (
    <SWRConfig value={swrConfig}>
      <NavigationContainer>
        <PaperProvider>
          <View>
            <Text>It works</Text>
          </View>
        </PaperProvider>
      </NavigationContainer>
    </SWRConfig>
  );
};
export default App;
