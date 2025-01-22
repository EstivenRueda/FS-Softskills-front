import { repeat } from 'lodash';

/**
 * Masks a string with a given number of characters
 *
 * @param str String to mask
 * @param asteriskCount Number of asterisks to show
 * @param chars Character to use as mask
 */
export function maskString(str: string, asteriskCount = 8, chars = '*') {
  if (!str) return '';
  const visibleChars = Math.min(str.length, 4);
  const visiblePart = str.substring(0, visibleChars);
  return visiblePart + repeat(chars, asteriskCount);
}
