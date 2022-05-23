import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
//import Base64 from 'base64-arraybuffer';
import {base64} from 'react-native-base64'
import {Buffer} from 'buffer';

const manager = new BleManager();
manager.state = 'PoweredOn'
console.log(manager.state);

const scanAndConnect = async () => {

  



    manager.startDeviceScan(null, null, async (error, device) => {
      
        if (error) {
            // Handle error (scanning will be stopped automatically)
            console.log("nie widzę urządzenia")
            console.log(error)
            return
        }
        

        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        console.log("scanning....")
        console.log(device.name)
        if (device.name === 'Flower care') {
            console.log("JEST")
            


            try{
            const connection = await device.connect()
            console.log("Connected!");

            let dev = await connection.discoverAllServicesAndCharacteristics();
            //console.log(dev)
            let result = dev.readCharacteristicForService("00001204-0000-1000-8000-00805f9b34fb", "00001a01-0000-1000-8000-00805f9b34fb");
            console.log(result)


            const sub = await manager.monitorCharacteristicForDevice(device.id, "00001204-0000-1000-8000-00805f9b34fb", 
            "00001a01-0000-1000-8000-00805f9b34fb",
            (error, result) => {
              console.log("MONITORED =", result);
              if (error) {
                console.log("ERROR ON MONITOR =", error);
                return;
              }
              console.log("MONITORED =", result.value);
            });

            //let result = dev.readCharacteristicForService("00001204-0000-1000-8000-00805f9b34fb", "00001a01-0000-1000-8000-00805f9b34fb");
            //const r =  (await result).value;
            //const b = Buffer.from(r, 'base64');
            //console.log(b);
            //console.log("temperature: " + b.readUint16LE() * 0.01);


            connection.cancelConnection()
          }
          catch(e){
            console.log("error");
            console.error(e)
          }
            /*
            device.connect()
            .then((device) => {
              //device.characteristicsForService("38")
                //.catch((...args) => console.log("error!!!!: ", args))
                //.then((...args) => console.log("xd", args));
                //console.log(device.discoverAllServicesAndCharacteristics())
                console.log("connected!")
                return device.discoverAllServicesAndCharacteristics()
            })
            .then((device) => {
            // Do work on device with services and characteristics
            console.log("working on service...")
            const n = device.readCharacteristicForService("00001204-0000-1000-8000-00805f9b34fb", "00001a01-0000-1000-8000-00805f9b34fb");
            console.log(n)
            const encodedN = n.value;
            console.log(encodedN);
            
            if (encodedN) {
              console.log("encodedN: ")
               console.log(encodedN)
        
              //console.log("base64: ");
              //console.log(base64.decode('SW4gbXkgZXllcywgaW5kaXNwb3NlZA0KSW4gZGlzZ3Vpc2VzIG5vIG9uZSBrbm93cw0KUklQIEND=='))
        
               const buff = Buffer.from(encodedN, 'base64');
               console.log(buff);
               console.log("temperature: " + buff.readUint16LE() * 0.01);
               const brightness = buff.readUInt8(3);
              
               console.log("brightness: "+ brightness)
               const moisture = buff.readUInt16LE(6);
               console.log("moisture: "+ moisture)
               //console.log("buff utf8");
               //console.log(buff.toString('utf-8'));
               //console.log("buff string");
               //console.log(buff.toString('ascii'));
               //console.log("the end");
                // console.log(characteristic.serviceID, characteristic.serviceUUID, characteristic.uuid, characteristic.id, characteristic.value)
              }
              else {
                console.log("nie widzę nic")
              }
              

            })
            .catch((error) => {
                // Handle errors
                console.log(error.message);
            });

              */
            

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