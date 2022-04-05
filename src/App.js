import React from 'react';

import HomeStack from './routes/HomeStack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Colors} from './styles';

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.BLACK,
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
