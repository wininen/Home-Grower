import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import SensorOld from './src/components/Sensor/SensorOld.js';
import MyPlants from './src/components/MyPlants/MyPlants.js';
import AllPlants from './src/components/AllPlants/AllPlants.js';
import Forecast from './src/components/Forecast/Forecast.js';
import Profile from './src/components/Profile/Profile.js';
import Scanner from './src/components/Scanner/Scanner.js';
import OnboardingScreen from './src/components/Onboarding/OnboardingScreens.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyPlant from './src/components/MyPlant/MyPlant.js';
import ScrollableTabBar from './src/components/PlantHistory/ScrollableTabBar.tsx';
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(false);

export const db = SQLite.openDatabase({
  name: 'plantsSQLite.db',
  createFromLocation: 1,
});

const Main = createNativeStackNavigator();

const App = () => {
  const [isAppLaunchedForFirstTime, setIsAppLaunchedForFirstTime] =
    useState(null);

  const firstRun = async () => {
    try {
      const appData = await AsyncStorage.getItem('@isAppLaunchedForFirstTime');
      if (appData == null) {
        setIsAppLaunchedForFirstTime(true);
        // AsyncStorage.setItem('@isAppLaunchedForFirstTime', 'false');
      } else {
        setIsAppLaunchedForFirstTime(false);
      }
    } catch (err) {
      console.log('Error occured: ' + err);
    }
  };

  useEffect(() => {
    firstRun();
  }, []);

  return (
    isAppLaunchedForFirstTime != null && (
      <NavigationContainer>
        <Main.Navigator screenOptions={{headerShown: false}}>
          {isAppLaunchedForFirstTime && (
            <Main.Screen
              name="OnboardingScreens"
              component={OnboardingScreen}
            />
          )}
          <Main.Screen name="Home" component={SensorOld} />

          <Main.Screen name="MyPlants" component={MyPlants} />

          <Main.Screen name="AllPlants" component={AllPlants} />

          <Main.Screen name="Forecast" component={Forecast} />

          <Main.Screen name="Profile" component={Profile} />

          <Main.Screen name="Scanner" component={Scanner} />

          <Main.Screen name="MyPlant" component={MyPlant} />

          <Main.Screen name="ScrollableTabBar" component={ScrollableTabBar} />
        </Main.Navigator>
      </NavigationContainer>
    )
  );
};

export default App;
