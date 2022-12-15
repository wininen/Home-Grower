import styled from 'styled-components';

export const SensorButton = styled.TouchableOpacity`
  margin: 0 auto;
  background-color: #edebe6;
  border-top-right-radius: 300px;
  border-bottom-right-radius: 300px;
  align-items: center;
  justify-content: center;
  width: 60%;
  flex-direction: row;
  padding: 10px 0;
  justify-content: space-evenly;
`;

export const SensorRow = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px;
`;
