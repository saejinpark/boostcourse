const fs = require('fs');
const chalk = require('chalk');

function insertInto (input, columnType, idx) {
    let flag = 0;
    const splitInput = input.split('insert into ')[1];
    const fileName = splitInput.split(' ', 1)+'.csv';
    if (!fs.existsSync(`./${fileName}`)) {
        console.log(chalk.red('ERROR! 존재하지 않는 TABLE입니다.\n'));
        return false;
    }

    const arr = input.match(/\(([a-zA-Z0-9"]+\,?\s?)+\)/g);
    const columnList = arr[0].slice(1, -1).split(', ');
    const valueList = arr[1].slice(1, -1).split(', ');
    if (columnList.length !== (Object.keys(columnType).length - 1)) {
        console.log(chalk.red('ERROR! 컬럼 갯수가 일치하지 않습니다.\n'));
        return false;
    }

    const data = [];
    data.push(idx);

    columnList.forEach((el, i) => {
        if (columnType[el] === 'string') {
            if ((/\"\w+\"/).test(valueList[i])) data.push(valueList[i]);
            else flag = 1;
        } else {
            if ((/\d+/).test(valueList[i])) data.push(valueList[i]);
            else flag = 1;
        }
    })

    if (flag === 1) {
        console.log(chalk.red('ERROR! 데이터 타입이 잘못되었습니다.\n'));
        return false;
    }

    fs.appendFileSync(fileName, '\n'+data.join(','));
    console.log(chalk.cyan(`INSERTED (${data.join(', ')})\n`));

    return true;
}

module.exports = {
    insertInto
}