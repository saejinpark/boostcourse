import fs from 'fs';
import { makeFileHash } from './hash.js';
import { makeBlob, searchFile } from './util.js';

const commit = (dir) => {
  const path = './' + dir;
  //path 있는 지 확인해야함
  //커밋은 있는데 해쉬 변경이 없으면
  //   if (
  //     findCommit(path)
  //     // && noHashChanging(dir)
  //   ) {
  //     console.log('변경사항이 없습니다.');
  //     return;
  //   }
  //   if (!findCommit(path)) {
  //     makeFileHash(path);
  //   }
  makeFileHash(path);
};

export const findCommit = (path) => fs.existsSync(path + '/.mit/index/commits');

export default commit;
