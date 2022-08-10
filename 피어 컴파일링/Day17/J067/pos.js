const readline = require('readline');
const { ReadyQueue } = require('./readyQueue');

class POS {
    order() {
        let input;
        const readyQueue = new ReadyQueue().sharedInstance();
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        console.log('주문하세요 >>');
        rl.on("line", (line) => {
            input = line;
            if (input === 'q') {
                rl.close();
            }
            let cnt = 0;
            let inputArr = input.split(', ');
            const customer = inputArr[0];
            for (let i = 1; i < inputArr.length; i++) {
                cnt += Number(inputArr[i].split(':')[1]);
                for (let j = 0; j < Number(inputArr[i].split(':')[1]); j++) {
                    readyQueue.enqueue(customer+inputArr[i].split(':')[0]);
                }
            }
            readyQueue.customer[customer] = cnt;
            console.log('주문하세요 >>');
        }).on("close", function () {
            process.exit();
        });
    }
}

module.exports = {
    POS
}