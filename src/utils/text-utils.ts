import {
  durationTextToSecond,
  secondToDurationText,
} from './conversion-utils.ts';

/**
 * Add padding to the number.
 *
 * @param {number} number - The number to pad.
 * @param {number} padLength - The total length of the padded string. Defaults to 2 if not provided.
 * @return {string} Padded text.
 */
export function padNumber(number: number, padLength = 2): string {
  return String(number).padStart(padLength, '0');
}

/**
 * Removes the newly appended duration text from the main duration text.
 *
 * @param {string} text
 * @return {string}
 */
export function cleanDurationText(text: string): string {
  const re = /[()]/g;
  return text.replaceAll(re, '').trim();
}

export function getCalculatedDurationText(
  durationText: string,
  playbackRate: number,
): string {
  const totalSeconds = durationTextToSecond(durationText);
  const newTotalSeconds = Math.floor(totalSeconds / playbackRate);
  const newDurationText = secondToDurationText(newTotalSeconds);

  return newDurationText;
}
