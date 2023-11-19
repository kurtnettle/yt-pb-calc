import { setDurationText } from './utils.js';
import { getVideoElement } from './helpers.js';

let hasAddedVideoListener = false;
function addVideoListener (hasAddedVideoListener) {
  if (hasAddedVideoListener) {
    console.debug('[yt-pb-calc] [desktop] already added event listener.');
    return true;
  } else {
    console.debug('[yt-pb-calc] [desktop] adding event listener.');
  }

  const video = getVideoElement();
  if (video == null) {
    console.debug('[yt-pb-calc] [desktop] failed to get video element.');
    return false;
  } else {
    console.debug('[yt-pb-calc] [desktop] got video element.');
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
  console.debug('[yt-pb-calc] [desktop] finish navigation');
  hasAddedVideoListener = addVideoListener(hasAddedVideoListener);
  // }
});

document.addEventListener('yt-navigate-start', function (event) {
  console.debug('[yt-pb-calc] [desktop] start navigation');
  hasAddedVideoListener = false;
});
