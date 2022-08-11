const fs = require('fs');
const chalk = require('chalk');

function update (input, columnType) {
    let flag = 0;
    const fileName = input.split('update ')[1].split(' ', 1)+'.csv';
    if (!fs.existsSync(`./${fileName}`)) {
        console.log(chalk.red('ERROR! 존재하지 않는 TABLE입니다.\n'));
        return false;
    }
    
    const tmp = input.split(/\s|\=/).filter(Boolean);
    const value = tmp.at(-1);
    const column = tmp.at(-3);
    const setColumn = tmp[3];
    const setValue = tmp[4];

    if (!(column in columnType) || !(setColumn in columnType)) {
        console.log(chalk.red('ERROR! 존재하지 않는 Column명입니다.\n'));
        return false;
    }
    if (columnType[setColumn] === 'string') {
        if (!(/\"\w+\"/).test(setValue)) {
            console.log(chalk.red('ERROR! 데이터 타입이 잘못되었습니다.\n'));
            return false;
        }
    } else {
        if ((/\d+/).test(setValue)) {
            console.log(chalk.red('ERROR! 데이터 타입이 잘못되었습니다.\n'));
            return false;
        }
    }

    const data = fs.readFileSync(`${fileName}`, 'utf-8').split('\n');
    const columnIdx = data[0].split(',').indexOf(column);
    const setColumnIdx = data[0].split(',').indexOf(setColumn);

    let newData = '';
    newData += data[0] + '\n' + data[1];

    for (let i = 2; i < data.length; i++ ){
        if (data[i].split(',').filter(Boolean)[columnIdx] === value) {
            let tmpData = data[i].split(',');
            tmpData[setColumnIdx] = setValue; 
            console.log(chalk.cyan(`UPDATE (${tmpData.join(',')})`));
            newData += `\n${tmpData.join(',')}`;
            flag = 1;
        } else {
            newData += `\n${data[i]}`;
        }
    }
    if (flag === 0) {
        console.log(chalk.red('ERROR! 조건에 맞는 데이터가 존재하지 않습니다.\n'));
        return false;
    }

    fs.writeFileSync(fileName, newData);
    return true;
}

module.exports = {
    update
}