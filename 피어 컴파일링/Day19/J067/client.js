const net = require('net');
const chalk = require('chalk');

function getConnection(){
    const client = net.connect({port: 2022, host:'localhost'}, function() {
        this.setEncoding('utf8');
        let startTime;
        this.on('data', (res) => {
            const response = JSON.parse(res);
            let status = Number(response.header.split(' ')[1]);
            console.log();
            if (400 <= status && status < 500) {
                console.log(chalk.red(`${response.header}\nERROR! ${response.message.error}\n`));
            } else {
                console.log(chalk.green(`${response.header}\n${JSON.stringify(response.data)}\n`))
            }
            if (response.type === 'checkin') {
                startTime = Date.now();
            } else if (response.type === 'checkout') {
                const endTime = Date.now();
                const diffTime = endTime - startTime;
                console.log(`활동시간: ${msToTime(diffTime)}`);
                this.end();
            }
        });
        this.on('end', function() {
            console.log('체크아웃했습니다.');
        });
        this.on('error', function(err) {
            console.log('Socket Error: ', JSON.stringify(err));
        });
        this.on('timeout', function() {
            console.log('Socket Timed Out');
        });
        this.on('close', function() {
            // console.log('Socket Closed');
        });
    });
    return client;
}

function msToTime(duration) {
    let seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}


module.exports = {
    getConnection
}