const BASE62_DIGITS =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 *
 * @param n base 10 number
 * @returns equivalent base 62 encoded string
 */
export function toBase62(n: number): string {
  if (n === 0) {
    return '0';
  }
  let result = '';
  while (n > 0) {
    result = BASE62_DIGITS[n % BASE62_DIGITS.length] + result;
    n = Math.floor(n / BASE62_DIGITS.length);
  }

  return result;
}

/**
 *
 * @param s base 62 encoded string
 * @returns equivalent number in base 10
 */
export function fromBase62(s: string): number {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const p = BASE62_DIGITS.indexOf(s[i]);
    if (p < 0) {
      return NaN;
    }
    result += p * Math.pow(BASE62_DIGITS.length, s.length - i - 1);
  }
  return result;
}
