import {PermissionsAndroid} from 'react-native';

async function getBluetoothScanPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Bluetooth Permission',
        message: 
          'In the next dialogue, Android will ask for permission for this ' +
          'App to access your location. This is needed for being able to ' +
          'use Bluetooth to scan your environment for peripherals.',
        buttonPositive: 'OK'
        },
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can scan");
    } else {
      console.log("scan permission denied");
    }


    const connect = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: 'Bluetooth Permission',
        message: 
          'In the next dialogue, Android will ask for permission for this ' +
          'App to access your location. This is needed for being able to ' +
          'use Bluetooth to scan your environment for peripherals.',
        buttonPositive: 'OK'
        },
    )
    if (connect === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can connect");
    } else {
      console.log("connect permission denied");
    }

    const location = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Bluetooth Permission',
        message: 
          'In the next dialogue, Android will ask for permission for this ' +
          'App to access your location. This is needed for being able to ' +
          'use Bluetooth to scan your environment for peripherals.',
        buttonPositive: 'OK'
        },
    )
    if (location === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can connect");
    } else {
      console.log("connect permission denied");
    }

    const location2 = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Bluetooth Permission',
        message: 
          'In the next dialogue, Android will ask for permission for this ' +
          'App to access your location. This is needed for being able to ' +
          'use Bluetooth to scan your environment for peripherals.',
        buttonPositive: 'OK'
        },
    )
    if (location2 === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can connect");
    } else {
      console.log("connect permission denied");
    }
    

  }

export default getBluetoothScanPermission;