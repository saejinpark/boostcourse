import fetcher, { dataMaker } from './fetcher.js';
import { extractLinks } from './parser.js';
import input from './input.js';
import Cache from './Cache.js';

const app = async () => {
  let URL = await input();
  const cache = new Cache(URL);
  const linksArr = await extractLinks(await fetcher(URL, 'get'));
  const promises = linksArr.map(async (item) => {
    console.log(await dataMaker(cache, URL, item));
    cache.isUpdate && console.log('>> 캐시됨');
    console.log('\n\n');
    cache.isUpdate = false;
  });
  await Promise.all(promises);
  console.log(cache.data);
};

app();
