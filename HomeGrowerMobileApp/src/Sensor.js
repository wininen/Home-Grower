import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  NativeModules,
  NativeEventEmitter,
  ToastAndroid,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';
import {
  OuterContainer,
  InnerContainer,
  InnerContainerExtended,
  InnerContainerExtendedList,
  Title,
  ButtonsWrapper,
  ButtonContainer,
  StyledButton,
  styles,
  Separator,
  LeftRow,
  RightRow,
} from './Styles';
import getBluetoothScanPermission from './components/Permissions/Permissions';
import storage from './storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
console.log('przechodze przez plik');
const Sensor = ({navigation}) => {
  const [isScanning, setIsScanning] = useState(false);
  // const [shoulSearch, setShoulSearch] = useState(true);
  const [flower_care, setFlowerCare] = useState(null);
  const [datas, setDatas] = useState();
  const peripherals = new Map();
  const delay = ms => new Promise(res => setTimeout(res, ms));
  // const ThemeContext = React.createContext(themes.light);

  const createConnection = async () => {
    await scan();
    await connect(flower_care);
  };

  const toPlantsPage = async () => {
    navigation.navigate('Plants');
  };

  const toForecastPage = async () => {
    setElementVisible(!elementVisible);
    navigation.navigate('Forecast');
  };

  const toProfilePage = async () => {
    setElementVisible(!elementVisible);
    navigation.navigate('Profile');
  };

  const [elementVisible, setElementVisible] = useState(false);

  const handleStopScan = () => {
    console.log('done!');
    setIsScanning(false);
  };

  // funkcja obsługująca odłączenie urządzenia, jeszcze nie skonfigurowana
  const handleDisconnectedPeripheral = data => {
    console.log('handleDisconnectedPeripheral');
  };

  // funkcja obsługująca rejestrowanie nowych wartości konkretnej "characteristics"
  const handleUpdateValueForCharacteristic = async data => {
    console.log('handleUpdateValueForCharacteristic');
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

  //bleManagerEmmiter obsługuje eventy
  useEffect(() => {
    BleManager.start({forceLegacy: true});
  }, []);

  //bleManagerEmmiter obsługuje eventy
  useEffect(() => {
    console.log('MONTUJE KOMPONENT');
    let shoulSearch = true;

    // funkcja obsługująca wyszukiwanie urządzeń
    const handleDiscoverPeripheral = (peripheral, e) => {
      if (!shoulSearch) return;

      if (peripheral.name == 'Flower care') {
        console.log({peripheral, e});
        // powiadomienie wskazujące na połączenie się z czujnikiem
        ToastAndroid.showWithGravity(
          'Połączono z urządzeniem o adresie MAC: ' + peripheral.id,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );

        peripherals.set(peripheral.id, peripheral);
        setFlowerCare(peripheral);
        shoulSearch = false;
        console.log(flower_care);
        //BleManager.stopScan().then(() => {
        //   console.log("Scan stopped");
        //  });
      }
    };

    const subs_discover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
      {once: true},
    );
    const subs_stopScan = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      handleStopScan,
    );
    const subs_updateVal = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      handleUpdateValueForCharacteristic,
    );
    //bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    return () => {
      //eventy do usunięcia

      subs_discover.remove();
      subs_stopScan.remove();
      subs_updateVal.remove();
      //bleManagerEmitter.remove('BleManagerStopScan',handleStopScan)
      //bleManagerEmitter.remove('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
    };
  }, []);

  //funkcja skanująca urządzenia
  const scan = async () => {
    const OsVer = Platform.constants['Release'];

    console.log('started');
    // await BleManager.start({forceLegacy: true});

    if (OsVer >= 12) {
      console.log('check location access permission');
      await getBluetoothScanPermission();
    }

    await BleManager.scan(['00001204-0000-1000-8000-00805f9b34fb'], 5, false)
      .then(() => {
        console.log('Scanning...');
        setIsScanning(true);
      })
      .catch(e => {
        console.log(error);
      });

    // setTimeout(connect(flower_care), 5000);
    // await connect();
  };

  //funkcja łącząca się z sensorem
  const connect = async (
    peripheral,
    service = '00001204-0000-1000-8000-00805f9b34fb',
    characteristic = '00001a01-0000-1000-8000-00805f9b34fb',
  ) => {
    // await delay(6000);
    // console.log('Waited 5s');
    const charwrite = '00001a00-0000-1000-8000-00805f9b34fb'; //takie rzeczy przenosi się do configu

    console.log('trying to connect:');
    console.log(peripheral.id);

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
    await BleManager.write(peripheral.id, service, charwrite, [0xa0, 0x1f])
      .then(() => {
        console.log('Enabled real-time data!');
      })
      .catch(error => {
        console.log(error);
      });

    //Start the notification on the specified characteristic, you need to call retrieveServices method before.
    //The buffer will collect a number or messages from the server and then emit once the buffer count it reached.
    //Helpful to reducing the number or js bridge crossings when a characteristic is sending a lot of messages. Returns a Promise objec

    await BleManager.startNotification(peripheral.id, service, characteristic)
      .then(() => {
        console.log('started notifications of:  ' + peripheral.id);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getHistory = async (
    peripheral,
    service = '00001206-0000-1000-8000-00805f9b34fb',
    characteristic = '00001a11-0000-1000-8000-00805f9b34fb',
  ) => {
    const charwrite = '00001a10-0000-1000-8000-00805f9b34fb';
    let number_of_records = undefined;

    console.log('trying to connect:');
    console.log(peripheral.id);
    console.log(datas);

    await BleManager.connect(peripheral.id)
      .then(() => {
        console.log('Connected to ' + peripheral.id);
      })
      .catch(error => {
        console.log(error);
      });

    await BleManager.retrieveServices(peripheral.id)
      .then(peripheralData => {
        console.log('Retrieved peripheral services');
      })
      .catch(error => {
        console.log(error);
      });

    await BleManager.write(
      peripheral.id,
      '00001206-0000-1000-8000-00805f9b34fb',
      '00001a10-0000-1000-8000-00805f9b34fb',
      [0xa0, 0x00, 0x00],
    )
      .then(() => {
        console.log('Enabled real-time history!');
      })
      .catch(error => {
        console.log(error);
      });

    await BleManager.read(
      peripheral.id,
      '00001206-0000-1000-8000-00805f9b34fb',
      '00001a11-0000-1000-8000-00805f9b34fb',
    )
      .then(readData => {
        console.log('read history!');
        const buffer = Buffer.from(readData);
        console.log(buffer);
        number_of_records = buffer.readUInt8(0);
      })
      .catch(error => {
        console.log(error);
      });

    console.log(number_of_records);

    for (let i = 0; i < number_of_records; i++) {
      console.log('dz');
      await BleManager.isPeripheralConnected(peripheral.id, []).then(
        isConnected => {
          if (isConnected) {
            console.log('Peripheral is connected!');
          } else {
            BleManager.connect(peripheral.id)
              .then(() => {
                console.log('Connected to ' + peripheral.id);
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
      );

      let val = i;
      val &= 0xffff;

      const hex = val.toString(16).toUpperCase();
      const addr_string = ('a1' + hex + '0000').slice(0, 6);

      const buff = Buffer.from(addr_string, 'hex');
      const addr = [...buff];
      console.log(buff[0]);
      console.log(addr);

      await BleManager.isPeripheralConnected(peripheral.id, []).then(
        isConnected => {
          if (isConnected) {
            console.log('Peripheral is connected!');
          } else {
            BleManager.connect(peripheral.id)
              .then(() => {
                console.log('Connected to ' + peripheral.id);
              })
              .catch(error => {
                console.log(error);
              });
          }
        },
      );

      await BleManager.write(
        peripheral.id,
        '00001206-0000-1000-8000-00805f9b34fb',
        '00001a10-0000-1000-8000-00805f9b34fb',
        addr,
      )
        .then(() => {
          console.log('Enabled real-time history!');
        })
        .catch(error => {
          console.log(error);
        });

      await BleManager.read(
        peripheral.id,
        '00001206-0000-1000-8000-00805f9b34fb',
        '00001a11-0000-1000-8000-00805f9b34fb',
      )
        .then(readData => {
          //console.log("read history record!");

          //console.log(readData)
          const inputData = Buffer.from(readData);

          //console.log(inputData)
          //odkodowuje bity
          const timestamp = inputData.readIntLE(0, 3);
          const temperature = inputData.readUint16LE(4) / 10;
          const light = inputData.readIntLE(7, 3);
          //light = inputData.readUInt32LE(3)
          const moist = inputData.readUInt8(11);
          const fertility = inputData.readUint16LE(12);

          console.log(
            `Read history! timestamp: ${timestamp} temperature: ${temperature}  light: ${light}   moist: ${moist}  fertility: ${fertility}`,
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  /*
  (async () => {
    const msg = await storage.get('damian');
    console.log('Widomosc z przyszlosci', msg);
  })();
  */
  // GENEROWANIE PRZYCISKÓW

  useEffect(() => {
    (async () => {
      const plantsArr = await storage.getObject('flower_data');
      console.log('plantsArr', plantsArr);
    })();
  }, []);

  useEffect(() => {
    if (flower_care) {
      console.log('flower_care has changed');
      connect(flower_care);
    }
  }, [flower_care]);

  return (
    <OuterContainer>
      <InnerContainer>
        <LeftRow>
          <TouchableOpacity onPress={() => setElementVisible(!elementVisible)}>
            <Image
              source={require('./icons/hamburger.png')}
              style={styles.gapForMenu}
            />
          </TouchableOpacity>
          <Text style={styles.bold_white}>Moje rośliny</Text>
        </LeftRow>
        <RightRow>
          <Image
            source={require('./icons/potted_plant.png')}
            style={styles.gapForMenu}
          />
          <Image source={require('./icons/notification.png')} />
        </RightRow>
      </InnerContainer>
      {elementVisible ? (
        <InnerContainerExtended>
          <Separator></Separator>
          <InnerContainerExtendedList
            style={{borderBottomColor: '#CCCCCC', borderBotttomWidth: 3}}
            onPress={() => toForecastPage()}>
            <Text style={styles.bold_white}>Pogoda</Text>
          </InnerContainerExtendedList>
          <Separator></Separator>
          <InnerContainerExtendedList onPress={() => toProfilePage()}>
            <Text style={styles.bold_white}>Profil użytkownika</Text>
          </InnerContainerExtendedList>
        </InnerContainerExtended>
      ) : null}
      <ButtonsWrapper>
        <ButtonContainer>
          <StyledButton onPress={scan} accessibilityLabel="Wyszukaj urządzenie">
            <Text style={styles.body}>Wyszukaj urządzenie</Text>
          </StyledButton>
        </ButtonContainer>
        {/* <ButtonContainer>
          <StyledButton
            onPress={() => connect(flower_care)}
            //onPress={connectAndPrepare}
            accessibilityLabel="Połącz">
            <Text style={styles.body}>Połącz</Text>
          </StyledButton>
        </ButtonContainer> */}
        <ButtonContainer>
          <StyledButton
            onPress={() => getHistory(flower_care)}
            accessibilityLabel="Połącz">
            <Text style={styles.body}>Historia</Text>
          </StyledButton>
        </ButtonContainer>
        <ButtonContainer>
          <StyledButton
            onPress={() => toPlantsPage()}
            accessibilityLabel="Baza roślin">
            <Text style={styles.body}>Baza roślin</Text>
          </StyledButton>
        </ButtonContainer>
      </ButtonsWrapper>

      <FlatList
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
      />
    </OuterContainer>
  );
};

export default Sensor;
