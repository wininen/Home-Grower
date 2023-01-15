import React from 'react';
import {Text, View} from 'react-native';
import {
  DataRow,
  isValueInRangeStyle,
  NameRow,
  PropertiesRow,
  Separator,
} from './MyPlants.styled.js';

export const PlantsDataRow = ({title, value, parameters}) => {
  return (
    <View>
      <PropertiesRow>
        <NameRow>
          <Text> {title} </Text>
        </NameRow>
        <DataRow>
          <Text style={isValueInRangeStyle(20, 25, value)}>{value}</Text>
        </DataRow>
      </PropertiesRow>
      <Separator />
    </View>
  );
};

export default PlantsDataRow;
