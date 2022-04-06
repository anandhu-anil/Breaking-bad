import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';

import {Colors, Typography, width, height} from '../styles';
import Card from './Card';

const CharacterCard = ({item, red_state, onFavIconPress, onCardItemPress}) => {
  let findIndex = red_state.findIndex(f => f.char_id === item?.char_id);
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
        <TouchableOpacity
          onPress={() => onFavIconPress(item, findIndex === -1 ? false : true)}>
          <IconFA
            name={findIndex === -1 ? 'heart-o' : 'heart'}
            size={20}
            color={findIndex === -1 ? Colors.WHITE : Colors.PRIMARY}
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  itemContainer: {margin: 10},
  width3: {width: width * 0.3},
  itemIMG: {height: height * 0.25, width: width * 0.43, borderRadius: 6},
  row: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 10},
});

export default CharacterCard;
