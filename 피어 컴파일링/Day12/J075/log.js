import fs from "fs";
import path from "path";
import * as Init from "./init.js"

/**
 * log 명령
 * @param {string} dirName 
 */
export function log(dirName){
    Init.checkInitMit(dirName);
    const indexCommitsFilePath = path.join(dirName, '.mit', 'index', 'commits');
    if (!fs.existsSync(indexCommitsFilePath)) throw ("commit 기록이 없습니다.");
    const commitsContent = [...fs.readFileSync(indexCommitsFilePath, 'utf8').split('\n')].reverse();
    commitIterator(commitsContent, dirName);
}

/**
 * 커밋 기록을 순회하는 함수
 * @param {*} commitsContent 
 * @param {string} dirName
 */
function commitIterator(commitsContent, dirName){
    commitsContent.map((commitHash)=>{
        const commitDir = commitHash.substr(0, 8);
        const commitPath = path.join(dirName, '.mit', 'objects', commitDir, commitHash.substr(8));
        const treeHash = fs.readFileSync(commitPath, 'utf8').split('\n')[0].split(', ')[1];
        const date = fs.readFileSync(commitPath, 'utf8').split('\n')[1]
        const treeDir = path.join(dirName, '.mit', 'objects', treeHash.substr(0, 8));
        const treeContentPath = path.join(treeDir, treeHash.substr(8));
        const treeContentList = fs.readFileSync(treeContentPath, 'utf8').split('\n');
        const fileName = [];
        treeContentList.map((treeContent)=>{
            fileName.push(treeContent.split(', ')[2])
        })
        logPrinter(commitHash, fileName, date);
    })
}

/**
 * 커밋 기록 출력
 * @param {string} commitHash 
 * @param {Array} fileName 
 * @param {string} date 
 */
function logPrinter(commitHash, fileName, date){
    console.log(`commit             ${commitHash}`)
    console.log(`changed file name  ${fileName.join(', ')}`)
    console.log(`Date               ${date}\n`)
}