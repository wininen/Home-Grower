import React, {useEffect, useState, useContext} from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';

import {styles} from '../../Styles';

import {ReturnButton, ScannerContainer, ButtonBox} from './Scanner.styled';

import {CameraScreen} from 'react-native-camera-kit';
import {NavigationContext} from '@react-navigation/native';
import Layout from '../Layout/Layout';

const Scanner = () => {
  const [modal, setModal] = useState(false);
  const navigation = useContext(NavigationContext);
  const navigate = dest => navigation.navigate(dest);

  const onScan = event => {
    console.log('Qr code');
    console.log(event.nativeEvent.codeStringValue);
    const qrCode = event.nativeEvent.codeStringValue;
    navigation.navigate('Profile', {qrCode: qrCode});
  };

  return (
    <Layout>
      <ScannerContainer>
        <CameraScreen
          style={styles.camera}
          actions={{rightButtonText: 'Done', leftButtonText: 'Cancel'}}
          onBottomButtonPressed={event => this.onBottomButtonPressed(event)}
          scanBarcode={true}
          onReadCode={event => onScan(event)} // optional
          showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
          laserColor="red" // (default red) optional, color of laser in scanner frame
          frameColor="white" // (default white) optional, color of border of scanner frame
        />
        <ButtonBox>
          <ReturnButton onPress={() => navigate('Profile')}>
            <Text>Wróć</Text>
          </ReturnButton>
        </ButtonBox>
      </ScannerContainer>
    </Layout>
  );
};

export default Scanner;
