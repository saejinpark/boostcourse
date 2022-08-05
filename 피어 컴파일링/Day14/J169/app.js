import {getInput} from './Input.js';
import {request} from "./HTTP.js";
import NodeCache from 'node-cache';

const myCache = new NodeCache();

async function run (){
    const url = await getInput();
    request(url, url, 0, myCache);
}
run();