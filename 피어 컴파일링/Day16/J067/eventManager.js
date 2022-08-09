class EventManager {
    #subscribeList
    
    constructor () {
        this.#subscribeList = {};
    }

    // sharedInstance() {
    //     if (!this.#instance) {
    //         this.#instance = {};
    //     }
    //     return this.#instance;
    // }

    add(subscriber, event, sender, handler, emitter) {
        if (subscriber.name in this.#subscribeList) {
            this.#subscribeList[subscriber.name].push([event, sender === undefined? undefined: sender.name , handler, emitter]);
        } else {
            this.#subscribeList[subscriber.name] = [[event, sender === undefined? undefined: sender.name, handler, emitter]];
        }
    }

    postEvent(name, sender, userData) {
        for (let key in this.#subscribeList) {
            this.#subscribeList[key].forEach((el) => {
                if (el[0] === '' && el[1] === undefined) {
                    console.log('startTime:', Date.now());
                    el[2](key, name, sender === 'dummy' ? 'dummy': sender.name, userData);
                } else if (el[0] === name && el[1] === undefined) {
                    console.log('startTime:', Date.now());
                    el[2](key, name, sender === 'dummy' ? 'dummy': sender.name, userData);
                } else if (el[0] === '' && el[1] === sender.name) {
                    console.log('startTime:', Date.now());
                    el[2](key, name, sender.name, userData);
                } else if (el[0] === name && (el[1] === sender.name || sender === 'dummy')) {
                    console.log('startTime:', Date.now());
                    el[2](key, name, sender === 'dummy' ? 'dummy': sender.name, userData);
                }
            })
        }
    }

    asyncPostEvent(name, sender, userData) {
        for (let key in this.#subscribeList) {
            this.#subscribeList[key].forEach((el) => {
                if (el[0] === '' && el[1] === undefined) {
                    el[3].emit('event', el[2](key, name, sender === 'dummy' ? 'dummy': sender.name, userData));
                } else if (el[0] === name && el[1] === undefined) {
                    el[3].emit('event', el[2](key, name, sender === 'dummy' ? 'dummy': sender.name, userData));
                } else if (el[0] === '' && el[1] === sender.name) {
                    el[3].emit('event', el[2](key, name, sender.name, userData));
                } else if (el[0] === name && (el[1] === sender.name || sender === 'dummy')) {
                    el[3].emit('event', el[2](key, name, sender === 'dummy' ? 'dummy': sender.name, userData));
                }
            })
        }
    }

    delayPostEvent(name, sender, userData) {
        for (let key in this.#subscribeList) {
            this.#subscribeList[key].forEach((el) => {
                if (el[0] === '' && el[1] === undefined) {
                    el[3].emit('event', setTimeout(() => {el[2](key, name, sender === 'dummy' ? 'dummy': sender.name, userData)}, 5000));
                } else if (el[0] === name && el[1] === undefined) {
                    el[3].emit('event', setTimeout(() => {el[2](key, name, sender === 'dummy' ? 'dummy': sender.name, userData)}, 5000));
                } else if (el[0] === '' && el[1] === sender.name) {
                    el[3].emit('event', setTimeout(() => {el[2](key, name, sender.name, userData)}, 5000));
                } else if (el[0] === name && (el[1] === sender.name || sender === 'dummy')) {
                    el[3].emit('event', setTimeout(() => {el[2](key, name, sender === 'dummy' ? 'dummy': sender.name, userData)}, 5000));
                }
            })
        }
    }

    remove(subscriber) {
        this.#subscribeList[subscriber.name] = [];
    }

    stringify() {
        let str = '';
        for (let key in this.#subscribeList) {
            this.#subscribeList[key].forEach((el) => {
                str += `${key}: event name = "${el[0]}", sender = ${el[1]}\n`;
            })
        }
        return str;
    }
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

module.exports = {
    EventManager
}