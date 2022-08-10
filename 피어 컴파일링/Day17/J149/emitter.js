import Event from "./event.js";

export default class Emitter {
    static #instance;
    table = [];

    constructor() { // singleton
        if(Emitter.#instance) return Emitter.#instance;
        else Emitter.#instance = this;
    }

    add(subscriber, eventName, sender, handler) {
        let row = [subscriber, eventName, sender, handler]; // [Subscriber, eventName, Publisher, callback(eventName)]
        this.table.push(row);
    }


    emit(eventName, sender, data) {
        //console.log(eventName + " event emitted");
        const e = new Event(eventName, sender, data);
        this.table.map(el => {
            if((el[1] === (e.eventName ?? '') || el[1] === '') && (el[2] === (e.sender?? undefined) || !el[2])) {
                el[3](e);
                return;
            }
        })
    }
}