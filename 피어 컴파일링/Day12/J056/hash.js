import crypto from 'crypto';
import fs from 'fs';
import { makeBlob, makeTree, makeCommit } from './util.js';

export const makeFileHash = (destPath) => {
  try {
    fs.readdirSync(destPath, { withFileTypes: true }).forEach((file) => {
      const path = `${destPath}/${file.name}`;
      if (file.isDirectory()) {
        if (file.name[0] === '.') return;
        makeFileHash(path);
      } else {
        const fileBuffer = fs.readFileSync(path);
        const hash = crypto.createHash('sha256');
        hash.update(fileBuffer);
        const hexHash = hash.digest('hex');
        makeBlob(destPath, file.name, hexHash)
          .then((res) => makeTree(destPath, path, res))
          .then((res) => makeCommit(destPath, res));
      }
    });
  } catch (err) {
    return console.error('Read Error', err);
  }
};
