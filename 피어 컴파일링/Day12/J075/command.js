import * as Init from "./init.js"
import * as Commit from "./commit.js"
import * as Log from "./log.js"
import * as Restore from "./restore.js"

/**
 * 명령어를 모아둔 command 모듈
 */

/**
 * init 명령
 * @param {string} dirName 
 */
export function init(dirName){
    Init.init(dirName);
}

/**
 * commit 명령
 * @param {string} dirName 
 */
export function commit(dirName){
    Commit.commit(dirName)
}

/**
 * log 명령
 * @param {string} dirName 
 */
export function log(dirName){
    Log.log(dirName);
}

/**
 * restore 명령
 * @param {string} dirName 
 * @param {string} commitHash 
 */
export function restore(dirName, commitHash){
    Restore.restore(dirName, commitHash)
}