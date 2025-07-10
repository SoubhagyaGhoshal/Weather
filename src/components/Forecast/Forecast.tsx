import React from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../../store/store';
import ForecastItem from './ForecastItem'; // ✅ keep just one
import { ForecastContainer, ForecastItems, SectionTitle } from './styled';


const Forecast: React.FC = () => {
  const forecast = useSelector((state: AppStore) => state.weather.extendedWeatherData);
  const isInitial = useSelector((state: AppStore) => state.app.isInitial);

  if (isInitial) return null;
  if (!forecast || forecast.length === 0) return <p>No forecast data available.</p>;

  return (
    <ForecastContainer>
      <SectionTitle>Extended Forecast</SectionTitle>
      <ForecastItems>
        {forecast.map((item, i) => (
          <ForecastItem
            key={i}
            day={item.day}
            high={item.temp.temp_max}
            low={item.temp.temp_min}
            weatherCode={item.weather.id}
            main={item.weather.main}
          />
        ))}
      </ForecastItems>
    </ForecastContainer>
  );
};

export default Forecast;
