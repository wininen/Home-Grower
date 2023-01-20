import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Image, Dimensions, ScrollView, Text} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {HistoryContainer, HistoryElement} from './PlantHistory.styled';
import LoadingView from '../ActivityIndicator/ActivityIndicator.js';
import {db} from '../../../App';

const PlantHistory = props => {
  const isFocused = useIsFocused();
  const [report, setReport] = useState({});
  const {planame, plagenus, repoid, name} = props.route.params;
  const [loading, setLoading] = useState(true);
  const [lenRow, setLenRow] = useState(null);
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
          `SELECT timestamp, soil_moist, soil_ec, temp, light FROM 'reports' WHERE plant_genus_id = ?`,
          [name],
          (tx, res) => {
            console.log('Funkcja od raportów się wykonała');
            const len = res.rows.length;
            console.log(len);
            for (let i = 0; i < len; i++) {
              console.log(res.rows.item(i));
              Object.entries(res.rows.item(i)).forEach(([key, value]) => {
                switch (key) {
                  case 'id':
                    reportData.id.push(value);
                    break;
                  case 'my_plant_id':
                    reportData.my_plant_id.push(value);
                    break;
                  case 'plant_genus_id':
                    reportData.plant_genus_id.push(value);
                    break;
                  case 'timestamp':
                    reportData.timestamp.push(value);
                    break;
                  case 'light':
                    reportData.light.push(value);
                    break;
                  case 'env_humid':
                    reportData.env_humid.push(value);
                    break;
                  case 'soil_moist':
                    reportData.soil_moist.push(value);
                    break;
                  case 'soil_ec':
                    reportData.soil_ec.push(value);
                    break;
                  case 'temp':
                    reportData.temp.push(value);
                    break;
                  case 'device_id':
                    reportData.device_id.push(value);
                    break;
                }
              });
            }
            console.log('Everything about SQLite done');
            console.log(Object.values(reportData.soil_moist).length);
            setReport(reportData);
            setLenRow(len);
            setLoading(false);
          },
        );
      });
    } catch (e) {
      console.log('ERROR' + e);
    }
  };

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
  }, []);

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
          {loading ? (
            <LineChart
              data={{
                labels: ['—', '—', '—', '—', '—', '—'],
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
          ) : lenRow == 0 ? (
            <LoadingView></LoadingView>
          ) : (
            <LineChart
              data={{
                labels: Object.values(report.timestamp),
                datasets: [
                  {
                    data: Object.values(report.soil_moist),
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
          )}
        </HistoryElement>
        <HistoryElement>
          <Text>Żyzność</Text>
          {loading ? (
            <LineChart
              data={{
                labels: ['—', '—', '—', '—', '—', '—'],
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
          ) : lenRow == 0 ? (
            <LoadingView></LoadingView>
          ) : (
            <LineChart
              data={{
                labels: Object.values(report.timestamp),
                datasets: [
                  {
                    data: Object.values(report.soil_ec),
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
          )}
        </HistoryElement>
        <HistoryElement>
          <Text>Temperatura</Text>
          {loading ? (
            <LineChart
              data={{
                labels: ['—', '—', '—', '—', '—', '—'],
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
          ) : lenRow == 0 ? (
            <LoadingView></LoadingView>
          ) : (
            <LineChart
              data={{
                labels: Object.values(report.timestamp),
                datasets: [
                  {
                    data: Object.values(report.temp),
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
          )}
        </HistoryElement>
        <HistoryElement>
          <Text>Nasłonecznienie</Text>
          {loading ? (
            <LineChart
              data={{
                labels: ['—', '—', '—', '—', '—', '—'],
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
          ) : lenRow == 0 ? (
            <LoadingView></LoadingView>
          ) : (
            <LineChart
              data={{
                labels: Object.values(report.timestamp),
                datasets: [
                  {
                    data: Object.values(report.light),
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
          )}
        </HistoryElement>
      </ScrollView>
    </HistoryContainer>
  );
};

export default PlantHistory;
