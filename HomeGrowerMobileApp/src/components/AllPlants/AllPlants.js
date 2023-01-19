import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Alert, ActivityIndicator} from 'react-native';
import Layout from '../Layout/Layout.js';
import {styles, StyledButton} from '../../Styles.js';
import LoadingView from '../ActivityIndicator/ActivityIndicator.js';

import {
  PlantsContainer,
  PlantsElement,
  StyledImage,
  PlantsAfterElement,
  ModalButton,
  ModalList,
  ModalItem,
} from './AllPlants.styled';
import {Modal, TextInput} from 'react-native-paper';
import {db} from '../../../App.js';

const AllPlants = ({navigation}) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState({});
  const [details, setDetails] = useState({});
  const [offset, setOffset] = useState(0);
  const [dbCopy, setDbCopy] = useState({});
  const [write, setWrite] = useState('');

  const fetchPlants = async () => {
    try {
      let id = {id: []};
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
        image: [],
      };
      await db.transaction(txn => {
        txn.executeSql(
          `SELECT id, origin, production, category, image from 'plants' LIMIT ?,20`,
          [offset],
          (tx, res) => {
            console.log('Query completed');
            const len = res.rows.length;
            console.log(len);
            for (let i = 0; i < len; i++) {
              Object.entries(res.rows.item(i)).forEach(([key, value]) => {
                if (key == 'id') {
                  id.id.push(value);
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
                  another.display_pid.push(value);
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
                } else if (key == 'image') {
                  another.image.push(value);
                }
              });
            }
            console.log('Everything about SQLite done');
            setOffset(offset + 20);
            setName(id);
            setDbCopy(id);
            setDetails(another);
            setLoading(false);
          },
        );
      });
    } catch (e) {
      console.log('ERROR' + e);
    }
  };

  const generateRandomString = length => {
    const char =
      'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    const random = Array.from(
      {length: length},
      () => char[Math.floor(Math.random() * char.length)],
    );
    const randomString = random.join('');
    return randomString;
  };

  const addPlant = async (name, origin, production, category, image) => {
    try {
      await db.transaction(txn => {
        txn.executeSql(
          `SELECT 1 FROM 'myplants' WHERE plant_genus_id = ?`,
          [name],
          (tx, resp) => {
            if (resp.rows.length == 1) {
              Alert.alert('Podana roślina znajduje się już w twoich roślinach');
            } else {
              txn.executeSql(
                `INSERT INTO 'myplants' (id, plant_genus_id) VALUES(?,?)`,
                [generateRandomString(36), name],
                (tx, res) => {
                  console.log('Query completed');
                  const len = res.rowsAffected;
                  if (len == 1) {
                    console.log('Everything about SQLite done');
                  } else {
                    console.log('Something went wrong');
                  }
                },
              );
              Alert.alert('Sukces!', 'Pomyślnie dodano roślinę', [
                {
                  onPress: () =>
                    navigation.goBack('MyPlants', {
                      name: name,
                      origin: origin,
                      production: production,
                      category: category,
                      image: image,
                    }),
                },
              ]);
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
        <StyledImage source={{uri: details.image[index]}} />
        <Text style={styles.bold_black}>{item}</Text>
      </PlantsAfterElement>
    </PlantsElement>
  );

  const renderFooter = () => {
    return (
      <View style={styles.plantsList}>
        <StyledButton onPress={fetchPlants}>
          <Text style={styles.body}>Pokaż Następne</Text>
          {loading ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </StyledButton>
      </View>
    );
  };

  const searchBar = text => {
    if (text) {
      const filteredData = dbCopy.id.filter(item => {
        const itemData = item.id ? item.id.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setName(filteredData);
      setWrite(text);
    } else {
      setName(dbCopy);
      setWrite(text);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <Layout>
      <PlantsContainer>
        {loading ? (
          <LoadingView></LoadingView>
        ) : (
          <PlantsContainer style={styles.plantsList}>
            <TextInput
              style={{height: 60, borderColor: '#000', borderWidth: 1}}
              placeholder="Wyszukaj roślinę..."
              onChangeText={text => searchBar(text)}
              value={write}
            />
            <FlatList
              data={name.id}
              renderItem={renderList}
              alwaysBounceVertical={true}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
            />
          </PlantsContainer>
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
