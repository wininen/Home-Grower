import React, { useRef} from 'react';
import {View, Text} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import Sensor from './src/Sensor';




const App = () => {
    console.log("LOOK DOWN")
    console.log(Sensor.peripherals)
    console.log("LOOK UP")

    return (
      <View>
        <Sensor/>
      </View>
    );
}

export default App;