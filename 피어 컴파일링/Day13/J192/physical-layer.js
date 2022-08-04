const Datagram = require("./datagram");

class PhysicalLayer {
    encode(datagram) {
        const serialized = JSON.stringify(datagram);
        const encoded = Buffer.from(serialized).toString("hex");
        return encoded;
    }

    decode(frame) {
        const decoded = Buffer.from(frame, "hex").toString();
        const deserialized = JSON.parse(decoded);
        return Datagram.from(deserialized);
    }
}

module.exports = PhysicalLayer;