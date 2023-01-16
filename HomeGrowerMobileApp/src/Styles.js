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
  plantsList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
  },
  shadow: {
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 20,
    margin: 10,
    width: 220,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  modalContent: {
    flex: 1,
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modalText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
  },
  camera: {
    position: 'relative',
    alignItems: 'center',
    padding: 30,
  },
});

export const OuterContainer = styled.View`
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding: 0;
  margin: 0;
`;

export const ButtonsWrapper = styled.View`
  padding-top: 30px;
  padding-right: 25px;
  padding-left: 25px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonContainer = styled.View`
  margin-bottom: 30px;
  display: flex;
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: #2fa84e;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 150px;
`;

export const ButtonPlant = styled.TouchableOpacity`
  background-color: #2fa84e;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  height: 40px;
  width: 150px;
`;
