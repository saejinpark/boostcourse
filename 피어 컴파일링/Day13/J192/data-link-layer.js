const Datagram = require("./datagram");

class DataLinkLayer {
    static #TABLE = {
        "192.168.1.2": "CC:46:D6:A0:41:BB", 
        "192.168.1.3": "3C:5A:B4:00:11:CD",
        "192.168.1.4": "CC:46:D6:B1:F9:CC",
        "192.168.1.5": "3C:5A:B4:93:01:4B",
        "192.168.1.6": "3C:5A:B4:11:7B:B0",
        "192.168.1.7": "CC:46:D6:B0:CC:EF",
        "192.168.1.8": "CC:46:D6:A4:3F:F0",
        "192.168.1.9": "3C:5A:B4:6F:EA:DC",
        "192.168.1.10": "3C:5A:B4:08:A4:5B"
    };

    #srcMac;

    constructor(srcIp) {
        this.#srcMac = DataLinkLayer.#TABLE[srcIp];
    }

    encode(packet, destIp) {
        const destMac = DataLinkLayer.#TABLE[destIp];
        return new Datagram(this.#srcMac, destMac, packet);
    }

    decode(datagram) {
        if (datagram.destMac !== this.#srcMac) {
            throw new MacNotMatchedError(`expected MAC '${this.#srcMac}, but received ${datagram.destMac}`);
        }

        return datagram.packet;
    }
}

class MacNotMatchedError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "MacNotMatchedError";
    }
}

module.exports = { DataLinkLayer, MacNotMatchedError };