import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import BleManager from "react-native-ble-manager";
import {useState} from 'react';
import {PermissionsAndroid, NativeModules, NativeEventEmitter } from 'react-native';
import {Buffer} from 'buffer';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
//let peripheralFlower = undefined




const Sensor = () => {

  const [flower_care, setFlowerCare] = useState([]);
  const peripherals = new Map();

  async function getBluetoothScanPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Bluetooth Permission',
        message: 
          'In the next dialogue, Android will ask for permission for this ' +
          'App to access your location. This is needed for being able to ' +
          'use Bluetooth to scan your environment for peripherals.',
        buttonPositive: 'OK'
        },
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can scan");
    } else {
      console.log("scan permission denied");
    }


    const connect = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: 'Bluetooth Permission',
        message: 
          'In the next dialogue, Android will ask for permission for this ' +
          'App to access your location. This is needed for being able to ' +
          'use Bluetooth to scan your environment for peripherals.',
        buttonPositive: 'OK'
        },
    )
    if (connect === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can connect");
    } else {
      console.log("connect permission denied");
    }

    const location = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Bluetooth Permission',
        message: 
          'In the next dialogue, Android will ask for permission for this ' +
          'App to access your location. This is needed for being able to ' +
          'use Bluetooth to scan your environment for peripherals.',
        buttonPositive: 'OK'
        },
    )
    if (location === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can connect");
    } else {
      console.log("connect permission denied");
    }

    const location2 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Bluetooth Permission',
        message: 
          'In the next dialogue, Android will ask for permission for this ' +
          'App to access your location. This is needed for being able to ' +
          'use Bluetooth to scan your environment for peripherals.',
        buttonPositive: 'OK'
        },
    )
    if (location2 === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can connect");
    } else {
      console.log("connect permission denied");
    }
    
    
    
    

  }



  //funkcja obsługująca wyszukiwanie urządzeń
  const handleDiscoverPeripheral = (peripheral) => {

    if(peripheral.name == "Flower care"){
      console.log(peripheral)

      if (peripherals.size == 0){
        console.log(peripheral)
        peripherals.set(peripheral.id, peripheral);
        setFlowerCare(peripheral);
      }
      
    }
  }


  const handleStopScan  = () => {
    console.log("done")
  }


  //funkcja obsługująca odłączenie urządzenia, jeszcze nie skonfigurowany
  const handleDisconnectedPeripheral = (data) => {
    console.log("handleDisconnectedPeripheral")
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setFlowerCare(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  
  //funkcja obsługująca rejestrowanie nowych wartości konkretnej "characteristics"
  const handleUpdateValueForCharacteristic = (data) => {

    
    const inputData = Buffer.from(data.value);

    //odkodowuje bity
    temperature = inputData.readUint16LE(0) / 10
    light = inputData.readIntLE(3,4)
    //light = inputData.readUInt32LE(3)
    moist = inputData.readUInt8(7)
    fertility = inputData.readUint16LE(8)

    console.log("\n")
    
    console.log(`Recieved for characteristic! ${data.characteristic}  temperature: ${temperature}  light: ${light}   moist: ${moist}  fertility: ${fertility}`);
    console.log("\n");
  }



  //bleManagerEmmiter obsługuje eventy
  bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral)

  bleManagerEmitter.addListener( 'BleManagerStopScan',handleStopScan)

  bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

  //bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );



  //funkcja skanująca urządzenia
  const scan = async () => { 

  
    console.log("starteddd")
    await BleManager.start( { forceLegacy: true } )

    console.log("check location access permission")
    await getBluetoothScanPermission()

    /*
    await BleManager.enableBluetooth()
    .then(() => {
        // Success code
        console.log("The bluetooth is already enabled or the user confirm");
    })
    .catch((error) => {
        // Failure code
        console.log("The user refuse to enable bluetooth");
    }); */

    await BleManager.scan([], 2).then(() => {
      console.log('Scanning...');
    })
    .catch((e) => {
      console.log(error)
    })


      
  
  }


  //funkcja łącząca się z sensorem
  const connect = async (peripheral, service ="00001204-0000-1000-8000-00805f9b34fb", characteristic = "00001a01-0000-1000-8000-00805f9b34fb") => { 

    const charwrite = "00001a00-0000-1000-8000-00805f9b34fb"

    console.log("trying to connect:")
    console.log(peripheral.id)


      //połącz się z czujnikiem      
      await BleManager.connect(peripheral.id).then(() => {
        console.log('Connected to ' + peripheral.id);
      })
      .catch((error) => {
        console.log(error);
      });
      

      //odnajduje services i characteristics danego urządzenia
      //trzeba zawsze uruchomić najpierw przed uruchomieniem metod write, read i start notification 
      await BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
        console.log('Retrieved peripheral services'); 
      })
      .catch((error) => {
        console.log(error);
      });

      
      //Wpsijemu wartość [0xa0, 0x1f] do characteristics "charwrite" żeby uruchomić odczytywanie w czasie rzeczywistym
      await BleManager.write(peripheral.id, service, charwrite, [0xa0, 0x1f])
      .then(() => {
          console.log("Enabled real-time data!");
      })
      .catch((error) => {
          console.log(error);
      });


      //Start the notification on the specified characteristic, you need to call retrieveServices method before. 
      //The buffer will collect a number or messages from the server and then emit once the buffer count it reached. 
      //Helpful to reducing the number or js bridge crossings when a characteristic is sending a lot of messages. Returns a Promise objec
      
      await BleManager.startNotification(peripheral.id, service, characteristic).then(() => {
          console.log('started notifications of:  ' + peripheral.id);
      })
      .catch((error) => {
          console.log(error);
      });
        

}



  
  return (
    <View style={styles.container}>
      <Button
        onPress={scan}
      title="Wyszukaj urządzenie"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Text></Text>

      <Button style = {{ width : 150, height : 150, marginLeft : 370 }}
              onPress={() => connect(flower_care)}
              //onPress={connectAndPrepare}
              title="połącz"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      paddingTop: Platform.OS === "android" ? 300 : 0,
      paddingBottom:300,
      alignItems: 'center',
      justifyContent: 'center'
  },

});

export default Sensor;