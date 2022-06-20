import { StyleSheet } from 'react-native';
import styled from 'styled-components/native'

export const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 0,
      margin: 0,
      paddingTop: Platform.OS === "android" ? 300 : 0,
      paddingBottom: Platform.OS === "android" ? 300 : 0,
      alignItems: 'center',
      alignContent: 'space-between'
    },
    data_table: {
      marginTop: 20
    },
    item: {
      backgroundColor: 'pink',
      padding: 30,
      margin: 1,
      fontSize: 24,
      borderWidth: 1,
      borderColor: "#a83264",
      borderRadius: 10
    },
    id: {
        fontSize: 12,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
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
    padding: 16px;
    background: #2FA84E;
    position: absolute;
    height: 56px;
    left: 0px;
    right: 0px; 
    top: 44px;
  `;
