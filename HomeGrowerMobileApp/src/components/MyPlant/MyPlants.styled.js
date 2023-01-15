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
  padding: 30px 20px;
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
  padding: 30px;
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
