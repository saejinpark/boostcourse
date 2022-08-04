import uuid4 from './uuid.js';
import Sender from './Sender.js';
import Reciever from './Receiver.js';
import Rx from './Rx.js';
import { addressTable, IP } from './constants.js';
import { makePrettyDataLinkHeader, makePrettyNetworkHeader, convertASCIItoHex, convertHexToASCII } from './util.js';
class OSI {
  constructor({ from, to, title, content }) {
    this.info = { From: from, To: to, Title: title, Content: content };
    this.str = '';
    for (let key in this.info) {
      const value = this.info[key];
      if (key === 'Title') this.str += `${key}: ${value}\r\n\r\n`;
      else if (key === 'Content') this.str += value;
      else this.str += `${key}: ${value}\r\n`;
    }
    this.connect = false;
  }
  present() {
    const arr = this.str.split('\r\n');
    const content = arr[arr.length - 1];
    arr[arr.length - 1] = Buffer.from(content, 'utf8').toString('base64');
    this.str = arr.join('\r\n');
  }

  session() {
    const arr = this.str.split('\r\n');
    const sessionId = uuid4();
    arr.splice(3, 0, sessionId);
    this.str = arr.join('\r\n');
    console.log(this.str);
  }

  transport(source, dest) {
    const senderHeader = {
      sourcePort: source,
      destPort: dest,
      sequenceNumber: 10,
      ackNumber: undefined,
      contentLength: 0,
    };
    this.threeWayHandShake(senderHeader);
    this.connect ? console.log('수신자와 연결에 성공했습니다.') : console.log('수신자와 연결할 수 없습니다.');
    if (!this.connect) return;
    while (!this.sender.isSendDone) {
      this.sender.sendData();
      this.network(this.sender);
    }
  }

  threeWayHandShake(senderHeader) {
    this.sender = new Sender(senderHeader, this.str);
    this.sender.syn();
    this.network(this.sender);
    this.sender.ack();
    this.network(this.sender);
    this.connect = true;
    return this.connect;
  }

  network(dataMaker) {
    // console.log('네트워크 요청: ', dataMaker.headerArr);
    this.sender.header = ['sourceIP', IP.sourceIP];
    this.sender.header = ['destIP', IP.destIP];
    // console.log(makePrettyNetworkHeader(dataMaker.header));
    this.dataLink(dataMaker);
  }

  dataLink(dataMaker) {
    // console.log(`데이터 링크 요청: "${makePrettyNetworkHeader(dataMaker.header)}"`);
    this.sender.header = ['sourceMAC', addressTable[dataMaker.header.sourceIP]];
    this.sender.header = ['destMAC', addressTable[dataMaker.header.destIP]];
    // console.log(makePrettyDataLinkHeader(dataMaker.header));
    this.physical(makePrettyDataLinkHeader(dataMaker.header));
  }

  physical(frame) {
    // console.log('물리적 문자열', convertASCIItoHex(frame));
    this.physicalValue = convertASCIItoHex(frame);
    const rx = new Rx(this.physicalValue);
  }
}

export default OSI;
