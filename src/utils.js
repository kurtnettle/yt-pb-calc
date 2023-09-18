import { durationTextToSecond, secondToDurationText } from './converters.js';
import { getDesktopPlayBackSpeed } from './helpers.js';
import { D_VIDEO_DURATION_ITEMS } from './css_selectors.js';

/**
  * removes the newly appended duration text from the main duration text.
  * example: '24:42 (21:30)' to '24:42'
  * @param {string} text
  * @return {string}
  */
function cleanDurationText (text) {
  const re = /\s\(.*\)/gm;
  text = text.replace(re, '');
  return text;
}

/**
  * calculate the playback duration.
  * @param {number} seconds - video duration in second.
  * @param {number} speed - video playback speed.
  * @return {number} - calculated duration with custom speed.
  */
function calcPlaybackDuration (seconds, speed) {
  return Math.floor(seconds / speed);
}

/**
 *
 * modify the video duration text value.
 * @param {Element} MenuItem - video duration text element.
 * @param {string|null} pbSpeed - playback speed
 */
export function setDurationText (MenuItem = null, pbSpeed = null) {
  const mainDuration = document.querySelector(D_VIDEO_DURATION_ITEMS);
  if (!mainDuration) {
    throw ReferenceError(
      '[yt-pb-calc] [desktop] - failed to get video duration element.'
    );
  }
  const mainDurationText = mainDuration.textContent;
  let mainDurationTextCleaned = cleanDurationText(mainDuration.textContent);

  if (!pbSpeed) {
    pbSpeed = getDesktopPlayBackSpeed(MenuItem);
  }

  if (pbSpeed) {
    localStorage.setItem('last_pbSpeed', pbSpeed);
    if (!pbSpeed.includes('normal')) {
      const mainDurationSec = durationTextToSecond(mainDurationTextCleaned);
      const newDurationSec = calcPlaybackDuration(mainDurationSec, pbSpeed);
      const newDurationText = secondToDurationText(newDurationSec);
      if (!mainDurationText.includes('(')) {
        mainDuration.innerText += ` (${newDurationText})`;
      } else {
        mainDurationTextCleaned += ` (${newDurationText})`;
        mainDuration.innerText = mainDurationTextCleaned;
      }
    } else mainDuration.innerText = mainDurationTextCleaned;
  } else {
    throw new ReferenceError(
      '[yt-pb-calc] [desktop] - failed to get playback speed text.'
    );
  }
}

export function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
