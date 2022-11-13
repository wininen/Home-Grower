import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useRef} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { MainBundlePath } from 'react-native-fs';
import Sensor from './src/Sensor.js';
import Plants from './src/Plants.js';
import Forecast from './src/Forecast.js';

const Main = createNativeStackNavigator();

const App = () => {

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

          <Main.Screen
            name = "Forecast"
            component={Forecast}
          />
        </Main.Navigator>
      </NavigationContainer>
    )
}

export default App;