import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import {Colors, height, Typography} from '../styles';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.PRIMARY} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
