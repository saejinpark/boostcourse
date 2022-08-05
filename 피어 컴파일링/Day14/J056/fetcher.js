import fetch from 'node-fetch';
import { urlParser } from './parser.js';
import { formatBytes } from './util.js';
import fs from 'fs';
const fetcher = async (url, method) => {
  try {
    const fetchOptions = {
      method,
      headers: {
        'Access-Control-Allow-Origin': url,
      },
    };
    const res = await fetch(url, fetchOptions);
    const xml = res.text();
    return xml;
  } catch (err) {
    console.error(err);
  }
};

export async function dataMaker(cache, BASE_URL, fetchingUrl) {
  const reqTime = new Date();
  const response = await fetch(fetchingUrl);
  const resTime = new Date();
  const [scheme, domain, path, filePath] = urlParser(fetchingUrl);
  await downloadFile(response, BASE_URL, filePath);
  const downloadCompleteTime = new Date();
  console.log('>> ', fetchingUrl);
  const data = {
    도메인: domain,
    스킴: scheme,
    종류: response.headers.get('content-type').split('/')[1].toUpperCase(),
    용량: formatBytes(response.headers.get('content-length') * 8),
    경로: path,
    대기시간: resTime - reqTime,
    다운로드시간: downloadCompleteTime - resTime,
  };
  cache.update(data);
  return data;
}

const downloadFile = async (res, dir, filePath) => {
  const downloadDir = './' + dir.split('/').pop();
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
  }
  if (fs.existsSync(downloadDir + '/' + filePath)) return;
  const fileStream = fs.createWriteStream(downloadDir + '/' + filePath);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on('error', reject);
    fileStream.on('finish', resolve);
  });
};

export default fetcher;
