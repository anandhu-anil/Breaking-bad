import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFE from 'react-native-vector-icons/Feather';

import {Colors, height, Typography, width} from '../styles';
import {getAllCharacters} from '../api';
import Card from '../components/Card';
import {setSingleCharData} from '../redux/Action';

const HomeScreen = ({navigation: {navigate}}) => {
  const [characters, seCharacters] = useState([]);
  const dispatch = useDispatch();

  const onFavIconPress = () => {};
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
    } catch (e) {
      console.log(e);
    }
  };

  const _renderItem = ({item}) => {
    return (
      <Card style={styles.itemContainer} onPress={() => onCardItemPress(item)}>
        <Image source={{uri: item?.img}} style={styles.itemIMG} />
        <View style={styles.row}>
          <View>
            <Text
              style={[Typography.mediumText, styles.width3]}
              numberOfLines={1}>
              {item?.name}
            </Text>
            <Text
              style={[Typography.extraSmallTextThin, styles.width3]}
              numberOfLines={1}>
              {item?.nickname}
            </Text>
          </View>
          <TouchableOpacity onPress={onFavIconPress}>
            <IconFA name="heart-o" size={20} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
      </Card>
    );
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
        <FlatList
          data={characters}
          renderItem={({item}) => <_renderItem item={item} />}
          keyExtractor={(item, index) => 'key' + index}
          numColumns={2}
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
  row0: {flexDirection: 'row', alignItems: 'center'},
  marginLeft15: {marginLeft: 15},
  itemContainer: {margin: 10},
  width3: {width: width * 0.3},
  itemIMG: {height: height * 0.25, width: width * 0.43, borderRadius: 6},
  row: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 10},
});

export default HomeScreen;
