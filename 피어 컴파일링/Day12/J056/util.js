import fs from 'fs';
import { findCommit } from './commit.js';
import do_gzip from './zip.js';

export const searchFile = (destPath, searchingFileName) => {
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

export const makeBlob = async (path, commitFile, hash) => {
  const dirName = hash.slice(0, 8);
  const fileName = hash.slice(8);
  const blobDirPath = path + '/.mit' + '/objects/' + dirName;
  const blobFilePath = blobDirPath + '/' + fileName;
  //폴더 생성
  if (fs.existsSync(path)) {
    fs.mkdirSync(blobDirPath);
  } else console.log('mit은 해당 경로를 모릅니다.');
  //원본 압축

  await gipFiles(path + '/' + commitFile, blobFilePath);
  const stat = fs.statSync(blobFilePath);
  return [hash, stat.size, fileName];
};

export const gipFiles = async (filePath, output) => {
  console.log('gipdestPath: ', filePath);
  await do_gzip(filePath, output).then(console.log('압축하여 blob하기 성공!'));
};

export const makeTree = async (path, changeFileName, [blobHash, gipSize, blobFileName]) => {
  const dirName = blobHash.slice(0, 8);
  const blobDirPath = path + '/.mit' + '/objects/' + dirName;
  const treeFilePath = `${blobDirPath}/tree`;
  const treeFileName = blobFileName + gipSize;
  const content = `${blobHash}\n${gipSize}\n${changeFileName}`;
  //폴더를 만들자
  fs.mkdirSync(treeFilePath);
  fs.writeFile(`${treeFilePath}/${blobFileName}`, content, function (err) {
    if (err === null) {
      console.log('tree 폴더와 파일이 생성됐습니다.');
    } else {
      console.log('tree 생성에 실패하였습니다.');
    }
  });
  return [dirName, blobHash, blobFileName, null, treeFileName];
};

export const makeCommit = (path, [dirName, blobHash, blobFileName, prevTreeHash, nowTreeHash]) => {
  const blobDirPath = path + '/.mit' + '/objects/' + dirName;
  const commitLogPath = path + '/.mit' + '/index/' + 'commits';
  if (!findCommit(path)) {
    fs.writeFileSync(commitLogPath, '', function (err) {
      if (err === null) {
        console.log('첫 커밋이기에 커밋 기록파일을 생성합니다.');
      } else {
        console.log('commit 기록 파일 생성에 실패하였습니다.');
      }
    });
  }
  const stack = commitStack(commitLogPath);
  const commitFilePath = `${blobDirPath}/commit`;
  const commitDate = new Date();
  stack.push(blobHash);
  const content = `${(prevTreeHash, nowTreeHash)}\n${commitDate}`;
  fs.mkdirSync(commitFilePath);
  fs.writeFile(`${commitFilePath}/${blobFileName}`, content, function (err) {
    if (err === null) {
      console.log('commit 폴더와 파일이 생성됐습니다.');
    } else {
      console.log('commit 생성에 실패하였습니다.');
    }
  });
  fs.writeFile(commitLogPath, stack.join('\n'), function (err) {
    if (err === null) {
      console.log('commit 로그가 생성됐습니다.');
    } else {
      console.log('commit 로그 생성에 실패하였습니다.');
    }
  });
};

export const commitStack = (path) => {
  try {
    const data = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
    if (data.split('\n').length === 0) return [data];
    else {
      const stack = data.split('\n');
      //   stack.shift();
      return stack;
    }
  } catch (err) {
    console.error(err);
  }
};
