import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import IconANT from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';

import {Colors, height, Typography, width} from '../styles';
import {setSingleCharData, removeFavorites} from '../redux/Action';
import CharacterCard from '../components/CharacterCard';

const FavoriteScreen = ({navigation: {navigate, goBack}}) => {
  const dispatch = useDispatch();
  const red_state = useSelector(state => state?.home?.favorites);

  const onFavIconPress = item => {
    dispatch(removeFavorites(item?.char_id));
    Toast.show('Removed from favorites');
  };
  const onBackICNPress = () => goBack();
  const onCardItemPress = item => {
    dispatch(setSingleCharData(item));
    navigate('singleCharacter');
  };

  const _renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={Typography.mediumTextThin}>No Items found</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Favourites</Text>
          <TouchableOpacity onPress={onBackICNPress}>
            <IconANT name="close" size={30} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={red_state}
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
        />
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
  headerTitle: {
    ...Typography.largeTextBold,
    color: Colors.PRIMARY,
  },
  emptyContainer: {paddingHorizontal: 10},
  emptyText: {...Typography.largeText, color: Colors.PRIMARY},
});

export default FavoriteScreen;
