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
    ProfileName,
    ProfileOptions,
    ProfileRow,
  } from './Styles';


const Profile = ({navigation}) => {
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
            <Title style={{left: 24}}>Profil użytkownika</Title>
            <TouchableOpacity onPress={() => toHomePage()}>
              <Image
                source={require('./icons/potted_plant.png')}
                style={{left: 280}}
              />
            </TouchableOpacity>
            <Image
              source={require('./icons/notification.png')}
              style={{left: 300}}
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
          <ProfileName>
            <Image
                source={require('./icons/profile/profile.png')}
            />
            <Text style={styles.h4}>Nazwa użytkownika</Text>
          </ProfileName>
          <ProfileOptions>
            <ProfileRow>
                <Image
                    source={require('./icons/profile/edit.png')}
                />
                <Text style={styles.h4}>Edytuj profil</Text>
            </ProfileRow>
            <Separator></Separator>
            <ProfileRow>
                <Image
                    source={require('./icons/profile/write.png')}
                />
                <Text style={styles.h4}>Napisz do nas</Text>
            </ProfileRow>
            <Separator></Separator>
            <ProfileRow>
                <Image
                    source={require('./icons/profile/language.png')}
                />
                <Text style={styles.h4}>Zmień język</Text>
            </ProfileRow>
            <Separator></Separator>
            <ProfileRow>
                <Image
                    source={require('./icons/profile/temperature_unit.png')}
                />
                <Text style={styles.h4}>Jednostka temperatury</Text>
                <ProfileRow style={{left: 180}}>
                    <Image
                        source={require('./icons/profile/checked_radio.png')}
                        style={{height: 24, width: 24}}
                    />
                    <Text style={styles.h4}>°C</Text>
                    <Image
                        source={require('./icons/profile/unchecked_radio.png')}
                        style={{height: 24, width: 24}}
                    />
                    <Text style={styles.h4}>°F</Text>
                </ProfileRow>
            </ProfileRow>
            <Separator></Separator>
            <ProfileRow>
                <Image
                    source={require('./icons/profile/history.png')}
                />
                <Text style={styles.h4}>Historia sensorów</Text> 
            </ProfileRow>
            <Separator></Separator>
            <ProfileRow>
                <Image
                    source={require('./icons/profile/rate_app.png')}
                />
                <Text style={styles.h4}>Oceń aplikację</Text>
            </ProfileRow>
          </ProfileOptions>
          
        </OuterContainer>
    );
}

export default Profile;