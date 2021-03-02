/**
 * Global app settings TEMPLATE
 *
 * USAGE: Add your setting values & rename to settings.js
 *
 */

// Generic proxy server only for random testing
// public cors-anywhere accepts only 50 request per hour
const networkProxyUrl = 'https://cors-anywhere.herokuapp.com/';

// Url for proxy-server/fazer.php (use your own)
const fazerProxyUrl = 'http://users.metropolia.fi/~joonavsa/2021-Proju/wtmp-examples-week5-thursday/proxy-server/fazer.php';

export {networkProxyUrl, fazerProxyUrl};
