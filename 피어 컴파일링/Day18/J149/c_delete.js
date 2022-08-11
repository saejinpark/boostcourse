import fs from 'fs';


export default function DELETE(tableName, args) {
    // DELETE FROM table_name WHERE col = val
    // DELETE FROM billboard WHERE singer = "BTS"
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
    const {groups : {col, val}} = args.match(/WHERE (?<col>[\w]+) *= *(?<val>[\w "]+)/i);
    
    // condition에서 체크해야하는 컬럼 인덱스 찾기
    let colidx = -1;
    for(var i=0; i<headers.length; i++) if(headers[i].substring(1) === col.toLowerCase()) colidx = i;
    if(colidx === -1) {
        console.log("No such column named " + col);
        return;
    }
    
    let newContent = fileContent[0]; // 조건을 만족시키는 레코드를 제외한 새 파일 내용을 구성
    let deleted = []; // 지워진 레코드를 담을 배열
    for(var i=1; i<fileContent.length; i++) {
        let vals = fileContent[i].split(',');
        if(vals[colidx] !== val.replace(/["']/g, "")) { // condition 체크
            newContent += '\n' + fileContent[i];
        } else {
            deleted.push("(" + vals.join(', ') + ")");
        }
    }
    
    if(deleted.length === 0) {
        console.log("조건에 맞는 데이터가 존재하지 않습니다.");
        return;
    }
    deleted.forEach(el => console.log("DELETED " + el));

    fs.writeFileSync('./' + tableName + '.csv', newContent);
    return;
}

function validateArgs(args) {
    //const reg = /\((?:(\w+ \w+)(?:, )?)*\)/i;
    const reg = /WHERE (?<col>[\w]+) *= *(?<val>[\w "]+)/i;
    return reg.test(args);
}