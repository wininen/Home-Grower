import styled from 'styled-components/native';

export const OuterContainer = styled.View`
  //do przeniesienia do sobnych plikow
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding: 0;
  margin: 0;
`;

export const LeftRow = styled.View`
  width: 50%;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const RightRow = styled.View`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: flex-end;
  flex-direction: row;
`;

export const Separator = styled.View`
  border-color: #cccccc;
  border-width: 1px;
  width: 100%;
  padding: 0;
  display: flex;
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
