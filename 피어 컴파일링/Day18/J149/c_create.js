import fs from 'fs';

export default function CREATE(tableName, args) {
    // CREATE TABLE table_name (column1 datatype, column2 datatype, column3 datatype)
    if(!validateArgs(args)) {
        console.log("invalid arguments!");
        return;
    }

    // 파일이 이미 있는지 검증
    if(fs.existsSync('./' + tableName + '.csv')) {
        console.log(tableName + ".csv already exists!");
        return;
    }

    let fileContent = '-id';
    
    // args가 제공되었을 경우
    // 생각해보니 컬럼 무조건 필요함
    
    const cols = args.replace(/[\(\)]/g, '').split(", ");
    
    if(cols.length > 9) {
        console.log("Too many columns!");
        return;
    }
    for(var i=0; i<cols.length; i++) {
        fileContent += ',';
        let [colName, colType] = cols[i].split(' ');
        if(!colType.match(/(string|numeric)/i)) {
            console.log("Column type should be String or Numeric, Not " + colType + "!");
            return;
        }
        if(colName.toLowerCase() === 'id') {
            console.log("Column name must not be ID!");
            return;
        }
        let column = '';
        // +String -Numeric
        if(colType.toLowerCase() === 'string') column = '+';
        else column = '-';
        column += colName;
        fileContent += column;
    }

    //fileContent += '\n-----------';
    
    fs.writeFileSync('./' + tableName + '.csv', fileContent);
    console.log("Successfully created table!");
}

function validateArgs(args) {
    //const reg = /\((?:(\w+ \w+)(?:, )?)*\)/i;
    const reg = /\(((\w+ \w+)(, )?)*\)/i;
    return reg.test(args);
}