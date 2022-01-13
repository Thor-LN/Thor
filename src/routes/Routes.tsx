import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useTheme} from '../providers/ThemeProvider';
import Connect from '../scenes/Connect/Connect';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const {theme} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{headerStyle: {backgroundColor: theme.colors.background}}}>
      <Stack.Screen
        name="Connect"
        component={Connect}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Routes;
