import fs from 'fs';

export default function UPDATE(tableName, args) {
    // UPDATE table_name SET column1 = value1 WHERE condition
    // UPDATE billboard SET song = "Butter" WHERE id = 1
    
    if(!validateArgs(args)) {
        console.log("invalid arguments!");
        return;
    }

    // 파일이 이미 있는지 검증
    if(!fs.existsSync('./' + tableName + '.csv')) {
        console.log(tableName + ".csv does not exist!");
        return;
    }

    let fileContent = fs.readFileSync('./' + tableName + '.csv').toString().split('\n');
    const headers = fileContent[0].split(',');
    // header.substring(1) = 자료형 제외 순수이름 파싱
    const {groups : {newCol, newVal, col, val}} = args.match(/SET (?<newCol>[\w]+) *= *(?<newVal>[\w"]+) WHERE (?<col>[\w]+) *= *(?<val>[\w "]+)/i);
    
    // 해당 컬럼 인덱싱
    let colidx = -1;
    let changeCol = -1;
    for(var i=0; i<headers.length; i++) {
        if(headers[i].substring(1) === col.toLowerCase()) colidx = i;
        if(headers[i].substring(1) === newCol.toLowerCase()) changeCol = i;
    }
    if(colidx === -1 || changeCol === -1) {
        console.log("No such column");
        return;
    }
    
    let newContent = fileContent[0]; // 파일의 내용을 새로 작성
    let updated = [];
    for(var i=1; i<fileContent.length; i++) {
        let vals = fileContent[i].split(',');
        if(vals[colidx] !== val.replace(/["']/g, "")) {
            newContent += '\n' + fileContent[i];
        } else {
            // condition을 만족시키는 레코드의 내용을 변경하여 기록
            vals[changeCol] = newVal.replace(/["']/g, "");
            newContent += '\n' + vals.join(',');
            updated.push("(" + vals.join(', ') + ")");
        }
    }
    
    if(updated.length === 0) {
        console.log("조건에 맞는 데이터가 존재하지 않습니다.");
        return;
    }
    updated.forEach(el => console.log("UPDATED " + el));

    fs.writeFileSync('./' + tableName + '.csv', newContent);
    return;
}

function validateArgs(args) {
    const reg = /SET (?<col>[\w]+) *= *(?<val>[\w"]+) WHERE (?<scol>[\w]+) *= *(?<sval>[\w "]+)/i;
    return reg.test(args);
}