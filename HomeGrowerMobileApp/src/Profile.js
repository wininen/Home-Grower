import React, {useEffect, useState} from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';

import {
  styles,
  OuterContainer,
  InnerContainer,
  InnerContainerExtended,
  InnerContainerExtendedList,
  Separator,
  ProfileName,
  ProfileOptions,
  RightRow,
  LeftRow,
  ProfileRow,
} from './Styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CelsjusFahrenheit = {
  celsjus: require('./icons/profile/celsjus.png'),
  fahrenheit: require('./icons/profile/farenheit.png'),
};

const Profile = ({navigation}) => {
  const [elementVisible, setElementVisible] = useState(false);

  const [unit, setUnit] = useState(require('./icons/profile/celsjus.png'));

  const readUnitFromStorage = async () => {
    try {
      const jsonUnit = await AsyncStorage.getItem('@temperature_Key');
      jsonUnit == undefined
        ? console.log('No unit choice in Cache')
        : console.log('Retrieved unit choice from Cache');
      return jsonUnit != null
        ? setUnit(JSON.parse(jsonUnit))
        : setUnit(require('./icons/profile/celsjus.png'));
    } catch (err) {
      console.log(err);
    }
  };

  const writeUnitToStorage = async newUnit => {
    try {
      const jsonNewUnit = JSON.stringify(newUnit);
      await AsyncStorage.setItem('@temperature_Key', jsonNewUnit);
      return jsonNewUnit != null ? setUnit(JSON.parse(jsonNewUnit)) : null;
    } catch (err) {
      console.log(err);
    }
  };

  const changeUnit = async Unit => {
    try {
      const currentUnit = JSON.stringify(Unit);
      return currentUnit == require('./icons/profile/celsjus.png')
        ? (writeUnitToStorage(require('./icons/profile/farenheit.png')),
          setUnit(require('./icons/profile/farenheit.png')))
        : (writeUnitToStorage(require('./icons/profile/celsjus.png')),
          setUnit(require('./icons/profile/celsjus.png')));
    } catch (err) {
      console.log(err);
    }
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
          <Text style={styles.bold_white}>Profil użytkownika</Text>
        </LeftRow>
        <RightRow>
          <TouchableOpacity onPress={() => toHomePage()}>
            <Image
              style={styles.gapForMenu}
              source={require('./icons/potted_plant.png')}
            />
          </TouchableOpacity>
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
          <InnerContainerExtendedList>
            <Text style={styles.bold_white}>Profil użytkownika</Text>
          </InnerContainerExtendedList>
        </InnerContainerExtended>
      ) : null}
      <ProfileName>
        <Image source={require('./icons/profile/profile.png')} />
        <Text style={styles.h4}>Nazwa użytkownika</Text>
      </ProfileName>
      <ProfileOptions>
        <ProfileRow>
          <LeftRow>
            <Image
              source={require('./icons/profile/edit.png')}
              style={styles.gapForTr}
            />
            <Text style={styles.h4}>Edytuj profil</Text>
          </LeftRow>
          <RightRow>
            <Text style={styles.h3_but_green}>Edytuj</Text>
          </RightRow>
        </ProfileRow>
        <Separator></Separator>
        <ProfileRow>
          <LeftRow>
            <Image
              source={require('./icons/profile/write.png')}
              style={styles.gapForTr}
            />
            <Text style={styles.h4}>Napisz do nas</Text>
          </LeftRow>
          <RightRow>
            <Text style={styles.h3_but_green}>Napisz</Text>
          </RightRow>
        </ProfileRow>
        <Separator></Separator>
        <ProfileRow>
          <LeftRow>
            <Image
              source={require('./icons/profile/language.png')}
              style={styles.gapForTr}
            />
            <Text style={styles.h4}>Zmień język</Text>
          </LeftRow>
          <RightRow>
            <Text style={styles.h3_but_green}>Polski</Text>
          </RightRow>
        </ProfileRow>
        <Separator></Separator>
        <ProfileRow>
          <LeftRow>
            <Image
              source={require('./icons/profile/temperature_unit.png')}
              style={styles.gapForTr}
            />
            <Text style={styles.h4}>Jednostka temperatury</Text>
          </LeftRow>
          <RightRow>
            <TouchableOpacity onPress={() => changeUnit(unit)}>
              <Image source={unit} style={{height: 24, width: 24}} />
            </TouchableOpacity>
          </RightRow>
        </ProfileRow>
        <Separator></Separator>
        <ProfileRow>
          <LeftRow>
            <Image
              source={require('./icons/profile/history.png')}
              style={styles.gapForTr}
            />
            <Text style={styles.h4}>Historia sensorów</Text>
          </LeftRow>
          <RightRow>
            <Text style={styles.h3_but_green}>Historia</Text>
          </RightRow>
        </ProfileRow>
        <Separator></Separator>
        <ProfileRow>
          <LeftRow>
            <Image
              source={require('./icons/profile/rate_app.png')}
              style={styles.gapForTr}
            />
            <Text style={styles.h4}>Oceń aplikację</Text>
          </LeftRow>
          <RightRow>
            <Text style={styles.h3_but_green}>Oceń</Text>
          </RightRow>
        </ProfileRow>
      </ProfileOptions>
    </OuterContainer>
  );
};

export default Profile;
