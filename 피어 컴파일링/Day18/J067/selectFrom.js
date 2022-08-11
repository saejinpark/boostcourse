const fs = require('fs');
const chalk = require('chalk');

function selectFrom(input) {
    const fileName = input.split('select from ')[1].split(' ', 1)+'.csv';
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
    const selectData = [];

    for (let i = 2; i < data.length; i++ ){
        if (data[i].split(',').filter(Boolean)[columnIdx] === value) {
            selectData.push(data[i]);
            flag = 1;
        }
    }
    if (flag === 0) {
        console.log(chalk.red('ERROR! 조건에 맞는 데이터가 존재하지 않습니다.\n'));
        return false;
    }

    console.log(chalk.cyan(`SELECTED COUNT = ${selectData.length}`));
    selectData.map((r) => {
        console.log(`(${r})`);
    })
    console.log();
    
    return true;
}

module.exports = {
    selectFrom
}