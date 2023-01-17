import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  Image,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {HistoryContainer, HistoryElement} from './PlantHistory.styled';
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(false);

let db = SQLite.openDatabase({
  name: 'plantsSQLite.db',
  createFromLocation: 1,
});

const PlantHistory = props => {
  const isFocused = useIsFocused();
  const [report, setReport] = useState({});
const {planame, plagenus, repoid, name} = props.route.params;
  const fetchReports = async name => {
    try {
      let reportData = {
        id: [],
        my_plant_id: [],
        plant_genus_id: [],
        timestamp: [],
        light: [],
        env_humid: [],
        soil_moist: [],
        soil_ec: [],
        temp: [],
        device_id: [],
      };
      await db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM reports WHERE 'plant_genus_id' = ?;`,
          [name],
          (res) => {
            console.log('Funkcja od raportów się wykonała');
            const len = res.rows.length;
            for (let i = 0; i < len; i++) {
              Object.entries(res.rows.item(i)).forEach(([key, value]) => {
               if (key == 'id') {
                 reportData.id.push(value);
               } else if (key == 'my_plant_id') {
                 reportData.my_plant_id.push(value);
               } else if (key == 'plant_genus_id') {
                 reportData.plant_genus_id.push(value);
               } else if (key == 'timestamp') {
                 reportData.timestamp.push(value);
               } else if (key == 'light') {
                 reportData.light.push(value);
               } else if (key == 'env_humid') {
                 reportData.env_humid.push(value);
               } else if (key == 'soil_moist') {
                 reportData.soil_moist.push(value);
               } else if (key == 'soil_ec') {
                 reportData.soil_ec.push(value);
               } else if (key == 'temp') {
                 reportData.temp.push(value);
               } else if (key == 'device_id') {
                 reportData.device_id.push(value);
               }
              });
              console.log(reportData.device_id);
            }
            console.log('Everything about SQLite done');
            setReport(reportData);
          },
        );
      });
    } catch (e) {
      console.log('ERROR' + e);
    }
  };

  

    useEffect(() => {
    console.log(planame, plagenus, repoid, name);
  }, []);

  const chartPropersties = {
    backgroundColor: '#2FA84E',
    backgroundGradientFrom: '#009f5e',
    backgroundGradientTo: '#2fa84e',
    textsize: 1,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 20,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: 'lightgray',
    },
  };

      useEffect(() => {
        fetchReports(name[1]);
      }, [isFocused]);
      console.log('asdfsfasdfdf' + []);
  return (
    <HistoryContainer>
      <ScrollView>
        <HistoryElement>
          <Image
            source={require('../../assets/images/PlantHistory.png')}
            style={{height: '75%', width: '100%', resizeMode: 'contain'}}
          />
        </HistoryElement>
        <HistoryElement>
          <Text>Nawodnienie</Text>
          <LineChart
            data={{
              labels: [report.timestamp],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width * 0.95} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartPropersties}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 20,
            }}
          />
        </HistoryElement>
        <HistoryElement>
          <Text>Żyzność</Text>
          <LineChart
            data={{
              labels: ['01-02', '02-02', '03-02', '04-02', '05-02', '06-02'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width * 0.95} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartPropersties}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 20,
            }}
          />
        </HistoryElement>
        <HistoryElement>
          <Text>Temperatura</Text>
          <LineChart
            data={{
              labels: ['01-02', '02-02', '03-02', '04-02', '05-02', '06-02'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width * 0.95} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartPropersties}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 20,
            }}
          />
        </HistoryElement>
        <HistoryElement>
          <Text>Nasłonecznienie</Text>
          <LineChart
            data={{
              labels: ['01-02', '02-02', '03-02', '04-02', '05-02', '06-02'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width * 0.95} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartPropersties}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 20,
            }}
          />
        </HistoryElement>
      </ScrollView>
    </HistoryContainer>
  );
};

export default PlantHistory;