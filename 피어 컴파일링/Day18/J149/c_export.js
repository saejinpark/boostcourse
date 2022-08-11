import fs from 'fs';


export default function EXPORT(tableName, args) {
    // EXPORT TO y2021song FROM billboard WHERE year = 2021
    if(!validateArgs(args)) {
        console.log("invalid arguments!");
        return;
    }

    const reg = /FROM (?<source>\w+) WHERE (?<col>[\w]+) *(?<op>[=\<\>]) *(?<val>[\w"]+)/i; // 부등호 연산 포함
    //const reg = /WHERE (?<col>[\w]+) *= *(?<val>[\w"]+)/i;
    const {groups : {source, col, op, val}} = args.match(reg);

    // 파일이 이미 있는지 검증
    if(!fs.existsSync('./' + source + '.csv')) {
        console.log(source + ".csv does not exist!");
        return;
    }

    let fileContent = fs.readFileSync('./' + source + '.csv').toString().split('\n');
    const headers = fileContent[0].split(',');
    // header.substring(1) = 자료형 제외 순수이름 파싱

    
    
    // 해당 컬럼 인덱싱
    let colidx = -1;
    for(var i=0; i<headers.length; i++) if(headers[i].substring(1) === col.toLowerCase()) colidx = i;
    if(colidx === -1) {
        console.log("No such column named " + col);
        return;
    }
    
    let newFileContent = headers.join(",");
    let selected = [];
    for(var i=1; i<fileContent.length; i++) {
        let vals = fileContent[i].split(',');
        if(operation(vals[colidx], op, val.replace(/["']/g, ""))) {
            newFileContent += '\n' + vals.join(',');
            selected.push("(" + vals.join(', ') + ")");
        }
    }
    
    if(selected.length === 0) {
        console.log("조건에 맞는 데이터가 존재하지 않습니다.");
        return;
    }
    console.log("EXPORT COUNT = " + selected.length);
    selected.forEach(el => console.log(el));

    fs.writeFileSync('./' + tableName + '.csv', newFileContent);
    return;
}

function validateArgs(args) {
    const reg = /FROM (?<source>\w+) WHERE (?<col>[\w]+) *(?<op>[=\<\>]) *(?<val>[\w"]+)/i; // 부등호 연산 포함
    return reg.test(args);
}

function operation(val1, op, val2) {
    if(val1.match(/\d+/) && val2.match(/\d+/)) {
        val1 = parseInt(val1);
        val2 = parseInt(val2);
    }
    if(op === '=') return val1 === val2;
    if(op === '<') return val1 < val2;
    if(op === '>') return val1 > val2;
    return;
}