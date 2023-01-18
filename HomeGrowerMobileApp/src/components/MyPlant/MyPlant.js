import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Platform,
  NativeModules,
  NativeEventEmitter,
  Button,
  Alert,
} from 'react-native';
import {ButtonPlant, styles, OuterContainer} from '../../Styles.js';
import {
  DataRow,
  isValueInRangeStyle,
  NameRow,
  PropertiesContainer,
  PropertiesRow,
  Separator,
  SpecsContainer,
} from './MyPlants.styled.js';
import {ModalButton, ModalItem, ModalList} from '../AllPlants/AllPlants.styled';
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';
import storage from '../../utils/storage.js';
import config from '../../utils/config.js';
import PlantsDataRow from './MyPlantsData.js';
import {useNavigation} from '@react-navigation/native';

import {db} from '../../../App.js';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const MyPlant = props => {
  const [datas, setDatas] = useState([
    {id: 'temperature', title: 0},
    {id: 'light', title: 0},
    {id: 'moist', title: 0},
    {id: 'fertility', title: 0},
  ]);
  const [flower_care, setFlowerCare] = useState([]);
  const [sensorListAvailable, setSensorListAvailable] = useState([]);
  const [sensorListConnected, setSensorListConnected] = useState([]);
  const peripheralsAvailable = new Map();
  const peripheralsConnected = new Map();
  const navigation = useNavigation();

  const getData = async () => {
    const result = await storage.getAllSensorData();
    connect(result[0]);
  };

  const connect = async peripheral => {
    console.log('trying to connect:');
    console.log(peripheral.id);
    console.log('data');
    console.log(peripheral);
    console.log('......');

    console.log(sensorListConnected);
    console.log(sensorListAvailable);
    console.log(peripheralsAvailable);
    console.log(peripheralsConnected);

    // połącz się z czujnikiem
    await BleManager.connect(peripheral.id)
      .then(() => {
        console.log('Connected to ' + peripheral.id);
      })
      .catch(error => {
        console.log(error);
      });

    // storage.remove(peripheral.id);
    try {
      storage.setObject(peripheral.id, peripheral);
    } catch (e) {
      console.log('Object already exists');
    }

    //Zaktualizuj mapy i usestate
    for (let i = 0; i < sensorListAvailable.length; i++) {
      peripheralsAvailable.set(
        sensorListAvailable[i].id,
        sensorListAvailable[i],
      );
    }
    peripheralsAvailable.delete(peripheral.id);
    setSensorListAvailable(Array.from(peripheralsAvailable.values()));

    for (let i = 0; i < sensorListConnected.length; i++) {
      peripheralsConnected.set(
        sensorListConnected[i].id,
        sensorListConnected[i],
      );
    }
    peripheralsConnected.set(peripheral.id, peripheral);
    setSensorListConnected(Array.from(peripheralsConnected.values()));

    const result = await storage.getAllSensorData();
    console.log(result);

    // odnajduje services i characteristics danego urządzenia
    // trzeba zawsze uruchomić najpierw przed uruchomieniem metod write, read i start notification
    await BleManager.retrieveServices(peripheral.id)
      .then(peripheralData => {
        console.log('Retrieved peripheral services');
      })
      .catch(error => {
        console.log(error);
      });

    // wpijemy wartość [0xa0, 0x1f] do characteristics "charwrite" żeby uruchomić odczytywanie w czasie rzeczywistym
    await BleManager.write(
      peripheral.id,
      config.service,
      config.characteristicToWrite,
      config.byteRealTimeData,
    )
      .then(() => {
        console.log('Enabled real-time data!');
      })
      .catch(error => {
        console.log(error);
      });

    //Start the notification on the specified characteristic, you need to call retrieveServices method before.
    //The buffer will collect a number or messages from the server and then emit once the buffer count it reached.
    //Helpful to reducing the number or js bridge crossings when a characteristic is sending a lot of messages. Returns a Promise objec

    await BleManager.startNotification(
      peripheral.id,
      config.service,
      config.characteristic,
    )
      .then(() => {
        console.log('started notifications of:  ' + peripheral.id);
      })
      .catch(error => {
        console.log(error);
      });
    return;
  };

  const handleUpdateValueForCharacteristic = async data => {
    const inputData = Buffer.from(data.value);
    //odkodowuje bity
    temperature = inputData.readUint16LE(0) / 10;
    light = inputData.readIntLE(3, 4);
    //light = inputData.readUInt32LE(3)
    moist = inputData.readUInt8(7);
    fertility = inputData.readUint16LE(8);

    const plant_data = {temperature, light, moist, fertility, date: new Date()};
    const plantsArr = await storage.getObject('flower_data');
    if (plantsArr !== null) plantsArr.push(plant_data);
    storage.setObject('flower_data', plantsArr);

    console.log('\n');
    const fetchedData = [
      {id: 'temperature', title: temperature},
      {id: 'light', title: light},
      {id: 'moist', title: moist},
      {id: 'fertility', title: fertility},
    ];
    setDatas(fetchedData);

    //console.log(datas+"\n")
    console.log(
      `Recieved for characteristic! ${data.characteristic}  temperature: ${temperature}  light: ${light}   moist: ${moist}  fertility: ${fertility}`,
    );
  };

  const delPlant = async name => {
    try {
      await db.transaction(txn => {
        txn.executeSql(
          `DELETE FROM 'myplants' WHERE plant_genus_id LIKE ?`,
          [name],
          (tx, res) => {
            console.log('Query completed');
            const len = res.rowsAffected;
            if (len > 0) {
              console.log('Everything about SQLite done');
              Alert.alert('Sukces!', 'Pomyślnie usunięto roślinę', [
                {
                  onPress: () => {
                    navigation.navigate('MyPlants');
                  },
                },
              ]);
            }
          },
        );
      });
    } catch (err) {
      console.log('Error: ' + err);
    }
  };

  const {planame, plagenus, repoid, name} = props.route.params;

  useEffect(() => {
    console.log(planame, plagenus, repoid, name);
  }, []);

  useEffect(() => {
    BleManager.start({forceLegacy: true});
  }, []);

  //bleManagerEmmiter obsługuje eventy
  useEffect(() => {
    const subs_updateVal = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      handleUpdateValueForCharacteristic,
    );
    return () => {
      subs_updateVal.remove();
    };
  }, []);

  useEffect(() => {
    async () => {
      console.log('Helloooo');
      const result = await storage.getAllSensorData();
      connect(result[0]);
    };

    return () => {};
  }, []);

  return (
    <OuterContainer>
      <ButtonPlant title="Pobierz dane" onPress={getData}>
        <Text style={styles.body}> Pobierz dane </Text>
      </ButtonPlant>
      <PropertiesContainer>
        <Separator />
        {datas.map(item => (
          <PlantsDataRow title={item.id} value={item.title} parameters={0} />
        ))}
      </PropertiesContainer>
      <SpecsContainer>
        <ModalList>
          <ModalItem style={styles.h4}>{name[0]}</ModalItem>
          <ModalItem style={styles.h4_bold}>{name[1]}</ModalItem>
        </ModalList>
        <ModalList>
          <ModalItem style={styles.h4}>{planame[0]}</ModalItem>
          <ModalItem style={styles.h4_bold}>{planame[1]}</ModalItem>
        </ModalList>
        <ModalList>
          <ModalItem style={styles.h4}>{plagenus[0]}</ModalItem>
          <ModalItem style={styles.h4_bold}>{plagenus[1]}</ModalItem>
        </ModalList>
        <ModalList>
          <ModalItem style={styles.h4}>{repoid[0]}</ModalItem>
          <ModalItem style={styles.h4_bold}>{repoid[1]}</ModalItem>
        </ModalList>
        <ModalList>
          <ModalButton onPress={() => navigation.goBack()}>
            <Text style={styles.body}>Wróć</Text>
          </ModalButton>
          <ModalButton onPress={() => delPlant(name[1])}>
            <Text style={styles.body}>Usuń</Text>
          </ModalButton>
        </ModalList>
      </SpecsContainer>
      {/* <FlatList
          style={styles.data_table}
          numColumns={4}
          keyExtractor={item => item.id}
          data={datas}
          contentContainerStyle={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'space-around',
            flex: 1,
          }}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View>
                <Text style={styles.id}>{item.id}</Text>
                <Text style={styles.item}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        /> */}
    </OuterContainer>
  );
};

export default MyPlant;
