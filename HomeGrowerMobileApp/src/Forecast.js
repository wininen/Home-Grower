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
    TouchableHighlightBase,
    Switch,
    ImageBackground,
  } from 'react-native';
import { State } from 'react-native-ble-plx';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    InnerContainerExtended,
    InnerContainerExtendedList,
    PlantsList,
    PlantsElement,
    ForecastView,
    StyledImage,
    PlantsFamily,
    PlantsAfterElement,
    Separator,
    ForecastOptions,
  } from './Styles';


const Forecast = ({navigation}) => {
    const [elementVisible, setElementVisible] = useState(false);

    const toHomePage = async () => {
      navigation.navigate('Home');
    };

    const toPlantsPage = async () => {
      navigation.navigate('Plants');
    };
    
    return(
        <OuterContainer>
          <InnerContainer>
            <TouchableOpacity onPress={() => setElementVisible(!elementVisible)}>
              <Image source={require('./icons/hamburger.png')} />
            </TouchableOpacity>
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
          {elementVisible ? (
            <InnerContainerExtended>
              <Separator></Separator>
              <InnerContainerExtendedList style={{borderBottomColor: '#CCCCCC', borderBotttomWidth: 3}}>
                <Text style={styles.whiteBold}>Pogoda</Text>
              </InnerContainerExtendedList>
              <Separator></Separator>
              <InnerContainerExtendedList>
                <Text style={styles.whiteBold}>Profil użytkownika</Text>
              </InnerContainerExtendedList>
            </InnerContainerExtended>
          ) : null}
          <ImageBackground source={require('./images/forecast_background.jpg')}>
            <ForecastView>
                <ForecastOptions>
                    <TouchableOpacity>
                        <Image
                            source={require('./icons/location.png')}
                            style={{left: 410}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('./icons/edit_location.png')}
                            style={{left: 430}}
                        />
                    </TouchableOpacity>
                </ForecastOptions>
            </ForecastView>
          </ImageBackground>
            

          
        </OuterContainer>
    );
}

export default Forecast;