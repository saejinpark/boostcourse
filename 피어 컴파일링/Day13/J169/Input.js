const readline = require("readline");
const fs = require('fs');

exports.getInput = async function(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const from = await new Promise(line => rl.question("보내는 이의 메일 주소를 입력해주세요 : ",line));
    const to = await new Promise(line => rl.question("받는 이의 메일 주소를 입력해주세요 : ",line));
    const title = await new Promise(line => rl.question("메일 제목을 입력해주세요 : ",line));
    const filename = await new Promise(line => rl.question("첨부 파일 이름을 입력해주세요 : ",line));
    
    rl.close();

    const file = fs.readFileSync(filename, {encoding:'utf8',f:'r'});
    const fileSize = Buffer.byteLength(file, 'utf8');

    return [from, to, title, file, fileSize];
}