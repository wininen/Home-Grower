<<<<<<< HEAD
import React, {useRef} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import Sensor from './src/Sensor';
=======
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useRef} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { MainBundlePath } from 'react-native-fs';
import Sensor from './src/Sensor.js';
import Plants from './src/Plants.js';

const Main = createNativeStackNavigator();
>>>>>>> 8d5af649c1d0f22bac80ded8b2937531896c937e

const App = () => {
  return (
    <SafeAreaView>
      <Sensor />
    </SafeAreaView>
  );
};

<<<<<<< HEAD
export default App;
=======
    return (
      <NavigationContainer>
        <Main.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Main.Screen
            name = "Home"
            component = {Sensor}
          />

          <Main.Screen
            name = "Plants"
            component = {Plants}
          />
        </Main.Navigator>
      </NavigationContainer>
    )
}

export default App;
>>>>>>> 8d5af649c1d0f22bac80ded8b2937531896c937e
