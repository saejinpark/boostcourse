import fs from 'fs';

export default function INSERT(tableName, args, flag = 0) {
    // INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...)
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

    //ID 인덱스 구하기
    let id_index = 1;
    if(fileContent.length > 1) {
        id_index = parseInt(fileContent[fileContent.length-1].split(',')[0]) + 1;
    }
    
    // args에 포함된 header와 value 값 가져오기
    const {groups : {inputHeaders, inputValues}} = args.match(/\((?<inputHeaders>[\w, ]+)\) VALUES \((?<inputValues>[\w, "]+)\)/i);
    const iHeaders = inputHeaders.split(', ');
    const iVals = inputValues.replace(/["']/g, "").split(', ');
    
    const newInput = matchHeaders(headers, iHeaders, iVals);
    if(!newInput) {
        console.log("Invalid arguments!");
        return;
    }
    
    // csv에 새로 추가할 레코드 String 생성
    let newRow = '';
    newRow += id_index + ',';
    newRow += newInput.join(',');

    // IMPORT로 호출된 경우 출력 분기
    if(flag === 0) console.log("INSERTED (" + newRow + ")");
    if(flag === 1) console.log("(" + newRow + ")");

    newRow = '\n' + newRow;
    fs.appendFileSync('./' + tableName + '.csv', newRow);

    return 0;
}

function validateArgs(args) {
    const reg = /\([\w, ]+\) VALUES \([\w, "]+\)/i;
    return reg.test(args);
}

function matchHeaders(headers, iHeaders, iVals) {
    let ret = [];
    let errorFlag = 0;
    if(headers.length - 1 !== iHeaders.length) errorFlag = 1; // 테이블 헤더와 입력 헤더 수가 안맞음
    if(iHeaders.length !== iVals.length) errorFlag = 1; // 입력 데이터의 헤더와 밸류 수가 안맞음

    headers.slice(1).forEach(el => {
        let type = 0; // NUMERIC
        if(el.charAt(0) === '+') type = 1; //STRING
        
        const originHeader = el.slice(1);
        for(var i=0; i<iHeaders.length; i++) {
            if(iHeaders[i].toLowerCase() === originHeader) {
                // 타입에 안맞는 value가 있을 경우 에러 반환
                if(type === 0) {
                    if(iVals[i].match(/\D/g)) errorFlag = 1;
                }
                // String엔 숫자가 포함되어도 괜찮아서 지웠음
                ret.push(iVals[i]);
                return;
            }
        }
        errorFlag = 2;
    })
    if(ret.length !== iVals.length) errorFlag = 1; // 헤더 이름이 일치하지 않는 컬럼이 있음
    // Flag 1 : 타입불일치 2 : 컬럼오류
    if(errorFlag === 0) return ret;
    return;
}