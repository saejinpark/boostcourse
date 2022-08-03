import init from './init.js';
import commit from './commit.js';
import log from './log.js';
import restore from './restore.js';
import { COMMAND } from './constants.js';
const validate = (input) => {
  const inputArr = input.split(' ');
  if (inputArr[0] !== 'mit') throw new Error('How about using mit');
  if (!inputArr[1]) throw new Error('올바른 명령어를 입력해주세요!');
  if (!inputArr[2]) throw new Error('디렉토리명을 입력하여주세요!');
  const [_, command, dir] = inputArr;
  if (command === COMMAND.RESTOTRE) {
    if (!inputArr[3]) throw new Error('리스토어는 커밋 해시를 요구합니다.');
  }

  switch (command) {
    case COMMAND.INIT:
      init(dir);
      break;
    case COMMAND.COMMIT:
      commit(dir);
      break;
    case COMMAND.LOG:
      log(dir);
    case COMMAND.RESTOTRE:
      restore(dir, inputArr[3]);
    default:
      break;
  }
};

export default validate;
