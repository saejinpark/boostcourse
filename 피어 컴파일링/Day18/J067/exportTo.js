const fs = require('fs');
const chalk = require('chalk');

function exportTo(input) {
    const splitInput = input.split('export to ')[1];
    const fileName = splitInput.split(' ', 3)[2]+'.csv';
    const exportFileName = splitInput.split(' ', 3)[0]+'.csv';
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
    let newData = '';
    let exportCnt = 0;
    newData += data[0] + '\n' + data[1];

    for (let i = 2; i < data.length; i++ ){
        if (data[i].split(',').filter(Boolean)[columnIdx] === value) {
            selectData.push(data[i]);
            newData += `\n${data[i]}`;
            exportCnt += 1;
            flag = 1;
        }
    }
    
    if (flag === 0) {
        console.log(chalk.red('ERROR! 조건에 맞는 데이터가 존재하지 않습니다.\n'));
        return false;
    }

    console.log(chalk.cyan(`EXPORT COUNT = ${exportCnt}`));
    selectData.map((r) => {
        console.log(`(${r})`);
    })

    fs.writeFileSync(exportFileName, newData);

    return true;
}

module.exports = {
    exportTo
}