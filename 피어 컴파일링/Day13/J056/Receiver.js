import { PacketType } from './constants.js';
import { makeHeaderArray } from './util.js';
class Reciever {
  #header = {};
  IP;
  constructor(header) {
    this.#header = header;
    this.headerArr = makeHeaderArray(this.#header);
    console.log('>> Recieved Packet: ', this.headerArr);
    console.log(this.#header);
  }
  synAndAck() {
    this.#header.ackNumber = 11;
    this.#header.packetType = PacketType.SYNACK;

    console.log('>> Recieved Packet: ' + PacketType.SYNACK);
    console.log(this.#header);
    console.log(this.headerArr);
  }

  ack() {
    this.#header.packetType = PacketType.ACK;
    console.log('>> Recieved Packet: ' + PacketType.ACK);
    console.log(this.#header);
  }

  recieve([header, body]) {
    this.data += body;
    console.log('recievingHeader', header);
    this.#header.sequenceNumber = header.sequenceNumber;
    this.ack();
  }

  get header() {
    return this.#header;
  }
}
export default Reciever;
