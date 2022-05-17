import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import Base64 from 'base64-arraybuffer';

const manager = new BleManager();
manager.state = 'PoweredOn'
console.log(manager.state);

const scanAndConnect = async () => {
  try {
    const deviceId = "C4:7C:8D:6B:9A:41";
    try { manager.cancelDeviceConnection(deviceId) } catch (e) {}
    const connection = await manager.connectToDevice(deviceId, {
      timeout: 1000
    })
    console.log("Connected!");

    let device = await connection.discoverAllServicesAndCharacteristics();
    for (const service of await device.services()) {
      for (const c of await service.characteristics()) {
        const char = device.readCharacteristicForService(c.serviceUUID, c.uuid);
        const encodedValue = (await char).value;
        if (encodedValue) {
          // 1. Znaleźć lepszą bibliotekę do dekodowania
          const value = Base64.decode(encodedValue);
          console.log(Uint8Array.from(value));
        }

        // console.log(characteristic.serviceID, characteristic.serviceUUID, characteristic.uuid, characteristic.id, characteristic.value)
      }
    }
    connection.cancelConnection()
  } catch(e) {
    console.error(e)
  }

  return;

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

            device.connect()
            .then((device) => {
              device.characteristicsForService("38")
                .catch((...args) => console.log("error!!!!: ", args))
                .then((...args) => console.log("xd", args));
                console.log(device.discoverAllServicesAndCharacteristics())
                return device.discoverAllServicesAndCharacteristics()
            })
            .then((device) => {
            // Do work on device with services and characteristics

            //const services = device.services();
            //console.log("Services:",services);
            //const characteristics = services[1].characteristics;
            //console.log("Characteristics:",characteristics);
  

              //const characteristic = None
            //for (let m=0; m <5; m++){

            console.log("Przed services")

              device.services().then(services => {
                services.forEach((service, i) => {
                  service.characteristics().then(c => {
                    console.log('----' + i + '-----');
                    console.log(c); 
                    
                    //console.log("Is Characteristics Readable:",c[0].isReadable);
                   // console.log(c[0].value)

                    /*
                    c[0].monitor((err, update) => {
                      if (err) {
                        console.log(`characteristic error: ${err}`);
                        console.log(JSON.stringify(err));
                      } else {
                        console.log("Is Characteristics Readable:",update.isReadable);
                        console.log(update.value)
                      }
                    });
                   */


                    //console.log(device.readCharacteristicForService(service.uuid, characteristic.uuid))
                    return c
                  });
                });
              });
              
            //}

              

            })
            .catch((error) => {
                // Handle errors
                console.log(error.message);
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