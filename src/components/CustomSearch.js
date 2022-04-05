import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors} from '../styles';
import Typography from '../styles/Typography';

const CustomSearch = ({
  placeholder,
  disabled = false,
  editable = true,
  onPress,
  autoFocus = true,
  onChangeText,
}) => {
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          selectionColor={Colors.BLACK}
          editable={editable}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {borderWidth: 1, borderColor: Colors.LIGHTGREY},
  input: {...Typography.smallText, paddingHorizontal: 15},
});
export default CustomSearch;
