import React, {
    useEffect,
    useState,
  } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
  } from 'react-native';

import {
    Title,
    styles,
    OuterContainer,
    InnerContainer,
    InnerContainerExtended,
    InnerContainerExtendedList,
    Separator,
    ProfileName,
    ProfileOptions,
    ProfileRow,
  } from './Styles';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
    const [elementVisible, setElementVisible] = useState(false);


    const celsjus = require('./icons/profile/celsjus.png');
    const fahrenheit = require('./icons/profile/farenheit.png');

    const [unit, setUnit] = useState(celsjus);
    const { getItem, setItem } = useAsyncStorage('@temperature_unit');

    const readUnitFromStorage = async () => {
      const unit = await getItem();
      unit != null ? JSON.parse(unit) : null
      setUnit(unit);
    };
    
    const writeUnitToStorage = async newUnit => {
      const jsonNewUnit = JSON.stringify(newUnit)
      await setItem(jsonNewUnit);
      setUnit(jsonNewUnit);
    };

    const toHomePage = async () => {
      navigation.navigate('Home');
    };
  
    const toForecastPage = async () => {
      setElementVisible(!elementVisible);
      navigation.navigate('Forecast');
    };

    useEffect(() => {
      readUnitFromStorage();
    }, []);


    return(
        <OuterContainer>
          <InnerContainer>
            <TouchableOpacity onPress={() => setElementVisible(!elementVisible)}>
              <Image source={require('./icons/hamburger.png')} />
            </TouchableOpacity>
            <Title style={{left: 24}}>Profil użytkownika</Title>
            <TouchableOpacity onPress={() => toHomePage()}>
              <Image
                source={require('./icons/potted_plant.png')}
                style={{left: 280}}
              />
            </TouchableOpacity>
            <Image
              source={require('./icons/notification.png')}
              style={{left: 300}}
            />
          </InnerContainer>
          {elementVisible ? (
            <InnerContainerExtended>
              <Separator></Separator>
              <InnerContainerExtendedList style={{borderBottomColor: '#CCCCCC', borderBotttomWidth: 3}} onPress={() => toForecastPage()}>
                <Text style={styles.bold_white}>Pogoda</Text>
              </InnerContainerExtendedList>
              <Separator></Separator>
              <InnerContainerExtendedList>
                <Text style={styles.bold_white}>Profil użytkownika</Text>
              </InnerContainerExtendedList>
            </InnerContainerExtended>
          ) : null}
          <ProfileName>
            <Image
                source={require('./icons/profile/profile.png')}
            />
            <Text style={styles.h4}>Nazwa użytkownika</Text>
          </ProfileName>
          <ProfileOptions>
            <ProfileRow>
                <Image
                    source={require('./icons/profile/edit.png')}
                    style={styles.gapForTr}
                />
                <Text style={styles.h4}>Edytuj profil</Text>
                <ProfileRow>
                  <Text style={styles.h3_but_green}>Edit</Text>
                </ProfileRow>
            </ProfileRow>
            <Separator></Separator>
            <ProfileRow>
                <Image
                    source={require('./icons/profile/write.png')}
                    style={styles.gapForTr}
                />
                <Text style={styles.h4}>Napisz do nas</Text>
                <ProfileRow>
                  <Text style={styles.h3_but_green}>Edit</Text>
                </ProfileRow>
            </ProfileRow>
            <Separator></Separator>
            <ProfileRow>
                <Image
                    source={require('./icons/profile/language.png')}
                    style={styles.gapForTr}
                />
                <Text style={styles.h4}>Zmień język</Text>
                <ProfileRow>
                  <Text style={styles.h3_but_green}>Edit</Text>
                </ProfileRow>
            </ProfileRow>
            <Separator></Separator>
            <ProfileRow>
                <Image
                    source={require('./icons/profile/temperature_unit.png')}
                    style={styles.gapForTr}
                />
                <Text style={styles.h4}>Jednostka temperatury</Text>
                <ProfileRow style={{left: 220}}>
                    <TouchableOpacity onPress={() => writeUnitToStorage(
                      unit == celsjus ? fahrenheit : celsjus
                    )}>
                        <Image
                          source={unit}
                          style={{height: 24, width: 24}}
                        />
                    </TouchableOpacity>
                </ProfileRow>
            </ProfileRow>
            <Separator></Separator>
            <ProfileRow>
                <Image
                    source={require('./icons/profile/history.png')}
                    style={styles.gapForTr}
                />
                <Text style={styles.h4}>Historia sensorów</Text>
                <ProfileRow>
                  <Text style={styles.h3_but_green}>Edit</Text>
                </ProfileRow> 
            </ProfileRow>
            <Separator></Separator>
            <ProfileRow>
                <Image
                    source={require('./icons/profile/rate_app.png')}
                    style={styles.gapForTr}
                />
                <Text style={styles.h4}>Oceń aplikację</Text>
                <ProfileRow>
                  <Text style={styles.h3_but_green}>Edit</Text>
                </ProfileRow>
            </ProfileRow>
          </ProfileOptions>
          
        </OuterContainer>
    );
}

export default Profile;