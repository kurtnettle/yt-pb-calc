import { setDurationText } from './utils.js';
import { getDesktopPlayBackItem, getDesktopCustomPlayBackSpeed } from './helpers.js';
import { D_SETTINGS_BTN, M_SPEED_SELECT } from './css_selectors.js';

/**
 * add listener to desktop playback menu item to
 * track the playback speed changes.
 *
 */
export function desktopPlayback () {
  const hasAddedDPlaybackListener = sessionStorage.getItem('hasAddedDPlaybackListener');
  if (hasAddedDPlaybackListener == 'true') {
    sessionStorage.setItem('hasAddedDPlaybackListener', 'true');
    return;
  }

  const MenuItem = getDesktopPlayBackItem();
  if (!MenuItem) {
    throw new ReferenceError(
      "[yt-pb-calc] [desktop] - can't find the playback menu item."
    );
  } else {
    for (const item of MenuItem.children) {
      if (item.textContent.includes('speed') && !hasAddedDPlaybackListener) {
        const config = {
          childList: true,
          subtree: true,
          characterData: true
        };
        const callback = (mutationList, observer) => {
          const customSpeed = getDesktopCustomPlayBackSpeed();
          setDurationText(MenuItem, customSpeed);
        };
        const observer = new MutationObserver(callback);
        observer.observe(MenuItem, config);
        console.debug('[yt-pb-calc] [desktop] - added listener to playback menu item.');

        sessionStorage.setItem('hasAddedDPlaybackListener', 'true');
        return;
      }
    }
  }
}

/**
 * add listener to the youtube desktop settings icon
 * to track whether the settings panel was opened or not.
 */
export function desktopSettingsBtn () {
  const hasAddedSettingsBtnListener = sessionStorage.getItem(
    'hasAddedSettingsBtnListener'
  );
  if (hasAddedSettingsBtnListener == 'true') {
    sessionStorage.setItem('hasAddedSettingsBtnListener', 'true');
    return;
  }
  const settingsButton = document.querySelector(D_SETTINGS_BTN);
  if (settingsButton) {
    console.debug('[yt-pb-calc] [desktop] - located settings button');
    const config = {
      attributeFilter: ['aria-expanded', 'aria-controls']
    };
    const callback = (mutationList, observer) => {
      if (mutationList[0].target.getAttribute('aria-expanded') == 'true') {
        desktopPlayback();
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(settingsButton, config);
    console.debug('[yt-pb-calc] [desktop] - added listener to settings button.');
    sessionStorage.setItem('hasAddedSettingsBtnListener', 'true');
  } else {
    throw new ReferenceError(
      '[yt-pb-calc] [desktop] - failed to locate settings button'
    );
  }
}

// TODO add support for m.youtube.com
/*
function mobilePlayback(hasAddedMPlaybackListener) {
  if (hasAddedMPlaybackListener) return true;
  const element = document.querySelector(M_SPEED_SELECT);
}
*/
