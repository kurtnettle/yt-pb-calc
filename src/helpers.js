import { SPONSORBLOCKDURATION_ELEM, VIDEO_CLASSLIST } from './css_selectors.js';

export function getVideoElement () {
  const videos = document.getElementsByTagName('video');
  for (const video of videos) {
    if (VIDEO_CLASSLIST.every(_class => video.classList.contains(_class))) return video;
  }
}

export function getSponsorBlockDurationElement () {
  return document.querySelector(SPONSORBLOCKDURATION_ELEM);
}
