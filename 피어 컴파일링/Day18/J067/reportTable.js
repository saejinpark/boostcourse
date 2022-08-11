const fs = require('fs');
const chalk = require('chalk');

function reportTable(input) {
    const fileName = input.split('report table ')[1]+'.csv';
    if (!fs.existsSync(`./${fileName}`)) {
        console.log(chalk.red('ERROR! 존재하지 않는 TABLE입니다.\n'));
        return false;
    }
    
    const data = fs.readFileSync(fileName, 'utf-8').split('\n');

    console.log(chalk.yellow('====요약 REPORT===='));
    console.log(`컬럼 종류 : ${data[0].split(',').slice(1,)}`);
    console.log(`전체 레코드 수 : ${data.length - 2}`);
    console.log(`최초 레코드 : ${data[2]}`);
    console.log(`마지막 레코드 : ${data.at(-1)}`);
    console.log();
}

module.exports = {
    reportTable
}