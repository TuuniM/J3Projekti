import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';
import {setModalControls} from './modules/modal';
import './styles/style.scss';
import './styles/mobile.scss';
import './styles/widescreen.scss';
import HSLData from './modules/hsl-data';
import SaaData from './modules/saa-data';



const today = new Date().toISOString().split('T')[0];
let languageSetting = 'fi';

// TODO: Load from local storage if exists or use default:
const userSettings = {
  colorTheme: 'dark',
  //move lang setting here
};

// TODO: updateUserSettings function
// - refresh page (e.g. use DOM manipulation to change class names)
// - save settings object to local storage

const restaurants = [{
  displayName: 'Myyrmäen Sodexo',
  name: 'sodexo-myyrmaki',
  id: 152,
  type: SodexoData
}, {
  displayName: 'Karaportin Fazer',
  name: 'fazer-kp',
//  id: 270540, karaportti
  //testataan toista ravintolaa
  id: 244046,
  type: FazerData
}];

// adding a restaurant
// restaurants.push(
//   {
//     displayName: 'Arabian Sodexo',
//     name: 'sodexo-arabia',
//     id: 999,
//     type: SodexoData
//   }
// );

/**
 * Displays lunch menu items as html list
 *
 * @param {Array} menuData - Lunch menu array
 * @param {string} restaurant - element target id
 */
const renderMenu = (menuData, restaurant) => {
  const restaurantDiv = document.querySelector('#' + restaurant);
  restaurantDiv.innerHTML = '';
  const ul = document.createElement('ul');
  for (const item of menuData) {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    ul.appendChild(listItem);
  }
  restaurantDiv.appendChild(ul);
};

/**
 * Displays a notification message instead of dishes
 * when menu data is not available
 *
 * @param {string} message
 * @param {string} restaurant
 */
const renderNoDataNotification = (message, restaurant) => {
  const restaurantDiv = document.querySelector('#' + restaurant);
  restaurantDiv.innerHTML = `<p>${message}</p>`;
};

/**
 * Switches application language between en/fi
 * and updates menu data
 */
const switchLanguage = () => {
  if (languageSetting === 'fi') {
    languageSetting = 'en';
  } else {
    languageSetting = 'fi';
  }
  console.log('language changed to: ', languageSetting);
  loadAllMenuData();
};

/**
 * Load data for all restaurant boxes
 * @async
 */
const loadAllMenuData = async () => {
  for (const restaurant of restaurants) {
    try {
      const parsedMenu = await restaurant.type.getDailyMenu(restaurant.id, languageSetting, today);
      renderMenu(parsedMenu, restaurant.name);
    } catch (error) {
      console.error(error);
      // notify user if errors with data
      renderNoDataNotification('No data available..', restaurant.name);
    }
  }
};


const loadHSLData = async () => {
  const result = await HSLData.getRidesByStopId(2132208);
  const stop = result.data.stop;
  console.log('loadHSLData', stop);
  const stopElement = document.createElement('div');
  const pysakki = document.createElement('div');
  pysakki.innerHTML = `<h4>Pysäkki ${stop.name}</h4><ul>`;
  for (const ride of stop.stoptimesWithoutPatterns) {
    stopElement.innerHTML += `<li><i class="fas fa-bus" id="bus"></i>  <b>${ride.trip.routeShortName}</b>
      ${ride.trip.tripHeadsign}
      ${HSLData.formatTime(ride.scheduledDeparture)}</li>`;
  }
  stopElement.innerHTML += `</ul>`;
  document.querySelector('.hsl-data').appendChild(stopElement);
  document.querySelector('#stop1').appendChild(pysakki);

  const result1 = await HSLData.getRidesByStopId(2132207);
  const stop1 = result1.data.stop;
  console.log('loadHSLData', stop1);
  const stopElement1 = document.createElement('div');
  const pysakki2 = document.createElement('div');
  pysakki2.innerHTML = `<h4>Pysäkki ${stop1.name}</h4><ul>`;
  for (const ride of stop1.stoptimesWithoutPatterns) {
    stopElement1.innerHTML += `<li><i class="fas fa-bus" id="bus"></i>  <b>${ride.trip.routeShortName}</b>
      ${ride.trip.tripHeadsign}
      ${HSLData.formatTime(ride.scheduledDeparture)}</li>`;
  }
  stopElement1.innerHTML += `</ul>`;
  document.querySelector('.hsl-data2').appendChild(stopElement1);
  document.querySelector('#stop2').appendChild(pysakki2);

  const result2 = await HSLData.getRidesByStopId(2132226);
  const stop2 = result2.data.stop;
  console.log('loadHSLData', stop2);
  const stopElement2 = document.createElement('div');
  const pysakki3 = document.createElement('div');
  pysakki3.innerHTML = `<h4>Pysäkki ${stop2.name}</h4><ul>`;
  for (const ride of stop2.stoptimesWithoutPatterns) {
    stopElement2.innerHTML += `<li><i class="fas fa-bus" id="bus"></i>  <b>${ride.trip.routeShortName}</b>
      ${ride.trip.tripHeadsign}
      ${HSLData.formatTime(ride.scheduledDeparture)}</li>`;
  }
  stopElement2.innerHTML += `</ul>`;
  document.querySelector('.hsl-data3').appendChild(stopElement2);
  document.querySelector('#stop3').appendChild(pysakki3);

  const result3 = await HSLData.getRidesByStopId(2132225);
  const stop3 = result3.data.stop;
  console.log('loadHSLData', stop3);
  const stopElement3 = document.createElement('div');
  const pysakki4 = document.createElement('div');
  pysakki4.innerHTML = `<h4>Pysäkki ${stop3.name}</h4><ul>`;
  for (const ride of stop3.stoptimesWithoutPatterns) {
    stopElement3.innerHTML += `<li><i class="fas fa-bus" id="bus"></i>  <b>${ride.trip.routeShortName}</b>
      ${ride.trip.tripHeadsign}
      ${HSLData.formatTime(ride.scheduledDeparture)}</li>`;
  }
  stopElement3.innerHTML += `</ul>`;
  document.querySelector('.hsl-data4').appendChild(stopElement3);
  document.querySelector('#stop4').appendChild(pysakki4);

  const result4 = await HSLData.getRidesByStopId(2133225);
  const stop4 = result4.data.stop;
  console.log('loadHSLData', stop4);
  const stopElement4 = document.createElement('div');
  const pysakki5 = document.createElement('div');
  pysakki5.innerHTML = `<h4>Pysäkki ${stop4.name}</h4><ul>`;
  for (const ride of stop4.stoptimesWithoutPatterns) {
    stopElement4.innerHTML += `<li><i class="fas fa-bus" id="bus"></i>  <b>${ride.trip.routeShortName}</b>
      ${ride.trip.tripHeadsign}
      ${HSLData.formatTime(ride.scheduledDeparture)}</li>`;
  }
  stopElement4.innerHTML += `</ul>`;
  document.querySelector('.hsl-data5').appendChild(stopElement4);
  document.querySelector('#stop5').appendChild(pysakki5);

  const result5 = await HSLData.getRidesByStopId(2132552);
  const stop5 = result5.data.stop;
  console.log('loadHSLData', stop5);
  const stopElement5 = document.createElement('div');
  const pysakki6 = document.createElement('div');
  pysakki6.innerHTML = `<h4>Pysäkki ${stop5.name}</h4><ul>`;
  for (const ride of stop5.stoptimesWithoutPatterns) {
    stopElement5.innerHTML += `<li><i class="fas fa-subway" id="train"></i>  <b>${ride.trip.routeShortName}</b>
      ${ride.trip.tripHeadsign}
      ${HSLData.formatTime(ride.scheduledDeparture)}</li>`;
  }
  stopElement5.innerHTML += `</ul>`;
  document.querySelector('.hsl-data6').appendChild(stopElement5);
  document.querySelector('#stop6').appendChild(pysakki6);
};

const loadWeatherData = async (lat, lon) => {
  try {
    const weather = await SaaData.getHourlyWeather(lat, lon,
      'fi');
    renderWeatherData(weather);
  } catch (error) {
    console.log(error.message);

  }
};

const renderWeatherData = (weatherObject) => {

  const weathernow = document.createElement('div');

  for (let hour = 0; hour < 1; hour++) {
    weathernow.innerHTML += `<li><h1 id="saanyt"><img src=${weatherObject.weatherForecast[hour].icon} width="150px" height="150px">
     ${weatherObject.weatherForecast[hour].temp.toFixed(0)}\u00B0C</h1></li>`;
  }
  document.querySelector('#weathernow').appendChild(weathernow);

  const weathersoon = document.createElement('div');

  for (let hour = 1; hour < 6; hour++) {
    weathersoon.innerHTML += `<li><h4 id="tulevasaa"><img src=${weatherObject.weatherForecast[hour].icon}>
     ${weatherObject.weatherForecast[hour].time}
     ${weatherObject.weatherForecast[hour].temp.toFixed(0)}\u00B0C</h4></li>`;
  }
  document.querySelector('#weather-list').appendChild(weathersoon);

  const weatherfuture = document.createElement('div');

  for (let hour = 24; hour < 25; hour++) {
    weatherfuture.innerHTML += `<li><h4 id="huomisetsaat">
     ${weatherObject.weatherForecast[hour].temp.toFixed(0)}\u00B0C</h4></li>`;
  }
  document.querySelector('#weatherfuture').appendChild(weatherfuture);

  const weatherfuture2 = document.createElement('div');

  for (let hour = 47; hour < 48; hour++) {
    weatherfuture2.innerHTML += `<li><h4 id="lisaasaata">
     ${weatherObject.weatherForecast[hour].temp.toFixed(0)}\u00B0C</h4></li>`;
  }
  document.querySelector('#weatherfuture2').appendChild(weatherfuture2);

};

/**
 * Registers the service worker (SW) generated by Workbox
 */
const registerServiceWorkers = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
};

/**
 * App initialization
 */
const init = () => {
  document.querySelector('#switch-lang').addEventListener('click', switchLanguage);
  loadAllMenuData();
  loadHSLData();
  setModalControls();
  loadWeatherData();
  // Service workers registeration below disabled temporarily for easier local development
  // must be uncommented from init() before building for "production"
  //registerServiceWorkers();
};
init();
