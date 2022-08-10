const Emitter = require('events');
class Deliver extends Emitter {
    static #instance
    constructor(num) {
        super();
        this.deliver = [];
        for (let i = 0; i < num; i++) {
            this.deliver.push('');
        }
    }

    sharedInstance() {
        if (!Deliver.#instance) {
            Deliver.#instance = this;
        }
        return Deliver.#instance;
    }
}

module.exports = {
    Deliver
}