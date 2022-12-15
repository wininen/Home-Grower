import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';

import {
  styles,
  OuterContainer,
  InnerContainer,
  InnerContainerExtended,
  InnerContainerExtendedList,
  ForecastView,
  ForecastMain,
  Separator,
  ForecastOptions,
  ForecastTable,
  ForecastTd,
  ForecastTr,
  LeftRow,
  RightRow,
} from './Styles';

import Geolocation from '@react-native-community/geolocation';

const API_KEY = '9d3b0897994554a14149d179a9a65217';

const weatherImages = {
  mist: require('./icons/forecast/mist_main.png'),
  sun: require('./icons/forecast/sun_main.png'),
  rain: require('./icons/forecast/rainy_main.png'),
  storm: require('./icons/forecast/storm_main.png'),
  snow: require('./icons/forecast/snow_main.png'),
  cloud: require('./icons/forecast/cloudy_main.png'),
};

const Forecast = ({navigation}) => {
  const [elementVisible, setElementVisible] = useState(false);

  const toHomePage = async () => {
    navigation.navigate('Home');
  };

  const toProfilePage = async () => {
    setElementVisible(!elementVisible);
    navigation.navigate('Profile');
  };

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
      jsonValue == undefined
        ? console.log('No Weather Data in Cache')
        : console.log('Retrieved Weather from Cache');
      jsonUnit == undefined
        ? console.log('No Unit in Cache')
        : console.log('Retrieved Unit from Cache');
      if (jsonValue != undefined) {
        if (jsonUnit != undefined) {
          if (jsonUnit == require('./icons/profile/celsjus.png')) {
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
        if (jsonUnit == require('./icons/profile/celsjus.png')) {
          setWeather([
            weatherImages.sun,
            '23°C',
            'Słonecznie',
            '22.6°C',
            '23.3°C',
          ]);
        } else if (jsonUnit == require('./icons/profile/farenheit.png')) {
          setWeather([
            weatherImages.sun,
            '73.4°F',
            'Słonecznie',
            '72.68°F',
            '73.94°F',
          ]);
        } else {
          setWeather([
            weatherImages.sun,
            '23°C',
            'Słonecznie',
            '22.6°C',
            '23.3°C',
          ]);
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
    require('./icons/forecast/sun_main.png'),
    '23°C',
    'Słonecznie',
    '22.6C',
    '23.3°C',
  ]);
  const useWeather = async (lat, lon) => {
    let weatherIcon;
    const jsonUnit = await AsyncStorage.getItem('@temperature_Key');
    const fetchAPI = async (lat, lon) => {
      jsonUnit == null || jsonUnit == require('./icons/profile/celsjus.png')
        ? fetch(
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
                res['weather'][0].main,
                res['main'].temp_min + '°C',
                res['main'].temp_max + '°C',
              ]);
              setWeather([
                weatherIcon,
                res['main'].temp + '°C',
                res['weather'][0].main,
                res['main'].temp_min + '°C',
                res['main'].temp_max + '°C',
              ]);
            })
            .catch(err => {
              console.log(err);
              const data = getWeather();
              setWeather(data);
            })
        : fetch(
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
                res['weather'][0].main,
                res['main'].temp_min + '°F',
                res['main'].temp_max + '°F',
              ]);
              setWeather([
                weatherIcon,
                res['main'].temp + '°F',
                res['weather'][0].main,
                res['main'].temp_min + '°F',
                res['main'].temp_max + '°F',
              ]);
            })
            .catch(err => {
              console.log(err);
              const data = getWeather();
              setWeather(data);
            });
    };

    const switchWeather = async param => {
      try {
        switch (param) {
          case 'Mist':
            weatherIcon = weatherImages.mist;
            break;
          case 'Rain':
            weatherIcon = weatherImages.rain;
            break;
          case 'Sun':
            weatherIcon = weatherImages.sun;
            break;
          case 'Drizzle':
            weatherIcon = weatherImages.storm;
            break;
          case 'Snow':
            weatherIcon = weatherImages.snow;
            break;
          case 'Clouds':
            weatherIcon = weatherImages.cloud;
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

  useEffect(() => {
    getCity();
    getWeather();
  }, []);

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
          <Text style={styles.bold_white}>Pogoda</Text>
        </LeftRow>
        <RightRow>
          <TouchableOpacity onPress={() => toHomePage()}>
            <Image
              source={require('./icons/potted_plant.png')}
              style={styles.gapForMenu}
            />
          </TouchableOpacity>
          <Image source={require('./icons/notification.png')} />
        </RightRow>
      </InnerContainer>
      {elementVisible ? (
        <InnerContainerExtended>
          <Separator></Separator>
          <InnerContainerExtendedList
            style={{borderBottomColor: '#CCCCCC', borderBotttomWidth: 3}}>
            <Text style={styles.bold_white}>Pogoda</Text>
          </InnerContainerExtendedList>
          <Separator></Separator>
          <InnerContainerExtendedList onPress={() => toProfilePage()}>
            <Text style={styles.bold_white}>Profil użytkownika</Text>
          </InnerContainerExtendedList>
        </InnerContainerExtended>
      ) : null}
      <ImageBackground
        source={require('./images/forecast_background.jpg')}
        resizeMode="cover"
        style={styles.bgImage}>
        <ForecastView>
          <ForecastOptions>
            <TouchableOpacity
              onPress={() => {
                try {
                  const granted = PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    Geolocation.getCurrentPosition(
                      position => {
                        useCity(
                          position.coords.latitude,
                          position.coords.longitude,
                        );
                        useWeather(
                          position.coords.latitude,
                          position.coords.longitude,
                        );
                        console.log(
                          position.coords.latitude,
                          position.coords.longitude,
                        );
                      },
                      err => console.log(err),
                      {enableHighAccuracy: false},
                    ),
                  );
                } catch (err) {
                  console.warn(err);
                }
              }}>
              <Image
                source={require('./icons/forecast/location.png')}
                style={styles.gapForMenu}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('./icons/forecast/edit_location.png')} />
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
                  style={styles.gapForTr}
                  source={require('./icons/forecast/calendar_month.png')}
                />
                <Text style={styles.h4}>PROGNOZA (7 DNI)</Text>
              </ForecastTr>
              <Separator></Separator>
              <ForecastTr>
                <Image
                  style={styles.gapForTr}
                  source={require('./icons/forecast/sun.png')}
                />
                <Text style={styles.h5}>Czw.</Text>
                <ForecastTd>
                  <Text style={styles.h6}>Min. 12° Max. 24°</Text>
                  <Text style={styles.h6}>Słonecznie</Text>
                </ForecastTd>
              </ForecastTr>
              <ForecastTr>
                <Image
                  style={styles.gapForTr}
                  source={require('./icons/forecast/cloudy.png')}
                />
                <Text style={styles.h5}>Pt.</Text>
                <ForecastTd>
                  <Text style={styles.h6}>Min. 16° Max. 25°</Text>
                  <Text style={styles.h6}>Pochmurnie</Text>
                </ForecastTd>
              </ForecastTr>
              <ForecastTr>
                <Image
                  style={styles.gapForTr}
                  source={require('./icons/forecast/sun.png')}
                />
                <Text style={styles.h5}>Sob.</Text>
                <ForecastTd>
                  <Text style={styles.h6}>Min. 22° Max. 32°</Text>
                  <Text style={styles.h6}>Słonecznie</Text>
                </ForecastTd>
              </ForecastTr>
              <ForecastTr>
                <Image
                  style={styles.gapForTr}
                  source={require('./icons/forecast/sun.png')}
                />
                <Text style={styles.h5}>Nd.</Text>
                <ForecastTd>
                  <Text style={styles.h6}>Min. 23° Max. 36°</Text>
                  <Text style={styles.h6}>Słonecznie</Text>
                </ForecastTd>
              </ForecastTr>
              <ForecastTr>
                <Image
                  style={styles.gapForTr}
                  source={require('./icons/forecast/storm.png')}
                />
                <Text style={styles.h5}>Pon.</Text>
                <ForecastTd>
                  <Text style={styles.h6}>Min. 21° Max. 30°</Text>
                  <Text style={styles.h6}>Burzowo</Text>
                </ForecastTd>
              </ForecastTr>
              <ForecastTr>
                <Image
                  style={styles.gapForTr}
                  source={require('./icons/forecast/rainy.png')}
                />
                <Text style={styles.h5}>Wt.</Text>
                <ForecastTd>
                  <Text style={styles.h6}>Min. 16° Max. 29°</Text>
                  <Text style={styles.h6}>Deszczowo</Text>
                </ForecastTd>
              </ForecastTr>
              <ForecastTr>
                <Image
                  style={styles.gapForTr}
                  source={require('./icons/forecast/cloudy.png')}
                />
                <Text style={styles.h5}>Śr.</Text>
                <ForecastTd>
                  <Text style={styles.h6}>Min. 19° Max. 30°</Text>
                  <Text style={styles.h6}>Pochmurnie</Text>
                </ForecastTd>
              </ForecastTr>
            </ForecastTable>
          </ForecastMain>
        </ForecastView>
      </ImageBackground>
    </OuterContainer>
  );
};

export default Forecast;