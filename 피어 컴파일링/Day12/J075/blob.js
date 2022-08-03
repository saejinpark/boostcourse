import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import zlib from "zlib";
/**
 * blob object의 동작 모아둔 tree 모듈
 */

/**
 * 파일별로 blob 오브젝트 생성
 * @param {string} dirName 
 * @param {Array} fileList 
 * @returns [[blob 파일 path, 대상 파일 명]...]
 */
export function createBlob(dirName, fileList){
    const fileListForTree = [];
    fileList.map(async (file)=>{
        const fileContent = fs.readFileSync(file, 'utf8');
        const fileContentHash = createHash('sha256').update(fileContent).digest('hex');
        const blobContent = zlib.gzipSync(fileContent);
        const newBlobDir = path.join(dirName, '.mit', 'objects', fileContentHash.substr(0, 8));
        const newBlobContentPath = path.join(newBlobDir, fileContentHash.substr(8))
        fs.mkdirSync(newBlobDir);
        fs.writeFileSync(newBlobContentPath, blobContent.toString('base64'), { flag: 'w+' });
        fileListForTree.push([newBlobContentPath, fileContentHash, file])
    })
    return fileListForTree
}