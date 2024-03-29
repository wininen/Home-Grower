import {green100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import styled from 'styled-components/native';

export const PropertiesContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0;
  margin: 0;
`;

export const PropertiesRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 20px;
  justify-content: space-between;
`;

export const Separator = styled.View`
  border-color: #cccccc;
  border-width: 1px;
  width: 100%;
  padding: 0;
  display: flex;
`;

export const DataRow = styled.View`
  display: flex;
  align-items: center;
  width: 50%;
  padding-right: 10px;
  justify-content: flex-end;
  flex-direction: row;
`;

export const NameRow = styled.View`
  display: flex;
  align-items: center;
  width: 50%;
  padding-left: 10px;
  justify-content: flex-start;
  flex-direction: row;
`;

export const SpecsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const ConnectToPlantButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #2fa84e;
  border-radius: 25px;
  height: 40px;
  width: 150px;
  margin: 0 auto;
`;

export const FirstRowButtonWrapper = styled.View`
  /* padding-right: 50px;
  padding-left: 50px; */
  margin-left: 20px;
  margin-right: 20px;
  align-items: center;
  flex-direction: row;
  /* justify-content: flex-start; */
  justify-content: space-between;
`;

export const Icon = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const ScrollableList = styled.ScrollView`
  flex: 1;
`;

export const SensorsList = styled.View`
  flex: 1;
  display: flex;
  height: 300px;
  width: 200px;
`;

export const isValueInRangeStyle = function (leftBorder, rightBorder, value) {
  if (value >= leftBorder && value <= rightBorder) {
    return {
      color: 'green',
    };
  } else {
    return {
      color: 'red',
    };
  }
};
