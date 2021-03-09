import SodexoData from './modules/sodexo-data';
import FazerData from './modules/fazer-data';
import {setModalControls} from './modules/modal';
import './styles/style.scss';
import './styles/mobile.scss';
import './styles/widescreen.scss';
import HSLData from './modules/hsl-data';
import SaaData from './modules/saa-data';

const ruoka = document.querySelector('#restaurantnav');
const ruokalinkki = document.querySelector('#ruokalinkki');
const saa = document.querySelector('#weathernav');
const saalinkki = document.querySelector('#saalinkki');
const hsl = document.querySelector('#transport');
const hsllinkki = document.querySelector('#hsllinkki');
const pysakki1 = document.querySelector('#pysakki1');
const stop1 = document.querySelector('#stop1');
const pysakki3 = document.querySelector('#pysakki3');
const stop3 = document.querySelector('#stop3');
const pysakki4 = document.querySelector('#pysakki4');
const stop4 = document.querySelector('#stop4');
const pysakki5 = document.querySelector('#pysakki5');
const stop5 = document.querySelector('#stop5');
const pysakki6 = document.querySelector('#pysakki6');
const stop6 = document.querySelector('#stop6');
const pysakki2 = document.querySelector('#pysakki2');
const stop2 = document.querySelector('#stop2');
const sodexo = document.querySelector('#sodexo');

const ruokalistat = document.querySelector('#ruokalistat');
const weather = document.querySelector('#weather');
const reitit = document.querySelector('#reitit');
const yhteystiedot = document.querySelector('#yhteystiedot');
const slogan = document.querySelector('#slogan');
const tiedotteet = document.querySelector('#tiedotteet');
const infotext = document.querySelector('#info-text');
const huomenna = document.querySelector('#huomenna');
const price = document.querySelector('#price');
const contact = document.querySelector('#contact');
const switchlang = document.querySelector('#switch-lang');
const carouseldatat = document.querySelector('#carouseldatat');
const julkinenliikenne = document.querySelector('#julkinenliikenne');
const menu = document.querySelector('#weekmenu');

sodexo.style.display = 'none';




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
//  id: 180118, avoina olevan ravintolan testaus
  id: 180118,
//  id: 270540,
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
    listItem.setAttribute("id", "ruuat");
    const space = document.createElement('p');
    listItem.textContent = item;
    space.innerHTML = `<br>`;
    ul.appendChild(listItem);
    ul.appendChild(space);
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
  languageChange();
};

const languageChange = () => {
  if (languageSetting === 'fi') {
    ruokalistat.innerHTML = `Ruokalistat`;
    weather.innerHTML = `Sää`;
    reitit.innerHTML = `Reitit`;
    yhteystiedot.innerHTML = `Yhteystiedot`;
    slogan.innerHTML = `Karamalmin Kampus`;
    otsikko.innerHTML = `Karamalmin Kampus`;
    tiedotteet.innerHTML = `Tiedotteet`;
    infotext.innerHTML = `Metropolian kampukset ovat avoinna, mutta 31.3.2021 asti kaikkea muuta kuin välttämätöntä asiointia kampuksilla pyydetään välttämään. Kampuksilla asioitaessa käytetään maskia ja noudatetaan muitakin turvatoimia. <br><br>  Seuraamme aktiivisesti viranomaisten ohjeistuksia koronavirukseen liittyen ja muutamme niiden mukaisesti tarvittaessa toimintaamme.`;
    saalinkki.innerHTML = `Sää`;
    ruokalinkki.innerHTML = `Ruoka`;
    hsllinkki.innerHTML = `Reitit`;
    huomenna.innerHTML = `Huomenna`;
    price.innerHTML = `<br>Lounaan hinta opiskelijoille 1,90€/2,70€/5,71€`;
    switchlang.innerHTML = `EN`;
    julkinenliikenne.innerHTML = `HSL Julkinen Liikenne`;
    menu.innerHTML = `Päivän Ruokalista`;
    carouseldatat.innerHTML = `<div class="item active">
          <img src="./assets/img/koronakaruselli/Dia1.JPG" alt="1 slide" style="width:100%;">
        </div>
        <div class="item">
          <img id="dia1" src="./assets/img/koronakaruselli/Dia2.JPG" alt="2 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia4.JPG" alt="3 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia5.JPG" alt="4 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia7.JPG" alt="5 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia8.JPG" alt="6 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia10.JPG" alt="7 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia11.JPG" alt="8 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia13.JPG" alt="9 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia14.JPG" alt="10 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia16.JPG" alt="11 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia18.JPG" alt="12 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia19.JPG" alt="13 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia21.JPG" alt="14 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia22.JPG" alt="15 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia24.JPG" alt="16 slide" style="width:100%;">
        </div>`;
    contact.innerHTML = `<h2>Yhteystiedot</h2><br>
    <h3>Käyntisoite</h3>
    <p>Karaportti 2<br>02610 Espoo</p>
    <h3>Postiosoite</h3>
    <p>Metropolia Ammattikorkeakoulu<br>
      PL 4070<br>
      00079 Metropolia</p>
    <h3>Aukioloajat</h3>
    <p>Ma - pe  7:30 - 21:00<br>
      HUOM. Ulko-ovet suljetaan klo 20:30.</p>
    <h3>Aulapalvelut</h3>
    <p>040 545 1572<br>
      aulapalvelut.karamalmi@metropolia.fi </p>`;
  } else {
    ruokalistat.innerHTML = `Menu`;
    weather.innerHTML = `Weather`;
    reitit.innerHTML = `Transport`;
    yhteystiedot.innerHTML = `Contact`;
    slogan.innerHTML = `Karamalmi Campus`;
    otsikko.innerHTML = `Karamalmi Campus`;
    tiedotteet.innerHTML = `Releases`;
    infotext.innerHTML = `Metropolia's campuses are still open and we operate in accordance with security arrangements. Metropolia's campuses are open, but until 31.3.2021, anything other than necessary visits to the campuses should be avoided based on the new regional guidelines and recommendations.<br><br>   We actively follow the authorities' instructions regarding the coronavirus and, if necessary, change our operations accordingly.`;
    saalinkki.innerHTML = `Weather`;
    ruokalinkki.innerHTML = `Menu`;
    hsllinkki.innerHTML = `Transport`;
    huomenna.innerHTML = `Tomorrow`;
    price.innerHTML = `<br>Lunch price to students 1,90€/2,70€/5,71€`;
    switchlang.innerHTML = `FI`;
    julkinenliikenne.innerHTML = `HSL Public Transport`;
    menu.innerHTML = `Menu of the Day`;
    carouseldatat.innerHTML = `<div class="item active">
          <img src="./assets/img/koronakaruselli/Dia1.JPG" alt="1 slide" style="width:100%;">
        </div>
        <div class="item">
          <img id="dia1" src="./assets/img/koronakaruselli/Dia3.JPG" alt="2 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia4.JPG" alt="3 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia6.JPG" alt="4 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia7.JPG" alt="5 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia9.JPG" alt="6 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia10.JPG" alt="7 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia12.JPG" alt="8 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia13.JPG" alt="9 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia15.JPG" alt="10 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia17.JPG" alt="11 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia18.JPG" alt="12 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia20.JPG" alt="13 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia21.JPG" alt="14 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia23.JPG" alt="15 slide" style="width:100%;">
        </div>
        <div class="item">
          <img src="./assets/img/koronakaruselli/Dia25.JPG" alt="16 slide" style="width:100%;">
        </div>`;
    contact.innerHTML = `<h2>Contact</h2><br>
    <h3>Visiting Address</h3>
    <p>Karaportti 2<br>02610 Espoo</p>
    <h3>Postal Address</h3>
    <p>Metropolia
University of Applied Sciences<br>
      PL 4070<br>
      00079 Metropolia FINLAND</p>
    <h3>Opening Hours</h3>
    <p>Mon - Fri  7:30 - 21:00<br>
      NOTE: Exterior doors close at 8:30 p.m.</p>
    <h3>Reception</h3>
    <p>040 545 1572<br>
      aulapalvelut.karamalmi@metropolia.fi </p>`;
  }
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
      if (languageSetting === 'fi') {
      renderNoDataNotification('Ei ruokalistaa saatavilla.', restaurant.name);
      } else {
        renderNoDataNotification('No menu available.', restaurant.name);
      }
    }
  }
};


const loadHSLData = async () => {
  const result = await HSLData.getRidesByStopId(2132208);
  const stop = result.data.stop;
  console.log('loadHSLData', stop);
  const stopElement = document.createElement('div');
  const pysakki = document.createElement('div');
  pysakki.innerHTML = `<i class="fas fa-bus" id="bus"></i><p>E1808</p><h4>${stop.name}</h4><ul>`;
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
  pysakki2.innerHTML = `<i class="fas fa-bus" id="bus"></i><p>E1807</p><h4>${stop1.name}</h4><ul>`;
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
  pysakki3.innerHTML = `<i class="fas fa-bus" id="bus"></i><p>E1815</p><h4>${stop2.name}</h4><ul>`;
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
  pysakki4.innerHTML = `<i class="fas fa-bus" id="bus"></i><p>E1814</p><h4>${stop3.name}</h4><ul>`;
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
  pysakki5.innerHTML = `<i class="fas fa-bus" id="bus"></i><p>E1854</p><h4>${stop4.name}</h4><ul>`;
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
  pysakki6.innerHTML = `<i class="fas fa-subway" id="train"></i><p>E1833</p><h4>${stop5.name}</h4><ul>`;
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
    weathernow.innerHTML += `<li><h1 id="saanyt">
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

ruokalinkki.addEventListener('click', (event) => {

  ruoka.style.display = 'block';
  saa.style.display = 'none';
  hsl.style.display = 'none';
});

saalinkki.addEventListener('click', (event) => {

  saa.style.display = 'block';
  ruoka.style.display = 'none';
  hsl.style.display = 'none';
});

hsllinkki.addEventListener('click', (event) => {

  saa.style.display = 'none';
  ruoka.style.display = 'none';
  hsl.style.display = 'block';
});

stop1.addEventListener('click', (event) => {

  pysakki1.style.display = 'block';
  pysakki2.style.display = 'none';
  pysakki3.style.display = 'none';
  pysakki4.style.display = 'none';
  pysakki5.style.display = 'none';
  pysakki6.style.display = 'none';
});

stop2.addEventListener('click', (event) => {

  pysakki2.style.display = 'block';
  pysakki1.style.display = 'none';
  pysakki3.style.display = 'none';
  pysakki4.style.display = 'none';
  pysakki5.style.display = 'none';
  pysakki6.style.display = 'none';
});

stop3.addEventListener('click', (event) => {

  pysakki2.style.display = 'none';
  pysakki1.style.display = 'none';
  pysakki3.style.display = 'block';
  pysakki4.style.display = 'none';
  pysakki5.style.display = 'none';
  pysakki6.style.display = 'none';
});

stop4.addEventListener('click', (event) => {

  pysakki2.style.display = 'none';
  pysakki1.style.display = 'none';
  pysakki3.style.display = 'none';
  pysakki4.style.display = 'block';
  pysakki5.style.display = 'none';
  pysakki6.style.display = 'none';
});

stop5.addEventListener('click', (event) => {

  pysakki2.style.display = 'none';
  pysakki1.style.display = 'none';
  pysakki3.style.display = 'none';
  pysakki4.style.display = 'none';
  pysakki5.style.display = 'block';
  pysakki6.style.display = 'none';
});

stop6.addEventListener('click', (event) => {

  pysakki2.style.display = 'none';
  pysakki1.style.display = 'none';
  pysakki3.style.display = 'none';
  pysakki4.style.display = 'none';
  pysakki5.style.display = 'none';
  pysakki6.style.display = 'block';
});

/**
 * App initialization
 */
const init = () => {
  document.querySelector('#switch-lang').addEventListener('click', switchLanguage);
  loadAllMenuData();
  loadHSLData();
  setModalControls();
  loadWeatherData();
  languageChange();
  // Service workers registeration below disabled temporarily for easier local development
  // must be uncommented from init() before building for "production"
  //registerServiceWorkers();
};
init();
