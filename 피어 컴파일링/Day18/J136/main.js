import { CreateTable } from './create-table.js';
import { InsertInto } from './insert-into.js';
import { DeleteFrom } from './delete-from.js';
import { DropTable } from './drop-table.js';
import { SelectFrom } from './select-from.js';
import { Update } from './update.js';
import { ReportTable } from './report-table.js';
import { Export } from './export.js';
import { Import } from './import.js';
import readline from 'readline'

const create = new CreateTable();
const insert = new InsertInto();
const deleteFrom = new DeleteFrom();
const drop = new DropTable();
const select = new SelectFrom();
const update = new Update();
const report = new ReportTable();
const exportTable = new Export();
const importTable = new Import();

function main(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    rl.setPrompt(`> 명령어를 입력하세요. \n> `)
    rl.prompt()
    rl.setPrompt(`> `)
    rl.on("line", (line) => {
        const commend = line.split(' ')[0]
        
        switch (commend) {
            case 'CREATE':
                create.init(line)
                break;
            case 'INSERT':
                insert.init(line)
                break;
            case 'DELETE':
                deleteFrom.init(line)
                break;
            case 'UPDATE':
                update.init(line)
                break;
            case 'SELECT':
                select.init(line)
                break;    
            case 'DROP':
                drop.init(line)
                break;    
            case 'REPORT':
                report.init(line)
                break;    
            case 'EXPORT':
                exportTable.init(line)
                break;    
            case 'IMPORT':
                importTable.init(line)
                break;    
            default:
              console.log( "지원하지 않는 명령어 입니다." );
          }
        rl.prompt()
    });
    
}

main()

/*  명령어 모음
CREATE TABLE billboard (singer String, year Numeric, song String)
INSERT INTO billboard (singer, year, song) VALUES ("BTS", 2020, "Dynamite")
INSERT INTO billboard (singer) VALUES ("BTS")
DELETE FROM billboard WHERE id = 1
UPDATE billboard SET song = "Butter" WHERE id = 1
SELECT FROM billboard WHERE singer="BTS"
DROP TABLE billboard
REPORT TABLE billboard
EXPORT TO y2020song FROM billboard WHERE year = 2020
EXPORT TO y2021song FROM billboard WHERE year = 2021
IMPORT FROM y2020song TO billboard
*/