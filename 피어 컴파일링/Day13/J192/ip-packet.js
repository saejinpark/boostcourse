const TcpSegment = require("./tcp-segment");

class IpPacket {
    srcIp;
    destIp;
    segment;

    static from({srcIp, destIp, segment}) {
        if ([srcIp, destIp, segment].some(prop => prop === undefined)) {
            throw new CannotInitializeIpPacketError(`missing property (current: ${obj})`);
        }

        return new IpPacket(srcIp, destIp, TcpSegment.from(segment));
    }

    constructor(srcIp, destIp, segment) {
        if (!(segment instanceof TcpSegment)) {
            throw new CannotInitializeIpPacketError(`should be initialized with TCP Segment (current: ${tcpSegment})`);
        }

        this.srcIp = srcIp;
        this.destIp = destIp;
        this.segment = segment;
    }

    toString() {
        return `[IP Packet: ${this.srcIp} -> ${this.destIp}, ${this.segment}]`;
    }
}

class CannotInitializeIpPacketError extends Error {
    constructor(msg) {
        super(msg);
    }
}

module.exports = IpPacket;