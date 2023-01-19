import React, {useEffect, useState, useContext} from 'react';
import {Text, Image, TouchableOpacity, View} from 'react-native';

import {styles} from '../../Styles';
import QRCode from 'react-native-qrcode-svg';

import {
  OuterContainer,
  LeftRow,
  RightRow,
  ProfileName,
  ProfileRow,
  ProfileOptions,
  Separator,
  ModalButton,
} from './Profile.styled';
import {Modal} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Layout from '../Layout/Layout';
import GeneratorQr from '../Scanner/GeneratorQr';

const profileImages = {
  profile: require('../../assets/icons/profile/profile.png'),
  celsjus: require('../../assets/icons/profile/celsjus.png'),
  farenheit: require('../../assets/icons/profile/farenheit.png'),
};

const Profile = ({navigation, route}) => {
  const [modal, setModal] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState(null);
  const qrCode = route.params;
  console.log('Routeeeeee');
  console.log(qrCode);

  const [unit, setUnit] = useState(profileImages.celsjus);

  const readUnitFromStorage = async () => {
    try {
      const jsonUnit = await AsyncStorage.getItem('@temperature_Key');
      if (jsonUnit == undefined) {
        console.log('No unit choice in Cache');
      } else {
        console.log('Retrieved unit choice from Cache');
      }
      if (jsonUnit != undefined) {
        if (jsonUnit == profileImages.celsjus) {
          setUnit(profileImages.celsjus);
        } else {
          setUnit(profileImages.farenheit);
        }
      } else {
        setUnit(profileImages.celsjus);
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
      if (currentUnit == profileImages.celsjus) {
        writeUnitToStorage(profileImages.farenheit);
        setUnit(profileImages.farenheit);
      } else {
        writeUnitToStorage(profileImages.celsjus);
        setUnit(profileImages.celsjus);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createQRCode = () => {
    setQrCodeValue(GeneratorQr.returnUsername());
    setModal(!modal);
  };

  useEffect(() => {
    readUnitFromStorage();
  }, []);

  return (
    <Layout>
      <OuterContainer>
        <ProfileName>
          <Image source={profileImages.profile} />
          <Text style={styles.h4}>Nazwa użytkownika</Text>
        </ProfileName>
        <ProfileOptions>
          <ProfileRow>
            <LeftRow>
              <AntDesign
                name="edit"
                size={40}
                style={{color: 'black', paddingRight: 15}}
              />
              <Text style={styles.h4}>Edytuj profil</Text>
            </LeftRow>
            <RightRow>
              <Text style={styles.h4_but_green}>Edytuj</Text>
            </RightRow>
          </ProfileRow>
          <Separator></Separator>
          <ProfileRow>
            <LeftRow>
              <Entypo
                name="new-message"
                size={40}
                style={{color: 'black', paddingRight: 15}}
              />
              <Text style={styles.h4}>Napisz do nas</Text>
            </LeftRow>
            <RightRow>
              <Text style={styles.h4_but_green}>Napisz</Text>
            </RightRow>
          </ProfileRow>
          <Separator></Separator>
          <ProfileRow>
            <LeftRow>
              <Entypo
                name="language"
                size={40}
                style={{color: 'black', paddingRight: 15}}
              />
              <Text style={styles.h4}>Zmień język</Text>
            </LeftRow>
            <RightRow>
              <Text style={styles.h4_but_green}>Polski</Text>
            </RightRow>
          </ProfileRow>
          <Separator></Separator>
          <ProfileRow>
            <LeftRow>
              <FontAwesome5
                name="temperature-high"
                size={40}
                style={{color: 'black', paddingRight: 15}}
              />
              <Text style={styles.h4}>Jednostka temperatury</Text>
            </LeftRow>
            <RightRow>
              <TouchableOpacity onPress={() => changeUnit()}>
                <Image source={unit} style={{height: 18, width: 18}} />
              </TouchableOpacity>
            </RightRow>
          </ProfileRow>
          {/* <Separator></Separator>
          <ProfileRow>
            <LeftRow>
              <FontAwesome5
                name="history"
                size={40}
                style={{color: 'black', paddingRight: 15}}
              />
              <Text style={styles.h4}>Historia sensorów</Text>
            </LeftRow>
            <RightRow>
              <Text style={styles.h4_but_green}>Historia</Text>
            </RightRow>
          </ProfileRow> */}
          <Separator></Separator>
          <ProfileRow>
            <LeftRow>
              <AntDesign
                name="like2"
                size={40}
                style={{color: 'black', paddingRight: 15}}
              />
              <Text style={styles.h4}>Oceń aplikację</Text>
            </LeftRow>
            <RightRow>
              <Text style={styles.h4_but_green}>Oceń</Text>
            </RightRow>
          </ProfileRow>
          <Separator />
          <ProfileRow>
            <LeftRow>
              <AntDesign
                name="qrcode"
                size={40}
                style={{color: 'black', paddingRight: 15}}
              />
              <Text style={styles.h4}>Skanner QR</Text>
            </LeftRow>
            <RightRow>
              <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
                <Text style={styles.h4_but_green}>Skanuj</Text>
              </TouchableOpacity>
            </RightRow>
          </ProfileRow>
          <Separator />
          <ProfileRow>
            <LeftRow>
              <AntDesign
                name="qrcode"
                size={40}
                style={{color: 'black', paddingRight: 15}}
              />
              <Text style={styles.h4}>Generator QR</Text>
            </LeftRow>
            <RightRow>
              <TouchableOpacity onPress={() => createQRCode()}>
                <Text style={styles.h4_but_green}>Wygeneruj</Text>
              </TouchableOpacity>
            </RightRow>
          </ProfileRow>
        </ProfileOptions>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalQRContent}>
              <QRCode value={qrCodeValue} size={200} />
              <ModalButton onPress={() => setModal(!modal)}>
                <Text style={styles.body}>Wróć</Text>
              </ModalButton>
            </View>
          </View>
        </Modal>
      </OuterContainer>
    </Layout>
  );
};

export default Profile;
