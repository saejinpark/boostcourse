const fs = require('fs');
const chalk = require('chalk');

function importFrom(input, idx) {
    const splitInput = input.split('import from ')[1];
    const fileName = splitInput.split(' ', 3)[2]+'.csv';
    const importFileName = splitInput.split(' ', 3)[0]+'.csv';
    if (!fs.existsSync(`./${fileName}`)) {
        console.log(chalk.red('ERROR! 존재하지 않는 TABLE입니다.\n'));
        return [0, false];
    }
    if (!fs.existsSync(`./${importFileName}`)) {
        console.log(chalk.red('ERROR! 존재하지 않는 FILE입니다.\n'));
        return [0, false];
    }

    const file = fs.readFileSync(fileName, 'utf-8').split('\n');
    const importFileData = fs.readFileSync(importFileName, 'utf-8').split('\n');
    const fileData = [];

    file.slice(2,).reduce((prev, cur) => {
        fileData.push(cur.split(',').slice(1,).join(','));
    }, '');
    
    if (importFileData[0] !== file[0]) {
        console.log(chalk.red('ERROR! Column이 일치하지 않습니다.\n'));
        return [0, false];
    }

    let flag = 0;
    let importData = [];
    importFileData.slice(2,).reduce((prev, cur) => {
        if (!fileData.includes(cur.split(',').slice(1,).join(','))) {
            file.push(idx + ','+cur.split(',').slice(1,).join(','));
            importData.push(cur);
            flag = 1;
            idx += 1;
        }
    }, '');

    if (flag === 0) {
        console.log(chalk.red('ERROR! Import할 데이터가 없습니다.\n'));
        return false;
    }

    console.log(chalk.cyan(`IMPORT COUNT = ${importData.length}`));
    importData.map((r) => {
        console.log(`(${r})`);
    })
    console.log();
    fs.writeFileSync(fileName, file.join('\n'));

    return [idx, true];
}

module.exports = {
    importFrom
}