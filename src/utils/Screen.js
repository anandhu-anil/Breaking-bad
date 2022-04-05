import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

import {Colors, Typography} from '../styles';

const Screen = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.mainContainer}
          onScroll={() => Keyboard.dismiss()}>
          <View style={styles.container}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    margin: 20,
  },
});

export default Screen;
