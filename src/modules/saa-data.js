import {fetchGetJson} from './network';

const Weather = async () => {
  let CallForecastData;
  try {
    CallForecastData = await fetchGetJson(
      `https://api.openweathermap.org/data/2.5/onecall?lat=60.2242353&lon=24.7560935&exclude=minutely,daily,alerts&units=metric&lang=1&appid=1b9f2849cae2a1ce0ad21ae62d00d449`);
  }
  catch (error) {
    throw new Error(error.message);
  }
  let CalledForecast = await parseForecast(CallForecastData);
  return CalledForecast;
};

const hourweather = (unixtime) =>{
  let Day = new Date(unixtime*1000);
  let hours = Day.getHours();
  return `${hours}:00`;
};

const parseForecast = (ForecastData) => {

  const Array = [];
  for (const hour of ForecastData.hourly) {
    let hourlyWeather = {
      'time': hourweather(hour.dt),
      'temp': hour.temp,
      'icon': `http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`,
    };
    Array.push(hourlyWeather);
  }
  return {
    weatherForecast: Array,
  };
};


const SaaData = {Weather};
export default SaaData;
