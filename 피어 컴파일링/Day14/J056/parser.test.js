import { extractLinks, urlParser } from './parser.js';
import { html, srcArr, url, parsedArr } from './testHtml.js';
describe('test link extracting, srcArray making and url parsing', () => {
  test('test link extracting', async () => {
    expect(await extractLinks(html)).toStrictEqual(srcArr);
  });

  test('test url parsing', () => {
    expect(urlParser(url)).toStrictEqual(parsedArr);
  });
});
