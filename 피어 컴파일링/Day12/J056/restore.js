import fs from 'fs';
import { unzip } from 'zlib';
import { promisify } from 'util';
const restore = (dir, hash) => {
  const root = hash.slice(0, 8);
  const fileName = hash.slice(8);
  const data = fs.readFileSync(`${dir}/.mit/objects/${root}/${fileName}`);
  const do_unzip = promisify(unzip);
  do_unzip(data)
    .then((buf) => console.log(buf.toString()))
    .catch((err) => {
      console.error('An error occurred:', err);
      process.exitCode = 1;
    });
};

export default restore;
