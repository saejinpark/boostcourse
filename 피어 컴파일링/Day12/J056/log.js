import { findCommit } from './commit.js';
import { commitStack } from './util.js';
import fs from 'fs';
const log = (dir) => {
  if (!findCommit(dir)) {
    console.log('해당 디렉토리의 커밋 이력이 없습니다.');
    return;
  }
  const logPath = dir + '/.mit/index/commits';
  const stack = commitStack(logPath);
  stack.forEach((item) => console.log(item));
  stack.forEach((item) => {
    const root = item.slice(0, 8);
    const fileName = item.slice(8);
    const data = fs.readFileSync(`${dir}/.mit/objects/${root}/tree/${fileName}`, { encoding: 'utf8', flag: 'r' });
    const dataArr = data.split('\n');
    const itemIdx = dataArr.findIndex((str) => str === item);
    console.log(dataArr[itemIdx + 2]);
  });
};

export const searchCommit = (destPath, searchingFileName) => {
  let flag = false;
  console.log(destPath, searchingFileName);
  fs.readdirSync(destPath, { withFileTypes: true }).forEach((file) => {
    const path = `${destPath}/${file.name}`;
    if (file.isDirectory()) {
      //   if (file.name[0] === '.') return;
      searchFile(path, searchingFileName);
    } else {
      if (file.name == searchingFileName) {
        flag = true;
      }
    }
  });
  if (flag) return true;
  return false;
};
export default log;
