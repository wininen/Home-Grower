import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  body: {
    fontFamily: 'Roboto',
    color: 'white',
  },
  bold: {
    fontWeight: 'bold',
  },
  separator: {
    borderBottomColor: '#000',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
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
  font-weight: 700;
  letter-spacing: -0.25px;
  line-height: 22px;
  left: 54px;
`;

export const InnerContainer = styled.View`
  display: flex;
  flex-direction: row;
  height: 64px;
  width: 100%;
  padding: 20px 20px 20px 20px;
  background: #2fa84e;
`;

export const OuterContainer = styled.View`
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding: 0;
  margin: 0;
`;


export const ButtonsWrapper = styled.View`
  padding-top: 30px;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  margin-bottom: 30px;
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: #2FA84E;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 150px;
`;

export const PlantsList = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 11px 0px 15px;
  gap: 10px;
  overflow-y: scroll;
`;

export const PlantsElement = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1px 16px;
  gap: 110px;
`;


export const StyledImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const PlantsAfterElement = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

export const PlantsFamily = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 1px;
  left: 15px;
`;


