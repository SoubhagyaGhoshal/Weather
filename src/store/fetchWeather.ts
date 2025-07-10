import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtendedForecastData, WeatherData } from '../api/types';
import { fetchExtendedForecastData, fetchWeatherData } from '../api/weather';
import { getNextSevenDays } from '../utils/dateUtils';
import { kelvinToCelcius } from '../utils/unitConversion';
import { setIsInitial, setIsLoading } from './reducers/appReducer';

// Async thunk to fetch current + forecast weather data
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string | { lat: number; lng: number }, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));

    try {
      const res = await Promise.all([fetchWeatherData(city), fetchExtendedForecastData(city)]);
      dispatch(setIsLoading(false));

      if (res[0].cod === 200) {
        dispatch(setIsInitial(false));
        return res;
      }

      return rejectWithValue(res[0].message);
    } catch (err) {
      dispatch(setIsLoading(false));
      return rejectWithValue('Error fetching weather data');
    }
  }
);

// Transform API responses into app-consumable data
export const transformWeatherData = (
  res: any
): {
  weather: WeatherData;
  forecast: ExtendedForecastData[];
} => {
  const weather = res[0] as WeatherData;
  const rawForecast = res[1];

  const forecast: ExtendedForecastData[] = [];

  // --- Current weather transform ---
  weather.weather = res[0].weather[0];
  weather.main = {
    ...weather.main,
    temp: kelvinToCelcius(weather.main.temp),
    feels_like: kelvinToCelcius(weather.main.feels_like),
    temp_max: kelvinToCelcius(weather.main.temp_max),
    temp_min: kelvinToCelcius(weather.main.temp_min),
  };
  weather.wind.speed = Math.round(weather.wind.speed * 3.6);

  // --- Forecast transform (3-hour intervals into daily summary) ---
  const groupedByDate: { [date: string]: any[] } = {};
  rawForecast.list?.forEach((entry: any) => {
    const date = entry.dt_txt.split(" ")[0];
    if (!groupedByDate[date]) groupedByDate[date] = [];
    groupedByDate[date].push(entry);
  });

  const next7Days = getNextSevenDays();
  const forecastDates = Object.keys(groupedByDate).slice(0, 7);

  forecastDates.forEach((date, idx) => {
    const dayEntries = groupedByDate[date];
    const temps = dayEntries.map((d) => d.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    // Determine most frequent weather condition
    const weatherCount: { [main: string]: number } = {};
    dayEntries.forEach((d) => {
      const main = d.weather[0].main;
      weatherCount[main] = (weatherCount[main] || 0) + 1;
    });

    const mainWeather = Object.entries(weatherCount).sort((a, b) => b[1] - a[1])[0][0];
    const mainWeatherObj = dayEntries.find((d) => d.weather[0].main === mainWeather)?.weather[0];

    forecast.push({
      day: next7Days[idx],
      temp: {
        temp_max: kelvinToCelcius(maxTemp),
        temp_min: kelvinToCelcius(minTemp),
      },
      weather: {
        id: mainWeatherObj?.id || 800,
        main: mainWeatherObj?.main || "Clear",
      },
    });
  });

  return {
    weather,
    forecast,
  };
};
