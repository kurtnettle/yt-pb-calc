/* eslint-disable unicorn/prevent-abbreviations */

// Youtube Video
export const videoSelector =
  'div.html5-video-container > video.html5-main-video';

// Mobile
export const mobileTimeContainerSelector = 'div.ytwPlayerTimeDisplayContent';
export const mobileTotalDurationTextSelector = `${mobileTimeContainerSelector} > span[role="text"].ytwPlayerTimeDisplayTime.ytwPlayerTimeDisplayTimeSecond`;

// Desktop
export const desktopTimeContainerSelector = 'span.ytp-time-wrapper > div.ytp-time-contents';
export const desktopTotalDurationTextSelector = `${desktopTimeContainerSelector} > span.ytp-time-duration`;

// SponsorBlock
export const sponsorSkipDurationTextSelector =
  'span#sponsorBlockDurationAfterSkips';

// Yt-pb-calc extension
export const extDurationElemId = 'ytPbCalcdurationAfterPbRateChange';
export const extDurationTextSelector = `span#${extDurationElemId}`;
export const extDurationTextAttrName = 'data-ytpbcalc-added-observer';
