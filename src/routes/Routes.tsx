import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {LayoutAnimation} from 'react-native';

import WalletIcon from '@/assets/svg/wallet.svg';
import {SplashScreen} from '@/components/SplashScreen';
import {useCanConnect} from '@/hooks/useCanConnect';
import {useIsSetupCompleted} from '@/hooks/useIsSetupCompleted';
import {useTheme} from '@/providers/ThemeProvider';
import Connecting from '@/scenes/Connecting/Connecting';
import Wallet from '@/scenes/Wallet/Wallet';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Connect from '../scenes/Connect/Connect';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

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
  const {t} = useTranslation();
  const {theme} = useTheme();

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
    <Tab.Navigator
      activeColor={theme.colors.pink['500']}
      inactiveColor={theme.colors.text}
      barStyle={{
        backgroundColor: theme.colors.background,
      }}>
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarLabel: t('Wallet'),
          tabBarIcon: ({color}) => (
            <WalletIcon height={16} width={16} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Routes;
