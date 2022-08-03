import fs from "fs";
import path from "path";
import { createHash } from "crypto";
/**
 * tree object의 동작 모아둔 tree 모듈
 */

/**
 * tree 오브젝트 생성
 * @param {string} dirName 
 * @param {Array} fileList 
 * @returns 
 */
export function createTree(dirName, fileList){
    const treeContent = createTreeContent(fileList);
    const treeContentHash = createHash('sha256').update(treeContent).digest('hex');
    const newTreeDir = path.join(dirName, '.mit', 'objects', treeContentHash.substr(0, 8));
    const newTreeContentPath = path.join(newTreeDir, treeContentHash.substr(8));
    fs.mkdirSync(newTreeDir);
    fs.writeFileSync(newTreeContentPath, treeContent, { flag: 'w+' });
    return treeContentHash;
}

/**
 * Tree 오브젝트 내용을 작성
 * @param {Array} fileList 
 * @returns tree 오브젝트 내용
 */
function createTreeContent(fileList){
    const treeContent = [];
    fileList.map((file)=>{
        const blobPath = file[0];
        const blobContentHash = file[1];
        const fileName = file[2];
        const blobSize = fs.statSync(blobPath).size;
        treeContent.push([blobContentHash, blobSize, fileName].join(', '));
    })
    return treeContent.join('\n');
}