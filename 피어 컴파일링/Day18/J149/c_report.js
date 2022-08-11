import fs from 'fs';

export default function REPORT(tableName, args) {
    // Example here
    
    // NO ARGS
    
    // 파일이 이미 있는지 검증
    if(!fs.existsSync('./' + tableName + '.csv')) {
        console.log(tableName + ".csv does not exist!");
        return;
    }

    let fileContent = fs.readFileSync('./' + tableName + '.csv').toString().split('\n');
    const headers = fileContent[0].split(',');
    
    let cols = headers.filter((v, i, arr) => i>0).join(", ").replace(/[\+\-]/g, "");
    let numOfRecords = fileContent.length - 1;
    let firstRecord, lastRecord;
    if(fileContent.length > 1) {
        firstRecord = '(' + fileContent[1].replace(/,/g, ", ") + ')';
        lastRecord = '(' + fileContent[fileContent.length-1].replace(/,/g, ", ") + ')';
    }

    console.log("컬럼 종류 : " + cols);
    console.log("전체 레코드 수 : " + numOfRecords);
    console.log("최초 레코드 : " + firstRecord);
    console.log("마지막 레코드 : " + lastRecord);
}