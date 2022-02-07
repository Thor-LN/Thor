import React from 'react';

import {TransactionsRoutesTypes} from '@/routes/types/TransactionsRoutesTypes';
import Transactions from '@/scenes/Transactions/Transactions';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<TransactionsRoutesTypes>();

const TransactionsRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Transactions"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Transactions" component={Transactions} />
    </Stack.Navigator>
  );
};

export default TransactionsRoutes;
