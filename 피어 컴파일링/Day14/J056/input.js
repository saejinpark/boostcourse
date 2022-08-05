import readline from 'readline';
import validator from './validator.js';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = async () => {
  while (true) {
    const url = await new Promise((resolve) => {
      rl.question('URL을 입력해주세요. >>', resolve);
    });
    if (validator(url)) {
      rl.close();
      return validator(url);
    } else {
      console.log('잘못된 입력입니다.');
    }
  }
};

export default input;
