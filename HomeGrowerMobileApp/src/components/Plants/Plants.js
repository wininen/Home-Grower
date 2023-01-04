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
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(false);

let db = SQLite.openDatabase({
  name: 'plants.db',
  createFromLocation: 1,
});

const Plants = ({navigation}) => {
  const [otherData, setOtherData] = useState({});
  const [result, setResult] = useState([null, null, null, null]);
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
                  console.log(key, value);
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
            console.log(pid);
            console.log(another);
            setName(pid);
            setDetails(another);
            setLoading(false);
          },
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  const [modal, setModal] = useState(false);

  const showDetails = async index => {
    let orig = await details.origin[index];
    let prod = await details.production[index];
    let cat = await details.category[index];
    setResult([orig, prod, cat]);
    setModal(!modal);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

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
                  <Text style={styles.bold_black}>{name.pid[0]}</Text>
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
                  <Text style={styles.bold_black}>{name.pid[1]}</Text>
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
                  <Text style={styles.bold_black}>{name.pid[2]}</Text>
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
                  <Text style={styles.bold_black}>{name.pid[3]}</Text>
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
                  <Text style={styles.bold_black}>{name.pid[4]}</Text>
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
                  <Text style={styles.bold_black}>{name.pid[5]}</Text>
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
                  <Text style={styles.bold_black}>{name.pid[6]}</Text>
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
                  <Text style={styles.bold_black}>{name.pid[7]}</Text>
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
                  <Text style={styles.bold_black}>{name.pid[8]}</Text>
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
