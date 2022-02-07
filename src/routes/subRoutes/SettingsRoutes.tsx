import React from 'react';

import {SettingsRoutesTypes} from '@/routes/types/SettingsRoutesTypes';
import PinCodeSet from '@/scenes/Settings/components/PinCodeSet';
import Settings from '@/scenes/Settings/Settings';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<SettingsRoutesTypes>();

const SettingsRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="PinCodeSet" component={PinCodeSet} />
    </Stack.Navigator>
  );
};

export default SettingsRoutes;
