import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SensorButton, SensorRow, Icon} from './SensorOption.styled';

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

export const ConnectedSensor = ({
  item,
  connect,
  turnOnDiode,
  disconectPeripheral,
}) => {
  const {id} = item;
  return (
    <SensorRow>
      <SensorButton onPress={() => connect(item)}>
        <Text>{id}</Text>
        <Entypo name="arrow-bold-right" size={16} style={{color: 'black'}} />
      </SensorButton>
      <Icon onPress={() => turnOnDiode(item)}>
        <Entypo name="light-bulb" size={20} style={{color: 'black'}} />
      </Icon>
      <Icon onPress={() => disconectPeripheral(item)}>
        <AntDesign name="delete" size={20} style={{color: 'black'}} />
      </Icon>
    </SensorRow>
  );
};

export default AvailableSensor;
