import { setDurationText } from './utils.js';
import { getVideoElement } from './helpers.js';

export const DEBUG_TAG = '[yt-pb-calc] [desktop]';

let hasAddedVideoListener = false;
let hasAddedVideoListenerChecktimer = null;

function addVideoListener () {
  if (hasAddedVideoListener) {
    console.debug(`${DEBUG_TAG} - already added event listener.`);
    if (hasAddedVideoListenerChecktimer !== null) {
      console.debug(`${DEBUG_TAG} - cleared the timer.`);
      clearInterval(hasAddedVideoListenerChecktimer);
    }
    return;
  }

  const video = getVideoElement();
  if (video == null) {
    console.debug(`${DEBUG_TAG} - failed to get video element.`);
    if (hasAddedVideoListenerChecktimer === null) {
      console.debug(`${DEBUG_TAG} - added timer.`);
      hasAddedVideoListenerChecktimer = setInterval(addVideoListener, 150);
    }
  } else {
    console.debug(`${DEBUG_TAG} - got video element. Adding event listener.`);

    video.addEventListener('ratechange', (event) => {
      setDurationText(video.playbackRate, video.duration);
    });
    video.addEventListener('playing', (event) => {
      setDurationText(video.playbackRate, video.duration);
    });

    hasAddedVideoListener = true;
    clearInterval(hasAddedVideoListenerChecktimer);
  }
};

document.addEventListener('yt-navigate-finish', function (event) {
  console.debug(`${DEBUG_TAG} - finish navigation`);
  addVideoListener(hasAddedVideoListener);
});
