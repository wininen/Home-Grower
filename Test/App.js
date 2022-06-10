import React, { useRef} from 'react';
import {View, Text} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import Sensor from './src/Sensor';




const App = () => {
  

    return (
      <View>
        <Sensor/>
      </View>
    );
}

export default App;