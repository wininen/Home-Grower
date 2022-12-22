import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, Image, ScrollView, View} from 'react-native';
import Layout from '../Layout/Layout.js';
import {styles} from '../../Styles.js';

import {
  PlantsContainer,
  PlantsList,
  PlantsElement,
  StyledImage,
  PlantsFamily,
  PlantsAfterElement,
  ButtonBox,
} from './Plants.styled';

const Plants = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    await fetch('https://api.sampleapis.com/coffee/hot')
      .then(res => res.json())
      .then(res => {
        let tempObject = [];
        res.forEach(function (item) {
          Object.keys(item).forEach(function (key) {
            console.log('key: ' + key + ' value: ' + item[key]);
            if (key == 'title') {
              tempObject.push(item[key]);
            }
          });
          setData(tempObject);
        });
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <PlantsContainer>
        {loading ? (
          <Text style={styles.h2}>Loading...</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.plantsList}>
            <PlantsElement style={styles.shadow}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/achimenes_spp.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data[0]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/adenium_obesum.png')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data[1]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/aeonium_urbicum.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data[2]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/alocasia_cucullata.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data[3]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/calathea_concinna.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data[4]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/cordyline_fruticosa.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data[5]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/crassula_lactea.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data[6]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/dracaena_fragrans.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data[7]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/monstera_deliciosa.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data[8]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
          </ScrollView>
        )}
        <ButtonBox>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/plants/add_plant.png')}
            />
          </TouchableOpacity>
        </ButtonBox>
      </PlantsContainer>
    </Layout>
  );
};

export default Plants;
