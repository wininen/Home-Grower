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
import {
  ButtonPlant,
  styles,
  OuterContainer,
  ErrorMessageContainer,
  ButtonContainer,
} from '../../Styles.js';
import {
  ConnectToPlantButton,
  DataRow,
  FirstRowButtonWrapper,
  Icon,
  isValueInRangeStyle,
  NameRow,
  PropertiesContainer,
  PropertiesRow,
  Separator,
  SpecsContainer,
  ScrollableList,
  SensorsList,
} from './MyPlants.styled.js';

import {ConnectedSensor} from './MyPlantSensorScrollable';
import QRCode from 'react-native-qrcode-svg';
import {ModalButton, ModalItem, ModalList} from '../AllPlants/AllPlants.styled';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BleManager from 'react-native-ble-manager';
import {Modal} from 'react-native-paper';
import {Buffer} from 'buffer';
import storage from '../../utils/storage.js';
import config from '../../utils/config.js';
import PlantsDataRow from './MyPlantsData.js';
import {useNavigation} from '@react-navigation/native';

import {db} from '../../../App.js';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const MyPlant = props => {
  const navigation = useNavigation();
  const [datas, setDatas] = useState([
    {id: 'temperature', title: 0},
    {id: 'light', title: 0},
    {id: 'moist', title: 0},
    {id: 'fertility', title: 0},
  ]);

  const [active, setActive] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalQr, setModalQr] = useState(false);
  const [isPeripheral, setIsPeripheral] = useState(false);
  const [sensorListConnected, setSensorListConnected] = useState([]);
  // const plantId =
  //   '45ce2ccc-941f-11ed-a1eb-0242ac12000245ce2ccc-941f-11ed-a1eb-0242ac120002';
  const {planame, plagenus, repoid, name, plantId} = props.route.params;
  const qrCodeValue = plantId[1];
  let peripheral = null;

  const getData = async () => {
    const result = await storage.getAllSensorData();
    connect(result[0]);
  };

  const assignSensor = async () => {
    const peripheralFound = await findSensor();
    console.log(peripheralFound);
    console.log('asigning!!!');
    if (peripheralFound == false) {
      setActive(false);
      const sensors = await storage.getAllAvailableSensors();
      console.log('AVAILABLE SENSORS ');
      console.log(sensors);
      setSensorListConnected(await storage.getAllAvailableSensors());
      console.log('czujniki');
      console.log(await storage.getAllSensorData());
      setModal(true);
    } else {
      setActive(true);
    }
  };

  const connect = async peripheral => {
    console.log('trying to connect:');
    console.log(peripheral.id);
    console.log('data');
    console.log(peripheral);
    console.log('......');

    const result = await storage.getAllSensorKeys();
    console.log('*********');
    console.log(peripheral.id);
    console.log('*********');
    console.log(result);
    console.log('*********');
    if (!result.includes(peripheral.id)) {
      console.log('ERRORRRR');
      return;
    }

    // połącz się z czujnikiem
    await BleManager.connect(peripheral.id)
      .then(() => {
        console.log('Connected to ' + peripheral.id);
      })
      .catch(error => {
        console.log(error);
      });

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

  const assignSensorConnection = async peripheral => {
    console.log('trying to connect:');
    console.log(peripheral.id);
    console.log('data');
    console.log(peripheral);
    console.log('......');

    const result = await storage.getAllSensorKeys();
    console.log('*********');
    console.log(peripheral.id);
    console.log('*********');
    console.log(result);
    console.log('*********');
    if (!result.includes(peripheral.id)) {
      console.log('ERRORRRR');
      return;
    }

    // połącz się z czujnikiem
    await BleManager.connect(peripheral.id)
      .then(() => {
        console.log('Connected to ' + peripheral.id);
      })
      .catch(error => {
        console.log(error);
      });
    setModal(false);
    setActive(true);
    await pushSensorConnection(peripheral.id);

    await BleManager.retrieveServices(peripheral.id)
      .then(peripheralData => {
        console.log('Retrieved peripheral services');
      })
      .catch(error => {
        console.log(error);
      });

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
    let temperature = inputData.readUint16LE(0) / 10;
    let light = inputData.readIntLE(3, 4);
    //light = inputData.readUInt32LE(3)
    let moist = inputData.readUInt8(7);
    let fertility = inputData.readUint16LE(8);

    const plant_data = {temperature, light, moist, fertility, date: new Date()};
    // const plantsArr = await storage.getObject('@flower_data');
    // if (plantsArr !== null) plantsArr.push(plant_data);
    // storage.setObject('@flower_data', plantsArr);

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

  const findSensor = async () => {
    console.log(
      'Tutaj wrzucamy zwracamy id naszego sensora jeśli połączenie z czujnikiem istnieje',
    );
    const key = '!' + plantId[1];
    console.log(key);
    const result = await storage.get(key);
    console.log(result);
    if (result == null) {
      return false;
    } else {
      return result;
    }
  };

  const pushSensorConnection = async peripheralId => {
    console.log('Tutaj wrzucamy nasz sensor i id roslinki do tabeli połączeń');
    const key = '!' + plantId[1];
    const peripheral = await storage.getObject(peripheralId);
    console.log(key, peripheral);
    await storage.set(key, peripheralId);
  };

  const disconnectSensor = async () => {
    console.log('Tutaj odłączamy sensor od rosliny');
    const key = '!' + plantId[1];
    console.log('hhhhhh');
    const peripheralId = await storage.get(key);
    console.log('hhhhhh');
    const peripheral = await storage.getObject(peripheralId);
    console.log('hhhhhh');
    await BleManager.disconnect(peripheral.id)
      .then(() => {
        console.log('Disconnected');
        storage.remove(key);
      })
      .catch(error => {
        console.log(error);
      });
    setActive(false);
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

  useEffect(() => {
    console.log(planame, plagenus, repoid, name, plantId);
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
    console.log('tu use eff');
    (async () => {
      const peripheralId = await findSensor();
      console.log(peripheralId);
      if (peripheralId != false) {
        setActive(true);

        console.log('Helloooo');
        const peripheral = await storage.getObject(peripheralId);
        console.log(peripheral);
        connect(peripheral);
      }
    })();
  }, []);
  return (
    <OuterContainer>
      <FirstRowButtonWrapper>
        <ButtonPlant title="Pobierz dane" onPress={getData}>
          <Text style={styles.body}> Pobierz dane </Text>
        </ButtonPlant>
        <Icon onPress={() => setModalQr(!modalQr)}>
          <AntDesign name="qrcode" size={30} style={{color: 'black'}} />
        </Icon>
        <Icon onPress={() => assignSensor()}>
          <Entypo
            name="signal"
            size={30}
            style={{color: active ? '#A7C957' : '#BC4749'}}
          />
        </Icon>
        {active && (
          <Icon onPress={() => disconnectSensor()}>
            <AntDesign name="disconnect" size={30} style={{color: '#BC4749'}} />
          </Icon>
        )}
      </FirstRowButtonWrapper>
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalSensorContent}>
            <ScrollableList>
              <SensorsList>
                {sensorListConnected.map(item => (
                  <ConnectedSensor
                    key={item.id}
                    item={item}
                    connect={assignSensorConnection}
                  />
                ))}
              </SensorsList>
            </ScrollableList>
            <ModalButton onPress={() => setModal(!modal)}>
              <Text style={styles.body}>Wróć</Text>
            </ModalButton>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalQr}
        onRequestClose={() => {
          setModalQr(!modalQr);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalQRContent}>
            <QRCode value={qrCodeValue} size={200} />
            <ModalButton onPress={() => setModalQr(!modalQr)}>
              <Text style={styles.body}>Wróć</Text>
            </ModalButton>
          </View>
        </View>
      </Modal>
    </OuterContainer>
  );
};

export default MyPlant;

// <View>
// {isPeripheral ? (
//   <OuterContainer>
//     <ButtonPlant title="Pobierz dane" onPress={getData}>
//       <Text style={styles.body}> Pobierz dane </Text>
//     </ButtonPlant>
//     <PropertiesContainer>
//       <Separator />
//       {datas.map(item => (
//         <PlantsDataRow
//           title={item.id}
//           value={item.title}
//           parameters={0}
//         />
//       ))}
//     </PropertiesContainer>
//     <SpecsContainer>
//       <ModalList>
//         <ModalItem style={styles.h4}>{name[0]}</ModalItem>
//         <ModalItem style={styles.h4_bold}>{name[1]}</ModalItem>
//       </ModalList>
//       <ModalList>
//         <ModalItem style={styles.h4}>{planame[0]}</ModalItem>
//         <ModalItem style={styles.h4_bold}>{planame[1]}</ModalItem>
//       </ModalList>
//       <ModalList>
//         <ModalItem style={styles.h4}>{plagenus[0]}</ModalItem>
//         <ModalItem style={styles.h4_bold}>{plagenus[1]}</ModalItem>
//       </ModalList>
//       <ModalList>
//         <ModalItem style={styles.h4}>{repoid[0]}</ModalItem>
//         <ModalItem style={styles.h4_bold}>{repoid[1]}</ModalItem>
//       </ModalList>
//       <ModalList>
//         <ModalButton onPress={() => navigation.goBack()}>
//           <Text style={styles.body}>Wróć</Text>
//         </ModalButton>
//         <ModalButton onPress={() => delPlant(name[1])}>
//           <Text style={styles.body}>Usuń</Text>
//         </ModalButton>
//       </ModalList>
//     </SpecsContainer>
//   </OuterContainer>
// ) : (
//   <ErrorMessageContainer>
//     <Text style={styles.errorMessage}>
//       Nie masz podłączonego czujnika do tej rośliny
//     </Text>
//     <ButtonContainer>
//       <ConnectToPlantButton onPress={() => assignSensor()}>
//         <Text style={styles.body}>Przypisz czujnik</Text>
//       </ConnectToPlantButton>
//     </ButtonContainer>
//   </ErrorMessageContainer>
// )}
// </View>
// );
// };
{
  /* <FlatList
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
        /> */
}
