import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

import {Colors, height, Typography, width} from '../styles';
import {searchCharacters} from '../api';
import Search from '../components/Search';
import {setFavorites, removeFavorites} from '../redux/Action';
import CharacterCard from '../components/CharacterCard';
import Loader from '../components/Loader';

const SearchScreen = ({navigation: {goBack}}) => {
  const [characters, setCharacters] = useState([]);
  const red_state = useSelector(state => state?.home?.favorites);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onChangeText('w');
  }, []);

  const onChangeText = async text => {
    setLoading(true);
    try {
      let response = await searchCharacters(text);
      setCharacters(response);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const onFavIconPress = (item, bookMarked) => {
    if (!bookMarked) {
      dispatch(setFavorites(item));
      Toast.show('Added to favorites');
    } else {
      dispatch(removeFavorites(item?.char_id));
      Toast.show('Removed from favorites');
    }
  };
  const onCloseBTNPress = () => goBack();
  const onCardItemPress = item => {
    dispatch(setSingleCharData(item));
    navigate('singleCharacter');
  };

  const _renderEmptyComponent = () => {
    return (
      <View>
        <Text style={styles.emptyText}>No Character found</Text>
        <Text style={Typography.mediumTextThin}>Try again</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <Search
          onChangeText={text => onChangeText(text)}
          placeholder="Search..."
          onCloseBTNPress={onCloseBTNPress}
        />
      </View>
      <View style={styles.container}>
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
            ListEmptyComponent={<_renderEmptyComponent />}
            ListFooterComponent={<View style={{padding: 60}} />}
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
    backgroundColor: Colors.SECONDARY,
    height: height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  emptyText: {...Typography.largeText, color: Colors.PRIMARY},
});

export default SearchScreen;
