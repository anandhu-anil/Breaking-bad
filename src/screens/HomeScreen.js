import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFE from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast';

import {Colors, height, Typography, width} from '../styles';
import {getAllCharacters} from '../api';
import {
  setSingleCharData,
  setFavorites,
  removeFavorites,
} from '../redux/Action';
import CharacterCard from '../components/CharacterCard';
import Loader from '../components/Loader';

const HomeScreen = ({navigation: {navigate}}) => {
  const [characters, seCharacters] = useState([]);
  const dispatch = useDispatch();
  const red_state = useSelector(state => state?.home?.favorites);
  const [loading, setLoading] = useState(true);

  const onFavIconPress = (item, bookMarked) => {
    if (!bookMarked) {
      dispatch(setFavorites(item));
      Toast.show('Added to favorites');
    } else {
      dispatch(removeFavorites(item?.char_id));
      Toast.show('Removed from favorites');
    }
  };
  const onSearchICNPress = () => navigate('search');
  const onBookMarkICNPress = () => navigate('favorite');
  const onCardItemPress = item => {
    dispatch(setSingleCharData(item));
    navigate('singleCharacter');
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      let response = await getAllCharacters();
      seCharacters(response);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={Typography.largeTextBold}>The Breaking bad</Text>
          <View style={styles.row0}>
            <TouchableOpacity onPress={onSearchICNPress}>
              <IconFE name="search" size={20} color={Colors.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onBookMarkICNPress}>
              <IconFA
                name="heart"
                size={20}
                color={Colors.PRIMARY}
                style={styles.marginLeft15}
              />
            </TouchableOpacity>
          </View>
        </View>
        {loading && <Loader />}
        {!loading && (
          <FlatList
            data={characters}
            renderItem={({item}) => (
              <CharacterCard
                item={item}
                red_state={red_state}
                onFavIconPress={onFavIconPress}
                onCardItemPress={onCardItemPress}
              />
            )}
            keyExtractor={(item, index) => 'key' + index}
            numColumns={2}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    margin: 10,
  },
  header: {
    height: height * 0.05,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  row0: {flexDirection: 'row', alignItems: 'center'},
  marginLeft15: {marginLeft: 15},
});

export default HomeScreen;
