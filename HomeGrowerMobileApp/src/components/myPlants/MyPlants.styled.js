import styled from 'styled-components/native';

export const PlantsContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0;
  margin: 0;
`;

export const PlantsElement = styled.TouchableOpacity`
  background-color: rgba(47, 168, 78, 0.8);
`;

export const StyledImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 20px;
`;

export const PlantsAfterElement = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonBox = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 1px;
  margin-left: 340px;
  margin-top: auto;
  bottom: 30px;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: #2fa84e;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100px;
  margin-top: -5px;
`;

export const ModalList = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 150px;
`;
