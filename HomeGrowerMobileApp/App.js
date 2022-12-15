import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useRef} from 'react';
import SensorOld from './src/components/Sensor/SensorOld.js';
import Plants from './src/components/Plants/Plants.js';
import Forecast from './src/components/Forecast/Forecast.js';
import Profile from './src/components/Profile/Profile.js';

const Main = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Main.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Main.Screen name="Home" component={SensorOld} />

        <Main.Screen name="Plants" component={Plants} />

        <Main.Screen name="Forecast" component={Forecast} />

        <Main.Screen name="Profile" component={Profile} />
      </Main.Navigator>
    </NavigationContainer>
  );
};

export default App;
