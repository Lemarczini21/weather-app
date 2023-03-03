import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback } from 'react';
import { useState } from 'react';

const WeatherBox = () => {
  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const handleCityChange = useCallback((city) => {
    setPending(true);
    setError(false);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a5f4bbdfa0f691f992602378a0ee5da&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          setPending(false);
          setWeather(weatherData);
        });
      } else {
        setError(true);
      }
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && !pending && <WeatherSummary data={weather} />}
      {pending && !error && <Loader />}
      {error && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
