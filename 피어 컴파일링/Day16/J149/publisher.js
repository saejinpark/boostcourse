export default class Publisher {
    name = '';
    constructor(name) {
        this.name = name;
    }

    stringify() {
        console.log("Publisher name : " + this.name);
    }
}
Publisher.prototype.toString = function pubsToString() {
    return this.name;
}