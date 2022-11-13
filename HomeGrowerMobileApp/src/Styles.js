import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  body: {
    fontFamily: 'Roboto',
    color: 'white',
  },
  bold: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  whiteBold: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: 'white',
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

export const InnerContainerExtended = styled.View`
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 100%;
  height: 128px;
  padding: 0 20px;
  background: #2fa84e;
  top: 64px;
  z-index: 1000;
`;

export const InnerContainerExtendedList = styled.TouchableOpacity`
  display: flex;
  height: 64px;
  justify-content: center;
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
  overflow-y: scroll;
`;

export const PlantsElement = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
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
  left: 15px;
`;

export const ForecastView = styled.SafeAreaView`
  width: 675px;
  height: 1016px;
  z-index: 1000;
  margin: 0;
  padding: 20px 20px 20px 20px;
`;

export const ForecastOptions = styled.View`
  width: 100%;
  height: 24px;
  display: flex;
  flex-direction: row;
`;

export const Separator = styled.View`
  border-color: #CCCCCC;
  border-width: 1px;
  width: 100%;
  padding: 0;
  display: flex;
`;


