import AsyncStorage from '@react-native-async-storage/async-storage';

const get = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) console.warn('data not saved previously');
    return value;
  } catch (e) {
    console.warn('ERROR reading values', e);
    return null;
  }
};

const getObject = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) console.warn('data not saved previously');
    return JSON.parse(value);
  } catch (e) {
    console.warn('ERROR: reading values', e);
    return null;
  }
};

const set = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.warn('ERROR saving values', e);
    return false;
  }
};

const setObject = async (key, object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(object));
    return true;
  } catch (e) {
    console.warn('ERROR saving values', e);
    return false;
  }
};

const remove = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.warn('ERROR: Deleting values', e);
    return false;
  }
};

const storage = {set, setObject, get, getObject, remove};

export default storage;
