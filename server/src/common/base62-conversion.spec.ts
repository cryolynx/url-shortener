import { fromBase62, toBase62 } from './base62-conversion';

describe('toBase62()', () => {
  const testCases: [number, string][] = [
    [0, '0'],
    [10000, '2Bi'],
    [999999999, '15FTGf'],
  ];

  it.each(testCases)(
    'should encode a base 10 number in base 62',
    (input, expectedOutput) => {
      expect(toBase62(input)).toBe(expectedOutput);
    },
  );
});

describe('fromBase62()', () => {
  const testCases: [string, number][] = [
    ['0', 0],
    ['2Bi', 10000],
    ['15FTGf', 999999999],
  ];

  it.each(testCases)(
    'should decode a base 62 number to base 10',
    (input, expectedOutput) => {
      expect(fromBase62(input)).toBe(expectedOutput);
    },
  );
});
