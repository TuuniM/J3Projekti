import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';
import {setModalControls} from './modules/modal';
import './styles/style.scss';
import './styles/mobile.scss';
import './styles/widescreen.scss';
import HSLData from './modules/hsl-data';

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
  stopElement.innerHTML = `<h3>Seuraavat vuorot pysäkiltä ${stop.name}</h3><ul>`;
  for (const ride of stop.stoptimesWithoutPatterns) {
    stopElement.innerHTML += `<li>${ride.trip.routeShortName},
      ${ride.trip.tripHeadsign},
      ${HSLData.formatTime(ride.scheduledDeparture)}</li>`;
  }
  stopElement.innerHTML += `</ul>`;
  document.querySelector('.hsl-data').appendChild(stopElement);

  const result1 = await HSLData.getRidesByStopId(2132207);
  const stop1 = result1.data.stop;
  console.log('loadHSLData', stop1);
  const stopElement1 = document.createElement('div');
  stopElement1.innerHTML = `<h3>Seuraavat vuorot pysäkiltä ${stop1.name}</h3><ul>`;
  for (const ride of stop1.stoptimesWithoutPatterns) {
    stopElement1.innerHTML += `<li>${ride.trip.routeShortName},
      ${ride.trip.tripHeadsign},
      ${HSLData.formatTime(ride.scheduledDeparture)}</li>`;
  }
  stopElement1.innerHTML += `</ul>`;
  document.querySelector('.hsl-data').appendChild(stopElement1);

  const result2 = await HSLData.getRidesByStopId(2132226);
  const stop2 = result2.data.stop;
  console.log('loadHSLData', stop2);
  const stopElement2 = document.createElement('div');
  stopElement2.innerHTML = `<h3>Seuraavat vuorot pysäkiltä ${stop2.name}</h3><ul>`;
  for (const ride of stop2.stoptimesWithoutPatterns) {
    stopElement2.innerHTML += `<li>${ride.trip.routeShortName},
      ${ride.trip.tripHeadsign},
      ${HSLData.formatTime(ride.scheduledDeparture)}</li>`;
  }
  stopElement2.innerHTML += `</ul>`;
  document.querySelector('.hsl-data').appendChild(stopElement2);

  const result3 = await HSLData.getRidesByStopId(2132225);
  const stop3 = result3.data.stop;
  console.log('loadHSLData', stop3);
  const stopElement3 = document.createElement('div');
  stopElement3.innerHTML = `<h3>Seuraavat vuorot pysäkiltä ${stop3.name}</h3><ul>`;
  for (const ride of stop3.stoptimesWithoutPatterns) {
    stopElement3.innerHTML += `<li>${ride.trip.routeShortName},
      ${ride.trip.tripHeadsign},
      ${HSLData.formatTime(ride.scheduledDeparture)}</li>`;
  }
  stopElement3.innerHTML += `</ul>`;
  document.querySelector('.hsl-data').appendChild(stopElement3);

  const result4 = await HSLData.getRidesByStopId(2133225);
  const stop4 = result4.data.stop;
  console.log('loadHSLData', stop4);
  const stopElement4 = document.createElement('div');
  stopElement4.innerHTML = `<h3>Seuraavat vuorot pysäkiltä ${stop4.name}</h3><ul>`;
  for (const ride of stop4.stoptimesWithoutPatterns) {
    stopElement4.innerHTML += `<li>${ride.trip.routeShortName},
      ${ride.trip.tripHeadsign},
      ${HSLData.formatTime(ride.scheduledDeparture)}</li>`;
  }
  stopElement4.innerHTML += `</ul>`;
  document.querySelector('.hsl-data').appendChild(stopElement4);
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
  // Service workers registeration below disabled temporarily for easier local development
  // must be uncommented from init() before building for "production"
  //registerServiceWorkers();
};
init();
