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
  } from 'react-native';
import { State } from 'react-native-ble-plx';

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
    StyledImage,
    PlantsFamily,
    PlantsAfterElement,
    Separator,
  } from './Styles';


const Plants = ({navigation}) => {
    const [elementVisible, setElementVisible] = useState(false);

    const toHomePage = async () => {
      navigation.navigate('Home');
    };

    const toForecastPage = async () => {
      setElementVisible(!elementVisible);
      navigation.navigate('Forecast');
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
              <InnerContainerExtendedList style={{borderBottomColor: '#CCCCCC', borderBotttomWidth: 3}} onPress={() => toForecastPage()}>
                <Text style={styles.bold_white}>Pogoda</Text>
              </InnerContainerExtendedList>
              <Separator></Separator>
              <InnerContainerExtendedList>
                <Text style={styles.bold_white}>Profil użytkownika</Text>
              </InnerContainerExtendedList>
            </InnerContainerExtended>
          ) : null}
          <PlantsList>
            <PlantsElement>
              <PlantsAfterElement>
                <StyledImage
                  source={require('./images/achimenes_spp.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>Achimenes spp</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <Separator></Separator>
            <PlantsElement>
              <PlantsAfterElement>
                <StyledImage
                  source={require('./images/adenium_obesum.png')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>Adenium obesum</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <Separator></Separator>
            <PlantsElement>
              <PlantsAfterElement>
                <StyledImage
                  source={require('./images/aeonium_urbicum.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>Aeonium urbicum</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <Separator></Separator>
            <PlantsElement>
              <PlantsAfterElement>
                <StyledImage
                  source={require('./images/alocasia_cucullata.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>Alocasia cucullata</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <Separator></Separator>
            <PlantsElement>
              <PlantsAfterElement>
                <StyledImage
                  source={require('./images/calathea_concinna.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>Calathea concinna</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <Separator></Separator>
            <PlantsElement>
              <PlantsAfterElement>
                <StyledImage
                  source={require('./images/cordyline_fruticosa.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>Cordyline fruticosa</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <Separator></Separator>
            <PlantsElement>
              <PlantsAfterElement>
                <StyledImage
                  source={require('./images/crassula_lactea.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>Crassula lactea</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <Separator></Separator>
            <PlantsElement>
              <PlantsAfterElement>
                <StyledImage
                  source={require('./images/dracaena_fragrans.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>Dracaena fragrans</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <Separator></Separator>
            <PlantsElement>
              <PlantsAfterElement>
                <StyledImage
                  source={require('./images/monstera_deliciosa.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>Monstera deliciosa</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
          </PlantsList>
        </OuterContainer>
    );
}

export default Plants;