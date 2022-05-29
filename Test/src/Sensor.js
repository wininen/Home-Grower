import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, FlatList,TouchableHighlight, TouchableOpacity, Platform, NativeModules, NativeEventEmitter } from 'react-native';
import BleManager from "react-native-ble-manager";
import {Buffer} from 'buffer';
import getBluetoothScanPermission from './Permissions';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);





const Sensor = () => {

  const [flower_care, setFlowerCare] = useState([]);
  const [datas, setDatas] = useState();
  const peripherals = new Map();

  



  //funkcja obsługująca wyszukiwanie urządzeń
  const handleDiscoverPeripheral = (peripheral) => {

    if(peripheral.name == "Flower care"){

      if (flower_care.length == 0){
        peripherals.set(peripheral.id, peripheral);
        setFlowerCare(peripheral);

        BleManager.stopScan().then(() => {
            console.log("Scan stopped");
          });
      }
      
    }
  }


  const handleStopScan  = () => {
    console.log("done!")
  }


  //funkcja obsługująca odłączenie urządzenia, jeszcze nie skonfigurowany
  const handleDisconnectedPeripheral = (data) => {
    console.log("handleDisconnectedPeripheral")
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
    const fetchedData = [{ id: "temperature", title: temperature}, { id: "light", title: light}, { id: "moist", title: moist}, { id: "fertility", title: fertility}]
    setDatas(fetchedData)
    console.log(datas)
    
    
    //console.log(`Recieved for characteristic! ${data.characteristic}  temperature: ${temperature}  light: ${light}   moist: ${moist}  fertility: ${fertility}`);
    console.log("\n");
  }



  //bleManagerEmmiter obsługuje eventy
  bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral)

  bleManagerEmitter.addListener( 'BleManagerStopScan',handleStopScan)

  bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

  //bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );



  //funkcja skanująca urządzenia
  const scan = async () => { 

    const OsVer = Platform.constants['Release'];
  
    console.log("started")
    await BleManager.start( { forceLegacy: true } )

    if(OsVer >= 12){
        console.log("check location access permission")
        await getBluetoothScanPermission()
      }

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
    console.log(datas)


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





const renderItem = (item) => {
    //const color = item.connected ? 'green' : '#fff';

    console.log("render")
    return (
      <TouchableHighlight>
          <Text style={{fontSize: 24, textAlign: 'center', color: '#333333', padding: 10}}>{item.title}</Text>
      </TouchableHighlight>
    );
  }



  
  return (
    <View style={styles.container}>
      <Button
        onPress={scan}
      title="Wyszukaj urządzenie"
        color="#841584"
        accessibilityLabel="Wyszukaj urządzenie"
      />
      <Text></Text>

      <Button style = {{margin: 20}}
              onPress={() => connect(flower_care)}
              //onPress={connectAndPrepare}
              title="połącz"
              color="#841584"
              accessibilityLabel="połącz"
        />


        <FlatList
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
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      paddingTop: Platform.OS === "android" ? 300 : 0,
      alignItems: 'center',
      justifyContent: 'center'
  },
  item: {
    backgroundColor: 'pink',
    padding: 30,
    fontSize: 24,
    marginTop: 20
},
id: {
    fontSize: 12,
    marginTop: 20,
    marginLeft: 15
},

});

export default Sensor;