// Wrapper for AsyncStorage library
import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    // console.log(`${key} & ${value} set successfully in localStorage`);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getItem = async (key, defaultValue) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw `No Value for "${key}" in Storage`;
    }
    return value;
  } catch (e) {
    console.log(e);
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw e;
  }
};

const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
    // console.log(`${key} removed  successfully from localStorage`);
  } catch (e) {
    console.log(e);
  }
};

const logOut = () => removeItem('user_access_token');

// Non Util Functions
const getUserAccessToken = () => getItem('user_access_token');
const setUserAccessToken = access_token =>
  setItem('user_access_token', access_token);

export default {
  getUserAccessToken,
  setUserAccessToken,
  logOut,
};
