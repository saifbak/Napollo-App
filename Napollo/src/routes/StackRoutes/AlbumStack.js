import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import React from 'react';

import AlbumScreen from '../../screens/AlbumScreen/AlbumScreen';

const Stack = createStackNavigator();

const AlbumStack = ({navigation}) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false}}
      mode={'modal'}>
      <Stack.Screen name="Album" component={AlbumScreen} />
    </Stack.Navigator>
  );
};

export default AlbumStack;
