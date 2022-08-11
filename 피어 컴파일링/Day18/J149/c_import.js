import fs from 'fs';
import INSERT from './c_insert.js';

export default function IMPORT(tableName, args) {
    // IMPORT FROM table_name TO table_name
    // IMPORT FROM COMPARE TO BILLBOARD
    if(!validateArgs(args)) {
        console.log("invalid arguments!");
        return;
    }

    // 읽을 파일이 이미 있는지 검증
    if(!fs.existsSync('./' + tableName + '.csv')) {
        console.log(tableName + ".csv does not exist!");
        return;
    }

    let fileContent = fs.readFileSync('./' + tableName + '.csv').toString().split('\n');
    const headers = fileContent[0].split(',');
    // header.substring(1) = 자료형 제외 순수이름 파싱

    const reg = /TO (?<dest>\w+)/i;
    let {groups: {dest}} = args.match(reg);
    let toFileContent = fs.readFileSync('./' + dest + '.csv').toString().split('\n');
    const toHeaders = toFileContent[0].split(',');
    
    
    
    // INSERT 전에 헤더 짝을 맞추는 작업이 필요
    const orderArr = matchHeaders(headers, toHeaders);
    //console.log(orderArr);

    // from의 원소를 orderArr 순서로 재정렬해서 insert
    // (column1, column2, column3, ...) VALUES (value1, value2, value3, ...)

    let argString = [];

    let insert_headers = [];
    toHeaders.slice(1).forEach(el => {
        insert_headers.push(el.substring(1));
    })
    for(var i=1; i<fileContent.length; i++) {
        let row = fileContent[i].split(',');
        let vals = [];
        for(var j=1; j<row.length; j++) {
            vals.push(row[orderArr.indexOf(j)]);
        }
        if(!searchRecord(toFileContent, vals)) {
            argString.push('(' + insert_headers.join(", ") + ') VALUES (' + vals.join(", ") + ')');
            //console.log('(' + insert_headers.join(", ") + ') VALUES (' + vals.join(", ") + ')');
        }
        
    }

    console.log("IMPORT COUNT = " + argString.length);
    argString.forEach(el => INSERT(dest, el, 1));

    return;
}

function validateArgs(args) {
    const reg = /TO (?<dest>\w+)/i;
    return reg.test(args);
}

function matchHeaders(from, to) {
    // HEADERS의 배열을 각각 args로 받음

    if(from.length !== to.length) return; // 헤더 수가 맞지 않음
    if(countTypes(from)[0] !== countTypes(to)[0]) return; // 헤더 문자열, 숫자 타입 수가 맞지 않음

    let orderArr = [];
    for(var i=0; i<from.length; i++) {
        let order = -1;
        if(hasEqualType(from[i], to[i])) order = i;
        orderArr.push(order);
    }
    // 이제 -1인 부분만 바꿔줘야함
    for(var i=0; i<from.length; i++) {
        if(orderArr[i] === -1) {
            for(var j=i+1; j<from.length; j++) {
                if(orderArr[j] === -1 && !hasEqualType(from[j], from[i])) {
                    orderArr[i] = j;
                    orderArr[j] = i;
                }
            }
        }
    }
    return orderArr;
}

function countTypes(arr) {
    let str = 0;
    let num = 0;
    arr.forEach(el => {
        if(el.charAt(0) === '+') str++;
        else num++;
    })
    return [str, num];
}

function hasEqualType(h1, h2) {
    return h1.charAt(0) === h2.charAt(0);
}

function searchRecord(arr, rec) {
    let row = rec.join(",");
    for(var i=0; i<arr.length; i++) {
        let row2 = arr[i].split(",").slice(1).join(",");
        if(row === row2) {
            return i;
        }
    }
    return;
}