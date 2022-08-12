const { getConnection } = require('./client');
const readline = require('readline');
const chalk = require('chalk');

const client = getConnection();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    if (line === 'q') {
        rl.close();
    }
    let request;
    if ((/^checkin J[0-9]{3}$/gi).test(line)) {
        request = {
            'header' : 'POST /checkin HTTP/1.1',
            'data' : {'camperId' : line.split(' ')[1] }
        }
        console.log(chalk.magenta(`\n${request.header}\n${JSON.stringify(request.data)}\n`));
        client.write(JSON.stringify(request));
    } else if ((/^mission day[0-9]+$/gi).test(line)) {
        request = {
            'header' : 'POST /mission HTTP/1.1',
            'data' : { 'day' : Number(line.match(/[0-9]+/)[0]) }
        }
        console.log(chalk.magenta(`\n${request.header}\n${JSON.stringify(request.data)}\n`));
        client.write(JSON.stringify(request));
    } else if ((/^direct to J[0-9]{3}, ".+"$/gi).test(line)) {
        request = {
            'header' : 'POST /direct HTTP/1.1',
            'data' : { 
                'to' : line.match(/J[0-9]{3}/gi)[0],
                'text': line.match(/".+"/gi)[0],
            }
        }
        console.log(chalk.magenta(`\n${request.header}\n${JSON.stringify(request.data)}\n`));
        client.write(JSON.stringify(request));
    } else if ((/^peersession maxCount\s?=\s?[0-9]+$/gi).test(line)) {
        request = {
            'header' : 'POST /peersession HTTP/1.1',
            'data' : { 
                'maxCount' : line.match(/[0-9]+/gi)[0]
            }
        }
        console.log(chalk.magenta(`\n${request.header}\n${JSON.stringify(request.data)}\n`));
        client.write(JSON.stringify(request));
    } else if ((/^message ".+"$/gi).test(line)) {
        request = {
            'header' : 'POST /message HTTP/1.1',
            'data' : { 
                'text': line.match(/".+"/gi)[0],
            }
        }
        console.log(chalk.magenta(`\n${request.header}\n${JSON.stringify(request.data)}\n`));
        client.write(JSON.stringify(request));
    } else if ((/^complete$/gi).test(line)) {
        request = {
            'header' : 'POST /complete HTTP/1.1',
            'data' : {}
        }
        console.log(chalk.magenta(`\n${request.header}\n${JSON.stringify(request.data)}\n`));
        client.write(JSON.stringify(request));
    } else if ((/^checkout$/gi).test(line)) {
        request = {
            'header' : 'POST /checkout HTTP/1.1',
            'data' : {}
        }
        console.log(chalk.magenta(`\n${request.header}\n${JSON.stringify(request.data)}\n`));
        client.write(JSON.stringify(request));
    } else {
        console.log('입력 형식에 맞지 않습니다. 다시 입력해주세요.\n');
    }
}).on("close", function () {
    process.exit();
});
// client.write('테스트');