const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/* 
    JavaScript 표준입출력
*/
var keyword = null;
rl.question("keyword를 입력해주세요: ", (line) => {
    keyword = line
    rl.close();
});
rl.on('close', () => {
    process.exit();
});