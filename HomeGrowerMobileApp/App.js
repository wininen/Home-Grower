import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useRef} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { MainBundlePath } from 'react-native-fs';
import Sensor from './src/Sensor.js';
import Plants from './src/Plants.js';
import Forecast from './src/Forecast.js';
import Profile from './src/Profile.js';
// for SQLite database 
import SQLite from 'react-native-sqlite-storage';
let SQLiteDB;


const Main = createNativeStackNavigator();


const App = () => {
    SQLite.openDatabase({
        name: 'plantsSQLite.db',
        createFromLocation: 1,
      },
      this.successToOpenDB,
      this.failToOpenDB,
    );

    const successToOpenDB = async() => {
        alert('success');
    }
    const failToOpenDB = async(err) => {
        console.log(err);
    }

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

          <Main.Screen
            name = "Profile"
            component={Profile}
          />
        </Main.Navigator>
      </NavigationContainer>
    )
}

export default App;