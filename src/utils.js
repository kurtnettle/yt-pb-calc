import { secondToDurationText, durationTextToSecond } from './converters.js';
import { getVideoElement, getSponsorBlockDurationElement } from './helpers.js';
import { D_VIDEO_DURATION_ITEMS } from './css_selectors.js';
import { DEBUG_TAG } from './main.js';

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
  const mainDurationElement = document.querySelector(D_VIDEO_DURATION_ITEMS);
  if (!mainDurationElement) {
    console.error(`${DEBUG_TAG} - failed to get video duration element.`);
    return;
  }

  let duration = null; let pbSpeed = null;
  let mainDurationText = null; let SPDuration = null;
  const video = getVideoElement();

  if (video) {
    duration = Math.floor(video.duration);
    if (!duration) return;
    pbSpeed = video.playbackRate;
  } else if (video == null) {
    return;
  } else {
    console.error(`${DEBUG_TAG} - failed to get video element.`);
    return;
  }

  mainDurationText = mainDurationElement.textContent;

  let sbDurElem = getSponsorBlockDurationElement();
  if (sbDurElem) {
    SPDuration = sbDurElem.textContent.trim().replace('(', '').replace(')', '');
    if (SPDuration) SPDuration = durationTextToSecond(SPDuration);
    else sbDurElem = null;
  }

  let mainDurationTextCleaned = cleanDurationText(mainDurationText);

  console.debug(`${DEBUG_TAG} - duration: ${duration} SPDuration: ${SPDuration} pbSpeed: ${pbSpeed}`);

  if (pbSpeed) {
    if (pbSpeed == 1) {
      if (sbDurElem) sbDurElem.style.display = '';
      if (mainDurationTextCleaned) {
        mainDurationElement.innerText = mainDurationTextCleaned;
      } else {
        console.debug(`${DEBUG_TAG} - empty mainDurationTextCleaned: ${mainDurationTextCleaned}`);
      }
    } else {
      let newDurationSec = 0;
      if (sbDurElem && SPDuration != null) {
        sbDurElem.style.display = 'none';
        newDurationSec = calcPlaybackDuration(SPDuration, pbSpeed);
      } else {
        newDurationSec = calcPlaybackDuration(duration, pbSpeed);
      }

      const newDurationText = secondToDurationText(newDurationSec);
      if (!mainDurationText.includes('(')) {
        mainDurationElement.innerText += ` (${newDurationText})`;
      } else {
        mainDurationTextCleaned += ` (${newDurationText})`;
        mainDurationElement.innerText = mainDurationTextCleaned;
      }
    }
  } else {
    throw new ReferenceError(`${DEBUG_TAG} - failed to get playback speed text.`);
  }
}
