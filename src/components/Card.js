import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../styles';

const Card = ({children, style, onPress, disabled}) => (
  <TouchableOpacity
    style={[styles.container, style]}
    onPress={onPress}
    disabled={disabled}>
    {children}
  </TouchableOpacity>
);

export default Card;

const styles = StyleSheet.create({
  container: {},
});
