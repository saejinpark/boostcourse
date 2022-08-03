import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import fs from 'fs';
const pipe = promisify(pipeline);

async function do_gzip(input, output) {
  console.log('input: ', input,'output: ', output);
  try {
    const gzip = createGzip();
    const source = fs.createReadStream(input);
    const destination = fs.createWriteStream(output);
    await pipe(source, gzip, destination);
  } catch (err) {
    console.error(err);
  }
}

export default do_gzip;
