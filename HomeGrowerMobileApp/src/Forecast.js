import React, {
    useState,
  } from 'react';
  import {
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
  } from 'react-native';


  import {
    Title,
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
    toHomePage
  } from '../App';



const Forecast = ({navigation}) => {
    const [elementVisible, setElementVisible] = useState(false);

    const toHomePage = async () => {
      navigation.navigate('Home');
    };

    const toProfilePage = async () => {
      setElementVisible(!elementVisible);
      navigation.navigate('Profile');
    };

    
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
                    <TouchableOpacity>
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
                  <Text style={styles.h2}>Poznań</Text>
                  <Image
                    source={require('./icons/forecast/sun.png')}
                  />
                  <Text style={styles.h2}>23°</Text>
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