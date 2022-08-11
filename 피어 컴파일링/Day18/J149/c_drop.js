import fs from 'fs';

export default function DROP(tableName, args) {
    // DROP TABLE table_name
    
    // NO ARGS

    // 파일이 이미 있는지 검증
    if(!fs.existsSync('./' + tableName + '.csv')) {
        console.log(tableName + ".csv does not exist!");
        return;
    }

    
    fs.unlinkSync('./' + tableName + '.csv');
    console.log("Successfully deleted table!");
}