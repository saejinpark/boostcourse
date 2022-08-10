const Emitter = require('events');

class Chef extends Emitter{
    static #instance

    constructor(num) {
        super();
        this.cook = [];
        for (let i = 0; i < num; i++) this.cook.push(['','']);
    }

    sharedInstance () {
        if (!Chef.#instance) {
            Chef.#instance = this;
        }
        return Chef.#instance;
    }
}

module.exports = {
    Chef
}