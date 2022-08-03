import fs from "fs";
import path from "path";

/**
 * .mit 하위 디렉토리 만들기
 * @param {string} dirName 
 */
export function init(dirName){
    const dirpPaths = ['index', 'objects'].map((subDir)=>path.resolve(dirName, '.mit', subDir));
    dirpPaths.map(dirPath => {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true })
        }else{
            throw ("이미 Mit이 존재합니다.")
        }
    });
}

/**
 * init 여부를 확인
 * @param {string} dirName 
 */
export function checkInitMit(dirName){
    if (!fs.existsSync(path.resolve(dirName, '.mit'))) {
        throw ("mit init 부터 해주세요.")
    }
}