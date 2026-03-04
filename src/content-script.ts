import {
  addExtSpanElem,
  addSbTextElemObserver,
  getExtTextElem,
  onMobileNavigation,
  addVideoEventListeners,
  initVideoController,
  abortVideoController,
} from './utils/video-dom-utils.ts';
import {logD} from './utils/debug-utils.ts';
import {isOnMobile} from './index';

function cleanUp() {
  abortVideoController();
  const element = getExtTextElem();
  if (element) element.textContent = '';
}

function setUp() {
  initVideoController();
  addVideoEventListeners();
  addExtSpanElem();
  addSbTextElemObserver();
}

function handleMobileSite() {
  let lastUrl = location.href;
  let navigationLock = false;

  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    setTimeout(() => {
      onMobileNavigation();
    }, 300);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        onMobileNavigation();
      }, 300);
    });
  }

  // SPA
  const observer = new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl && !navigationLock) {
      lastUrl = url;
      navigationLock = true;
      setTimeout(() => {
        onMobileNavigation();
        navigationLock = false;
      }, 300);
    }
  });
  observer.observe(document, {subtree: true, childList: true});
}

function handleDesktopSite() {
  document.addEventListener('yt-navigate-finish', () => {
    logD('finished navigation');
    setUp();
  });

  document.addEventListener('yt-navigate-start', () => {
    cleanUp();
  });
}

if (isOnMobile) {
  handleMobileSite();
} else {
  handleDesktopSite();
}
