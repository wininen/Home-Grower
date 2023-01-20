import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, Image, FlatList} from 'react-native';
import Layout from '../Layout/Layout.js';
import {styles} from '../../Styles.js';
import {useIsFocused} from '@react-navigation/native';
import LoadingView from '../ActivityIndicator/ActivityIndicator.js';

import {
  PlantsContainer,
  PlantsElement,
  StyledImage,
  PlantsAfterElement,
  ButtonBox,
  PlantsBox,
} from '../MyPlants/MyPlants.styled';
import {db} from '../../../App.js';

const MyPlants = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [myPlants, setMyPlants] = useState({});
  const [details, setDetails] = useState({});
  const [customName, setCustomName] = useState({});

  const [changes, setChanges] = useState(0);

  const isFocused = useIsFocused();

  if (route.params?.name && route.params?.givenName) {
    const {name, givenName} = route.params;
  }

  const fetchPlants = async () => {
    try {
      let plants_id = {id: [], plant_genus_id: [], plant_name: []};
      let another = {
        origin: [],
        category: [],
        min_light_lux: [],
        max_light_lux: [],
        min_temp: [],
        max_temp: [],
        min_soil_ec: [],
        max_soil_ec: [],
        min_soil_moist: [],
        max_soil_moist: [],
        image: [],
        plantId: [],
      };
      await db.transaction(txn => {
        txn.executeSql(
          `SELECT s.id, s.plant_genus_id, b.origin, b.category, b.min_light_lux, b.max_light_lux, b.min_temp, b.max_temp, b.min_soil_ec, b.max_soil_ec, b.min_soil_moist, b.max_soil_moist, b.image FROM 'myplants' as s JOIN 'plants' as b ON s.plant_genus_id = b.id`,
          [],
          (tx, res) => {
            txn.executeSql(
              `SELECT s.plant_name FROM 'myplantuser' as s JOIN 'myplants' as b ON s.myplant_id = b.id`,
              [],
              (tx, res) => {
                console.log('Query completed');
                const len_second = res.rows.length;
                console.log(len_second);
                for (let i = 0; i < len_second; i++) {
                  Object.entries(res.rows.item(i)).forEach(([key, value]) => {
                    plants_id.plant_name.push(value);
                  });
                }
                setCustomName(plants_id);
                console.log('Everything about SQLite done');
              },
            );
            console.log('Query completed');
            const len = res.rows.length;
            console.log(len);
            for (let i = 0; i < len; i++) {
              Object.entries(res.rows.item(i)).forEach(([key, value]) => {
                switch (key) {
                  case 'id':
                    plants_id.id.push(value);
                    another.plantId.push(value);
                    break;
                  case 'plant_genus_id':
                    plants_id.plant_genus_id.push(value);
                    break;
                  case 'origin':
                    another.origin.push(value);
                    break;
                  case 'category':
                    another.category.push(value);
                    break;
                  case 'image':
                    another.image.push(value);
                    break;
                  case 'min_light_lux':
                    another.min_light_lux.push(value);
                    break;
                  case 'max_light_lux':
                    another.max_light_lux.push(value);
                    break;
                  case 'min_temp':
                    another.min_temp.push(value);
                    break;
                  case 'max_temp':
                    another.max_temp.push(value);
                    break;
                  case 'min_soil_ec':
                    another.min_soil_ec.push(value);
                    break;
                  case 'max_soil_ec':
                    another.max_soil_ec.push(value);
                    break;
                  case 'min_soil_moist':
                    another.min_soil_moist.push(value);
                    break;
                  case 'max_soil_moist':
                    another.max_soil_moist.push(value);
                    break;
                }
              });
            }
            console.log('Everything about SQLite done');
            console.log(plants_id.plant_name);
            console.log(plants_id.plant_genus_id);
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
          repoid: ['Kategoria:', details.category[index]],
          name: ['Nazwa:', item],
          givenName: ['Nadana nazwa:', myPlants.plant_name[index]],
          plantId: ['Id:', details.plantId[index]],
          min_light_lux: ['Minimalne światło:', details.min_light_lux[index]],
          max_light_lux: ['Maksymalne światło:', details.max_light_lux[index]],
          min_temp: ['Minimalna temperatura:', details.min_temp[index]],
          max_temp: ['Maksymalna temperatura:', details.max_temp[index]],
          min_soil_ec: ['Minimalna żyzność:', details.min_soil_ec[index]],
          max_soil_ec: ['Maksymalna żyzność:', details.max_soil_ec[index]],
          min_soil_moist: [
            'Minimalne nawodnienie:',
            details.min_soil_moist[index],
          ],
          max_soil_moist: [
            'Maksymalne nawodnienie:',
            details.max_soil_moist[index],
          ],
        })
      }>
      <PlantsAfterElement>
        <StyledImage source={{uri: details.image[index]}} />
        <PlantsBox>
          <Text style={styles.bold_black}>{item}</Text>
          <Text style={styles.bold_black}>{myPlants.plant_name[index]}</Text>
        </PlantsBox>
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
          <LoadingView></LoadingView>
        ) : changes != 0 ? (
          <PlantsContainer style={styles.plantsList}>
            <FlatList
              data={myPlants.plant_genus_id}
              renderItem={renderList}
              showsVerticalScrollIndicator={false}
            />
          </PlantsContainer>
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
