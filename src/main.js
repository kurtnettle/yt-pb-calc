import { setDurationText } from './utils.js';
import { getVideoElement } from './helpers.js';

export const DEBUG_TAG = '[yt-pb-calc] [desktop]';

let hasAddedVideoListener = false;
function addVideoListener(hasAddedVideoListener) {
  if (hasAddedVideoListener) {
    console.debug(`${DEBUG_TAG} - already added event listener.`);
    return true;
  } else {
    console.debug(`${DEBUG_TAG} - adding event listener.`);
  }

  const video = getVideoElement();
  if (video == null) {
    console.debug(`${DEBUG_TAG} - failed to get video element.`);
    return false;
  } else {
    console.debug(`${DEBUG_TAG} - got video element.`);
  }

  video.addEventListener('ratechange', (event) => {
    setDurationText(video.playbackRate, video.duration);
  });
  video.addEventListener('playing', (event) => {
    setDurationText(video.playbackRate, video.duration);
  });

  return true;
};

document.addEventListener('yt-navigate-finish', function (event) {
  console.debug(`${DEBUG_TAG} - finish navigation`);
  hasAddedVideoListener = addVideoListener(hasAddedVideoListener);
});

document.addEventListener('yt-navigate-start', function (event) {
  console.debug(`${DEBUG_TAG} - start navigation`);
});
