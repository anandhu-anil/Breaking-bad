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

import {Colors, height, Typography, width} from '../styles';
import {searchCharacters} from '../api';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Search from '../components/Search';
import Card from '../components/Card';

const SearchScreen = ({navigation: {goBack}}) => {
  const [characters, setCharacters] = useState([]);
  const [tempCharacters, setTempCharacters] = useState([]);

  useEffect(() => {
    onChangeText('w');
  }, []);

  const onChangeText = async text => {
    try {
      let response = await searchCharacters(text);
      setTempCharacters(response);
      setCharacters(response);
    } catch (e) {
      console.log(e);
    }
  };

  const onFavIconPress = () => {};
  const onCloseBTNPress = () => goBack();

  const _renderItem = ({item}) => {
    return (
      <Card style={styles.itemContainer}>
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
      <View style={styles.header}>
        <Search
          onChangeText={text => onChangeText(text)}
          placeholder="Search..."
          onCloseBTNPress={onCloseBTNPress}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={tempCharacters}
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
    backgroundColor: Colors.SECONDARY,
    height: height * 0.1,
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

export default SearchScreen;
