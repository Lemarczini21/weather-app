import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';

const WeatherBox = () => {
  const [weather, setWeather] = useState('');
  const handleCityChange = useCallback((city) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a5f4bbdfa0f691f992602378a0ee5da&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main,
        };

        setWeather(weatherData);
      });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary data={weather} />
      <Loader />
    </section>
  );
};

export default WeatherBox;
