const fs = require('fs');
const chalk = require('chalk');

function deleteFrom (input) {
    const fileName = input.split('delete from ')[1].split(' ', 1)+'.csv';
    if (!fs.existsSync(`./${fileName}`)) {
        console.log(chalk.red('ERROR! 존재하지 않는 TABLE입니다.\n'));
        return false;
    }

    const tmp = input.split(/\s|\=/).filter(Boolean);
    const value = tmp.at(-1);
    const column = tmp.at(-2);

    const data = fs.readFileSync(`${fileName}`, 'utf-8').split('\n');
    const columnIdx = data[0].split(',').indexOf(column);

    if (columnIdx === -1) {
        console.log(chalk.red('ERROR! 존재하지 않는 Column명입니다.\n'));
        return false;
    }
    let flag = 0;
    let newData = '';
    newData += data[0] + '\n' + data[1];

    for (let i = 2; i < data.length; i++ ){
        if (data[i].split(',').filter(Boolean)[columnIdx] === value) {
            console.log(chalk.cyan(`DELETED (${data[i]})`));
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
    deleteFrom
}