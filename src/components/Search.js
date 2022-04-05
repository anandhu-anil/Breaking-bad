import React, {useState, useContext} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import {Colors, Typography} from '../styles';
import IconANT from 'react-native-vector-icons/AntDesign';

const Search = ({
  onChangeText,
  value,
  placeholder,
  onCloseBTNPress,
  autoFocus = true,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Colors.WHITE}
        style={styles.input}
        selectionColor={Colors.WHITE}
        autoFocus={autoFocus}
      />
      <TouchableOpacity onPress={onCloseBTNPress}>
        <IconANT name="close" size={30} color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input: {flex: 1, ...Typography.largeTextThin},
});

export default Search;
