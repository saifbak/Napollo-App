import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';

import PaymentScreen from '../../screens/PaymentScreen/Payment';

const Stack = createStackNavigator();

const PaymentStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export default PaymentStack;
