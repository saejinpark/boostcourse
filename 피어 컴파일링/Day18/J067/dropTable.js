const fs = require('fs');
const chalk = require('chalk');

function dropTable (input) {
    const fileName = input.split('drop table ')[1]+'.csv';
    if (!fs.existsSync(`./${fileName}`)) {
        console.log(chalk.red('ERROR! 존재하지 않는 TABLE입니다.\n'));
        return false;
    }
    
    fs.unlinkSync(fileName);
    console.log(chalk.cyan('SUCCESS! 테이블이 삭제되었습니다.'));
    return true;
}

module.exports = {
    dropTable
}