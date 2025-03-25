import {padNumber} from './text-utils.ts';

/**
 * Convert duration text to seconds.
 *
 * @param {string} text - Video duration text.
 * @return {number} Calculated seconds from duration text.
 * @throws {RangeError} If the duration text is invalid or parsing fails.
 */
export function durationTextToSecond(text: string): number {
  if (typeof text !== 'string' || text.trim() === '') {
    throw new RangeError(
      `Invalid duration text: '${text}'. Input must be a non-empty string.`,
    );
  }

  if (!text.includes(':')) {
    throw new RangeError(`Invalid duration format: '${text}'`);
  }

  const parts = text.split(':');

  let day = 0;
  let hour = 0;
  let minute = 0;
  let second = 0;

  switch (parts.length) {
    case 4: {
      day = Number.parseInt(parts[0], 10);
      hour = Number.parseInt(parts[1], 10);
      minute = Number.parseInt(parts[2], 10);
      second = Number.parseInt(parts[3], 10);

      break;
    }

    case 3: {
      hour = Number.parseInt(parts[0], 10);
      minute = Number.parseInt(parts[1], 10);
      second = Number.parseInt(parts[2], 10);

      break;
    }

    case 2: {
      minute = Number.parseInt(parts[0], 10);
      second = Number.parseInt(parts[1], 10);

      break;
    }

    case 1: {
      second = Number.parseInt(parts[0], 10);

      break;
    }

    default: {
      throw new RangeError(`Failed to parse duration: '${text}'`);
    }
  }

  if ([day, hour, minute, second].includes(Number.NaN)) {
    throw new RangeError(`Invalid duration format: '${text}'`);
  }

  return day * 86_400 + hour * 3600 + minute * 60 + second;
}

/**
 * Convert seconds to duration text.
 *
 * @param {number} seconds - The number of seconds.
 * @return {string} Converted seconds in duration text.
 * @throws {RangeError} If the input is invalid or conversion fails.
 */
export function secondToDurationText(seconds: number): string {
  if (typeof seconds !== 'number' || Number.isNaN(seconds) || seconds < 0) {
    throw new RangeError(
      `Invalid seconds: '${seconds}'. Input must be a non-negative number.`,
    );
  }

  const day = Math.floor(seconds / 86_400);
  const hour = Math.floor((seconds % 86_400) / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = Math.floor(seconds % 60);

  const parts: string[] = [];

  if (day > 0) {
    parts.push(day.toString(), padNumber(hour), padNumber(minute));
  } else if (hour > 0) {
    parts.push(hour.toString(), padNumber(minute));
  } else if (minute > 0) {
    parts.push(minute.toString());
  } else {
    parts.push('0');
  }

  parts.push(padNumber(second));

  return parts.join(':');
}
