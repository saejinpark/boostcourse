const readline = require('readline');
const { getData } = require('./crawler.js');
const Cache = require('./cache.js');

const callBackReadline = async (keyword, cache) => {
  console.log('----------------------------------------------');
  console.log('----------------------------------------------');
  if(keyword==='exit') {
    rl.close();
    return
  }else if(keyword==='$cache') {
    console.log(cache.consoleCache());
    console.log('----------------------------------------------');
    console.log('----------------------------------------------');
  }else {
    const news = await getData(`${keyword}`);

    if(cache.hasKeyword(keyword)) {
      console.log(cache.get(keyword, news));
    }else {
      console.log(cache.set(keyword, news));
    }
		
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  const cache = new Cache(5, 10);
  rl.on('line', keyword => {
    callBackReadline(encodeURI(keyword), cache);
  }).on('close', async () => {
    process.exit();
  });
}

main();