class TcpSegment {
    type;
    srcPort;
    destPort;
    seqNum;
    ackNum;
    message;

    static from({type, srcPort, destPort, seqNum, ackNum, data}) {
        if ([type, srcPort, destPort, seqNum].some(prop => prop === undefined)) {
            throw new CannotInitializeTcpSegmentError(`missing property (current: ${obj})`);
        }

        return new TcpSegment(type, srcPort, destPort, seqNum, { ackNum, data });
    }

    constructor(type, srcPort, destPort, seqNum, { ackNum, data } = {}) {
        this.type = type;
        this.srcPort = srcPort;
        this.destPort = destPort;
        this.seqNum = seqNum;
        this.ackNum = ackNum;
        this.data = data;
    }

    toString() {
        const buffer = [];
        buffer.push(`[TCP Segment: ${this.type}, ${this.srcPort} -> ${this.destPort}, #SEQ = ${this.seqNum}`);
        if (this.ackNum !== undefined) {
            buffer.push(`, #ACK = ${this.ackNum}`);
        }
        if (this.data !== undefined) {
            buffer.push(`, CONTENT-LENGTH: ${this.data.length}, DATA = ${JSON.stringify(this.data)}`);
        }
        buffer.push(`]`);

        const string = buffer.join("");
        return string;
    }
}

class CannotInitializeTcpSegmentError extends Error {
    constructor(msg) {
        super(msg);
    }
}

module.exports = TcpSegment;