import styled from 'styled-components/native';

export const OuterContainer = styled.View`
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding: 0;
  margin: 0;
`;

export const ForecastView = styled.SafeAreaView`
  z-index: 1000;
  margin: 0;
  padding: 40px 20px 20px 20px;
`;

export const ForecastOptions = styled.View`
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const ForecastMain = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 30px 0;
`;

export const ForecastTable = styled.View`
  padding: 5px 0;
  margin-top: 15%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ForecastTr = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 20px;
  align-items: center;
`;

export const ForecastTd = styled.View`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

export const Separator = styled.View`
  border-color: #6f7c75;
  border-width: 1px;
  width: 100%;
  padding: 0;
  display: flex;
`;

export const InputBox = styled.View`
  border: 2px solid #2fa84e;
  margin-bottom: 10px;
  width: 200px;
  border-radius: 20px;
`;
