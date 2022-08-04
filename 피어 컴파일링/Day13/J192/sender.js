const ApplicationLayer = require("./application-layer");
const PresentationLayer = require("./presentation-layer");
const SessionLayer = require("./session-layer")
const TransportLayer = require("./transport-layer");
const { NetworkLayer } = require("./network-layer");
const { DataLinkLayer } = require("./data-link-layer");
const PhysicalLayer = require("./physical-layer");
const consoleColor = require("./console-color");
const Receiver = require("./receiver");

class Sender {
    #srcIp;
    #srcPort;
    #seqNum;

    #appLayer;
    #ptLayer;
    #ssLayer;
    #tpLayer;
    #nwLayer;
    #dlLayer;
    #phyLayer;

    constructor(srcIp, srcPort) {
        this.#srcIp = srcIp;
        this.#srcPort = srcPort;
        this.#seqNum = 10;

        this.#appLayer = new ApplicationLayer();
        this.#ptLayer = new PresentationLayer();
        this.#ssLayer = new SessionLayer();
        this.#tpLayer = new TransportLayer(this.#srcPort, this.#seqNum);
        this.#nwLayer = new NetworkLayer(this.#srcIp);
        this.#dlLayer = new DataLinkLayer(this.#srcIp);
        this.#phyLayer = new PhysicalLayer();
    }

    sendEmail(email, destIp, destPort) {
        const receiver = new Receiver(destIp, destPort);
        let msg, segment, frame;

        /*
         * send SYN (3-way handshake)
         */

        console.log(consoleColor.green, "[ Start of Sender ]\n");

        msg = this.#appToSsLayer(email);
        frame = this.#tpToPhyLayer("SYN", destIp, destPort);

        console.log(consoleColor.green, "[ End of Sender ]\n");

        frame = receiver.sendFrame(frame); // SYN+ACK response

        /*
         * send ACK (3-way handshake)
         */

        console.log(consoleColor.green, "[ Start of Sender ]\n");

        segment = this.#phyToTpLayer(frame); // read response

        frame = this.#tpToPhyLayer("ACK", destIp, destPort, { receivedSeqNum: segment.seqNum });

        console.log(consoleColor.green, "[ End of Sender ]\n");

        receiver.sendFrame(frame);

        /*
         * send DATA
         */

        console.log(consoleColor.green, "[ Start of Sender ]\n");

        // split data into chunks of length 100
        while (msg.length > 0) {
            const data = msg.slice(0, 100);
            msg = msg.slice(100);

            frame = this.#tpToPhyLayer("DATA", destIp, destPort, { data });

            console.log(consoleColor.green, "[ End of Sender ]\n");

            frame = receiver.sendFrame(frame); // ACK response

            console.log(consoleColor.green, "[ Start of Sender ]\n");

            this.#phyToTpLayer(frame); // read response
        }

        /*
         * close connection
         */

        console.log(consoleColor.green, "[ End of Sender ]\n");

        receiver.close();
    }

    #appToSsLayer(email) {
        let msg;

        msg = this.#appLayer.encode(email.from, email.to, email.title, email.attach);
        console.log(consoleColor.yellow, "7 | Application Layer:");
        console.log(msg + "\n");

        msg = this.#ptLayer.encode(msg);
        console.log(consoleColor.yellow, "6 | Presentation Layer:");
        console.log(msg + "\n");

        msg = this.#ssLayer.encode(msg);
        console.log(consoleColor.yellow, "5 | Session Layer:");
        console.log(msg + "\n");

        return msg;
    }

    #tpToPhyLayer(segmentType, destIp, destPort, { receivedSeqNum, data } = {}) {
        const segment = this.#tpLayer.encode(segmentType, destPort, { receivedSeqNum, data });
        console.log(consoleColor.red, "4 | Transport Layer:", segment + "\n");

        const packet = this.#nwLayer.encode(segment, destIp);
        console.log(consoleColor.yellow, "3 | Network Layer:", packet + "\n");

        const datagram = this.#dlLayer.encode(packet, destIp);
        console.log(consoleColor.yellow, "2 | Data Link Layer:", datagram + "\n");

        const frame = this.#phyLayer.encode(datagram);
        console.log(consoleColor.yellow, "1 | Physical Layer:", frame + "\n");

        return frame;
    }

    #phyToTpLayer(frame) {
        console.log(consoleColor.yellow, "1 | Physical Layer:", frame + "\n");

        const datagram = this.#phyLayer.decode(frame);
        console.log(consoleColor.yellow, "2 | Data Link Layer:", datagram + "\n");
        
        const packet = this.#dlLayer.decode(datagram);
        console.log(consoleColor.yellow, "3 | Network Layer:", packet + "\n");

        const segment = this.#nwLayer.decode(packet);
        console.log(consoleColor.red, "4 | Transport Layer:", segment + "\n");

        return segment;
    }
}

module.exports = Sender;