import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {LayoutAnimation} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {Fab} from '@/components/Fab';
import {SplashScreen} from '@/components/SplashScreen';
import {useCanConnect} from '@/hooks/useCanConnect';
import {useIsSetupCompleted} from '@/hooks/useIsSetupCompleted';
import {useTheme} from '@/providers/ThemeProvider';
import SettingsRoutes from '@/routes/subRoutes/SettingsRoutes';
import Connecting from '@/scenes/Connecting/Connecting';
import Wallet from '@/scenes/Wallet/Wallet';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'native-base';

import Connect from '../scenes/Connect/Connect';

Entypo.loadFont();

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
    <View position="relative" flex={1}>
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
              <Entypo name="wallet" color={color} size={16} />
            ),
          }}
        />

        <Tab.Screen
          name="SettingsRoutes"
          component={SettingsRoutes}
          options={{
            tabBarLabel: t('Settings'),
            tabBarIcon: ({color}) => (
              <Entypo name="cog" color={color} size={16} />
            ),
          }}
        />
      </Tab.Navigator>
      <Fab />
    </View>
  );
};

export default Routes;
