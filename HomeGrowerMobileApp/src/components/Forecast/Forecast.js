import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ImageBackground,
  PermissionsAndroid,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import {styles} from '../../Styles';

import {
  OuterContainer,
  ForecastView,
  ForecastMain,
  Separator,
  ForecastOptions,
  ForecastTable,
  ForecastTd,
  ForecastTr,
  InputBox,
} from './Forecast.styled';

import {ModalList, ModalButton} from '../myPlants/MyPlants.styled';

import Geolocation from 'react-native-geolocation-service';
import Layout from '../Layout/Layout';

const API_KEY = '9d3b0897994554a14149d179a9a65217';

const weatherImages = {
  mist: require('../../assets/icons/forecast/mist_main.png'),
  sun: require('../../assets/icons/forecast/sun_main.png'),
  rain: require('../../assets/icons/forecast/rainy_main.png'),
  storm: require('../../assets/icons/forecast/storm_main.png'),
  snow: require('../../assets/icons/forecast/snow_main.png'),
  cloud: require('../../assets/icons/forecast/cloudy_main.png'),
  moon: require('../../assets/icons/forecast/moon_main.png'),
};

const Forecast = ({navigation}) => {
  const convertToCelsjus = async jsonValue => {
    let afterConvertValue = [null, null, null, null, null];
    afterConvertValue[0] = jsonValue[0];
    afterConvertValue[1] =
      (
        (jsonValue[1].substring(0, jsonValue[1].length - 2) - 32) *
        (5 / 9)
      ).toFixed(2) + '°C';
    afterConvertValue[2] = jsonValue[2];
    afterConvertValue[3] =
      (
        (jsonValue[3].substring(0, jsonValue[3].length - 2) - 32) *
        (5 / 9)
      ).toFixed(2) + '°C';
    afterConvertValue[4] =
      (
        (jsonValue[4].substring(0, jsonValue[4].length - 2) - 32) *
        (5 / 9)
      ).toFixed(2) + '°C';
    return afterConvertValue;
  };

  const convertToFarenheit = async jsonValue => {
    let afterConvertValue = [null, null, null, null, null];
    afterConvertValue[0] = jsonValue[0];
    afterConvertValue[1] =
      (
        jsonValue[1].substring(0, jsonValue[1].length - 2) * (9 / 5) +
        32
      ).toFixed(2) + '°F';
    afterConvertValue[2] = jsonValue[2];
    afterConvertValue[3] =
      (
        jsonValue[3].substring(0, jsonValue[3].length - 2) * (9 / 5) +
        32
      ).toFixed(2) + '°F';
    afterConvertValue[4] =
      (
        jsonValue[4].substring(0, jsonValue[4].length - 2) * (9 / 5) +
        32
      ).toFixed(2) + '°F';
    return afterConvertValue;
  };

  const savedWeather = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@weather_Key', jsonValue);
      console.log('Weather Persisted in Cache');
      return jsonValue != null ? setWeather(JSON.parse(jsonValue)) : null;
    } catch (err) {
      console.log(err);
    }
  };

  const getWeather = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@weather_Key');
      const jsonUnit = await AsyncStorage.getItem('@temperature_Key');
      if (jsonValue == undefined) {
        console.log('No Weather Data in Cache');
      } else {
        console.log('Retrieved Weather from Cache');
      }
      if (jsonUnit == undefined) {
        console.log('No Unit in Cache');
      } else {
        console.log('Retrieved Unit from Cache');
      }
      if (jsonValue != undefined) {
        if (jsonUnit != undefined) {
          if (jsonUnit == require('../../assets/icons/profile/celsjus.png')) {
            if (
              JSON.parse(jsonValue)[1].substring(
                JSON.parse(jsonValue)[1].length - 2,
              ) == '°C'
            ) {
              setWeather(JSON.parse(jsonValue));
            } else {
              let newJsonValue = await convertToCelsjus(JSON.parse(jsonValue));
              setWeather(newJsonValue);
            }
          } else {
            if (
              JSON.parse(jsonValue)[1].substring(
                JSON.parse(jsonValue)[1].length - 2,
              ) == '°F'
            ) {
              setWeather(JSON.parse(jsonValue));
            } else {
              let newJsonValue = await convertToFarenheit(
                JSON.parse(jsonValue),
              );
              setWeather(newJsonValue);
            }
          }
        } else {
          if (
            JSON.parse(jsonValue)[1].substring(
              JSON.parse(jsonValue)[1].length - 2,
            ) == '°F'
          ) {
            let newJsonValue = await convertToCelsjus(JSON.parse(jsonValue));
            setWeather(newJsonValue);
          } else {
            setWeather(JSON.parse(jsonValue));
          }
        }
      } else {
        if (jsonUnit == require('../../assets/icons/profile/celsjus.png')) {
          setWeather([weatherImages.sun, '23°C', 'Słońce', '22.6°C', '23.3°C']);
        } else if (
          jsonUnit == require('../../assets/icons/profile/farenheit.png')
        ) {
          setWeather([
            weatherImages.sun,
            '73.4°F',
            'Słońce',
            '72.68°F',
            '73.94°F',
          ]);
        } else {
          setWeather([weatherImages.sun, '23°C', 'Słońce', '22.6°C', '23.3°C']);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const savedCity = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@city_Key', jsonValue);
      console.log('City Persisted in Cache');
      return jsonValue != null ? setCity(JSON.parse(jsonValue)) : null;
    } catch (err) {
      console.log(err);
    }
  };

  const getCity = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@city_Key');
      jsonValue == undefined
        ? console.log('No City in Cache')
        : console.log('Retrieved City from Cache');
      return jsonValue != null
        ? setCity(JSON.parse(jsonValue))
        : setCity('Warszawa');
    } catch (err) {
      console.log(err);
    }
  };

  const [weather, setWeather] = useState([
    require('../../assets/icons/forecast/sun_main.png'),
    '23°C',
    'Słońce',
    '22.6C',
    '23.3°C',
  ]);
  const useWeather = async (lat, lon) => {
    let weatherIcon;
    let polishName;
    const jsonUnit = await AsyncStorage.getItem('@temperature_Key');
    const fetchAPI = async (lat, lon) => {
      if (
        jsonUnit == undefined ||
        jsonUnit == require('../../assets/icons/profile/celsjus.png')
      ) {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
        )
          .then(res => res.json())
          .then(res => {
            console.log(
              res['weather'][0].main,
              res['main'].temp,
              '°C',
              res['main'].temp_min,
              '°C',
              res['main'].temp_max,
              '°C',
            );
            switchWeather(res['weather'][0].main);
            savedWeather([
              weatherIcon,
              res['main'].temp + '°C',
              polishName,
              res['main'].temp_min + '°C',
              res['main'].temp_max + '°C',
            ]);
            setWeather([
              weatherIcon,
              res['main'].temp + '°C',
              polishName,
              res['main'].temp_min + '°C',
              res['main'].temp_max + '°C',
            ]);
          })
          .catch(err => {
            console.log(err);
            const data = getWeather();
            setWeather(data);
          });
      } else {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`,
        )
          .then(res => res.json())
          .then(res => {
            console.log(
              res['weather'][0].main,
              res['main'].temp,
              '°F',
              res['main'].temp_min,
              '°F',
              res['main'].temp_max,
              '°F',
            );
            switchWeather(res['weather'][0].main);
            savedWeather([
              weatherIcon,
              res['main'].temp + '°F',
              polishName,
              res['main'].temp_min + '°F',
              res['main'].temp_max + '°F',
            ]);
            setWeather([
              weatherIcon,
              res['main'].temp + '°F',
              polishName,
              res['main'].temp_min + '°F',
              res['main'].temp_max + '°F',
            ]);
          })
          .catch(err => {
            console.log(err);
            const data = getWeather();
            setWeather(data);
          });
      }
    };

    const switchWeather = async param => {
      try {
        let time = new Date().getHours();
        switch (param) {
          case 'Mist':
            weatherIcon = weatherImages.mist;
            polishName = 'Mgła';
            break;
          case 'Rain':
            weatherIcon = weatherImages.rain;
            polishName = 'Deszcz';
            break;
          case 'Sun':
            weatherIcon = weatherImages.sun;
            polishName = 'Słońce';
            break;
          case 'Drizzle':
            weatherIcon = weatherImages.rain;
            polishName = 'Mżawka';
            break;
          case 'Snow':
            weatherIcon = weatherImages.snow;
            polishName = 'Śnieg';
            break;
          case 'Clouds':
            weatherIcon = weatherImages.cloud;
            polishName = 'Chmury';
            break;
          case 'Haze':
            weatherIcon = weatherImages.mist;
            polishName = 'Lekka mgła';
            break;
          case 'Clear':
            if (time > 17 || time < 5) {
              weatherIcon = weatherImages.moon;
            } else {
              weatherIcon = weatherImages.sun;
            }
            polishName = 'Czyste niebo';
            break;
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAPI(lat, lon);
  };

  const [city, setCity] = useState('Warszawa');
  const useCity = async (lat, lon) => {
    const fetchAPI = async (lat, lon) => {
      fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`,
      )
        .then(res => res.json())
        .then(res => {
          console.log(res[0].name);
          savedCity(res[0].name);
          setCity(res[0].name);
        })
        .catch(err => {
          console.log(err);
          const data = getCity();
          setCity(data);
        });
    };

    fetchAPI(lat, lon);
  };

  const useLocalisation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Zgoda na dostęp do lokalizacji przez aplikację HomeGrower',
          message:
            'HomeGrower potrzebuje danych o Twojej lokalizacji w celu przesyłania aktualnej temperatury i wysyłania powiadomień pogodowych',
          buttonNeutral: 'Spytaj mnie później',
          buttonNegative: 'Nie',
          buttonPositive: 'Zezwól',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Acquired access');
        Geolocation.getCurrentPosition(
          position => {
            useCity(position.coords.latitude, position.coords.longitude);
            useWeather(position.coords.latitude, position.coords.longitude);
            console.log(position.coords.latitude, position.coords.longitude);
          },
          err => console.log(err),
          {enableHighAccuracy: false},
        );
      } else {
        console.log("Access hasn't been acquired");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const [week, setWeek] = useState([]);
  const next7days = async () => {
    try {
      let today = new Date();
      let fullDate = today.toISOString().substring(0, 10);
      let validForm = `${fullDate.substring(5, 7)}/${fullDate.substring(
        8,
        10,
      )}/${fullDate.substring(0, 4)}`;
      const days_name = ['Nd.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'];
      const date_obj = new Date(validForm);
      const day_name = days_name[date_obj.getDay()];
      let nextDays = [];
      let counter = 0;
      for (let i = 1; i < 8; i++) {
        if (date_obj.getDay() + i < 7) {
          nextDays.push(days_name[date_obj.getDay() + i]);
        } else {
          nextDays.push(days_name[counter]);
          counter += 1;
        }
      }
      setWeek(nextDays);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  const [inputCity, setInputCity] = useState(null);
  const [modal, setModal] = useState(false);
  const useOwnCity = async () => {
    try {
      console.log(inputCity);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${API_KEY}`,
      )
        .then(res => res.json())
        .then(res => {
          console.log(res);
          useWeather(res.coord.lat, res.coord.lon);
          savedCity(res.name);
          setCity(res.name);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      Alert.alert(
        'Error',
        'Coś poszło nie tak ze sprawdzeniem pogody dla twojego miasta',
      );
    }
    setModal(!modal);
  };

  useEffect(() => {
    getWeather();
    getCity();
    next7days();
  }, []);

  return (
    <Layout>
      <OuterContainer>
        <ImageBackground
          source={require('../../assets/images/forecast_background.jpg')}
          resizeMode="cover"
          style={styles.bgImage}>
          <ForecastView>
            <ForecastOptions>
              <TouchableOpacity onPress={() => useLocalisation()}>
                <Image
                  source={require('../../assets/icons/forecast/location.png')}
                  style={styles.gapForMenu}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModal(!modal)}>
                <Image
                  source={require('../../assets/icons/forecast/edit_location.png')}
                />
              </TouchableOpacity>
            </ForecastOptions>
            <ForecastMain>
              <Text style={styles.h2}>{city}</Text>
              <Image source={weather[0]} />
              <Text style={styles.h2}>{weather[1]}</Text>
              <Text style={styles.h3}>{weather[2]}</Text>
              <Text style={styles.h3}>
                Min. {weather[3]} Max. {weather[4]}
              </Text>
              <ForecastTable>
                <ForecastTr>
                  <Image
                    source={require('../../assets/icons/forecast/calendar_month.png')}
                  />
                  <Text style={styles.h4}>PROGNOZA (7 DNI)</Text>
                </ForecastTr>
                <Separator></Separator>
                <ForecastTr>
                  <Text style={styles.h5}>{week[0]}</Text>
                  <Image
                    source={require('../../assets/icons/forecast/sun.png')}
                  />

                  <ForecastTd>
                    <Text style={styles.h6}>Min. 12° Max. 24°</Text>
                    <Text style={styles.h6}>Słońce</Text>
                  </ForecastTd>
                </ForecastTr>
                <ForecastTr>
                  <Text style={styles.h5}>{week[1]}</Text>

                  <Image
                    source={require('../../assets/icons/forecast/cloudy.png')}
                  />
                  <ForecastTd>
                    <Text style={styles.h6}>Min. 16° Max. 25°</Text>
                    <Text style={styles.h6}>Chmury</Text>
                  </ForecastTd>
                </ForecastTr>
                <ForecastTr>
                  <Text style={styles.h5}>{week[2]}</Text>
                  <Image
                    source={require('../../assets/icons/forecast/sun.png')}
                  />

                  <ForecastTd>
                    <Text style={styles.h6}>Min. 22° Max. 32°</Text>
                    <Text style={styles.h6}>Słońce</Text>
                  </ForecastTd>
                </ForecastTr>
                <ForecastTr>
                  <Text style={styles.h5}>{week[3]}</Text>

                  <Image
                    source={require('../../assets/icons/forecast/sun.png')}
                  />
                  <ForecastTd>
                    <Text style={styles.h6}>Min. 23° Max. 36°</Text>
                    <Text style={styles.h6}>Słońce</Text>
                  </ForecastTd>
                </ForecastTr>
                <ForecastTr>
                  <Text style={styles.h5}>{week[4]}</Text>
                  <Image
                    source={require('../../assets/icons/forecast/storm.png')}
                  />

                  <ForecastTd>
                    <Text style={styles.h6}>Min. 21° Max. 30°</Text>
                    <Text style={styles.h6}>Burza</Text>
                  </ForecastTd>
                </ForecastTr>
                <ForecastTr>
                  <Text style={styles.h5}>{week[5]}</Text>

                  <Image
                    source={require('../../assets/icons/forecast/rainy.png')}
                  />
                  <ForecastTd>
                    <Text style={styles.h6}>Min. 16° Max. 29°</Text>
                    <Text style={styles.h6}>Deszcz</Text>
                  </ForecastTd>
                </ForecastTr>
                <ForecastTr>
                  <Text style={styles.h5}>{week[6]}</Text>

                  <Image
                    source={require('../../assets/icons/forecast/cloudy.png')}
                  />
                  <ForecastTd>
                    <Text style={styles.h6}>Min. 19° Max. 30°</Text>
                    <Text style={styles.h6}>Chmury</Text>
                  </ForecastTd>
                </ForecastTr>
              </ForecastTable>
              {modal && (
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modal}
                  onRequestClose={() => {
                    setModal(!modal);
                  }}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalCityContent}>
                      <ForecastTr>
                        <Text style={styles.h4_bold}>Wpisz miasto</Text>
                      </ForecastTr>
                      <InputBox>
                        <TextInput
                          style={styles.h4}
                          onChangeText={setInputCity}
                          placeholder="Warszawa"
                        />
                      </InputBox>
                      <ForecastTr>
                        <ModalButton onPress={() => setModal(!modal)}>
                          <Text style={styles.body}>Wróć</Text>
                        </ModalButton>
                        <ModalButton onPress={() => useOwnCity()}>
                          <Text style={styles.body}>Wybierz</Text>
                        </ModalButton>
                      </ForecastTr>
                    </View>
                  </View>
                </Modal>
              )}
            </ForecastMain>
          </ForecastView>
        </ImageBackground>
      </OuterContainer>
    </Layout>
  );
};

export default Forecast;
