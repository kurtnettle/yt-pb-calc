import {desktopSettingsBtn} from './listeners.js';
import {setDurationText, sleep} from './utils.js';

document.addEventListener('yt-navigate-finish', function(event) {
  const currUrl = new URL(document.URL);

  if (currUrl.pathname != '/' && currUrl.pathname != '') {
    let lastPbSpeed = localStorage.getItem('last_pbSpeed');
    if (!lastPbSpeed) lastPbSpeed = 'normal';

    sleep(150).then(() => {
      setDurationText(null, lastPbSpeed);
    });
    desktopSettingsBtn();
  }
});
