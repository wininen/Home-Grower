import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { BleManager } from 'react-native-ble-plx';


const manager = new BleManager();
manager.state = 'PoweredOn'
console.log(manager.state);

const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            // Handle error (scanning will be stopped automatically)
            console.log("nie widzę urządzenia")
            console.log(error)
            return
        }
        

        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        console.log("scanning....")
        if (device.name === 'Flower care') {
            console.log("JEST");

            device.connect()
            .then((device) => {
                console.log(device.discoverAllServicesAndCharacteristics())
                return device.discoverAllServicesAndCharacteristics()
            })
            .then((device) => {
            // Do work on device with services and characteristics
            })
            .catch((error) => {
                // Handle errors
            });

            //console.log(manager.readCharacteristicForDevice(device.id))
            // Stop scanning as it's not necessary if you are scanning for one device.
            
            manager.stopDeviceScan();
            return
            // Proceed with connection.
        }
    });

}

//console.log("here")




export default class Sensor extends Component
{
  render()
  {
    return (
      <View style={styles.container}>
        <Text onPress={scanAndConnect}> Hello World  tutaj!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === "android" ? 25 : 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
  });