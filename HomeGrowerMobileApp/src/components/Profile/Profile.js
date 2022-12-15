import React, {useEffect, useState} from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import Layout from '../Layout/Layout.js';
import {
  styles,
  OuterContainer,
  Separator,
  ProfileName,
  ProfileOptions,
  RightRow,
  LeftRow,
  ProfileRow,
} from '../../Styles.js';

import {useAsyncStorage} from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const celsjus = require('../../assets/icons/profile/celsjus.png');
  const fahrenheit = require('../../assets/icons/profile/farenheit.png');

  const [unit, setUnit] = useState(celsjus);
  const {getItem, setItem} = useAsyncStorage('@temperature_unit');

  const readUnitFromStorage = async () => {
    const unit = await getItem();
    unit != null ? setUnit(JSON.parse(unit)) : setUnit(celsjus);
  };

  const writeUnitToStorage = async newUnit => {
    const jsonNewUnit = JSON.stringify(newUnit);
    await setItem(jsonNewUnit);
    setUnit(jsonNewUnit);
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
              <TouchableOpacity
                onPress={() =>
                  writeUnitToStorage(unit == celsjus ? fahrenheit : celsjus)
                }>
                <Image
                  source={unit == null ? celsjus : unit}
                  style={{height: 24, width: 24}}
                />
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
        </ProfileOptions>
      </OuterContainer>
    </Layout>
  );
};

export default Profile;
