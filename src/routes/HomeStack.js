import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import SingleCharacterScreen from '../screens/SingleCharacterScreen';
import {Colors} from '../styles';
import {setFavorites, removeFavorites} from '../redux/Action';

const Stack = createStackNavigator();
const HomeStack = props => {
  const [bookmarked, setBookMarked] = useState(false);
  const dispatch = useDispatch();
  const red_state_fav = useSelector(state => state?.home?.favorites);
  const red_state_singleChar = useSelector(
    state => state?.home?.singleCharacter,
  );
  let findIndex = red_state_fav.findIndex(
    f => f?.char_id === red_state_singleChar?.char_id,
  );
  const onFavIconPress = bookMarked => {
    if (!bookMarked) {
      dispatch(setFavorites(red_state_singleChar));
      Toast.show('Added to favorites');
    } else {
      dispatch(removeFavorites(red_state_singleChar?.char_id));
      Toast.show('Removed from favorites');
    }
  };

  return (
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
          headerLeft: () => null,
          headerBackTitle: () => null,
        }}
      />
      <Stack.Screen
        name="singleCharacter"
        component={SingleCharacterScreen}
        options={{
          headerTitle: () => null,
          headerTransparent: true,
          headerTintColor: Colors.WHITE,
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => onFavIconPress(findIndex === -1 ? false : true)}>
                <IconFA
                  name={findIndex === -1 ? 'heart-o' : 'heart'}
                  size={20}
                  color={findIndex === -1 ? Colors.WHITE : Colors.PRIMARY}
                  style={styles.marginRight20}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  marginRight20: {marginRight: 20},
});

export default HomeStack;
