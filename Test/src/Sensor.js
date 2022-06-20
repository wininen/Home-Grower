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
  StatusBar,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';
import {
  SensorContainer,
  Container,
  Title,
  ButtonsWrapper,
  ButtonContainer,
  StyledButton,
  styles,
} from './Styles';
import getBluetoothScanPermission from './Permissions';
import storage from './storage';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Sensor = () => {
  const [flower_care, setFlowerCare] = useState([]);
  const [datas, setDatas] = useState();
  const peripherals = new Map();

  const createConnection = async () => {
    await scan();
    setTimeout(connect, 5000);
  };

  // funkcja obsługująca wyszukiwanie urządzeń
  const handleDiscoverPeripheral = peripheral => {
    if (peripheral.name == 'Flower care') {
      console.log(peripheral);

      if (flower_care.length == 0) {
        // powiadomienie wskazujące na połączenie się z czujnikiem
        ToastAndroid.showWithGravity(
          'Połączono z urządzeniem o adresie MAC: ' + peripheral.id,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );

        peripherals.set(peripheral.id, peripheral);
        setFlowerCare(peripheral);
        //BleManager.stopScan().then(() => {
        //   console.log("Scan stopped");
        //  });
      }
    }
  };

  const handleStopScan = () => {
    console.log('done!');
  };

  // funkcja obsługująca odłączenie urządzenia, jeszcze nie skonfigurowana
  const handleDisconnectedPeripheral = data => {
    console.log('handleDisconnectedPeripheral');
  };

  // funkcja obsługująca rejestrowanie nowych wartości konkretnej "characteristics"
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

  //bleManagerEmmiter obsługuje eventy
  useEffect(() => {
    BleManager.start({forceLegacy: true});
  }, []);

  //bleManagerEmmiter obsługuje eventy
  useEffect(() => {
    const subs_discover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
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

    await BleManager.scan([], 5)
      .then(() => {
        console.log('Scanning...');
      })
      .catch(e => {
        console.log(error);
      });
  };

  //funkcja łącząca się z sensorem
  const connect = async (
    peripheral,
    service = '00001204-0000-1000-8000-00805f9b34fb',
    characteristic = '00001a01-0000-1000-8000-00805f9b34fb',
  ) => {
    const charwrite = '00001a00-0000-1000-8000-00805f9b34fb';

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
  return (
    <SensorContainer>
      <Container style={{position: 'relative'}}>
        <Image source={require('./icons/hamburger.png')} />
        <Title style={{left: 24}}>Moje rośliny</Title>
        <Image
          source={require('./icons/potted_plant.png')}
          style={{right: 60, top: '50%', elevation: 5, position: 'absolute'}}
        />
        <Image
          source={require('./icons/notification.png')}
          style={{right: 20, top: '50%', elevation: 5, position: 'absolute'}}
        />
      </Container>
      <ButtonsWrapper>
        <ButtonContainer>
          <StyledButton
            onPress={scan}
            title="Wyszukaj urządzenie"
            color="#2FA84E"
            accessibilityLabel="Wyszukaj urządzenie"
          />
        </ButtonContainer>
        <ButtonContainer>
          <StyledButton
            onPress={() => connect(flower_care)}
            //onPress={connectAndPrepare}
            title="Połącz"
            color="#2FA84E"
            accessibilityLabel="Połącz"
          />
        </ButtonContainer>
        <ButtonContainer>
          <StyledButton
            onPress={() => getHistory(flower_care)}
            title="Historia"
            color="#2FA84E"
            accessibilityLabel="Połącz"
          />
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
    </SensorContainer>
  );
};

export default Sensor;
