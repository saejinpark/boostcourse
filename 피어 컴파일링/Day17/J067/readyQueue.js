class ReadyQueue {
    static #instance
    constructor() {
        this.customer = {};
        this.queue = [];
    }

    sharedInstance() {
        if (!ReadyQueue.#instance) {
            ReadyQueue.#instance = this;
        }
        return ReadyQueue.#instance;
    }

    enqueue(foodNum) {
        this.queue.push(foodNum);
    }

    dequeue() {
        this.queue.shift();
    }
}

module.exports = {
    ReadyQueue
}