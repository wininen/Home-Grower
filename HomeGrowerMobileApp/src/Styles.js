import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  body: {
    fontFamily: 'Roboto',
    color: 'white',
  },
  bold_black: {
    fontWeight: 'bold',
  },
  bold_white: {
    fontWeight: 'bold',
    color: 'white',
  },
  h2: {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '700',
    color: '#000',
  },
  h3: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
    color: '#000',
  },
  h4: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
    color: '#000',
  },
  h5: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: '#000',
  },
  h6: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: '#000',
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
  gapForTr: {
    marginRight: 10,
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
  z-index: 1001;
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
  width: 100%;
  height: 1016px;
  z-index: 1000;
  margin: 0;
  padding: 20px 20px 20px 20px;
`;

export const ForecastOptions = styled.View`
  height: 24px;
  display: flex;
  flex-direction: row;
`;

export const ForecastMain = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ForecastTable = styled.View`
  padding: 10px 20px;
  margin-top: 20%;
  width: 70%;
  height: 60%;
  background: rgba(33, 33, 33, 0.08);
  display: flex;
  flex-direction: column;
`;

export const ForecastTr = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  align-items: center;
`;

export const ForecastTd = styled.View`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

export const Separator = styled.View`
  border-color: #CCCCCC;
  border-width: 1px;
  width: 100%;
  padding: 0;
  display: flex;
`;


