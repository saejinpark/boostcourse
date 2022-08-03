import fs from "fs";
import path from "path";
import zlib from "zlib";
import * as Init from "./init.js"

/**
 * restore 명령어
 * @param {string} dirName 
 * @param {string} commitHash 
 */
export function restore(dirName, commitHash){
    Init.checkInitMit(dirName);
    if (!fs.existsSync(path.join(dirName, '.mit', 'index', 'commits'))) throw ("commit 기록이 없습니다.");
    if(commitHash.length !== 8 && commitHash.length !== 64) throw ("8자리나 64자리의 커밋해시값이 필요합니다.");
    
    const targetCommit = findTargetCommit(commitHash, dirName);

    indexCommitsIterator(targetCommit, dirName)
}

/**
 * 사용자가 입력한 커밋 해시값을 찾음
 * @param {string} commitHash 
 * @param {string} dirName 
 * @returns 
 */
function findTargetCommit(commitHash, dirName){
    const commitFileList = [];
    if(commitHash.length === 8) {
        const commitDir = path.join(dirName, '.mit', 'objects',commitHash);
        if (!fs.existsSync(commitDir)) throw ("해당 커밋해시값이 존재하지 않습니다.")
        fs.readdirSync(commitDir, {withFileTypes : true}).forEach(file => {
            if(!file.isDirectory()){
                commitFileList.push(commitHash+file.name)
            }
        });
        if(commitFileList.length > 1) throw ("해당 object 디렉토리에 커밋 파일이 1개이상 존재해 복원할 수 없습니다. 정확한 64자리를 입력해주세요.")
    }else{
        const commitDir = path.join(dirName, '.mit', 'objects', commitHash.substr(0,8), commitHash.substr(8));
        if (!fs.existsSync(commitDir)) throw ("해당 커밋해시값이 존재하지 않습니다.")
        commitFileList.push(commitHash)
    }
    // console.log(commitFileList)
    return commitFileList[0];
}

/**
 * 최신 커밋부터 복원하면서 목표 커밋을 찾아감
 * @param {string} targetCommit 
 * @param {string} dirName 
 */
function indexCommitsIterator(targetCommit, dirName){
    while(true){
        const indexCommitsFilePath = path.join(dirName, '.mit', 'index', "commits");
        const indexCommitsContent = fs.readFileSync(indexCommitsFilePath, 'utf8');
        const curCommit = indexCommitsContent.split('\n')[0];
        const commitPath = path.join(dirName, '.mit', 'objects', curCommit.substr(0,8), curCommit.substr(8));
        const curTreeHash = fs.readFileSync(commitPath, 'utf8').split('\n')[0].split(', ')[1];
        const treePath = path.join(dirName, '.mit', 'objects', curTreeHash.substr(0,8), curTreeHash.substr(8));
        const treeContent = fs.readFileSync(treePath, 'utf8').split('\n');
        const blob = [];
        const fileName = [];
        treeContent.map((content)=>{
            blob.push(content.split(', ')[0])
            fileName.push(content.split(', ')[2])
        })
        blob.map((blob, i) =>{
            const blobHash = blob.split(', ')[0];
            const blobPath = path.join(dirName, '.mit', 'objects', blobHash.substr(0,8), blobHash.substr(8));
            let blobContent = fs.readFileSync(blobPath, 'utf8')
            blobContent = zlib.gunzipSync(new Buffer.from(blobContent, 'base64')).toString('utf8');
            fs.writeFileSync(fileName[i], blobContent, { flag: 'w+' });
        })
        if(commitCompare(targetCommit, curCommit, fileName, indexCommitsContent, indexCommitsFilePath, dirName)) break;
    }
}

/**
 * 목표 커밋과 현재 순회하고 있는 커밋이 같은 커밋인지 확인
 * @param {string} targetCommit 
 * @param {string} curCommit 
 * @param {Array} fileName 
 * @param {string} indexCommitsContent 
 * @param {string} indexCommitsFilePath 
 * @param {string} dirName 
 * @returns 
 */
function commitCompare(targetCommit, curCommit, fileName, indexCommitsContent, indexCommitsFilePath, dirName){
    if(targetCommit===curCommit){
        const fileList = [];
        fs.readdirSync(dirName, {withFileTypes : true}).forEach(file => {
            if(!file.isDirectory()){
                fileList.push(path.join(dirName, file.name))
            }
        });
        fileList.map((file)=>{
            if(!fileName.includes(file)){
                fs.unlinkSync(file);
            }
        })
        console.log(`${curCommit}으로 restore가 완료되었습니다. `);
        return true;
    }
    const remain = indexCommitsContent.split('\n').slice(1).join('\n');
    fs.writeFileSync(indexCommitsFilePath, remain, { flag: 'w+' });
    return false;
}