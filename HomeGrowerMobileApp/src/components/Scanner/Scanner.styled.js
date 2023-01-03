import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export const ReturnButton = styled.TouchableOpacity`
  background-color: #a3b18a;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 300px;
`;

export const ButtonBox = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 1px;
  margin-right: auto;
  margin-left: auto;
  position: absolute;
  left: 50%;
  right: 50%;
  bottom: 10%;
`;

export const ScannerContainer = styled.View`
  flex: 1;
`;
