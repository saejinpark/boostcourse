const chalk = require('chalk');
const { menu } = require('./menu');
const { ReadyQueue } = require('./readyQueue');
const { Chef } = require('./chef');

class Status {
    static #instance

    constructor () {
        this.orderComplete = [];
        this.deliverComplete = [];
        this.deliverProgress = [];
        this.chef = new Chef().sharedInstance();
        this.readyQueue = new ReadyQueue().sharedInstance();
    }

    sharedInstance() {
        if (!Status.#instance) {
            Status.#instance = this;
        }
        return Status.#instance;
    }

    print() {
        console.log(chalk.yellow('\n---주문현황판---'));
        this.chef.cook.forEach((el, i) => {
            if (el[0] !== '') {
                console.log(chalk.cyan(`${el[0][1]} ${el[0][0]} - ${menu[el[0][1]].name} 요리사${i+1} 요리중`));
            }
            if (el[1] !== '') {
                console.log(chalk.cyan(`${el[1][1]} ${el[1][0]} - ${menu[el[1][1]].name} 요리사${i+1} 요리중`));
            }
        })
        this.readyQueue.queue.reduce((prev, cur) => {
            console.log(chalk.white(`${cur[1]}. ${cur[0]} - ${menu[cur[1]].name} 대기중`));
        }, '');
        console.log(chalk.yellow('\n---배송현황판---'));
        this.orderComplete.reduce((prev, cur) => {
            console.log(chalk.white(`${cur[1]}. ${cur[0]} - ${menu[cur[1]].name} 배달 대기`));
        }, '');
        this.deliverProgress.reduce((prev, cur) => {
            console.log(chalk.cyan(`${cur[1]}. ${cur[0]} - ${menu[cur[1]].name} 배달중`));
        }, '');
        this.deliverComplete.reduce((prev, cur) => {
            console.log(chalk.green(`${cur[1]}. ${cur[0]} - ${menu[cur[1]].name} 배달 완료`));
        }, '');
    }
}

module.exports = {
    Status
}