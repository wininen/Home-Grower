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

const getAllSensorData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const irrelevantKeys = [
      '@city_Key',
      '@temperature_Key',
      '@weather_Key',
      'flower_data',
      'username',
      'isAppLaunchedForFirstTime',
    ];
    console.log('KEYS');
    console.log(keys);
    const filteredKeys = keys.filter(item => !irrelevantKeys.includes(item));
    console.log('filteredKeys');
    console.log(filteredKeys);
    let result = await AsyncStorage.multiGet(filteredKeys);
    result = result.map(item => JSON.parse(item[1]));

    // const result = new Map(resultArray.map(i => [i[0], JSON.parse(i[1])]));
    return result;
  } catch (e) {
    console.warn('ERROR: Getting all data', e);
    return false;
  }
};

const getAllSensorKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const irrelevantKeys = [
      '@city_Key',
      '@temperature_Key',
      '@weather_Key',
      'flower_data',
      'username',
      'isAppLaunchedForFirstTime',
    ];
    console.log('KEYS');
    console.log(keys);
    const filteredKeys = keys.filter(item => !irrelevantKeys.includes(item));
    console.log('filteredKeys');
    console.log(filteredKeys);
    return filteredKeys;
  } catch (e) {
    console.warn('ERROR: Getting all data', e);
    return false;
  }
};

const storage = {
  set,
  setObject,
  get,
  getObject,
  remove,
  getAllSensorData,
  getAllSensorKeys,
};

export default storage;
