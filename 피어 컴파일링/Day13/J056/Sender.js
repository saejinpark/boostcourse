import { PacketType, ConveyPacketType } from './constants.js';
import { makeHeaderArray } from './util.js';

class Sender {
  #header;
  #isSendDone = false;
  IP;
  constructor(header, data) {
    this.#header = header;
    this.data = data;
  }
  syn() {
    this.#header.packetType = PacketType.SYN;
    console.log(ConveyPacketType.Sending + PacketType.SYN);
    console.log(this.#header);
    this.headerArr = makeHeaderArray(this.#header);
    console.log(this.headerArr);
  }
  ack() {
    this.#header.packetType = PacketType.ACK;
    this.#header.ackNumber = 101;
    console.log(ConveyPacketType.Sending + PacketType.ACK);
    console.log(this.#header);
    this.headerArr = makeHeaderArray(this.#header);
    console.log(this.headerArr);
  }
  synAndAck() {
    console.log('>> Sending Packet: ' + PacketType.SYNACK);
    console.log(this.#header);
    console.log(this.headerArr);
  }
  sendData() {
    let body = '';
    if (this.dataSize > 100) {
      body = this.data.slice(0, 100);
      this.data = this.data.slice(100);
      this.#header.segmentation = true;
      this.#header.sequenceNumber += 100;
      this.#header.contentLength = 100;
    } else {
      body = this.data;
      this.#header.segmentation = false;
      this.#header.sequenceNumber += this.dataSize;
      this.#header.contentLength = this.dataSize;
      this.data = '';
      this.#isSendDone = true;
    }
    console.log(ConveyPacketType.Sending + PacketType.DATA);
    console.log(this.#header);
    console.log(body);
    this.#header.body = body;
  }

  get dataSize() {
    return this.data.length;
  }

  get header() {
    return this.#header;
  }

  get isSendDone() {
    return this.#isSendDone;
  }

  set header([prop, value]) {
    this.#header[prop] = value;
  }
}

export default Sender;
