import {fetchGetJson} from './network';

const hourlyForecastUrl = 'https://api.openweathermap.org/data/2.5/onecall';
const appid = '1b9f2849cae2a1ce0ad21ae62d00d449';


const parseHourlyForecastData = (hourlyForecastData) => {
  const hourlyForecastArray = [];
  let currentWeatherObject = {
    'time': formatHourMins(hourlyForecastData.current.dt),
    'temp': hourlyForecastData.current.temp,
    'icon': `http://openweathermap.org/img/wn/${hourlyForecastData.current.weather[0].icon}.png`,
  };
  for (const hourlyWeather of hourlyForecastData.hourly) {
    let hourlyWeatherObject = {
      'time': formatHourMins(hourlyWeather.dt),
      'temp': hourlyWeather.temp,
      'icon': `http://openweathermap.org/img/wn/${hourlyWeather.weather[0].icon}.png`,
    };

    hourlyForecastArray.push(hourlyWeatherObject);
  }
  return {
    currentWeather: currentWeatherObject,
    weatherForecast: hourlyForecastArray,
  };
};


const getHourlyWeather = async (lat, lon, lang) => {
  let hourlyForecastData;
  try {
    hourlyForecastData = await fetchGetJson(
      `${hourlyForecastUrl}?lat=${60.2242353}&lon=${24.7560935}&exclude=minutely,daily,alerts&units=metric&lang=${1}&appid=${appid}`);
  }
  catch (error) {
    throw new Error(error.message);
  }
  let parsedForecast = await parseHourlyForecastData(hourlyForecastData);
  return parsedForecast;
};

const formatHourMins = (unixtime) =>{
  let currentDate = new Date(unixtime*1000);
  let hours = currentDate.getHours();
  return `${hours}:00`;
};


const SaaData = {getHourlyWeather};
export default SaaData;
