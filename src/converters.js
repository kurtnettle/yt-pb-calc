import { DEBUG_TAG } from './main.js';

/**
 * convert duration text to second.
 * @param {string} text - video duration text.
 * @return {number} calculated seconds from text.
 * @throws {RangeError} if fail to parse the duration text.
 */
export function durationTextToSecond (text) {
  const parts = text.split(':');
  let day = 0;
  let hour = 0;
  let minute = 0;
  let second = 0;
  if (parts.length == 4) {
    day = parseInt(parts[0]);
    hour = parseInt(parts[1]);
    minute = parseInt(parts[2]);
    second = parseInt(parts[3]);
  } else if (parts.length == 3) {
    hour = parseInt(parts[0]);
    minute = parseInt(parts[1]);
    second = parseInt(parts[2]);
  } else if (parts.length == 2) {
    minute = parseInt(parts[0]);
    second = parseInt(parts[1]);
  } else if (parts.length == 1) {
    second = parseInt(parts[0]);
  } else {
    throw new RangeError(`${DEBUG_TAG} - failed to parse a duration: '${text}'`);
  }
  return day * 86400 + hour * 3600 + minute * 60 + second;
}

/**
 * add padding to the number.
 * @param {number} number
 * @return {string} pad added text.
 */
function addPadding (number) {
  const text = number.toString();
  return text.padStart(2, '0');
}

/**
 * convert seconds to duration text.
 * @param {number} seconds
 * @return {string} converted seconds in duration text.
 * @throws {RangeError} conversion fails when remaining seconds are not empty.
 */
export function secondToDurationText (seconds) {
  let day = 0;
  let hour = 0;
  let minute = 0;
  let second = 0;
  let remaining = seconds;
  if (remaining / 86400 >= 1) {
    day = Math.floor(remaining / 86400);
    remaining -= day * 86400;
  }
  if (remaining / 3600 >= 1) {
    hour = Math.floor(remaining / 3600);
    remaining -= hour * 3600;
  }
  if (remaining / 60 >= 1) {
    minute = Math.floor(remaining / 60);
    remaining -= minute * 60;
  }
  second = remaining;
  remaining -= second;
  if (remaining != 0) {
    throw new RangeError(
      `${DEBUG_TAG} - sec ('${seconds}') to text conversion failed. remaining (${remaining}) isn't empty.`
    );
  }

  let text = '';
  if (day) {
    text += `${day}:`;
    text += `${addPadding(hour)}:`;
    text += `${addPadding(minute)}:`;
  }
  if (hour && !day) {
    text += `${addPadding(hour)}:`;
    text += `${addPadding(minute)}:`;
  }
  if (!hour && !day) {
    text += `${addPadding(minute)}:`;
  }
  text += addPadding(second);
  return text;
}
