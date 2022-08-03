#!/usr/bin/env node
import * as mit from "./command.js";
(() => {
    const command = process.argv[2];
    const dirName = process.argv[3];
    try{
        if(command === undefined || dirName === undefined) throw ("[mit 명령어 디렉토리명] 형식으로 입력해주세요.")
        switch(command){
            case "init":
                mit.init(dirName);
                break;
            case "commit":
                mit.commit(dirName)
                break;
            case "log":
                mit.log(dirName)
                break;
            case "restore":
                const commitHash = process.argv[4];
                if(commitHash === undefined) throw ("restore 명령어는 커밋 해시값을 필요로 합니다.")
                mit.restore(dirName, commitHash)
                break;
            default:
                throw ("올바른 명령어를 입력해주세요.(init, commit, log, restore)")
        }
    }catch(error){
        console.log(error)
    }
})();