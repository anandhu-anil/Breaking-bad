import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import SingleCharacterScreen from '../screens/SingleCharacterScreen';
import {Colors} from '../styles';

const Stack = createStackNavigator();
const HomeStack = () => (
  <Stack.Navigator initialRouteName="home">
    <Stack.Screen
      name="home"
      component={HomeScreen}
      options={{
        headerTitle: () => null,
        headerBackTitle: () => null,
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="search"
      component={SearchScreen}
      options={{
        headerTitle: () => null,
        headerBackTitle: () => null,
        headerTransparent: true,
        headerLeft: () => null,
      }}
    />
    <Stack.Screen
      name="favorite"
      component={FavoriteScreen}
      options={{
        headerTitle: () => null,
        headerTransparent: true,
      }}
    />
    <Stack.Screen
      name="singleCharacter"
      component={SingleCharacterScreen}
      options={{
        headerTitle: () => null,
        headerTransparent: true,
        headerTintColor: Colors.WHITE,
      }}
    />
  </Stack.Navigator>
);

export default HomeStack;
