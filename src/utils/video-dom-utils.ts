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

export function getSponsorBlockTextElem() {
  return document.querySelector(sponsorSkipDurationTextSelector);
}

export function getDurationTextElem() {
  let durationElement: Element | null = null;

  durationElement = isOnMobile
    ? document.querySelector(mobileTotalDurationTextSelector)
    : document.querySelector(desktopTotalDurationTextSelector);

  return durationElement;
}

export function getVideoElem(): HTMLVideoElement | null {
  const element: HTMLVideoElement | null =
    document.querySelector(videoSelector);
  if (element?.src !== '') return element;

  return null;
}

export function getExtTextElem() {
  return document.querySelector(extDurationTextSelector);
}

export function addExtSpanElem() {
  let parent: Element | null = document.querySelector(extDurationTextSelector);

  if (parent) return;

  parent = isOnMobile
    ? document.querySelector(mobileTimeContainerSelector)
    : document.querySelector(desktopTimeContainerSelector);

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
