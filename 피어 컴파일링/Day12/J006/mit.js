import fs from "fs";
import { blob, tree, commitobject, showLog, backRestore } from "./functions.js";

export function init(dir) {
  try {
    fs.mkdirSync(`${dir}/.mit`, { recursive: true });
    fs.mkdirSync(`${dir}/.mit/objects`, { recursive: true });
    fs.mkdirSync(`${dir}/.mit/index`, { recursive: true });
    fs.writeFileSync(`${dir}/.mit/index/commits`, "");
  } catch (err) {
    console.error(err);
  }
}
export async function commit(dir, mitDir, prevTree) {
  if (!mitDir) throw "please 'mit init' first";
  blob(dir, mitDir);
  const treehash = await tree(mitDir, prevTree);
  await commitobject(prevTree, mitDir, treehash);
  return treehash; // 커밋 후 이전 트리 해쉬로 옮겨준다.
}

export function log(dir) {
  showLog(dir);
}

export function restore(dir, hash) {
  backRestore(dir, hash);
}
