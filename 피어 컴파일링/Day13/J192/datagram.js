const IpPacket = require("./ip-packet");

class Datagram {
    srcMac;
    destMac;
    packet

    static from({srcMac, destMac, packet}) {
        if ([srcMac, destMac, packet].some(prop => prop === undefined)) {
            throw new CannotInitializeDatagramError(`missing property (current: ${obj})`);
        }

        return new Datagram(srcMac, destMac, IpPacket.from(packet));
    }

    constructor(srcMac, destMac, packet) {
        if (!(packet instanceof IpPacket)) {
            throw new CannotInitializeDatagramError(`should be initialized with IP Packet (current: ${packet})`);
        }

        this.srcMac = srcMac;
        this.destMac = destMac;
        this.packet = packet;
    }

    toString() {
        return `[Datagram: ${this.srcMac} -> ${this.destMac}, ${this.packet}]`;
    }
}

class CannotInitializeDatagramError extends Error {
    constructor(msg) {
        super(msg);
    }
}

module.exports = Datagram;