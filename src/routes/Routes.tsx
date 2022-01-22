import React, {useEffect, useState} from 'react';
import {LayoutAnimation} from 'react-native';

import {SplashScreen} from '@/components/SplashScreen';
import {useCanConnect} from '@/hooks/useCanConnect';
import {useIsSetupCompleted} from '@/hooks/useIsSetupCompleted';
import {useTheme} from '@/providers/ThemeProvider';
import Connecting from '@/scenes/Connecting/Connecting';
import Wallet from '@/scenes/Wallet/Wallet';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Connect from '../scenes/Connect/Connect';

const Stack = createNativeStackNavigator();

const MainNavigator: React.FC = ({children}) => {
  const {theme} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{headerStyle: {backgroundColor: theme.colors.background}}}>
      {children}
    </Stack.Navigator>
  );
};

const Routes = () => {
  const isSetupCompleted = useIsSetupCompleted();
  const canConnect = useCanConnect();

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (canConnect === 'connected') {
      const timeOut = setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        setShowSplash(false);
      }, 2000);

      return () => clearTimeout(timeOut);
    }
  }, [canConnect]);

  if (!isSetupCompleted) {
    return (
      <MainNavigator>
        <Stack.Screen
          name="Connect"
          component={Connect}
          options={{headerShown: false}}
        />
      </MainNavigator>
    );
  }

  if (canConnect === 'connecting') {
    return (
      <MainNavigator>
        <Stack.Screen
          name="Connecting"
          component={Connecting}
          options={{headerShown: false}}
        />
      </MainNavigator>
    );
  }

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <MainNavigator>
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{headerShown: false}}
      />
    </MainNavigator>
  );
};

export default Routes;
