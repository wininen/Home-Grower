import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  FlatList,
} from 'react-native';
import Layout from '../Layout/Layout.js';
import {styles} from '../../Styles.js';

import {
  PlantsContainer,
  PlantsElement,
  StyledImage,
  PlantsAfterElement,
  ButtonBox,
  ModalButton,
  ModalList,
} from './AllPlants.styled';
import {Modal} from 'react-native-paper';
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(false);

let db = SQLite.openDatabase({
  name: 'plantsSQLite.db',
  createFromLocation: 1,
});

const AllPlants = ({navigation}) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState({});
  const [details, setDetails] = useState({});

  const fetchPlants = async () => {
    try {
      let pid = {pid: []};
      let another = {
        floral_language: [],
        origin: [],
        production: [],
        category: [],
        blooming: [],
        color: [],
        display_pid: [],
        size: [],
        soil: [],
        sunlight: [],
        watering: [],
        fertilization: [],
        pruning: [],
        max_light_lux: [],
        min_light_lux: [],
        max_temp: [],
        min_temp: [],
        max_env_humid: [],
        min_env_humid: [],
        max_soil_moist: [],
        min_soil_moist: [],
        max_soil_ec: [],
        min_soil_ec: [],
      };
      await db.transaction(txn => {
        txn.executeSql(
          `SELECT pid, origin, production, category from 'plants'`,
          [],
          (tx, res) => {
            console.log('Query completed');
            const len = res.rows.length;
            for (let i = 0; i < len; i++) {
              Object.entries(res.rows.item(i)).forEach(([key, value]) => {
                if (key == 'pid') {
                  // console.log(key, value);
                  pid.pid.push(value);
                } else if (key == 'floral_language') {
                  another.floral_language.push(value);
                } else if (key == 'origin') {
                  another.origin.push(value);
                } else if (key == 'production') {
                  another.production.push(value);
                } else if (key == 'category') {
                  another.category.push(value);
                } else if (key == 'blooming') {
                  another.blooming.push(value);
                } else if (key == 'color') {
                  another.color.push(value);
                } else if (key == 'display_pid') {
                  another.display_pid.push(item[key]);
                } else if (key == 'size') {
                  another.size.push(value);
                } else if (key == 'soil') {
                  another.soil.push(value);
                } else if (key == 'sunlight') {
                  another.sunlight.push(value);
                } else if (key == 'watering') {
                  another.watering.push(value);
                } else if (key == 'fertilization') {
                  another.fertilization.push(value);
                } else if (key == 'pruning') {
                  another.pruning.push(value);
                } else if (key == 'max_light_lux') {
                  another.max_light_lux.push(value);
                } else if (key == 'min_light_lux') {
                  another.min_light_lux.push(value);
                } else if (key == 'max_temp') {
                  another.max_temp.push(value);
                } else if (key == 'min_temp') {
                  another.min_temp.push(value);
                } else if (key == 'max_env_humid') {
                  another.max_env_humid.push(value);
                } else if (key == 'min_env_humid') {
                  another.min_env_humid.push(value);
                } else if (key == 'max_soil_moist') {
                  another.max_soil_moist.push(value);
                } else if (key == 'min_soil_moist') {
                  another.min_soil_moist.push(value);
                } else if (key == 'max_soil_ec') {
                  another.max_soil_ec.push(value);
                } else if (key == 'min_soil_ec') {
                  another.min_soil_ec.push(value);
                }
              });
            }
            console.log('Everything about SQLite done');
            setName(pid);
            setDetails(another);
            setLoading(false);
          },
        );
      });
    } catch (e) {
      console.log('ERROR' + e);
    }
  };

  const [newPlant, setNewPlant] = useState(null);

  const addPlant = async () => {
    try {
    } catch (err) {
      console.log('Error: ' + err);
    }
  };

  const [modal, setModal] = useState(false);

  const showDetails = async index => {
    let orig = await details.origin[index];
    let prod = await details.production[index];
    setResult([
      ['Pochodzenie:', orig],
      ['Produkcja:', prod],
    ]);
    setModal(!modal);
  };

  const renderList = ({item, index}) => (
    <PlantsElement style={styles.shadow} onPress={() => showDetails(index)}>
      <PlantsAfterElement>
        <StyledImage
          source={require('../../assets/images/achimenes_spp.jpg')}
        />
        <Text style={styles.bold_black}>{item}</Text>
      </PlantsAfterElement>
    </PlantsElement>
  );

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <Layout>
      <PlantsContainer>
        {loading ? (
          <Text style={styles.h2}>Loading...</Text>
        ) : (
          <ScrollView
            contentContainerStyle={styles.plantsList}
            keyboardShouldPersistTaps="handled">
            <FlatList data={name.pid.slice(0, 961)} renderItem={renderList} />
          </ScrollView>
        )}
        {result != null && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
              setModal(!modal);
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalPlantContent}>
                <ModalList>
                  <Text style={styles.h4}>{result[0][0]}</Text>
                  <Text style={styles.h4_bold}>{result[0][1]}</Text>
                </ModalList>
                <ModalList>
                  <Text style={styles.h4}>{result[1][0]}</Text>
                  <Text style={styles.h4_bold}>{result[1][1]}</Text>
                </ModalList>
                <PlantsAfterElement>
                  <ModalButton onPress={() => setModal(!modal)}>
                    <Text style={styles.body}>Wróć</Text>
                  </ModalButton>
                  <ModalButton onPress={() => navigation.navigate('MyPlants')}>
                    <Text style={styles.body}>Dodaj</Text>
                  </ModalButton>
                </PlantsAfterElement>
              </View>
            </View>
          </Modal>
        )}
      </PlantsContainer>
    </Layout>
  );
};

export default AllPlants;
