import React, {
    useState,
    useEffect,
} from 'react';

import {
    axios,
} from 'axios'

import {
    getWeather,
    savedWeather,
    getCity,
    savedCity,
} from './Forecast.js'

const API_KEY = '9d3b0897994554a14149d179a9a65217';

const url_city = "https://api.openweathermap.org/geo/1.0";
const url_forecast = "https://api.openweathermap.org/data/2.5"

const callForecastAPI = axios.create({
    baseURL: url_forecast,
    timeout: 10000,
});

const callCityAPI = axios.create({
    baseURL: url_city,
    timeout: 10000,
});

const localisation = async () => {
    const [latLon, setLatLon] = useState(null);
    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                setLatLon([position.coords.latitude], [position.coords.longitude]);
            },
            (err) => {
                console.log(err);
            });
    }, []);

    return latLon;
};

const useWeather = async () => {
    const [weather, setWeather] = useState(null);

    const latLon = localisation();

    useEffect(() => {
        if (latLon) {
            fetchAPI(...latLon);
        }
    }, [latLon]);

    const fetchAPI = async (lat, lon) => {
        try {
            const endpoint = `/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
            const res = await callForecastAPI.get(endpoint, {timeout: 10000});
            const data = await savedWeather(filterWeather(res.data));
        setWeather(data);
        } catch (err) {
        console.log("API conection failed");
        const data = await getWeather();
        setWeather(data);
        }
    };
        
    const filterWeather = (rawData) => {
        return {
            weather: rawData.weather.main,
            temp_min: rawData.main.temp_min,
            temp_max: rawData.main.temp_max,
        };
    };

    return weather;
  };


const useCity = async () => {
    const [city, setCity] = useState(null);

    const latLon = localisation();

    useEffect(() => {
        if (latLon) {
            fetchAPI(...latLon);
        }
    }, [latLon]);

    const fetchAPI = async (lat, lon) => {
        try {
            const endpoint = `/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
            const res = await callCityAPI.get(endpoint, {timeout: 10000});
            const data = await savedCity(filterCity(res.data));
        setCity(data);
        } catch (err) {
        console.log("API conection failed");
        const data = await getCity();
        setCity(data);
        }
    };
        
    const filterCity = (rawData) => {
        return {
            city: rawData.name,
        };
    };

    return city;
};