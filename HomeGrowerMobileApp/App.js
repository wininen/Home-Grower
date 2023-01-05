import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useRef} from 'react';
import SensorOld from './src/components/Sensor/SensorOld.js';
import Plants from './src/components/Plants/Plants.js';
import Forecast from './src/components/Forecast/Forecast.js';
import Profile from './src/components/Profile/Profile.js';
import Scanner from './src/components/Scanner/Scanner.js';
import OnboardingScreen from './src/components/Onboarding/OnboardingScreens.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = createNativeStackNavigator();

const App = () => {
  const [isAppLaunchedForFirstTime, setIsAppLaunchedForFirstTime] =
    React.useState(null);
  React.useEffect(async () => {
    const appData = await AsyncStorage.getItem('isAppLaunchedForFirstTime');
    if (appData == null) {
      setIsAppLaunchedForFirstTime(true);
      AsyncStorage.setItem('isAppLaunchedForFirstTime', 'false');
    } else {
      setIsAppLaunchedForFirstTime(false);
    }
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

          <Main.Screen name="Plants" component={Plants} />

          <Main.Screen name="Forecast" component={Forecast} />

          <Main.Screen name="Profile" component={Profile} />

          <Main.Screen name="Scanner" component={Scanner} />
        </Main.Navigator>
      </NavigationContainer>
    )
  );
};

export default App;
