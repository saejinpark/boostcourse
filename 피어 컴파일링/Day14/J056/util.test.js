import { formatBytes, makeBytes } from './util.js';

test('formatBytes', () => {
  expect(formatBytes(0)).toBe('0 Bytes');
  expect(formatBytes(1026)).toBe('1 KB');
  expect(formatBytes(20000)).toBe('19.53 KB');
  expect(formatBytes(20000, 0)).toBe('20 KB');
  expect(formatBytes(20000, -1)).toBe('20 KB');
  expect(formatBytes(60000000)).toBe('57.22 MB');
});

test('makeBytes', () => {
  expect(makeBytes('1 KB')).toBe(1024);
  expect(makeBytes('57.22 MB')).toBe(59999518.72);
  expect(makeBytes('')).toBe(0);
});
