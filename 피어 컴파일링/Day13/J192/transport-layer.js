const TcpSegment = require("./tcp-segment");

class TransportLayer {
    #srcPort;
    #seqNum;

    constructor(srcPort, initSeqNum) {
        this.#srcPort = srcPort;
        this.#seqNum = initSeqNum;
    }

    encode(type, destPort, { receivedSeqNum, data } = {}) {
        if (type === "SYN") {
            return this.#makeSyn(destPort);
        }
        if (type === "ACK") {
            return this.#makeAck(destPort, receivedSeqNum);
        }
        if (type === "DATA") {
            return this.#makeData(destPort, data);
        }
    }

    response(segment) {
        if (segment.type === "SYN") {
            return this.#makeSynAck(segment.srcPort, segment.seqNum);
        }
        if (segment.type === "DATA") {
            return this.#makeAck(segment.srcPort, segment.seqNum);
        }
    }

    #makeSyn(destPort) {
        ++this.#seqNum;
        return new TcpSegment("SYN", this.#srcPort, destPort, this.#seqNum);
    }

    #makeAck(destPort, receivedSeqNum) {
        ++this.#seqNum;
        return new TcpSegment("ACK", this.#srcPort, destPort, this.#seqNum, { ackNum: receivedSeqNum+1 });
    }

    #makeSynAck(destPort, receivedSeqNum) {
        ++this.#seqNum;
        return new TcpSegment("SYN+ACK", this.#srcPort, destPort, this.#seqNum, { ackNum: receivedSeqNum+1 });
    }

    #makeData(destPort, data) {
        this.#seqNum += data.length;
        return new TcpSegment("DATA", this.#srcPort, destPort, this.#seqNum, { data });
    }
}

module.exports = TransportLayer;