import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {SensorButton, SensorRow} from './SensorOption.styled';

export const AvailableSensor = ({item, connect}) => {
  const {id} = item;
  return (
    <SensorRow>
      <SensorButton onPress={() => connect(item)}>
        <Text>{id}</Text>
      </SensorButton>
    </SensorRow>
  );
};

export const ConnectedSensor = ({item, connect, turnOnDiode}) => {
  const {id} = item;
  return (
    <SensorRow>
      <SensorButton onPress={() => connect(item)}>
        <Text>{id}</Text>
        <Entypo name="arrow-bold-right" size={16} style={{color: 'black'}} />
      </SensorButton>
      <TouchableOpacity onPress={() => turnOnDiode(item)}>
        <Entypo name="light-bulb" size={20} style={{color: 'black'}} />
      </TouchableOpacity>
    </SensorRow>
  );
};

export default AvailableSensor;
