import { secondToDurationText } from './converters.js';
import { getVideoElement } from './helpers.js';
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
 * @param {string|null} pbSpeed - playback speed
 */
export function setDurationText () {
  const mainDuration = document.querySelector(D_VIDEO_DURATION_ITEMS);
  if (!mainDuration) {
    console.error('[yt-pb-calc] [desktop] - failed to get video duration element.');
    return;
  }

  let duration = null; let pbSpeed = null;
  const video = getVideoElement();

  if (video) {
    duration = Math.floor(video.duration);
    if (!duration) return;
    pbSpeed = video.playbackRate;
  } else if (video == null) {
    return;
  } else {
    console.error('[yt-pb-calc] [desktop] - failed to get video element.');
    return;
  }

  const mainDurationText = mainDuration.textContent;
  let mainDurationTextCleaned = cleanDurationText(mainDurationText);

  if (pbSpeed) {
    if (pbSpeed == 1) {
      if (mainDurationTextCleaned) {
        mainDuration.innerText = mainDurationTextCleaned;
      } else {
        console.debug(`empty mainDurationTextCleaned: ${mainDurationTextCleaned}`);
      }
    } else {
      const newDurationSec = calcPlaybackDuration(duration, pbSpeed);
      const newDurationText = secondToDurationText(newDurationSec);
      if (!mainDurationText.includes('(')) {
        mainDuration.innerText += ` (${newDurationText})`;
      } else {
        mainDurationTextCleaned += ` (${newDurationText})`;
        mainDuration.innerText = mainDurationTextCleaned;
      }
    }
  } else {
    throw new ReferenceError('[yt-pb-calc] [desktop] - failed to get playback speed text.');
  }
}
