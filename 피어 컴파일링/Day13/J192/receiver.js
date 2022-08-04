const PresentationLayer = require("./presentation-layer");
const SessionLayer = require("./session-layer")
const TransportLayer = require("./transport-layer");
const { NetworkLayer } = require("./network-layer");
const { DataLinkLayer } = require("./data-link-layer");
const PhysicalLayer = require("./physical-layer");
const consoleColor = require("./console-color");

class Receiver {
    static FILE_NAME = "received.txt";

    #srcIp;
    #srcPort;
    #seqNum;

    #ptLayer;
    #ssLayer;
    #tpLayer;
    #nwLayer;
    #dlLayer;
    #phyLayer;

    #data;

    constructor(srcIp, srcPort) {
        this.#srcIp = srcIp,
        this.#srcPort = srcPort;
        this.#seqNum = 100;

        this.#ptLayer = new PresentationLayer();
        this.#ssLayer = new SessionLayer();
        this.#tpLayer = new TransportLayer(this.#srcPort, this.#seqNum);
        this.#nwLayer = new NetworkLayer(this.#srcIp);
        this.#dlLayer = new DataLinkLayer(this.#srcIp);
        this.#phyLayer = new PhysicalLayer();

        this.#data = [];
    }

    sendFrame(frame) {
        console.log(consoleColor.green, "[ Start of Receiver ]\n");

        console.log(consoleColor.yellow, "1 | Physical Layer:", frame + "\n");

        let datagram = this.#phyLayer.decode(frame);
        console.log(consoleColor.yellow, "2 | Data Link Layer:", datagram + "\n");
        
        let packet = this.#dlLayer.decode(datagram);
        console.log(consoleColor.yellow, "3 | Network Layer:", packet + "\n");
        const destIp = packet.srcIp;

        let segment = this.#nwLayer.decode(packet);
        console.log(consoleColor.red, "4 | Transport Layer:", segment + "\n");

        if (segment.type === "DATA") {
            this.#data.push(segment.data);
        }

        if (segment.type === "SYN" || segment.type === "DATA") {
            const response = this.#tpLayer.response(segment);

            console.log(consoleColor.red, "4 | Transport Layer:", response + "\n");

            packet = this.#nwLayer.encode(response, destIp);
            console.log(consoleColor.yellow, "3 | Network Layer:", packet + "\n");

            datagram = this.#dlLayer.encode(packet, destIp);
            console.log(consoleColor.yellow, "2 | Data Link Layer:", datagram + "\n");

            frame = this.#phyLayer.encode(datagram);
            console.log(consoleColor.yellow, "1 | Physical Layer:", frame + "\n");

            console.log(consoleColor.green, "[ End of Receiver ]\n");

            return frame;
        } else { // segment.type === "ACK"
            console.log(consoleColor.green, "[ End of Receiver ]\n");
        }
    }

    close() {
        console.log(consoleColor.green, "[ Start of Receiver ]\n");

        let msg = this.#data.join("");

        console.log(consoleColor.yellow, "5 | Session Layer:");
        console.log(msg + "\n");

        msg = this.#ssLayer.decode(msg);
        console.log(consoleColor.yellow, "6 | Presentation Layer:");
        console.log(msg + "\n");

        msg = this.#ptLayer.decode(msg, Receiver.FILE_NAME);
        console.log(consoleColor.yellow, "7 | Application Layer:");
        console.log(msg + "\n");

        console.log(consoleColor.green, "[ End of Receiver ]\n");
    }
}

module.exports = Receiver;