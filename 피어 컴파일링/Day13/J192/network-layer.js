const IpPacket = require("./ip-packet");

class NetworkLayer {
    #srcIp;

    constructor(srcIp) {
        this.#srcIp = srcIp;
    }

    encode(segment, destIp) {
        return new IpPacket(this.#srcIp, destIp, segment);
    }

    decode(packet) {
        if (packet.destIp !== this.#srcIp) {
            throw new IpNotMatchedError(`expected IP '${this.#srcIp}', but received '${packet.destIp}'`);
        }

        return packet.segment;
    }
}

class IpNotMatchedError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "IpNotMatchedError";
    }
}

module.exports = { NetworkLayer, IpNotMatchedError };