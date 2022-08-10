const { Chef } = require("./chef");
const { ReadyQueue } = require("./readyQueue")
const Emitter = require('events');

class Manager extends Emitter {
    static #instance
    constructor() {
        super();
        this.readyQueue = new ReadyQueue().sharedInstance();
        this.chef = new Chef().sharedInstance();
    }

    sharedInstance() {
        if (!Manager.#instance) {
            Manager.#instance = this;
        }
        return Manager.#instance;
    }

    checkReadyQueue() {
        const manager = this;

        if (this.readyQueue.queue.length !== 0) {
            manager.emit('Status');
            manager.emit('FoodIsReady', this.readyQueue.queue);
        } 
        // else if (this.chef.cook === '' && this.readyQueue.queue.length === 0) {
        //     manager.emit('Status');
        //     console.log('\n모든 배달이 완료되었습니다.\n종료합니다.');
        //     process.exit();
        // }
    }
}

module.exports = {
    Manager
}