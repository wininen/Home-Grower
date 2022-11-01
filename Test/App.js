import React, {useRef} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import Sensor from './src/Sensor';

const App = () => {
  return (
    <SafeAreaView>
      <Sensor />
    </SafeAreaView>
  );
};

export default App;
