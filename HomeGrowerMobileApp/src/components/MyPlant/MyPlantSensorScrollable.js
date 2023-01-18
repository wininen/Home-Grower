import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {SensorButton, SensorRow, Icon} from './MyPlantSensorScrollable.styled';

export const ConnectedSensor = ({item, connect}) => {
  const {id} = item;
  console.log('collected sensors');
  console.log(id);
  return (
    <SensorRow>
      <SensorButton onPress={() => connect(item)}>
        <Text>{id}</Text>
      </SensorButton>
    </SensorRow>
  );
};

export default ConnectedSensor;
