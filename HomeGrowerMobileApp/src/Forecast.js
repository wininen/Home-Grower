import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  useState,
  useEffect,
} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
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

import {
  axios,
} from 'axios';

import Geolocation from '@react-native-community/geolocation';

const config = [
  {skipPermissionRequests: false,
  authorizationLevel: 'always',
  locationProvider: 'auto'}
];

Geolocation.setRNConfiguration(config);



const Forecast = ({navigation}) => {
    
    const [elementVisible, setElementVisible] = useState(false);

    const toHomePage = async () => {
      navigation.navigate('Home');
    };

    const toProfilePage = async () => {
      setElementVisible(!elementVisible);
      navigation.navigate('Profile');
    };

    const ArrayCity = [1];
    const ArrayWeather = [1];

    const savedWeather = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@weather_Key", jsonValue);
        console.log("Data Persisted in Cache");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (err) {
        console.log(err);
      }
    };

    const getWeather = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@weather_Key");
        jsonValue == undefined
            ? console.log("No Weather Data in Cache")
            : console.log("Retrieved Weather from Cache");
        return jsonValue != undefined ? JSON.parse(jsonValue) : null;
      } catch (err) {
        console.log(err);
      }
    };

    const savedCity = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@city_Key", jsonValue);
        console.log("Data Persisted in Cache");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (err) {
        console.log(err);
      }
    };

    const getCity = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@city_Key");
        jsonValue == undefined
          ? console.log("No City in Cache")
          : console.log("Retrieved City from Cache");
        return jsonValue != undefined ? JSON.parse(jsonValue) : null;
      } catch (err) {
        console.log(err);
      }
    };


    const API_KEY = '9d3b0897994554a14149d179a9a65217';



    const localisation = async () => {
        const [latLon, setLatLon] = useState(null);

        Geolocation.getCurrentPosition(
            position => {
                setLatLon([position.coords.latitude], [position.coords.longitude]);
            },
            (err) => {
                console.log(err);
            },
            {timeout: Infinity, maximumAge: Infinity}
        );

        return latLon;
    };
    
    const [weather, setWeather] = useState(null);
    const useWeather = async () => {
        
    
        const latLon = localisation();
        


        const fetchAPI = async (lat, lon) => {
            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
                const data = await savedWeather(filterWeather(res.data));
            setWeather(data);
            } catch (err) {
            console.log("API connection failed");
            const data = await getWeather();
            setWeather(data);
            }
        };
            
        const filterWeather = (rawData) => {
            return {
                weather: [{main: rawData.city.weather.main}],
                main: {
                  temp_min: rawData.city.main.temp_min,
                  temp_max: rawData.city.main.temp_max,
                },
            };
        };

        console.log(latLon);
        latLon ? fetchAPI(latLon[0], latLon[1]) : null;
    
        return weather;
    };
    
    const [city, setCity] = useState(null);
    const useCity = async () => {
        
    
        const latLon = localisation();
        
        const fetchAPI = async (lat, lon) => {
            try {
                const res = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${1}&appid=${API_KEY}`);
                const data = await savedCity(filterCity(res.data));
            setCity(data);
            } catch (err) {
                console.log("API connection failed");
                const data = await getCity();
                setCity(data);
            }
        };
            
        const filterCity = (rawData) => {
            return {
                name: rawData.name,
            };
        };

        console.log(latLon);
        latLon ? fetchAPI(latLon[0], latLon[1]) : null;
    
        return city;
    };

    const callCityAndWeatherFunc = () => {
      useCity();
      useWeather();
    };

    useEffect(() => {
      getCity();
      getWeather();
    }, []);
    
    
    return(
        <OuterContainer>
          <InnerContainer>
            <LeftRow>
              <TouchableOpacity onPress={() => setElementVisible(!elementVisible)}>
                <Image source={require('./icons/hamburger.png')} style={styles.gapForMenu}/>
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
              <Image
                source={require('./icons/notification.png')}
              />
            </RightRow>
          </InnerContainer>
          {elementVisible ? (
            <InnerContainerExtended>
              <Separator></Separator>
              <InnerContainerExtendedList style={{borderBottomColor: '#CCCCCC', borderBotttomWidth: 3}}>
                <Text style={styles.bold_white}>Pogoda</Text>
              </InnerContainerExtendedList>
              <Separator></Separator>
              <InnerContainerExtendedList onPress={() => toProfilePage()}>
                <Text style={styles.bold_white}>Profil użytkownika</Text>
              </InnerContainerExtendedList>
            </InnerContainerExtended>
          ) : null}
          <ImageBackground source={require('./images/forecast_background.jpg')} resizeMode="cover" style={styles.bgImage}>
            <ForecastView>
                <ForecastOptions>
                    <TouchableOpacity onPress={() => callCityAndWeatherFunc()}>
                        <Image
                            source={require('./icons/forecast/location.png')}
                            style={styles.gapForMenu}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('./icons/forecast/edit_location.png')}
                        />
                    </TouchableOpacity>
                </ForecastOptions>
                <ForecastMain>
                  <Text style={styles.h2}>{console.log(ArrayCity.fill((city == null ? "Warszawa" : city)))}</Text>
                  <Image
                    source={require('./icons/forecast/sun.png')}
                  />
                  <Text style={styles.h2}>{console.log(ArrayWeather.fill((weather == null ? "23°" : weather)))}</Text>
                  <Text style={styles.h3}>Słonecznie</Text>
                  <Text style={styles.h3}>Min. 11° Max. 23°</Text>
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
                        source={require('./icons/forecast/light_mode.png')}
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
                        source={require('./icons/forecast/light_mode.png')}
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
                        source={require('./icons/forecast/light_mode.png')}
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
                        source={require('./icons/forecast/thunderstorm.png')}
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
}

export default Forecast;