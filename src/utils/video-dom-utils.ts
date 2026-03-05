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
  mobileCurrentDurationTextSelector,
  desktopCurrentDurationTextSelector,
  extCurrDurationTextSelector,
  extCurrDurationElemId,
} from '../constants.ts';
import {debugTag, isOnMobile} from '../index.ts';
import {logD, logE} from './debug-utils.ts';
import {cleanDurationText, getCalculatedDurationText} from './text-utils.ts';

let videoController = new AbortController();

export function getSponsorBlockTextElem() {
  return document.querySelector(sponsorSkipDurationTextSelector);
}

export function getDurationTextElem(options: {isCurrent?: boolean} = {}) {
  const {isCurrent = false} = options;
  let durationElement: Element | null = null;

  let selector = null;
  if (isCurrent) {
    selector = isOnMobile
      ? mobileCurrentDurationTextSelector
      : desktopCurrentDurationTextSelector;
  } else {
    selector = isOnMobile
      ? mobileTotalDurationTextSelector
      : desktopTotalDurationTextSelector;
  }

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

export function getExtTextElem(options: {isCurrent?: boolean} = {}) {
  const {isCurrent = false} = options;
  const selector = isCurrent
    ? extCurrDurationTextSelector
    : extDurationTextSelector;
  return document.querySelector(selector);
}

export function addExtSpanElem(options: {isCurrent?: boolean} = {}) {
  const {isCurrent = false} = options;

  const existingId = isCurrent ? extCurrDurationElemId : extDurationElemId;
  const existingElement = document.querySelector(`#${existingId}`);

  if (existingElement) return;

  const containerSelector = isOnMobile
    ? mobileTimeContainerSelector
    : desktopTimeContainerSelector;
  const container = document.querySelector(containerSelector);

  if (!container) {
    console.warn(`${debugTag} duration container element not found.`);
    return;
  }

  const element = document.createElement('span');
  element.id = isCurrent ? extCurrDurationElemId : extDurationElemId;

  if (isOnMobile) {
    element.style.paddingLeft = '4px';
  }

  if (isCurrent) {
    logD('Added current Elem');
    const timeCurrentSpanSelector = isOnMobile
      ? mobileCurrentDurationTextSelector
      : desktopCurrentDurationTextSelector;
    const timeCurrentSpan = container.querySelector(timeCurrentSpanSelector);
    if (timeCurrentSpan) {
      timeCurrentSpan.after(element);
    } else {
      container.prepend(element);
    }
  } else {
    container.append(element);
  }
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

export function updateDurationText(options: {isCurrent?: boolean} = {}) {
  const {isCurrent = false} = options;

  const video = getVideoElem();
  if (!video) {
    logE('Video element not found');
    return;
  }

  const ytDurationElem = isCurrent
    ? getDurationTextElem({isCurrent: true})
    : getDurationTextElem();
  if (!ytDurationElem) return;

  let sourceElement = ytDurationElem;
  if (!isCurrent) {
    const sbElement = getSponsorBlockTextElem();
    if (sbElement?.textContent?.trim()) {
      sourceElement = sbElement;
    }
  }

  let baseText = cleanDurationText(sourceElement.textContent ?? '');
  let isNegative = false;

  if (isCurrent && baseText.startsWith('-')) {
    isNegative = true;
    baseText = baseText.slice(1);
  }

  const extElem = getExtTextElem({isCurrent});
  if (!extElem) return;

  const calculatedText = getCalculatedDurationText(
    baseText,
    video.playbackRate,
  );

  const finalText = isNegative ? `-${calculatedText}` : calculatedText;
  const shouldShow = finalText !== ytDurationElem.textContent;

  extElem.textContent = shouldShow ? ` (${finalText})` : '';
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
      updateDurationText({isCurrent: true});
    },
    {signal: videoController.signal},
  );

  video.addEventListener(
    'timeupdate',
    () => {
      updateDurationText({isCurrent: true});
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
      addExtSpanElem({isCurrent: true});
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
