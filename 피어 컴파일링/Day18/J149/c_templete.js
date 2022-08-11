import fs from 'fs';

// 복사해서 쓰기

export default function COMMAND(tableName, args) {
    // Example here
    
    if(!validateArgs(args)) {
        console.log("invalid arguments!");
        return;
    }

    // 파일이 이미 있는지 검증
    if(!fs.existsSync('./' + tableName + '.csv')) {
        console.log(tableName + ".csv does not exist!");
        return;
    }

    
}

function validateArgs(args) {
    //const reg = /\((?:(\w+ \w+)(?:, )?)*\)/i;
    const reg = /\(((\w+ \w+)(, )?)*\)/i;
    return reg.test(args);
}