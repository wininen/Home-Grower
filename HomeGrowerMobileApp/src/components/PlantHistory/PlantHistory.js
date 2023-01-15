import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {HistoryContainer, HistoryElement} from './PlantHistory.styled';
import Layout from '../Layout/Layout.js';
import {NavigationContext} from '@react-navigation/native';
import {TabView, SceneMap} from 'react-native-tab-view';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

// import SQLite from 'react-native-sqlite-storage';
// SQLite.DEBUG(true);
// SQLite.enablePromise(false);

// let db = SQLite.openDatabase({
//   name: 'plantsSQLite.db',
//   createFromLocation: 1,
// });

// import SQLiteScreen from '../../utils/db-service';
const PlantHistory = () => {
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
  return (
    <Layout>
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
    </Layout>
  );
};

export default PlantHistory;
