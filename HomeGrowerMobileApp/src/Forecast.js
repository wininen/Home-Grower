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
    ForecastMain,
    StyledImage,
    PlantsFamily,
    PlantsAfterElement,
    Separator,
    ForecastOptions,
    ForecastTable,
    ForecastTd,
    ForecastTr,
  } from './Styles';


const Forecast = ({navigation}) => {
    const [elementVisible, setElementVisible] = useState(false);

    const toHomePage = async () => {
      navigation.navigate('Home');
    };

    
    return(
        <OuterContainer>
          <InnerContainer>
            <TouchableOpacity onPress={() => setElementVisible(!elementVisible)}>
              <Image source={require('./icons/hamburger.png')} />
            </TouchableOpacity>
            <Title style={{left: 24}}>Pogoda</Title>
            <TouchableOpacity onPress={() => toHomePage()}>
              <Image
                source={require('./icons/potted_plant.png')}
                style={{left: 340}}
              />
            </TouchableOpacity>
            <Image
              source={require('./icons/notification.png')}
              style={{left: 360}}
            />
          </InnerContainer>
          {elementVisible ? (
            <InnerContainerExtended>
              <Separator></Separator>
              <InnerContainerExtendedList style={{borderBottomColor: '#CCCCCC', borderBotttomWidth: 3}}>
                <Text style={styles.bold_white}>Pogoda</Text>
              </InnerContainerExtendedList>
              <Separator></Separator>
              <InnerContainerExtendedList>
                <Text style={styles.bold_white}>Profil użytkownika</Text>
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
                <ForecastMain>
                  <Text style={styles.h2}>Poznań</Text>
                  <Image
                    source={require('./icons/sun.png')}
                  />
                  <Text style={styles.h2}>23°</Text>
                  <Text style={styles.h3}>Słonecznie</Text>
                  <Text style={styles.h3}>Min. 11° Max. 23°</Text>
                  <ForecastTable>
                    <ForecastTr>
                      <Image
                        style={{marginRight: 20}}
                        source={require('./icons/calendar_month.png')}
                      />
                      <Text style={styles.h4}>PROGNOZA (7 DNI)</Text>
                    </ForecastTr>
                    <Separator></Separator>
                    <ForecastTr>
                      <Image
                        style={styles.gapForTr}
                        source={require('./icons/light_mode.png')}
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
                        source={require('./icons/cloudy.png')}
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
                        source={require('./icons/light_mode.png')}
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
                        source={require('./icons/light_mode.png')}
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
                        source={require('./icons/thunderstorm.png')}
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
                        source={require('./icons/rainy.png')}
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
                        source={require('./icons/cloudy.png')}
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