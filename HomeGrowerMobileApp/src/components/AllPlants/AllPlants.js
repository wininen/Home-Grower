import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
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
  ModalInput,
} from './AllPlants.styled';
import {InputBox} from '../Forecast/Forecast.styled';
import {Modal} from 'react-native-paper';
import {db} from '../../../App.js';
import {CreateUUID} from '../Scanner/GeneratorQr';

const AllPlants = ({navigation}) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState({});
  const [nameCopy, setNameCopy] = useState({});
  const [details, setDetails] = useState({});
  const [offset, setOffset] = useState(20);
  const [where, setWhere] = useState(null);
  const [givenName, setGivenName] = useState(null);

  const [write, setWrite] = useState('');
  const [counter, setCounter] = useState(0);

  const fetchPlants = async () => {
    try {
      if (counter == 0) {
        let id = {id: []};
        let another = {
          origin: [],
          category: [],
          image: [],
        };
        await db.transaction(txn => {
          txn.executeSql(
            `SELECT id, origin, category, image from 'plants'`,
            [],
            (tx, res) => {
              console.log('Query completed');
              const len = res.rows.length;
              for (let i = 0; i < len; i++) {
                Object.entries(res.rows.item(i)).forEach(([key, value]) => {
                  switch (key) {
                    case 'id':
                      id.id.push(value);
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
                  }
                });
              }
              console.log('Everything about SQLite done');
              setName(id);
              setDetails(another);
              setNameCopy(id.id.slice(0, offset));
              setOffset(offset + 20);
              setCounter(1);
              setLoading(false);
            },
          );
        });
      } else {
        if (where == null) {
          setNameCopy(name.id.slice(0, offset));
          setOffset(offset + 20);
        } else {
          setNameCopy(name.id.slice(where, where + offset));
          setWhere(where + offset);
        }
      }
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

  const addPlant = async name => {
    try {
      const myString = CreateUUID;
      const plant_id = generateRandomString(36);
      await db.transaction(txn => {
        if (givenName.length > 4 || givenName != null) {
          txn.executeSql(
            `INSERT INTO 'myplants' (id, plant_genus_id) VALUES(?,?)`,
            [plant_id, name],
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
          txn.executeSql(
            `INSERT INTO 'myplantuser' (myplant_id, user_id, plant_name) VALUES (?,?,?)`,
            [plant_id, myString, givenName],
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
                  givenName: givenName,
                }),
            },
          ]);
        } else {
          Alert.alert(
            'Spróbuj jeszcze raz',
            'Nazwa rośliny powinna mieć co najmniej długość 5 znaków',
          );
        }
      });
    } catch (err) {
      console.log('Error: ' + err);
    }
  };

  const [modal, setModal] = useState(false);

  const showDetails = async (index, item) => {
    let orig = await details.origin[index];
    let cat = await details.category[index];
    let name = await item;
    setResult([
      ['Nazwa:', name],
      ['Pochodzenie:', orig],
      ['Kategoria:', cat],
    ]);
    setModal(!modal);
  };

  const renderList = ({item, index}) => (
    <PlantsElement
      style={styles.shadow}
      onPress={() => showDetails(name.id.indexOf(item), item)}>
      <PlantsAfterElement>
        <StyledImage source={{uri: details.image[name.id.indexOf(item)]}} />
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
      const filteredData = name.id.filter(item => {
        const itemData = item ? item.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        if (textData == itemData.substring(0, textData.length)) {
          return itemData.indexOf(textData) > -1;
        }
      });
      setWhere(name.id.indexOf(filteredData[filteredData.length - 1]));
      setNameCopy(filteredData.slice(0, 20));
      setWrite(text);
    } else {
      setNameCopy(name.id.slice(0, 20));
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
            <InputBox>
              <TextInput
                style={styles.h4}
                onChangeText={text => searchBar(text)}
                placeholder="Wyszukaj roślinę..."
                value={setWrite}
              />
            </InputBox>
            <FlatList
              data={nameCopy}
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
                <ModalInput>
                  <InputBox>
                    <TextInput
                      style={styles.h4}
                      onChangeText={setGivenName}
                      placeholder="Nazwa rośliny..."
                    />
                  </InputBox>
                </ModalInput>
                <ModalList>
                  <ModalButton onPress={() => setModal(!modal)}>
                    <Text style={styles.body}>Wróć</Text>
                  </ModalButton>
                  <ModalButton onPress={() => addPlant(result[0][1])}>
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
