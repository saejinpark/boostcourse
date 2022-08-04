const Tx = require("./Tx");
const Rx = require("./Rx");

class Computer {
    constructor(name, port, addressIdx){
        this.name = name;
        this.port = port;
        this.addressIdx = addressIdx;
        this.state = "closed";
        this.Tx = new Tx(name, port, addressIdx);
        this.Rx = new Rx(name, port, addressIdx);
    }

    async send(dest){
        this.Tx.init(dest);
    }

    async receive(){

    }
}
module.exports = Computer;