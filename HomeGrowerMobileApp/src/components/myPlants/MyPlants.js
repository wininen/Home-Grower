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
import {StyledButton, styles} from '../../Styles.js';

import {
  PlantsContainer,
  PlantsElement,
  StyledImage,
  PlantsAfterElement,
  ButtonBox,
  ModalButton,
  ModalList,
} from './MyPlants.styled';
import {Modal} from 'react-native-paper';
import SQLite from 'react-native-sqlite-storage';
import {ModalItem} from '../allPlants/AllPlants.styled.js';
SQLite.DEBUG(true);
SQLite.enablePromise(false);

let db = SQLite.openDatabase({
  name: 'plantsSQLite.db',
  createFromLocation: 1,
});

const MyPlants = ({navigation}) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myPlants, setMyPlants] = useState({});
  const [details, setDetails] = useState({});

  const fetchPlants = async () => {
    try {
      let photo_path = {photo_path: []};
      let another = {
        my_plant_name: [],
        plant_genus_id: [],
        report_id: [],
      };
      await db.transaction(txn => {
        txn.executeSql(
          `SELECT photo_path, my_plant_name, plant_genus_id, report_id from 'myplants'`,
          [],
          (tx, res) => {
            console.log('Query completed');
            const len = res.rows.length;
            for (let i = 0; i < len; i++) {
              Object.entries(res.rows.item(i)).forEach(([key, value]) => {
                if (key == 'photo_path') {
                  // console.log(key, value);
                  photo_path.photo_path.push(value);
                } else if (key == 'my_plant_name') {
                  another.my_plant_name.push(value);
                } else if (key == 'plant_genus_id') {
                  another.plant_genus_id.push(value);
                } else if (key == 'report_id') {
                  another.report_id.push(value);
                }
              });
            }
            console.log('Everything about SQLite done');
            setMyPlants(photo_path);
            setDetails(another);
            setLoading(false);
          },
        );
      });
    } catch (e) {
      console.log('ERROR' + e);
    }
  };

  const delPlant = async name => {
    try {
      await db.transaction(txn => {
        txn.executeSql(
          `DELETE FROM 'myplants' WHERE photo_path LIKE ?`,
          [name],
          (tx, res) => {
            console.log('Query completed');
            const len = res.rowsAffected;
            if (len > 0) {
              console.log('Everything about SQLite done');
              navigation.navigate('MyPlants');
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
    let planame = await details.my_plant_name[index];
    let plagenus = await details.plant_genus_id[index];
    let repoid = await details.report_id[index];
    let name = await item;
    setResult([
      ['Nazwa:', name],
      ['Pochodzenie:', planame],
      ['Produkcja:', plagenus],
      ['Kategoria:', repoid],
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
        ) : myPlants.photo_path.length != 0 ? (
          <ScrollView
            contentContainerStyle={styles.plantsList}
            keyboardShouldPersistTaps="handled">
            <FlatList data={myPlants.photo_path} renderItem={renderList} />
          </ScrollView>
        ) : (
          <Text style={styles.h2}>Nie masz jeszcze żadnych roślin</Text>
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
                  <ModalButton onPress={() => delPlant(result[0][1])}>
                    <Text style={styles.body}>Usuń</Text>
                  </ModalButton>
                </ModalList>
              </View>
            </View>
          </Modal>
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
