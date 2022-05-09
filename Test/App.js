import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import Sensor from './src/Sensor';



export default class App extends Component
{
  render()
  {
    return (
      <View>
        <Sensor/>
      </View>
    );
  }
}