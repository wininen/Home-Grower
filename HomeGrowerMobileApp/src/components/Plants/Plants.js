import React from 'react';
import {Text} from 'react-native';
import Layout from '../Layout/Layout.js';
import {styles} from '../../Styles/';

import {
  OuterContainer,
  PlantsList,
  PlantsElement,
  StyledImage,
  PlantsFamily,
  PlantsAfterElement,
  Separator,
} from './Plants.styled';

const Plants = ({navigation}) => {
  return (
    <Layout>
      <OuterContainer>
        <PlantsList>
          <PlantsElement>
            <PlantsAfterElement>
              <StyledImage
                source={require('../../assets/images/achimenes_spp.jpg')}
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
                source={require('../../assets/images/adenium_obesum.png')}
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
                source={require('../../assets/images/aeonium_urbicum.jpg')}
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
                source={require('../../assets/images/alocasia_cucullata.jpg')}
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
                source={require('../../assets/images/calathea_concinna.jpg')}
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
                source={require('../../assets/images/cordyline_fruticosa.jpg')}
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
                source={require('../../assets/images/crassula_lactea.jpg')}
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
                source={require('../../assets/images/dracaena_fragrans.jpg')}
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
                source={require('../../assets/images/monstera_deliciosa.jpg')}
              />
              <PlantsFamily>
                <Text style={styles.bold_black}>Monstera deliciosa</Text>
                <Text>Rodzina</Text>
              </PlantsFamily>
            </PlantsAfterElement>
          </PlantsElement>
        </PlantsList>
      </OuterContainer>
    </Layout>
  );
};

export default Plants;
