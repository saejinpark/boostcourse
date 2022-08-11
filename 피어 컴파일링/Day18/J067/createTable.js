const fs = require('fs');
const chalk = require('chalk');

function createTable(input, columnType) {
    let flag = 0;

    const fileName = input.split('create table ')[1].split(' ', 1)+'.csv';
    if (fs.existsSync(`./${fileName}`)) {
        console.log(chalk.red('ERROR! 이미 존재하는 TABLE입니다.\n'));
        return false;
    }

    const columnList = [];
    const columnInfo = input.match(/\(([a-zA-Z0-9"]+\,?\s?)+\)/g)[0].slice(1, -1).split(', ');
    columnType['id'] = 'numeric';
    columnInfo.reduce((prev, cur) => {
        let tmp = cur.split(' ');
        if (tmp.length > 2) flag = 1;   // 컬럼에 띄어쓰기 있는 경우
        const type = tmp[1];
        const column = tmp[0];

        columnList.push(column);
        columnType[column] = type;
    }, '');

    if (flag === 1) {
        console.log(chalk.red('ERROR! 띄어쓰기를 포함할 수 없습니다.\n'));
        return false;
    }
    if (columnList.includes('id')) {
        console.log(chalk.red('ERROR! id 컬럼은 추가할 수 없습니다.\n'));
        return false;
    }

    columnList.unshift('id');
    let data = columnList.join(',') + '\n----------';

    fs.writeFileSync(fileName, data);
    console.log(chalk.cyan('SUCCESS! TABLE이 생성되었습니다.\n'));

    return true;
}

module.exports = {
    createTable
}