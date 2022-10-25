import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
  } from 'react';
  import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    NativeModules,
    NativeEventEmitter,
    ToastAndroid,
  } from 'react-native';

  import {
    SensorContainer,
    Container,
    Title,
    ButtonsWrapper,
    ButtonContainer,
    StyledButton,
    Basic,
    styles,
    OuterContainer,
    InnerContainer,
    PlantsList,
    PlantsElement,
    StyledImage,
    PlantsFamily,
    PlantsAfterElement,
  } from './Styles';

const Plants = ({navigation}) => {

    const toHomePage = async () => {
      navigation.navigate('Home');
    };

    return(
        <OuterContainer>
          <InnerContainer>
            <Image source={require('./icons/hamburger.png')} />
            <Title style={{left: 24}}>Baza roślin</Title>
            <TouchableOpacity onPress={() => toHomePage()}>
              <Image
                source={require('./icons/potted_plant.png')}
                style={{left: 320}}
              />
            </TouchableOpacity>
            <Image
              source={require('./icons/notification.png')}
              style={{left: 340}}
            />
          </InnerContainer>
          <PlantsList>
            <PlantsElement>
              <PlantsAfterElement>
                <StyledImage
                  source={require('./images/achimenes_spp.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold}>Achimenes spp</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <View style={styles.separator}></View>
            <PlantsElement>

            </PlantsElement>
            <PlantsElement>

            </PlantsElement>
          </PlantsList>
        </OuterContainer>
    );
}

export default Plants;