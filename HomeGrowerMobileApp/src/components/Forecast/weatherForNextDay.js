import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {styles} from '../../Styles';

export const WeatherForNextDay = ({item, week, id, forecast}) => {
  return (
    <DayContainer>
      <DateContainer>
        <WeekDay>{week[id]}</WeekDay>
      </DateContainer>
      <IconTempView>
        <WeatherIcon
          source={{uri: `${forecast[id][0]}`}}
          style={{width: 48, height: 24}}
        />
        <Text style={styles.weatherText}>{forecast[id][3]}</Text>
      </IconTempView>
      {forecast[id][1].substring(forecast[id][1].length - 3) == '—°C' ? (
        <DegreeView>
          <Degree>
            <Text>Max.</Text>

            <Text style={styles.weatherText}>{forecast[id][1]}</Text>
          </Degree>
          <Degree>
            <Text>Min.</Text>
            <Text style={styles.weatherText}>{forecast[id][2]}</Text>
          </Degree>
        </DegreeView>
      ) : forecast[id][1].substring(forecast[id][1].length - 3) == '—°F' ? (
        <DegreeView>
          <Degree>
            <Text>Max.</Text>

            <Text style={styles.weatherText}>{forecast[id][1]}</Text>
          </Degree>
          <Degree>
            <Text>Min.</Text>
            <Text style={styles.weatherText}>{forecast[id][2]}</Text>
          </Degree>
        </DegreeView>
      ) : forecast[id][1].substring(forecast[id][1].length - 2) == '°F' ? (
        <DegreeView>
          <Degree>
            <Text>Max.</Text>

            <Text style={styles.weatherText}>
              {Math.round(parseFloat(forecast[id][1]))} °F
            </Text>
          </Degree>
          <Degree>
            <Text>Min.</Text>
            <Text style={styles.weatherText}>
              {Math.round(parseFloat(forecast[id][2]))} °F
            </Text>
          </Degree>
        </DegreeView>
      ) : (
        <DegreeView>
          <Degree>
            <Text>Max.</Text>

            <Text style={styles.weatherText}>
              {Math.round(parseFloat(forecast[id][2]))} °C
            </Text>
          </Degree>
          <Degree>
            <Text>Min.</Text>
            <Text style={styles.weatherText}>
              {Math.round(parseFloat(forecast[id][2]))} °C
            </Text>
          </Degree>
        </DegreeView>
      )}
    </DayContainer>
  );
};

const DayContainer = styled.View`
  padding: 10px;
  background-color: rgba(47, 168, 78, 0.9);
  border-radius: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 95%;
  max-width: 478px;
`;

const DateContainer = styled.View`
  text-align: right;
  flex: 1;
  color: white;
`;

const WeekDay = styled.Text`
  font-size: 24px;
  text-align: center;
  marging-left: 20px;
  color: white;
`;

const IconTempView = styled.View`
  text-align: center;
  display: flex;
  margin-left: 5%;
  flex-direction: row;
  align-items: center;
  text-align: left;
  flex: 2;
  color: white;
`;

const WeatherIcon = styled.Image`
  width: 48px;
  height: 20px;
  color: white;
`;

const DegreeView = styled.View`
  text-align: center;
  flex: 1;
  color: white;
`;

const Degree = styled.Text`
  font-size: 14px;
  color: white;
`;

export default WeatherForNextDay;
