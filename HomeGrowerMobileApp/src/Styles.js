import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
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
    fontSize: 32,
    lineHeight: 36,
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
  h3_but_green: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '700',
    color: '#2fa84e',
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
    // marginTop: 20,
    display: 'flex',
    border: '1px solid green',
    // justifyContent: 'space-around',
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
    right: 5,
  },
  gapForMenu: {
    marginRight: 10,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  sensorTitle: {
    textAlign: 'center',
    color: '#588157',
    fontSize: 20,
    fontWeight: '400',
  },
});

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
  //do przeniesienia do sobnych plikow
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
  background-color: #2fa84e;
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
  z-index: 1000;
  margin: 0;
  padding: 0 20px 20px 20px;
`;

export const ForecastOptions = styled.View`
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const ForecastMain = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ForecastTable = styled.View`
  padding: 5px 0;
  margin-top: 15%;
  width: 70%;
  background: rgba(33, 33, 33, 0.08);
  display: flex;
  flex-direction: column;
`;

export const ForecastTr = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 20px;
  align-items: center;
`;

export const ForecastTd = styled.View`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

export const ProfileName = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
`;

export const ProfileOptions = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 0;
`;

export const ProfileRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  justify-content: space-between;
`;

export const RightRow = styled.View`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: flex-end;
  flex-direction: row;
`;

export const LeftRow = styled.View`
  width: 50%;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const Separator = styled.View`
  border-color: #cccccc;
  border-width: 1px;
  width: 100%;
  padding: 0;
  display: flex;
`;
