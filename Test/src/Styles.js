import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  data_table: {
    marginTop: 20,
    display: 'flex',
    // justifyContent: 'space-around',
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 30,
    margin: 1,
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  id: {
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export const Title = styled.Text`
  font-size: 14px;
  text-align: center;
  color: white;
  font-family: Roboto;
  font-weight: 700;
  letter-spacing: -0.25px;
  line-height: 22px;
  left: 54px;
`;

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  height: 56px;
  width: 100%;
  padding: 16px;
  background: #2fa84e;
`;

export const SensorContainer = styled.View`
  height: 100%;
  width: 100%;
  background-color: '#fff';
  padding: 0;
  margin: 0;
`;

export const ButtonsWrapper = styled.View`
  padding-top: 30px;
`;

export const ButtonContainer = styled.View`
  margin-bottom: 30px;
`;

export const StyledButton = styled.Button``;
