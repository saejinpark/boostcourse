import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import * as Init from "./init.js"
import * as Blob from "./blob.js"
import * as Tree from "./tree.js"

/**
 * commit object의 동작 모아둔 tree 모듈
 */

/**
 * commit 명령
 * @param {string} dirName 
 */
export function commit(dirName){
    Init.checkInitMit(dirName);

    const fileListForBlob = checkNewFile(dirName);
    if(fileListForBlob.length === 0) throw ("commit할 파일이 존재하지 않습니다. ")
    
    const fileListForTree = Blob.createBlob(dirName, fileListForBlob);

    const treeContentHash = Tree.createTree(dirName, fileListForTree);

    createCommit(dirName, treeContentHash);
}

/**
 * 처음 commit 이거나 해시값이 달라진 파일 리스트 찾기
 * @param {*} dirName 
 * @returns commit 대상 파일 리스트
 */
function checkNewFile(dirName){
    const fileList = [];
    const newFileList = [];
    const targetDir = path.resolve(dirName);
    fs.readdirSync(targetDir, {withFileTypes : true}).forEach(file => {
        if(!file.isDirectory()){
            fileList.push(path.join(dirName, file.name))
        }
    });
    fileList.map(async (file)=>{
        const data = fs.readFileSync(file, 'utf8');
        const hash = createHash('sha256').update(data).digest('hex')
        const targetFileDir = path.join(dirName, '.mit', 'objects', hash.substr(0, 8), hash.substr(8))
        if (!fs.existsSync(targetFileDir)) {
            newFileList.push(file)
        }
    });
    return newFileList
}

/**
 * commit 오브젝트 생성
 * @param {string} dirName 
 * @param {string} curTreeHash 
 */
export function createCommit(dirName, curTreeHash){
    const prevTreeHash = getPrevTreeHash(dirName);
    const lineOne = [prevTreeHash, curTreeHash].join(', ')
    const date = new Date();
    const lineTwo = date.toString();
    const CommitContent = [lineOne, lineTwo].join('\n');
    const CommitContentHash = createHash('sha256').update(CommitContent).digest('hex');
    const newCommitDir = path.join(dirName, '.mit', 'objects', CommitContentHash.substr(0, 8));
    const newCommitContentPath = path.join(newCommitDir, CommitContentHash.substr(8));
    fs.mkdirSync(newCommitDir);
    fs.writeFileSync(newCommitContentPath, CommitContent, { flag: 'w+' });

    writeCommitHistory(dirName, CommitContentHash);
}

/**
 * 이전 tree 해시값을 가져옴
 * @param {string} dirName 
 * @returns 이전 tree 해시값
 */
function getPrevTreeHash(dirName){
    const indexCommitsFilePath = path.join(dirName, '.mit', 'index', "commits");
    if (!fs.existsSync(indexCommitsFilePath)) return null;
    const indexCommitsContent = fs.readFileSync(indexCommitsFilePath, 'utf8').split('\n')[0];
    const commitDir = indexCommitsContent.substr(0, 8);
    // !!!!!!!!!!!! blob 지우기
    const commitPath = path.join(dirName, '.mit', 'objects', commitDir, indexCommitsContent.substr(8));
    const prevTreeHash = fs.readFileSync(commitPath, 'utf8').split('\n')[0].split(', ')[1];
    return prevTreeHash;
}

/**
 * 커밋 기록을 index에 기록
 * @param {string} dirName 
 * @param {string} CommitContentHash 
 */
function writeCommitHistory(dirName, CommitContentHash){
    const indexCommitsFilePath = path.join(dirName, '.mit', 'index', "commits");
    if (!fs.existsSync(indexCommitsFilePath)){
        fs.writeFileSync(indexCommitsFilePath, CommitContentHash, { flag: 'w+' });
    }else{
        const prevContent = fs.readFileSync(indexCommitsFilePath, 'utf8');
        fs.writeFileSync(indexCommitsFilePath, [CommitContentHash, prevContent].join('\n'), { flag: 'w+' });
    }
}