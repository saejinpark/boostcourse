const { POS } = require('./pos');
const { menu }= require('./menu');
const { Chef } = require('./chef');
const { Manager } = require('./manager');
const chalk = require('chalk');
const { Status } = require('./status');
const { ReadyQueue } = require('./readyQueue');
const { Deliver } = require('./deliver');
const readlineSync = require('readline-sync');

async function main() {
    const input = readlineSync.question('요리사, 배달 기사 수를 차례로 입력해주세요. ex) 3 4\n');
    console.log(`> 현재 요리사는 ${input.split(' ')[0]}명, 배달 기사는 ${input.split(' ')[1]}명입니다.`);
    
    const chef = new Chef(Number(input.split(' ')[0])).sharedInstance();
    const deliver = new Deliver(Number(input.split(' ')[1])).sharedInstance();
    const manager = new Manager().sharedInstance();
    const status = new Status().sharedInstance();
    const readyQueue = new ReadyQueue().sharedInstance();
    const pos = new POS();
    const eventQueue = [];

    deliver.on('StartDeliver', (customer) => {
        let deliverName
        for (let i = 0 ; i < deliver.deliver.length; i++) {
            if (deliver.deliver[i] === '') {
                deliverName = i;
                deliver.deliver[i] = customer;
                break;
            }
        }
        console.log(chalk.bgWhite.black(`배달기사${deliverName + 1} - 고객${customer} 배달중`));
        eventQueue.push(setTimeout(() => {
            deliver.emit('EndDeliver', [deliverName, customer]);
        }, 10000));
        status.orderComplete = status.orderComplete.filter(Boolean);
        for (let i = 0 ; i < status.orderComplete.length; i++) {
            if (status.orderComplete[i][0] === customer) {
                status.deliverProgress.push(status.orderComplete[i]);
                delete status.orderComplete[i]
            }
        }
        manager.emit('Status');
    })
    deliver.on('EndDeliver', ([i, customer]) => {
        console.log(chalk.bgMagenta.white(`배달기사${i + 1} - 고객${customer} 배달완료`));
        status.deliverProgress = status.deliverProgress.filter(Boolean);

        for (let i = 0 ; i < status.deliverProgress.length; i++) {
            if (status.deliverProgress[i][0] === customer) {
                status.deliverComplete.push(status.deliverProgress[i]);
                delete status.deliverProgress[i]
            }
        }
        deliver.deliver[i] = '';
        manager.emit('Status');
    })
    
    chef.on('StartCook', ([i, num]) => {
        console.log();
        console.log(chalk.bgWhite.black(`${chef.cook[i][num][0]} - ${menu[chef.cook[i][num][1]].name} 요리사${i+1} 요리시작`));
        eventQueue.push(setTimeout(() => {
            chef.emit('EndCook', [i, num]);
        }, menu[chef.cook[i][num][1]].time*1000))
    });
    chef.on('EndCook', ([i, num]) => {
        console.log();
        console.log(chalk.bgMagenta.white(`${chef.cook[i][num][0]} - ${menu[chef.cook[i][num][1]].name} 요리사${i+1} 완료`));
        status.orderComplete.push(chef.cook[i][num]);
        const customer = chef.cook[i][num][0];
        chef.cook[i][num] = '';
        manager.emit('Status');
        if (readyQueue.customer[customer] === 1) {
            deliver.emit('StartDeliver', customer);
        } else {
            readyQueue.customer[customer] -= 1;
        }
    })
    manager.on('FoodIsReady', (queue) => {
        for (let i = 0; i < chef.cook.length; i++) {
            if (chef.cook[i][0] === '') {
                chef.cook[i][0] = queue[0];
                chef.emit('StartCook', [i, 0]);
                manager.emit('EventLooper');
                continue;
            }
            if (chef.cook[i][1] === '' && queue.length !== 0) {
                chef.cook[i][1] = queue[0];
                chef.emit('StartCook', [i, 1]);
                manager.emit('EventLooper');
            }
        }
    })
    manager.on('EventLooper', () => {
        readyQueue.dequeue();
    })
    manager.on('Status', () => {
        status.print();
    })

    pos.order();
    let time = 1;
    while (true) {
        eventQueue.push(setTimeout(() => new Manager().sharedInstance().checkReadyQueue(), 1000));
        // eventQueue.push(setTimeout(() => new Status().sharedInstance().print(), 4000 * time));
        if (eventQueue.length === 0) break;
        await sleep(1000);
        console.log(chalk.bold(`\n=====${time}분 경과=====`));
        time += 1;
    }
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

main();