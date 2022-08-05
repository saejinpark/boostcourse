import * as cheerio from 'cheerio';
import { ELEMENT_TYPE, SCHEME_TYPE } from './constants.js';

export const extractLinks = async (html) => {
  try {
    const imgSrcLinks = makeSrcArr(html, ELEMENT_TYPE.IMG);
    const scriptSrcLinks = makeSrcArr(html, ELEMENT_TYPE.SCRIPT);
    return [...imgSrcLinks, ...scriptSrcLinks];
  } catch (err) {
    console.error(err);
  }
};

const makeSrcArr = (rawHtml, type) => {
  return cheerio
    .load(rawHtml)(type)
    .toArray()
    .map((type) => type.attribs.src)
    .filter((item) => item)
    .filter((item) => item.length < 260)
    .filter((item) => item.split('://').length >= 2)
    .filter((item) => item.slice(0, 5) === SCHEME_TYPE.HTTP || item.slice(0, 5) === SCHEME_TYPE.HTTPS);
};

export const urlParser = (url) => {
  const [scheme, notScheme] = url.split('://');
  const arr = notScheme.split('/');
  const domain = arr.shift();
  const path = arr.join('/');
  const filePath = arr.pop();
  return [scheme, domain, path, filePath];
};
