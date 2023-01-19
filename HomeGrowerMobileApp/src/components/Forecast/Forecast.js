import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
import {WeatherForNextDay} from './weatherForNextDay';
import {ModalList, ModalButton} from '../MyPlants/MyPlants.styled';

import Geolocation from 'react-native-geolocation-service';
import Layout from '../Layout/Layout';

import styled from 'styled-components/native';

import {useIsFocused} from '@react-navigation/native';

const API_KEY = '9d3b0897994554a14149d179a9a65217';

const weatherImages = {
  mist: 'http://openweathermap.org/img/wn/50d@2x.png',
  sun: 'http://openweathermap.org/img/wn/01d@2x.png',
  rain: 'http://openweathermap.org/img/wn/10d@2x.png',
  storm: 'http://openweathermap.org/img/wn/11d@2x.png',
  snow: 'http://openweathermap.org/img/wn/13d@2x.png',
  cloud: 'http://openweathermap.org/img/wn/03d@2x.png',
  moon: 'http://openweathermap.org/img/wn/01n@2x.png',
  bgphoto: require('../../assets/images/forecast_background.jpg'),
};

const Forecast = ({navigation}) => {
  const [city, setCity] = useState('—');
  const [weather, setWeather] = useState([
    weatherImages.sun,
    '—°C',
    'Słońce',
    '—°C',
    '—°C',
  ]);
  const [week, setWeek] = useState([]);
  const [inputCity, setInputCity] = useState(null);
  const [modal, setModal] = useState(false);
  const [forecast, setForecast] = useState([
    [weatherImages.sun, '—°C', '—°C', '—'],
    [weatherImages.storm, '—°C', '—°C', '—'],
    [weatherImages.cloud, '—°C', '—°C', '—'],
    [weatherImages.mist, '—°C', '—°C', '—'],
    [weatherImages.rain, '—°C', '—°C', '—'],
  ]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const convertToCelsjus = async jsonValue => {
    if (jsonValue[1].length != 4) {
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
    } else {
      let afterConvertValue = [null, null, null, null, null];
      afterConvertValue[0] = [
        jsonValue[0][0],
        (
          (jsonValue[0][1].substring(0, jsonValue[0][1].length - 2) - 32) *
          (5 / 9)
        ).toFixed(2) + '°C',
        (
          (jsonValue[0][2].substring(0, jsonValue[0][2].length - 2) - 32) *
          (5 / 9)
        ).toFixed(2) + '°C',
        jsonValue[0][3],
      ];
      afterConvertValue[1] = [
        jsonValue[1][0],
        (
          (jsonValue[1][1].substring(0, jsonValue[1][1].length - 2) - 32) *
          (5 / 9)
        ).toFixed(2) + '°C',
        (
          (jsonValue[1][2].substring(0, jsonValue[1][2].length - 2) - 32) *
          (5 / 9)
        ).toFixed(2) + '°C',
        jsonValue[1][3],
      ];
      afterConvertValue[2] = [
        jsonValue[2][0],
        (
          (jsonValue[2][1].substring(0, jsonValue[2][1].length - 2) - 32) *
          (5 / 9)
        ).toFixed(2) + '°C',
        (
          (jsonValue[2][2].substring(0, jsonValue[2][2].length - 2) - 32) *
          (5 / 9)
        ).toFixed(2) + '°C',
        jsonValue[2][3],
      ];
      afterConvertValue[3] = [
        jsonValue[3][0],
        (
          (jsonValue[3][1].substring(0, jsonValue[3][1].length - 2) - 32) *
          (5 / 9)
        ).toFixed(2) + '°C',
        (
          (jsonValue[3][2].substring(0, jsonValue[3][2].length - 2) - 32) *
          (5 / 9)
        ).toFixed(2) + '°C',
        jsonValue[3][3],
      ];
      afterConvertValue[4] = [
        jsonValue[4][0],
        (
          (jsonValue[4][1].substring(0, jsonValue[4][1].length - 2) - 32) *
          (5 / 9)
        ).toFixed(2) + '°C',
        (
          (jsonValue[4][2].substring(0, jsonValue[4][2].length - 2) - 32) *
          (5 / 9)
        ).toFixed(2) + '°C',
        jsonValue[4][3],
      ];
      return afterConvertValue;
    }
  };

  const convertToFarenheit = async jsonValue => {
    if (jsonValue[1].length != 4) {
      console.log(jsonValue[1].length);
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
    } else {
      console.log(jsonValue[1].length);
      let afterConvertValue = [null, null, null, null, null];
      afterConvertValue[0] = [
        jsonValue[0][0],
        (
          jsonValue[0][1].substring(0, jsonValue[0][1].length - 2) * (9 / 5) +
          32
        ).toFixed(2) + '°F',
        (
          jsonValue[0][2].substring(0, jsonValue[0][2].length - 2) * (9 / 5) +
          32
        ).toFixed(2) + '°F',
        jsonValue[0][3],
      ];
      afterConvertValue[1] = [
        jsonValue[1][0],
        (
          jsonValue[1][1].substring(0, jsonValue[1][1].length - 2) * (9 / 5) +
          32
        ).toFixed(2) + '°F',
        (
          jsonValue[1][2].substring(0, jsonValue[1][2].length - 2) * (9 / 5) +
          32
        ).toFixed(2) + '°F',
        jsonValue[1][3],
      ];
      afterConvertValue[2] = [
        jsonValue[2][0],
        (
          jsonValue[2][1].substring(0, jsonValue[2][1].length - 2) * (9 / 5) +
          32
        ).toFixed(2) + '°F',
        (
          jsonValue[2][2].substring(0, jsonValue[2][2].length - 2) * (9 / 5) +
          32
        ).toFixed(2) + '°F',
        jsonValue[2][3],
      ];
      afterConvertValue[3] = [
        jsonValue[3][0],
        (
          jsonValue[3][1].substring(0, jsonValue[3][1].length - 2) * (9 / 5) +
          32
        ).toFixed(2) + '°F',
        (
          jsonValue[3][2].substring(0, jsonValue[3][2].length - 2) * (9 / 5) +
          32
        ).toFixed(2) + '°F',
        jsonValue[3][3],
      ];
      afterConvertValue[4] = [
        jsonValue[4][0],
        (
          jsonValue[4][1].substring(0, jsonValue[4][1].length - 2) * (9 / 5) +
          32
        ).toFixed(2) + '°F',
        (
          jsonValue[4][2].substring(0, jsonValue[4][2].length - 2) * (9 / 5) +
          32
        ).toFixed(2) + '°F',
        jsonValue[4][3],
      ];
      return afterConvertValue;
    }
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

  const savedForecast = async tab => {
    try {
      const jsonValue = JSON.stringify(tab);
      await AsyncStorage.setItem('@forecast_Key', jsonValue);
      console.log('Forecast Persisted in Cache');
      return jsonValue != null ? setForecast(JSON.parse(jsonValue)) : null;
    } catch (err) {
      console.log(err);
    }
  };

  const getForecast = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@forecast_Key');
      const jsonUnit = await AsyncStorage.getItem('@temperature_Key');
      if (jsonValue == undefined) {
        console.log('No Forecast Data in Cache');
      } else {
        console.log('Retrieved Forecast from Cache');
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
              JSON.parse(jsonValue)[0][1].substring(
                JSON.parse(jsonValue)[0][1].length - 2,
              ) == '°C'
            ) {
              setForecast(JSON.parse(jsonValue));
            } else {
              let newJsonValue = await convertToCelsjus(JSON.parse(jsonValue));
              setForecast(newJsonValue);
            }
          } else {
            if (
              JSON.parse(jsonValue)[0][1].substring(
                JSON.parse(jsonValue)[0][1].length - 2,
              ) == '°F'
            ) {
              setForecast(JSON.parse(jsonValue));
            } else {
              let newJsonValue = await convertToFarenheit(
                JSON.parse(jsonValue),
              );
              setForecast(newJsonValue);
            }
          }
        } else {
          if (
            JSON.parse(jsonValue)[0][1].substring(
              JSON.parse(jsonValue)[0][1].length - 2,
            ) == '°F'
          ) {
            let newJsonValue = await convertToCelsjus(JSON.parse(jsonValue));
            setForecast(newJsonValue);
          } else {
            setForecast(JSON.parse(jsonValue));
          }
        }
      } else {
        if (jsonUnit == require('../../assets/icons/profile/celsjus.png')) {
          setForecast([
            [weatherImages.sun, '—°C', '—°C', '—'],
            [weatherImages.storm, '—°C', '—°C', '—'],
            [weatherImages.cloud, '—°C', '—°C', '—'],
            [weatherImages.mist, '—°C', '—°C', '—'],
            [weatherImages.rain, '—°C', '—°C', '—'],
          ]);
        } else if (
          jsonUnit == require('../../assets/icons/profile/farenheit.png')
        ) {
          setForecast([
            [weatherImages.sun, '—°F', '—°F', '—'],
            [weatherImages.storm, '—°F', '—°F', '—'],
            [weatherImages.cloud, '—°F', '—°F', '—'],
            [weatherImages.mist, '—°F', '—°F', '—'],
            [weatherImages.rain, '—°F', '—°F', '—'],
          ]);
        } else {
          setForecast([
            [weatherImages.sun, '—°C', '—°C', '—'],
            [weatherImages.storm, '—°C', '—°C', '—'],
            [weatherImages.cloud, '—°C', '—°C', '—'],
            [weatherImages.mist, '—°C', '—°C', '—'],
            [weatherImages.rain, '—°C', '—°C', '—'],
          ]);
        }
      }
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
          setWeather([weatherImages.sun, '—°C', 'Słońce', '—°C', '—°C']);
        } else if (
          jsonUnit == require('../../assets/icons/profile/farenheit.png')
        ) {
          setWeather([weatherImages.sun, '—°F', 'Słońce', '—°F', '—°F']);
        } else {
          setWeather([weatherImages.sun, '—°C', 'Słońce', '—°C', '—°C']);
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
      return jsonValue != null ? setCity(JSON.parse(jsonValue)) : setCity('—');
    } catch (err) {
      console.log(err);
    }
  };

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
              res['weather'][0].icon,
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

  const useForecast = async (lat, lon) => {
    let polishName = [];
    let forecastIcon = [];
    const jsonUnit = await AsyncStorage.getItem('@temperature_Key');
    const fetchAPI = async (lat, lon) => {
      if (
        jsonUnit == undefined ||
        jsonUnit == require('../../assets/icons/profile/celsjus.png')
      ) {
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
        )
          .then(res => res.json())
          .then(res => {
            switchForecast([
              res.list[0].weather[0].main,
              res.list[1].weather[0].main,
              res.list[2].weather[0].main,
              res.list[3].weather[0].main,
              res.list[4].weather[0].main,
            ]);
            savedForecast([
              [
                forecastIcon[0],
                res.list[0].main.temp_min + '°C',
                res.list[0].main.temp_max + '°C',
                polishName[0],
              ],
              [
                forecastIcon[1],
                res.list[1].main.temp_min + '°C',
                res.list[1].main.temp_max + '°C',
                polishName[1],
              ],
              [
                forecastIcon[2],
                res.list[2].main.temp_min + '°C',
                res.list[2].main.temp_max + '°C',
                polishName[2],
              ],
              [
                forecastIcon[3],
                res.list[3].main.temp_min + '°C',
                res.list[3].main.temp_max + '°C',
                polishName[3],
              ],
              [
                forecastIcon[4],
                res.list[4].main.temp_min + '°C',
                res.list[4].main.temp_max + '°C',
                polishName[4],
              ],
            ]);
            setForecast([
              [
                forecastIcon[0],
                res.list[0].main.temp_min + '°C',
                res.list[0].main.temp_max + '°C',
                polishName[0],
              ],
              [
                forecastIcon[1],
                res.list[1].main.temp_min + '°C',
                res.list[1].main.temp_max + '°C',
                polishName[1],
              ],
              [
                forecastIcon[2],
                res.list[2].main.temp_min + '°C',
                res.list[2].main.temp_max + '°C',
                polishName[2],
              ],
              [
                forecastIcon[3],
                res.list[3].main.temp_min + '°C',
                res.list[3].main.temp_max + '°C',
                polishName[3],
              ],
              [
                forecastIcon[4],
                res.list[4].main.temp_min + '°C',
                res.list[4].main.temp_max + '°C',
                polishName[4],
              ],
            ]);
          })
          .catch(err => {
            console.log(err);
            const data = getForecast();
            setForecast(data);
          });
      } else {
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`,
        )
          .then(res => res.json())
          .then(res => {
            console.log(res.list[0].weather[0].main);
            switchForecast([
              res.list[0].weather[0].main,
              res.list[1].weather[0].main,
              res.list[2].weather[0].main,
              res.list[3].weather[0].main,
              res.list[4].weather[0].main,
            ]);
            savedForecast([
              [
                forecastIcon[0],
                res.list[0].main.temp_min + '°F',
                res.list[0].main.temp_max + '°F',
                polishName[0],
              ],
              [
                forecastIcon[1],
                res.list[1].main.temp_min + '°F',
                res.list[1].main.temp_max + '°F',
                polishName[1],
              ],
              [
                forecastIcon[2],
                res.list[2].main.temp_min + '°F',
                res.list[2].main.temp_max + '°F',
                polishName[2],
              ],
              [
                forecastIcon[3],
                res.list[3].main.temp_min + '°F',
                res.list[3].main.temp_max + '°F',
                polishName[3],
              ],
              [
                forecastIcon[4],
                res.list[4].main.temp_min + '°F',
                res.list[4].main.temp_max + '°F',
                polishName[4],
              ],
            ]);
            setForecast([
              [
                forecastIcon[0],
                res.list[0].main.temp_min + '°F',
                res.list[0].main.temp_max + '°F',
                polishName[0],
              ],
              [
                forecastIcon[1],
                res.list[1].main.temp_min + '°F',
                res.list[1].main.temp_max + '°F',
                polishName[1],
              ],
              [
                forecastIcon[2],
                res.list[2].main.temp_min + '°F',
                res.list[2].main.temp_max + '°F',
                polishName[2],
              ],
              [
                forecastIcon[3],
                res.list[3].main.temp_min + '°F',
                res.list[3].main.temp_max + '°F',
                polishName[3],
              ],
              [
                forecastIcon[4],
                res.list[4].main.temp_min + '°F',
                res.list[4].main.temp_max + '°F',
                polishName[4],
              ],
            ]);
          })
          .catch(err => {
            console.log(err);
            const data = getForecast();
            setForecast(data);
          });
      }
    };

    const switchForecast = async param => {
      try {
        for (let i = 0; i < param.length; i++) {
          switch (param[i]) {
            case 'Mist':
              forecastIcon.push(weatherImages.mist);
              polishName.push('Mgła');
              break;
            case 'Rain':
              forecastIcon.push(weatherImages.rain);
              polishName.push('Deszcz');
              break;
            case 'Sun':
              forecastIcon.push(weatherImages.sun);
              polishName.push('Słońce');
              break;
            case 'Drizzle':
              forecastIcon.push(weatherImages.rain);
              polishName.push('Mżawka');
              break;
            case 'Snow':
              forecastIcon.push(weatherImages.snow);
              polishName.push('Śnieg');
              break;
            case 'Clouds':
              forecastIcon.push(weatherImages.cloud);
              polishName.push('Chmury');
              break;
            case 'Haze':
              forecastIcon.push(weatherImages.mist);
              polishName.push('Lekka mgła');
              break;
            case 'Clear':
              forecastIcon.push(weatherImages.sun);
              polishName.push('Czyste niebo');
              break;
          }
        }
      } catch (err) {
        console.log(err);
      }
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
            useForecast(position.coords.latitude, position.coords.longitude);
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

  const useOwnCity = async () => {
    try {
      console.log(inputCity);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${API_KEY}`,
      )
        .then(res => res.json())
        .then(res => {
          useForecast(res.coord.lat, res.coord.lon);
          useWeather(res.coord.lat, res.coord.lon);
          savedCity(res.name);
          setCity(res.name);
        })
        .catch(err => {
          console.log(err);
          Alert.alert(
            'Miasto o takiej nazwie nie istnieje!',
            'Sprawdź czy nie zrobiłeś literówki i wprowadź rejon ponownie',
          );
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
    getForecast();
    getWeather();
    getCity();
    next7days();
    setLoading(false);
  }, [isFocused]);

  return (
    <Layout>
      <OuterContainer>
        <ImageBackground
          source={require('../../assets/images/weatherBackground.jpg')}
          resizeMode="cover"
          style={styles.bgImage}>
          {!loading ? (
            <ForecastView>
              <ForecastOptions>
                <TouchableOpacity onPress={() => useLocalisation()}>
                  <FontAwesome
                    name="refresh"
                    size={20}
                    style={{color: 'white', paddingRight: 15}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModal(!modal)}>
                  <FontAwesome5
                    name="search-location"
                    size={20}
                    style={{color: 'white', paddingRight: 15}}
                  />
                </TouchableOpacity>
              </ForecastOptions>
              <ForecastMain>
                <Text style={styles.h2}>{city}</Text>
                <Image
                  source={{uri: `${weather[0]}`}}
                  style={{width: 64, height: 48}}
                />
                <Text style={styles.h2}>{weather[1]}</Text>
                <Text style={styles.h3}>{weather[2]}</Text>
                <Text style={styles.h3}>
                  Min. {weather[3]} Max. {weather[4]}
                </Text>
                <ForecastTable>
                  {/* 
                  Change here, now row for next days are in new
                  component called weatherForNextDay.js
                   */}
                  {forecast.map(item => (
                    <WeatherForNextDay
                      key={item}
                      item={item}
                      week={week}
                      id={forecast.indexOf(item)}
                      forecast={forecast}
                    />
                    <Text style={styles.h4}>PROGNOZA 5-DNIOWA</Text>
                  </ForecastTr>
                  <Separator></Separator>
                  <ForecastTr>
                    <Text style={styles.h5}>{week[0]}</Text>
                    <Image
                      source={{uri: `${forecast[0][0]}`}}
                      style={{width: 48, height: 24}}
                    />

                    <ForecastTd>
                      <Text style={styles.h6}>
                        Min. {forecast[0][1]} Max. {forecast[0][2]}
                      </Text>
                      <Text style={styles.h6}>{forecast[0][3]}</Text>
                    </ForecastTd>
                  </ForecastTr>
                  <ForecastTr>
                    <Text style={styles.h5}>{week[1]}</Text>

                    <Image
                      source={{uri: `${forecast[1][0]}`}}
                      style={{width: 48, height: 24}}
                    />
                    <ForecastTd>
                      <Text style={styles.h6}>
                        Min. {forecast[1][1]} Max. {forecast[1][2]}
                      </Text>
                      <Text style={styles.h6}>{forecast[1][3]}</Text>
                    </ForecastTd>
                  </ForecastTr>
                  <ForecastTr>
                    <Text style={styles.h5}>{week[2]}</Text>
                    <Image
                      source={{uri: `${forecast[2][0]}`}}
                      style={{width: 48, height: 24}}
                    />

                    <ForecastTd>
                      <Text style={styles.h6}>
                        Min. {forecast[2][1]} Max. {forecast[2][2]}
                      </Text>
                      <Text style={styles.h6}>{forecast[2][3]}</Text>
                    </ForecastTd>
                  </ForecastTr>
                  <ForecastTr>
                    <Text style={styles.h5}>{week[3]}</Text>

                    <Image
                      source={{uri: `${forecast[3][0]}`}}
                      style={{width: 48, height: 24}}
                    />
                    <ForecastTd>
                      <Text style={styles.h6}>
                        Min. {forecast[3][1]} Max. {forecast[3][2]}
                      </Text>
                      <Text style={styles.h6}>{forecast[3][3]}</Text>
                    </ForecastTd>
                  </ForecastTr>
                  <ForecastTr>
                    <Text style={styles.h5}>{week[4]}</Text>
                    <Image
                      source={{uri: `${forecast[4][0]}`}}
                      style={{width: 48, height: 24}}
                    />

                    <ForecastTd>
                      <Text style={styles.h6}>
                        Min. {forecast[4][1]} Max. {forecast[4][2]}
                      </Text>
                      <Text style={styles.h6}>{forecast[4][3]}</Text>
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
          ) : (
            <Text>Poczekaj, aktualizujemy dla ciebie pogodę</Text>
          )}
        </ImageBackground>
      </OuterContainer>
    </Layout>
  );
};

export default Forecast;
