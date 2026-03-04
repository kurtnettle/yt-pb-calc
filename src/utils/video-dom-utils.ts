/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable unicorn/prevent-abbreviations */

import {
  desktopTimeContainerSelector,
  desktopTotalDurationTextSelector,
  mobileTimeContainerSelector,
  mobileTotalDurationTextSelector,
  sponsorSkipDurationTextSelector,
  videoSelector,
  extDurationTextSelector,
  extDurationTextAttrName,
  extDurationElemId,
} from '../constants.ts';
import {debugTag, isOnMobile} from '../index.ts';
import {logD, logE} from './debug-utils.ts';
import {cleanDurationText, getCalculatedDurationText} from './text-utils.ts';

let videoController = new AbortController();

export function getSponsorBlockTextElem() {
  return document.querySelector(sponsorSkipDurationTextSelector);
}

export function getDurationTextElem() {
  let durationElement: Element | null = null;
  const selector = isOnMobile
    ? mobileTotalDurationTextSelector
    : desktopTotalDurationTextSelector;
  durationElement = document.querySelector(selector);

  return durationElement;
}

export function getVideoElem(): HTMLVideoElement | null {
  const element: HTMLVideoElement | null =
    document.querySelector(videoSelector);

  if (!element) return null;
  if (isOnMobile) return element;
  if (element?.src !== '') return element;

  return null;
}

export function getExtTextElem() {
  return document.querySelector(extDurationTextSelector);
}

export function addExtSpanElem() {
  let parent: Element | null = document.querySelector(extDurationTextSelector);

  if (parent) return;

  const selector = isOnMobile
    ? mobileTimeContainerSelector
    : desktopTimeContainerSelector;
  parent = document.querySelector(selector);

  if (!parent) {
    console.warn(`${debugTag} duration container element not found.`);
    return;
  }

  const element = document.createElement('span');
  element.id = extDurationElemId;
  if (isOnMobile) element.style.paddingLeft = '4px';

  parent.append(element);
}

export function addSbTextElemObserver() {
  const element = getSponsorBlockTextElem();
  if (!element) {
    logD('unable to add mutationObserver, SbTextElem not found');
    return;
  }

  if (element.getAttribute(extDurationTextAttrName) === 'true') {
    logD('already added mutationObserver');
    return;
  }

  const observer = new MutationObserver(() => {
    updateDurationText();
  });

  const config = {childList: true, attributes: true};

  observer.observe(element, config);

  element.style.display = 'none';
  element.setAttribute(extDurationTextAttrName, 'true');
}

export function updateDurationText() {
  try {
    const video = getVideoElem();
    if (!video) {
      throw new Error('Video element not found');
    }

    const ytDurationTextElem = getDurationTextElem();
    if (!ytDurationTextElem) {
      throw new Error('Video total duration element not found');
    }

    let durationTextElement = ytDurationTextElem;
    const sbTextElement = getSponsorBlockTextElem();
    if (sbTextElement !== null && sbTextElement.textContent?.trim() !== '') {
      durationTextElement = sbTextElement;
    }

    const totalDurationText = cleanDurationText(
      durationTextElement.textContent ?? '',
    );

    const extTextElem = getExtTextElem();
    if (extTextElem) {
      const newDurationText = getCalculatedDurationText(
        totalDurationText,
        video.playbackRate,
      );

      if (newDurationText === ytDurationTextElem.textContent) {
        extTextElem.textContent = '';
        return;
      }

      extTextElem.textContent = ` (${newDurationText})`;
    }
  } catch (error) {
    logE('Failed to update duration text:', error);
  }
}

export function initVideoController() {
  videoController?.abort();
  videoController = new AbortController();
}

export function abortVideoController() {
  if (videoController) {
    videoController.abort();
  }
}

export function addVideoEventListeners() {
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
    {signal: videoController.signal},
  );
}

export async function waitForElement(
  selector: string,
  timeout = 10_000,
): Promise<Element> {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver((mutations, obs) => {
      const element = document.querySelector(selector);
      if (element) {
        obs.disconnect();
        clearTimeout(timer);
        resolve(element);
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    const timer = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Timeout waiting for element: ${selector}`));
    }, timeout);
  });
}

export function onMobileNavigation() {
  const containerSelector = isOnMobile
    ? mobileTimeContainerSelector
    : desktopTimeContainerSelector;
  const durationSelector = isOnMobile
    ? mobileTotalDurationTextSelector
    : desktopTotalDurationTextSelector;
  waitForElement(containerSelector)
    .then(async () => {
      addExtSpanElem();
      return waitForElement(durationSelector);
    })
    .then(() => {
      addVideoEventListeners();
    })
    .catch((error) => {
      logE(`Duration container/text not found: ${error}`);
    });

  waitForElement(sponsorSkipDurationTextSelector)
    .then(() => {
      addSbTextElemObserver();
    })
    .catch((error) => {
      logE(`SponsorBlock element not found: ${error.message}`);
    });
}
