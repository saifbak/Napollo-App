import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';

import FavoriteScreen from '../../screens/FavoriteScreen/Favorite';

const Stack = createStackNavigator();

const FavoriteStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      >
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
    </Stack.Navigator>
  );
};

export default FavoriteStack;
