import React, {
    useState,
  } from 'react';
  import {
    Text,
    Image,
    TouchableOpacity,
  } from 'react-native';

  import {
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
    LeftRow,
    RightRow,
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

    const toProfilePage = async () => {
      setElementVisible(!elementVisible);
      navigation.navigate('Profile');
    }
    
    return(
        <OuterContainer>
          <InnerContainer>
            <LeftRow>
              <TouchableOpacity onPress={() => setElementVisible(!elementVisible)}>
                <Image source={require('./icons/hamburger.png')} style={styles.gapForMenu}/>
              </TouchableOpacity>
              <Text style={styles.bold_white}>Baza roślin</Text>
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
              <InnerContainerExtendedList style={{borderBottomColor: '#CCCCCC', borderBotttomWidth: 3}} onPress={() => toForecastPage()}>
                <Text style={styles.bold_white}>Pogoda</Text>
              </InnerContainerExtendedList>
              <Separator></Separator>
              <InnerContainerExtendedList onPress={() => toProfilePage()}>
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
