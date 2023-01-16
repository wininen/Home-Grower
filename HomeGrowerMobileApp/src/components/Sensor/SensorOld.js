import React, {useState, useEffect} from 'react';
import {
  Text,
  Platform,
  NativeModules,
  NativeEventEmitter,
  ToastAndroid,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';
import Layout from '../Layout/Layout';
import {
  ButtonsWrapper,
  ButtonContainer,
  StyledButton,
  styles,
} from '../../Styles';
import getBluetoothScanPermission from '../Permissions/Permissions';
import storage from '../../utils/storage.js';
import config from '../../utils/config.js';
import {AvailableSensor, ConnectedSensor} from './SensorOption.js';
import {
  OuterContainer,
  SensorsContainer,
  ScrollableList,
  SensorsList,
  isBackgroundTaskRunning,
} from './Sensor.styled';

import BackgroundService from 'react-native-background-actions';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const options = {
  taskName: 'Sensor',
  taskTitle: 'Czujnik czuwa',
  taskDesc: 'Aplikacja pobiera w tle dane z czujnika',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  parameters: {
    delay: 60000,
  },
};

const Sensor = ({navigation}) => {
  const [flower_care, setFlowerCare] = useState([]);
  const [sensorListAvailable, setSensorListAvailable] = useState([]);
  const [sensorListConnected, setSensorListConnected] = useState([]);
  const [datas, setDatas] = useState();
  const [active, setActive] = useState(true);
  const peripheralsAvailable = new Map();
  const peripheralsConnected = new Map();

  const connectInterval = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(BackgroundService.isRunning(), delay);
        console.log('-----------------------------------------');
        console.log('SENSOR CONNECTION START');
        setSensorListConnected(await storage.getAllSensorData());
        console.log('sensorListConnected', sensorListConnected);
        console.log('TUTAJ INTERWAŁ');
        console.log("It's running");
        console.log(sensorListConnected);
        console.log(sensorListAvailable);
        console.log(peripheralsAvailable);
        console.log(peripheralsConnected);
        (async () => {
          const result = await storage.getAllSensorData();
          if (result.length > 0) {
            console.log('Mamy to');
            console.log('POŁĄCZONE');
            console.log(result);
            for (let i = 0; i < result.length; i++) {
              retriveConnection(result[i]);
              console.log(result[i]);
            }
          }
        })();
        console.log('SENSOR CONNECTION DONE');
        //   console.log('-----------------------------------------');
        //   // for (let i = 0; BackgroundJob.isRunning(); i++) {
        //   // console.log('Runned -> ', i);
        //   // await BackgroundJob.updateNotification({ taskDesc: 'Runned -> ' + i });
        await sleep(delay);
      }
      // }
    });
  };

  const stopBackgroundTask = async () => {
    setActive(!active);
    if (BackgroundService.isRunning()) {
      await BackgroundService.stop();
      console.log('Successful stop!');
    } else {
      await BackgroundService.start(connectInterval, options);
      console.log('Successful start!');
    }
  };

  // funkcja obsługująca wyszukiwanie urządzeń
  const handleDiscoverPeripheral = peripheral => {
    if (peripheral.name == 'Flower care') {
      if (flower_care.length == 0) {
        peripheralsAvailable.set(peripheral.id, peripheral);
        console.log('set');
        console.log(peripheralsAvailable);
        setFlowerCare(peripheral);
        setSensorListAvailable(Array.from(peripheralsAvailable.values()));
        console.log('after');
        console.log(peripheralsAvailable);
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
    const subs_disconnect = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      handleDisconnectedPeripheral,
    );
    //bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    return () => {
      //eventy do usunięcia

      subs_discover.remove();
      subs_stopScan.remove();
      subs_updateVal.remove();
      subs_disconnect.remove();
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

    await BleManager.scan([], 3)
      .then(() => {
        console.log('Scanning...');
      })
      .catch(e => {
        console.log(error);
      });
  };

  //funkcja łącząca się z sensorem
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
        ToastAndroid.showWithGravity(
          'Połączono z urządzeniem o adresie MAC: ' + peripheral.id,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
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
    // console.log(result.map(req => JSON.parse(req)).forEach(console.log));

    console.log('====UPDATE===');
    console.log(sensorListConnected);
    console.log(sensorListAvailable);
    console.log(peripheralsAvailable);
    console.log(peripheralsConnected);

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

  const turnOnDiode = async peripheral => {
    // połącz się z czujnikiem
    await BleManager.connect(peripheral.id)
      .then(() => {
        console.log('Connected to ' + peripheral.id);
      })
      .catch(error => {
        console.log(error);
      });

    BleManager.isPeripheralConnected(peripheral.id).then(isConnected => {
      if (isConnected) {
        console.log('Peripheral is connected!');
      } else {
        console.log('Peripheral is NOT connected!');
      }
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

    // // zaświeć diodą
    // await BleManager.write(peripheral.id,config.service, config.characteristicToWrite, config.byteTurnOnDiote)
    //   .then(() => {
    //     console.log('Blik!');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  const retriveConnection = async peripheral => {
    await BleManager.connect(peripheral.id)
      .then(() => {
        console.log('Connected to ' + peripheral.id);
        ToastAndroid.showWithGravity(
          'Retrived connection with' + peripheral.id,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      })
      .catch(error => {
        console.log(error);
      });

    return;
  };

  const disconectPeripheral = async peripheral => {
    console.log('Trying to disconnect');
    console.log(peripheral.id);
    BleManager.disconnect(peripheral.id)
      .then(() => {
        console.log('Disconnected');

        //Zaktualizuj mapy i usestate
        for (let i = 0; i < sensorListConnected.length; i++) {
          peripheralsConnected.set(
            sensorListConnected[i].id,
            sensorListConnected[i],
          );
        }

        peripheralsConnected.delete(peripheral.id);
        setSensorListConnected(Array.from(peripheralsConnected.values()));

        storage.remove(peripheral.id);
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
          console.log('ERROR:' + error);
        });
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     console.log('-----------------------------------------');
  //     console.log('SENSOR CONNECTION START');
  //     setSensorListConnected(await storage.getAllSensorData());
  //     console.log('sensorListConnected', sensorListConnected);

  //     console.log('TUTAJ INTERWAŁ');
  //     const interval = setInterval(() => {
  //       console.log("It's running");
  //       console.log(sensorListConnected);
  //       console.log(sensorListAvailable);
  //       console.log(peripheralsAvailable);
  //       console.log(peripheralsConnected);
  //       (async () => {
  //         const result = await storage.getAllSensorData();
  //         if (result.length > 0) {
  //           console.log('Mamy to');
  //           console.log('POŁĄCZONE');
  //           console.log(result);
  //           for (let i = 0; i < result.length; i++) {
  //             retriveConnection(result[i]);
  //             console.log(result[i]);
  //           }
  //         }
  //       })();
  //       console.log('SENSOR CONNECTION DONE');
  //       console.log('-----------------------------------------');
  //     }, 60000);
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     setSensorListConnected(await storage.getAllSensorData());
  //     console.log('sensorListConnected', sensorListConnected);
  //     console.log('Executed once connecting');
  //     (async () => {
  //       const result = await storage.getAllSensorData();
  //       if (result.length > 0) {
  //         console.log('Mamy to');
  //         console.log('POŁĄCZONE');
  //         console.log(result);
  //         for (let i = 0; i < result.length; i++) {
  //           retriveConnection(result[i]);
  //           console.log(result[i]);
  //         }
  //       }
  //     })();
  //   })();

  //   return;
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        console.log('Trying to start background service');
        console.log(BackgroundService.isRunning());
        await BackgroundService.start(connectInterval, options);
        console.log('Successful start!');
        console.log(BackgroundService.isRunning());
      } catch (e) {
        console.log('Error', e);
      }
    })();
  }, []);

  useEffect(() => {
    // (async () => {
    //   const plantsArr = await storage.getObject('flower_data');
    //   console.log('plantsArr', plantsArr);
    // })();
  }, []);
  return (
    <Layout>
      <OuterContainer>
        <SensorsContainer>
          <Text style={styles.sensorTitle}> Connected </Text>
          <ScrollableList>
            <SensorsList>
              {sensorListConnected.map(item => (
                <ConnectedSensor
                  key={item.id}
                  item={item}
                  connect={connect}
                  turnOnDiode={turnOnDiode}
                  disconectPeripheral={disconectPeripheral}
                />
              ))}
            </SensorsList>
          </ScrollableList>
        </SensorsContainer>

        <SensorsContainer>
          <Text style={styles.sensorTitle}> Available </Text>
          <ScrollableList>
            <SensorsList>
              {sensorListAvailable.map(item => (
                <AvailableSensor key={item.id} item={item} connect={connect} />
              ))}
            </SensorsList>
          </ScrollableList>
        </SensorsContainer>

        <ButtonsWrapper>
          <ButtonContainer>
            <StyledButton
              onPress={scan}
              accessibilityLabel="Wyszukaj urządzenie">
              <Text style={styles.body}>Wyszukaj urządzenie</Text>
            </StyledButton>
          </ButtonContainer>

          <ButtonContainer>
            <StyledButton
              onPress={stopBackgroundTask}
              accessibilityLabel="Wyszukaj urządzenie"
              style={{backgroundColor: active ? '#A7C957' : '#BC4749'}}>
              <Text style={styles.body}>Czuwaj w tle</Text>
            </StyledButton>
          </ButtonContainer>
        </ButtonsWrapper>

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
    </Layout>
  );
};

export default Sensor;
