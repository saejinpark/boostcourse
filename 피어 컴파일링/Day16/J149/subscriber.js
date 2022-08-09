export class Subscriber {
    name = '';
    //events = []; // [eventName, callback];
    constructor(name) {
        this.name = name;
    }

    /*
    addEvent(eventName, callback) {
        console.log("added event to " + this.name)
        this.events.push([eventName, callback]);
    }

    runEvent(eventName, e) {
        this.events.map(row => {
            if(row[0] === eventName || row[0] === '') row[1](e);
        })
    }

    delEvent(eventName) {
        for(var i=0; i<this.events.length; i++) {
            if(this.events[i][0] === eventName) this.events.splice(i, 1);
        }
    }
    */
}

Subscriber.prototype.toString = function subsToString() {
    return this.name;
}