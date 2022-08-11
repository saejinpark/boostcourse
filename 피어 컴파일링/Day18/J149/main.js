import readline from 'readline';
import CREATE from './c_create.js';
import DELETE from './c_delete.js';
import DROP from './c_drop.js';
import EXPORT from './c_export.js';
import IMPORT from './c_import.js';
import INSERT from './c_insert.js';
import REPORT from './c_report.js';
import SELECT from './c_select.js';
import UPDATE from './c_update.js';

const rl = readline.createInterface({input: process.stdin, output: process.stdout});

function run() {
    rl.setPrompt(">");
    rl.prompt();
    rl.on("line", async (l) => {
        if(!validation(l)) {
            console.log("Invalid command");
            rl.prompt();
            return;
        }
        const parsed = parseLine(l);
        if(parsed[0].toLowerCase() === 'create table') {
            CREATE(parsed[1], parsed[2]);
        }
        if(parsed[0].toLowerCase() === 'insert into') {
            INSERT(parsed[1], parsed[2]);
        }
        if(parsed[0].toLowerCase() === 'delete from') {
            DELETE(parsed[1], parsed[2]);
        }
        if(parsed[0].toLowerCase() === 'update') {
            UPDATE(parsed[1], parsed[2]);
        }
        if(parsed[0].toLowerCase() === 'select from') {
            SELECT(parsed[1], parsed[2]);
        }
        if(parsed[0].toLowerCase() === 'drop table') {
            DROP(parsed[1], parsed[2]);
        }
        if(parsed[0].toLowerCase() === 'report table') {
            REPORT(parsed[1], parsed[2]);
        }
        if(parsed[0].toLowerCase() === 'export to') {
            EXPORT(parsed[1], parsed[2]);
        }
        if(parsed[0].toLowerCase() === 'import from') {
            IMPORT(parsed[1], parsed[2]);
        }
        rl.prompt();
    });
}

function validation(l) {
    const reg = /(CREATE TABLE|INSERT INTO|DELETE FROM|UPDATE|SELECT FROM|DROP TABLE|REPORT TABLE|EXPORT TO|IMPORT FROM)+( [\w])+.*/i;
    return reg.test(l);
}

function parseLine(l) {
    const reg = /(?<command>CREATE TABLE|INSERT INTO|DELETE FROM|UPDATE|SELECT FROM|DROP TABLE|REPORT TABLE|EXPORT TO|IMPORT FROM) (?<tableName>\w+)( (?<args>.+))?/i;
    const {groups : {command, tableName, args}} = l.match(reg);
    return [command, tableName, args];
}

run();