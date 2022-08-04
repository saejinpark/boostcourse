import { PacketType } from './constants.js';
import Reciever from './Receiver.js';
import Sender from './Sender.js';
import { convertHexToASCII } from './util.js';

class Rx {
  constructor(physicalValue) {
    this.physicalValue = physicalValue;
    //메일 내용 담을 배열
    this.data = [];
    this.ret = this.transport(this.removeIp(this.removeMac(this.pvToStr())));
  }
  pvToStr() {
    return convertHexToASCII(this.physicalValue);
  }

  removeMac(item) {
    const header = item.split(', ');
    header.shift();
    header.shift();
    return header;
  }

  removeIp(header) {
    header.shift();
    header.shift();
    return header;
  }

  transport(header) {
    console.log(header);
    const arr = header[0].split(',').map((item) => {
      if (item[0] === '[') {
        return item.slice(1);
      } else if (item[item.length - 1] === ']') {
        return item.slice(0, -1);
      } else return item;
    });
    const [packetType, sourcePort, destPort, sequenceNumber, ackNumber, contentLength, body] = arr;
    const sender = new Sender({
      packetType: packetType,
      sourcePort: sourcePort,
      destPort: destPort,
      sequenceNumber: 100,
      ackNumber: 11,
      contentLength: 0,
    });
    const reciever = new Reciever({
      packetType: packetType,
      sourcePort: destPort,
      destPort: sourcePort,
      sequenceNumber: 100,
      ackNumber: 11,
      contentLength: 0,
      body: body,
    });
    switch (packetType) {
      case PacketType.SYN:
        sender.synAndAck();
        reciever.synAndAck();
        break;
      case PacketType.DATA:
        sender.ack();
        reciever.ack();
    }
  }
}
export default Rx;
