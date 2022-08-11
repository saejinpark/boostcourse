const readlineSync = require('readline-sync');
const fs = require('fs');
const chalk = require('chalk');

const { createTable } = require('./createTable');
const { insertInto } = require('./insertInto');
const { deleteFrom } = require('./deleteFrom');
const { update } = require('./update');
const { dropTable} = require('./dropTable');
const { selectFrom } = require('./selectFrom');
const { reportTable } = require('./reportTable');
const { exportTo } = require('./exportTo');
const { importFrom } = require('./importFrom');

const columnType = {};
let idx = 1;

function main() {
    // fs.unlinkSync('billboard.csv');
    while (true) {
        let input = readlineSync.question('명령어를 입력해주세요. > ');
        if (input === 'q') break;
    
        input = input.toLowerCase();
        if (input.startsWith('create table ')) {
            if (!createTable(input, columnType)) continue;
        } else if (input.startsWith('insert into ')) {
            if (!insertInto(input, columnType, idx)) continue;
            idx += 1;
        } else if (input.startsWith('delete from ')) {
            if (!deleteFrom(input)) continue;
        } else if (input.startsWith('update ')) {
            if (!update(input, columnType)) continue;
        } else if (input.startsWith('select from ')) {
            if (!selectFrom(input)) continue;
        } else if (input.startsWith('drop table ')) {
            if (!dropTable(input)) continue;
        } else if (input.startsWith('report table ')) {
            if (!reportTable(input)) continue;
        } else if (input.startsWith('export to ')) {
            if (!exportTo(input)) continue;
        } else if (input.startsWith('import from ')) {
            const res = importFrom(input, idx)
            if (!res[1]) continue;
            idx = res[0];
        } else {
            console.log(chalk.red('명령어를 잘못 입력하였습니다. 다시 입력해주세요.\n'));
        }
    }
}

main();