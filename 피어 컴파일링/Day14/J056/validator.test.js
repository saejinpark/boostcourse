import validator from './validator.js';

test('validator test', () => {
  expect(validator('www.naver.com')).toBe('https://www.naver.com');
  expect(validator('https://www.naver.com')).toBe('https://www.naver.com');
  expect(validator('http://www.naver.com')).toBe('http://www.naver.com');
  expect(validator('asfhdklajfhak')).toBe(false);
  expect(validator('잘못된값이다.')).toBe(false);
});
