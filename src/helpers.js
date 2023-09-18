import { SPONSORBLOCKDURATION_ELEM } from './css_selectors.js';

export function getVideoElement () {
  const videos = document.getElementsByTagName('video');
  for (const video of videos) {
    if (video.getAttribute('src')) return video;
    if (video.getAttribute('data-no-fullscreen') == true) return null;
  }
}

export function getSponsorBlockDurationElement () {
  return document.querySelector(SPONSORBLOCKDURATION_ELEM);
}
