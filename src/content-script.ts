import {
  addExtSpanElem,
  getVideoElem,
  addSbTextElemObserver,
  updateDurationText,
  getExtTextElem,
} from './utils/video-dom-utils.ts';
import {logD, logE} from './utils/debug-utils.ts';

let controller = new AbortController();

function addVideoEventListeners() {
  const video = getVideoElem();
  if (!video) {
    logE('Failed adding events to video: video element not found');
    return;
  }

  // First time
  updateDurationText();

  video.addEventListener(
    'ratechange',
    () => {
      updateDurationText();
    },
    {signal: controller.signal},
  );
}

function cleanUp() {
  controller.abort();

  const element = getExtTextElem();
  if (element) element.textContent = '';
}

function setUp() {
  controller = new AbortController();

  addVideoEventListeners();
  addExtSpanElem();
  addSbTextElemObserver();
}

document.addEventListener('yt-navigate-finish', () => {
  logD('finished navigation');
  setUp();
});

document.addEventListener('yt-navigate-start', () => {
  cleanUp();
});
