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
import {styles} from '../../Styles.js';

import {
  PlantsContainer,
  PlantsElement,
  StyledImage,
  PlantsAfterElement,
  ButtonBox,
  ModalButton,
  ModalList,
  ModalItem,
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

  const addPlant = async (name, origin, production, category) => {
    try {
      await db.transaction(txn => {
        txn.executeSql(
          `SELECT 1 FROM 'myplants' WHERE photo_path = ?`,
          [name],
          (tx, resp) => {
            if (resp.rows.length == 1) {
              Alert.alert('Podana roślina znajduje się już w twoich roślinach');
            } else {
              txn.executeSql(
                `INSERT INTO 'myplants' (photo_path, my_plant_name, plant_genus_id, report_id) VALUES(?,?,?,?)`,
                [name, origin, production, category],
                (tx, res) => {
                  console.log('Query completed');
                  const len = res.rowsAffected;
                  if (len == 1) {
                    console.log('Everything about SQLite done');
                    navigation.navigate('MyPlants');
                  }
                },
              );
            }
          },
        );
      });
    } catch (err) {
      console.log('Error: ' + err);
    }
  };

  const [modal, setModal] = useState(false);

  const showDetails = async (index, item) => {
    let orig = await details.origin[index];
    let prod = await details.production[index];
    let cat = await details.category[index];
    let name = await item;
    setResult([
      ['Nazwa:', name],
      ['Pochodzenie:', orig],
      ['Produkcja:', prod],
      ['Kategoria:', cat],
    ]);
    setModal(!modal);
  };

  const renderList = ({item, index}) => (
    <PlantsElement
      style={styles.shadow}
      onPress={() => showDetails(index, item)}>
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
                  <ModalItem style={styles.h4}>{result[1][0]}</ModalItem>
                  <ModalItem style={styles.h4_bold}>{result[1][1]}</ModalItem>
                </ModalList>
                <ModalList>
                  <ModalItem style={styles.h4}>{result[2][0]}</ModalItem>
                  <ModalItem style={styles.h4_bold}>{result[2][1]}</ModalItem>
                </ModalList>
                <ModalList>
                  <ModalItem style={styles.h4}>{result[3][0]}</ModalItem>
                  <ModalItem style={styles.h4_bold}>{result[3][1]}</ModalItem>
                </ModalList>
                <ModalList>
                  <ModalButton onPress={() => setModal(!modal)}>
                    <Text style={styles.body}>Wróć</Text>
                  </ModalButton>
                  <ModalButton
                    onPress={() =>
                      addPlant(
                        result[0][1],
                        result[1][1],
                        result[2][1],
                        result[3][1],
                      )
                    }>
                    <Text style={styles.body}>Dodaj</Text>
                  </ModalButton>
                </ModalList>
              </View>
            </View>
          </Modal>
        )}
      </PlantsContainer>
    </Layout>
  );
};

export default AllPlants;
