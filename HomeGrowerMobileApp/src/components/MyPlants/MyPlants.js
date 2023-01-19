import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  FlatList,
  Alert,
} from 'react-native';
import Layout from '../Layout/Layout.js';
import {StyledButton, styles} from '../../Styles.js';
import {useIsFocused} from '@react-navigation/native';

import {
  PlantsContainer,
  PlantsElement,
  StyledImage,
  PlantsAfterElement,
  ButtonBox,
  ModalButton,
  ModalList,
  ModalItem,
} from '../AllPlants/AllPlants.styled';
import {Modal} from 'react-native-paper';
import {db} from '../../../App.js';

const MyPlants = ({route, navigation}) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myPlants, setMyPlants] = useState({});
  const [details, setDetails] = useState({});

  const [changes, setChanges] = useState(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (
      route.params?.name &&
      route.params?.origin &&
      route.params?.production &&
      route.params?.category &&
      route.params?.image
    ) {
      const {name, origin, production, category, image} = route.params;
    }
  }, []);

  const fetchPlants = async () => {
    try {
      let plants_id = {id: [], plant_genus_id: []};
      let another = {
        origin: [],
        production: [],
        category: [],
        image: [],
        plantId: [],
      };
      await db.transaction(txn => {
        txn.executeSql(
          `SELECT s.id, s.plant_genus_id, b.origin, b.production, b.category, b.image FROM 'myplants' as s JOIN 'plants' as b ON s.plant_genus_id = b.id`,
          [],
          (tx, res) => {
            console.log('Query completed');
            const len = res.rows.length;
            for (let i = 0; i < len; i++) {
              Object.entries(res.rows.item(i)).forEach(([key, value]) => {
                if (key == 'id') {
                  // console.log(key, value);
                  plants_id.id.push(value);
                  another.plantId.push(value);
                } else if (key == 'plant_genus_id') {
                  plants_id.plant_genus_id.push(value);
                } else if (key == 'origin') {
                  another.origin.push(value);
                } else if (key == 'production') {
                  another.production.push(value);
                } else if (key == 'category') {
                  another.category.push(value);
                } else if (key == 'image') {
                  another.image.push(value);
                }
              });
            }
            console.log('Everything about SQLite done');
            setMyPlants(plants_id);
            setDetails(another);
            setChanges(len);
          },
        );
      });
    } catch (e) {
      console.log('ERROR' + e);
    }
  };

  const renderList = ({item, index}) => (
    <PlantsElement
      style={styles.shadow}
      onPress={() =>
        navigation.navigate('ScrollableTabBar', {
          planame: ['Pochodzenie:', details.origin[index]],
          plagenus: ['Produkcja:', details.production[index]],
          repoid: ['Kategoria:', details.category[index]],
          name: ['Nazwa:', item],
          plantId: ['Id:', details.plantId[index]],
        })
      }>
      <PlantsAfterElement>
        <StyledImage source={{uri: details.image[index]}} />
        <Text style={styles.bold_black}>{item}</Text>
      </PlantsAfterElement>
    </PlantsElement>
  );

  useEffect(() => {
    fetchPlants();
    setLoading(false);
  }, [isFocused]);

  return (
    <Layout>
      <PlantsContainer>
        {loading ? (
          <Text style={styles.h2}>Loading...</Text>
        ) : changes != 0 ? (
          <ScrollView
            contentContainerStyle={styles.plantsList}
            keyboardShouldPersistTaps="handled">
            <FlatList data={myPlants.plant_genus_id} renderItem={renderList} />
          </ScrollView>
        ) : (
          <Text style={styles.h2}>Nie masz jeszcze żadnych roślin</Text>
        )}
        <ButtonBox>
          <TouchableOpacity onPress={() => navigation.navigate('AllPlants')}>
            <Image
              source={require('../../assets/icons/plants/add_plant.png')}
            />
          </TouchableOpacity>
        </ButtonBox>
      </PlantsContainer>
    </Layout>
  );
};

export default MyPlants;
