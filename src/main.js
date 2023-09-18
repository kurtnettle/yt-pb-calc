import { setDurationText } from './utils.js';
import { getVideoElement } from './helpers.js';

let hasAddedVideoListener = false;
function addVideoListener (hasAddedVideoListener) {
  if (hasAddedVideoListener) return;

  const video = getVideoElement();
  if (video == null) return false;

  video.addEventListener('ratechange', (event) => {
    setDurationText(video.playbackRate, video.duration);
  });
  video.addEventListener('playing', (event) => {
    setDurationText(video.playbackRate, video.duration);
  });

  return true;
};

document.addEventListener('yt-navigate-finish', function (event) {
  hasAddedVideoListener = addVideoListener(hasAddedVideoListener);
  // }
});
