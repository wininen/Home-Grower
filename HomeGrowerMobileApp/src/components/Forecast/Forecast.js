import React, {useState} from 'react';
import {Text, Image, TouchableOpacity, ImageBackground} from 'react-native';
import Layout from '../Layout/Layout.js';
import {
  styles,
  OuterContainer,
  ForecastView,
  ForecastMain,
  Separator,
  ForecastOptions,
  ForecastTable,
  ForecastTd,
  ForecastTr,
} from '../../Styles';

const Forecast = ({navigation}) => {
  return (
    <Layout>
      <OuterContainer>
        <ImageBackground
          source={require('../../assets/images/forecast_background.jpg')}
          resizeMode="cover"
          style={styles.bgImage}>
          <ForecastView>
            <ForecastOptions>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/icons/forecast/location.png')}
                  style={styles.gapForMenu}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/icons/forecast/edit_location.png')}
                />
              </TouchableOpacity>
            </ForecastOptions>
            <ForecastMain>
              <Text style={styles.h2}>Poznań</Text>
              <Image source={require('../../assets/icons/forecast/sun.png')} />
              <Text style={styles.h2}>23°</Text>
              <Text style={styles.h3}>Słonecznie</Text>
              <Text style={styles.h3}>Min. 11° Max. 23°</Text>
              <ForecastTable>
                <ForecastTr>
                  <Image
                    style={styles.gapForTr}
                    source={require('../../assets/icons/forecast/calendar_month.png')}
                  />
                  <Text style={styles.h4}>PROGNOZA (7 DNI)</Text>
                </ForecastTr>
                <Separator></Separator>
                <ForecastTr>
                  <Image
                    style={styles.gapForTr}
                    source={require('../../assets/icons/forecast/light_mode.png')}
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
                    source={require('../../assets/icons/forecast/cloudy.png')}
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
                    source={require('../../assets/icons/forecast/light_mode.png')}
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
                    source={require('../../assets/icons/forecast/light_mode.png')}
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
                    source={require('../../assets/icons/forecast/thunderstorm.png')}
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
                    source={require('../../assets/icons/forecast/rainy.png')}
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
                    source={require('../../assets/icons/forecast/cloudy.png')}
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
    </Layout>
  );
};

export default Forecast;
