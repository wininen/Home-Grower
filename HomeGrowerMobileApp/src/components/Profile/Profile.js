import React, {useEffect, useState, useContext} from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';

import {styles} from '../../Styles';

import {
  OuterContainer,
  LeftRow,
  RightRow,
  ProfileName,
  ProfileRow,
  ProfileOptions,
  Separator,
} from './Profile.styled';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from '../Layout/Layout';

const Profile = ({navigation, route}) => {
  const qrCode = route.params;
  console.log('Routeeeeee');
  console.log(qrCode);

  const [unit, setUnit] = useState(
    require('../../assets/icons/profile/celsjus.png'),
  );

  const readUnitFromStorage = async () => {
    try {
      const jsonUnit = await AsyncStorage.getItem('@temperature_Key');
      if (jsonUnit == undefined) {
        console.log('No unit choice in Cache');
      } else {
        console.log('Retrieved unit choice from Cache');
      }
      if (jsonUnit != undefined) {
        if (jsonUnit == require('../../assets/icons/profile/celsjus.png')) {
          setUnit(require('../../assets/icons/profile/celsjus.png'));
        } else {
          setUnit(require('../../assets/icons/profile/farenheit.png'));
        }
      } else {
        setUnit(require('../../assets/icons/profile/celsjus.png'));
      }
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

  const changeUnit = async () => {
    try {
      const currentUnit = JSON.stringify(unit);
      if (currentUnit == require('../../assets/icons/profile/celsjus.png')) {
        writeUnitToStorage(require('../../assets/icons/profile/farenheit.png'));
        setUnit(require('../../assets/icons/profile/farenheit.png'));
      } else {
        writeUnitToStorage(require('../../assets/icons/profile/celsjus.png'));
        setUnit(require('../../assets/icons/profile/celsjus.png'));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    readUnitFromStorage();
  }, []);

  return (
    <Layout>
      <OuterContainer>
        <ProfileName>
          <Image source={require('../../assets/icons/profile/profile.png')} />
          <Text style={styles.h4}>Nazwa użytkownika</Text>
        </ProfileName>
        <ProfileOptions>
          <ProfileRow>
            <LeftRow>
              <Image
                source={require('../../assets/icons/profile/edit.png')}
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
                source={require('../../assets/icons/profile/write.png')}
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
                source={require('../../assets/icons/profile/language.png')}
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
                source={require('../../assets/icons/profile/temperature_unit.png')}
                style={styles.gapForTr}
              />
              <Text style={styles.h4}>Jednostka temperatury</Text>
            </LeftRow>
            <RightRow>
              <TouchableOpacity onPress={() => changeUnit()}>
                <Image source={unit} style={{height: 24, width: 24}} />
              </TouchableOpacity>
            </RightRow>
          </ProfileRow>
          <Separator></Separator>
          <ProfileRow>
            <LeftRow>
              <Image
                source={require('../../assets/icons/profile/history.png')}
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
                source={require('../../assets/icons/profile/rate_app.png')}
                style={styles.gapForTr}
              />
              <Text style={styles.h4}>Oceń aplikację</Text>
            </LeftRow>
            <RightRow>
              <Text style={styles.h3_but_green}>Oceń</Text>
            </RightRow>
          </ProfileRow>
          <Separator />
          <ProfileRow>
            <LeftRow>
              <Image
                source={require('../../assets/icons/profile/rate_app.png')}
                style={styles.gapForTr}
              />
              <Text style={styles.h4}>Skanner QR</Text>
            </LeftRow>
            <RightRow>
              <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
                <Text style={styles.h3_but_green}>Skanuj</Text>
              </TouchableOpacity>
            </RightRow>
          </ProfileRow>
        </ProfileOptions>
      </OuterContainer>
    </Layout>
  );
};

export default Profile;
