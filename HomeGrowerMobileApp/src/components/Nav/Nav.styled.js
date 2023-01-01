import styled from 'styled-components';
import Entypo from 'react-native-vector-icons/Entypo';
import {h6} from '../../styles/typography.styled';

export const NavContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #2fa84e;
`;

export const IconContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const Icon = styled(Entypo)`
  font-size: 25px;
  color: #fff;
  ${({active}) => active && 'color: #344E41'};
`;

export const RoutName = styled.Text`
  ${h6};
  color: #fff;
  ${({active}) => active && 'color: #344E41'};
`;
