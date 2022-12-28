import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  SafeAreaView,
} from 'react-native';
import Layout from '../Layout/Layout.js';
import {StyledButton, styles} from '../../Styles.js';

import {
  PlantsContainer,
  PlantsElement,
  StyledImage,
  PlantsFamily,
  PlantsAfterElement,
  ButtonBox,
  ModalButton,
  ModalList,
} from './Plants.styled';
import {Modal} from 'react-native-paper';

const Plants = ({navigation}) => {
  const [data, setData] = useState({});
  const [otherData, setOtherData] = useState({});
  const [result, setResult] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let titles = {titles: []};
      let other = {
        id: [],
        description: [],
        ingredients: [],
        image: [],
      };
      await fetch('https://api.sampleapis.com/coffee/hot')
        .then(res => res.json())
        .then(res => {
          res.forEach(function (item) {
            Object.keys(item).forEach(function (key) {
              if (key == 'title') {
                titles.titles.push(item[key]);
              } else if (key == 'id') {
                other.id.push(item[key]);
              } else if (key == 'description') {
                other.description.push(item[key]);
              } else if (key == 'ingredients') {
                other.ingredients.push(item[key]);
              } else if (key == 'image') {
                other.image.push(item[key]);
              }
            });
          });
          setData(titles);
          setOtherData(other);
          setLoading(false);
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const [modal, setModal] = useState(false);

  const showDetails = async index => {
    let id = await otherData.id[index];
    let description = await otherData.description[index];
    let ingredients = await otherData.ingredients[index];
    let image = await otherData.image[index];
    setResult([id, description, ingredients, image]);
    setModal(!modal);
  };

  useEffect(() => {
    fetchData();
  }, [otherData]);

  return (
    <Layout>
      <PlantsContainer>
        {loading ? (
          <Text style={styles.h2}>Loading...</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.plantsList}>
            <PlantsElement style={styles.shadow} onPress={() => showDetails(0)}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/achimenes_spp.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data.titles[0]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow} onPress={() => showDetails(1)}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/adenium_obesum.png')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data.titles[1]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow} onPress={() => showDetails(2)}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/aeonium_urbicum.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data.titles[2]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow} onPress={() => showDetails(3)}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/alocasia_cucullata.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data.titles[3]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow} onPress={() => showDetails(4)}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/calathea_concinna.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data.titles[4]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow} onPress={() => showDetails(5)}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/cordyline_fruticosa.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data.titles[5]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow} onPress={() => showDetails(6)}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/crassula_lactea.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data.titles[6]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow} onPress={() => showDetails(7)}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/dracaena_fragrans.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data.titles[7]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
            <PlantsElement style={styles.shadow} onPress={() => showDetails(8)}>
              <PlantsAfterElement>
                <StyledImage
                  source={require('../../assets/images/monstera_deliciosa.jpg')}
                />
                <PlantsFamily>
                  <Text style={styles.bold_black}>{data.titles[8]}</Text>
                  <Text>Rodzina</Text>
                </PlantsFamily>
              </PlantsAfterElement>
            </PlantsElement>
          </ScrollView>
        )}
        {otherData && result && (
          <>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modal}
              onRequestClose={() => {
                setModal(!modal);
              }}>
              <View style={styles.modalContent}>
                <View style={styles.modalContainer}>
                  <ModalList>
                    <Text style={styles.modalText}>{result[0]}</Text>
                  </ModalList>
                  <ModalList>
                    <Text style={styles.modalText}>{result[1]}</Text>
                  </ModalList>
                  <ModalList>
                    <Text style={styles.modalText}>{result[2]}</Text>
                  </ModalList>
                  <ModalList>
                    <Text style={styles.modalText}>{result[3]}</Text>
                  </ModalList>
                  <ModalButton onPress={() => setModal(!modal)}>
                    <Text style={styles.body}>Wróć</Text>
                  </ModalButton>
                </View>
              </View>
            </Modal>
          </>
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
