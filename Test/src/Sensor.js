import React, {useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {View, Text, StyleSheet, Button, FlatList,TouchableHighlight, TouchableOpacity, Platform, NativeModules, NativeEventEmitter, ToastAndroid, StatusBar } from 'react-native';
import BleManager from "react-native-ble-manager";
import {Buffer} from 'buffer';
import getBluetoothScanPermission from './Permissions';
import RNFS from 'react-native-fs';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);





const Sensor = forwardRef((props, ref) => {

  const [flower_care, setFlowerCare] = useState([]);
  const [datas, setDatas] = useState();
  const peripherals = new Map();

  useImperativeHandle(ref, () => ({
    createConnection
  }));

  const createConnection = async () => {
    await scan();
    setTimeout(
      connect,
      5000
    );
  }
  



  // funkcja obsługująca wyszukiwanie urządzeń
  const handleDiscoverPeripheral = (peripheral) => {

    if(peripheral.name == "Flower care"){
      console.log(peripheral)

      // powiadomienie wskazujące na połączenie się z czujnikiem
      ToastAndroid.showWithGravity("Połączono z urządzeniem o adresie MAC: " + peripheral.id, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      
      if (flower_care.length == 0){
        peripherals.set(peripheral.id, peripheral);
        setFlowerCare(peripheral);
        //BleManager.stopScan().then(() => {
        //   console.log("Scan stopped");
        //  });
      }
    }
  }


  const handleStopScan  = () => {
    console.log("done!")
  }


  // funkcja obsługująca odłączenie urządzenia, jeszcze nie skonfigurowana
  const handleDisconnectedPeripheral = (data) => {
    console.log("handleDisconnectedPeripheral")
  }

  
  // funkcja obsługująca rejestrowanie nowych wartości konkretnej "characteristics"
  const handleUpdateValueForCharacteristic = (data) => {
    const inputData = Buffer.from(data.value);
    //odkodowuje bity
    temperature = inputData.readUint16LE(0) / 10
    light = inputData.readIntLE(3,4)
    //light = inputData.readUInt32LE(3)
    moist = inputData.readUInt8(7)
    fertility = inputData.readUint16LE(8)

    console.log("\n")
    const fetchedData = [{ id: "temperature", title: temperature}, { id: "light", title: light}, { id: "moist", title: moist}, { id: "fertility", title: fertility}]
    setDatas(fetchedData)

    //console.log(datas+"\n")
    console.log(`Recieved for characteristic! ${data.characteristic}  temperature: ${temperature}  light: ${light}   moist: ${moist}  fertility: ${fertility}`);
  }


  //bleManagerEmmiter obsługuje eventy
  //bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral ); 
  useEffect(()=> {
    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral)
    bleManagerEmitter.addListener( 'BleManagerStopScan',handleStopScan)
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
  return () => {
    //eventy do usunięcia

    bleManagerEmitter.remove('BleManagerDiscoverPeripheral', handleDiscoverPeripheral)
    bleManagerEmitter.remove( 'BleManagerStopScan',handleStopScan)
    bleManagerEmitter.remove('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
  }
  }, []) 


  //funkcja skanująca urządzenia
  const scan = async () => { 

    const OsVer = Platform.constants['Release'];
  
    console.log("started")
    await BleManager.start( { forceLegacy: true } )

    if(OsVer >= 12){
        console.log("check location access permission")
        await getBluetoothScanPermission()
      }

    await BleManager.scan([], 5).then(() => {
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
    console.log(datas)

      // połącz się z czujnikiem      
      await BleManager.connect(peripheral.id).then(() => {
        console.log('Connected to ' + peripheral.id);
      })
      .catch((error) => {
        console.log(error);
      });
      
      // odnajduje services i characteristics danego urządzenia
      // trzeba zawsze uruchomić najpierw przed uruchomieniem metod write, read i start notification 
      await BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
        console.log('Retrieved peripheral services'); 
      })
      .catch((error) => {
        console.log(error);
      });
      
      // wpijemy wartość [0xa0, 0x1f] do characteristics "charwrite" żeby uruchomić odczytywanie w czasie rzeczywistym
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









// GENEROWANIE PRZYCISKÓW
  return (
    <View style = {styles.container}>
      <Button
        onPress={scan}
        title="Wyszukaj urządzenie"
        color="#841584"
        accessibilityLabel="Wyszukaj urządzenie"
      />

      <Text></Text>

      <Button
              onPress={() => connect(flower_care)}
              //onPress={connectAndPrepare}
              title="Połącz"
              color="#841584"
              accessibilityLabel="Połącz"
        />

        <FlatList style = {styles.data_table}
            numColumns={4}
            keyExtractor={(item) => item.id}
            data={datas}
            renderItem={({item}) => (
                <TouchableOpacity>
                <View>
                <Text style={styles.id}>{item.id}</Text>
                <Text style={styles.item}>{item.title}</Text>
                </View>
                </TouchableOpacity>
            )} 
        />
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 0,
    margin: 0,
    paddingTop: Platform.OS === "android" ? 300 : 0,
    paddingBottom: Platform.OS === "android" ? 300 : 0,
    alignItems: 'center',
    alignContent: 'space-between'
  },
  data_table: {
    marginTop: 20
  },
  item: {
    backgroundColor: 'pink',
    padding: 30,
    margin: 1,
    fontSize: 24,
    borderWidth: 1,
    borderColor: "#a83264",
    borderRadius: 10
  },
  id: {
      fontSize: 12,
      textAlign: 'center',
      textAlignVertical: 'center'
  }
});

export default Sensor;