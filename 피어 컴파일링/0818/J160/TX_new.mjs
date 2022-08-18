import { 
  state, 
  sign,
  ipToMac
} from './constants.mjs'

import { 
  base64Encoder, 
  getUUID, 
  hexToString,
  stringToHex,
  getRandomIp
} from './utils.mjs'


export class TX_new {
  constructor() {
    this.state   = state.CLOSED;
    this.seq_num = 10;
    this.ack_num = 'undefined';
    this.buffer  = '';
    this.length  = 0;
    this.port = '10001';
    this.ip   = getRandomIp();
    this.mac  = ipToMac[this.ip];
  }


  setDestinationIp(ip) {
    this.destination_ip = ip;
  }

  
  sendData(data) {
    // 본격적인 통신
    if (this.buffer !== '') {
      return this.Layer4();
    } 
    // 3 way handshake 하기 전
    else {
      return this.Layer7(data);
    }
  }


  // SYN 을 보내기 위해
  // ACK 를 보내기 위해
  sendHandShake() {
    return this.Layer4(null);
  }


  // SYN+ACK 를 받기 위해
  receiveHandShake(packet) {
    return this.Layer1(packet);
  }

  
  Layer7(data) {
    const result = [
      `From: ${data.from}\r\n`,
      `To: ${data.to}\r\n`,
      `Title: ${data.title}\r\n`,
      `\r\n`,
      `${data.contents}`
    ];
    this.printData(result);
    return this.Layer6(result);
  }


  Layer6(data) {
    const result = [...data];
    const contents = result.pop();
    result.push(base64Encoder(contents));
    this.printData(result);
    return this.Layer5(result);
  }


  Layer5(data) {
    const result = [...data];
    result.splice(3, 0, getUUID());
    this.printData(result);
    return this.Layer4(result);
  }


  Layer4(data) {
    // 3 way handshake 하기 전의 통신
    if (this.state === state.CLOSED && data !== null) {
      this.buffer = JSON.stringify(data);
      return ;
    }
    // SYN 을 보내기 위해
    if (this.state === state.CLOSED && data === null) { 
      const packet = this.sendPacket();
      this.state = state.SENT;
      return packet;
    }
    // SYN+ACK 를 받기 위해
    if (this.state === state.SENT && data !== null) { 
      this.receivePacket(data);
      this.state = state.ESTABLISHED;
      return ;
    }
    // ACK 를 보내기 위해
    if (this.state === state.ESTABLISHED && data === null) {
      const packet = this.sendPacket();
      return packet;
    }
    // 본격적인 통신
    if (this.state === state.ESTABLISHED && this.buffer !== '') {
      const segment = this.buffer.substr(0, 100);
      const packet  = this.sendDataPacket(segment);
      this.buffer   = this.buffer.slice(100);
      return packet;
    }
  }


  Layer3(data) { 
    // SYN 을 보내기 위해
    // ACK 를 보내기 위해
    if (this.state === state.CLOSED || this.state === state.ESTABLISHED) {
      console.log('>> 요청: ', JSON.stringify(data), '\n');
      const result = [this.ip, this.destination_ip, data];
      console.log(JSON.stringify(result), '\n');
      return this.Layer2(result);
    }
    // SYN+ACK 를 받기 위해
    if (this.state === state.SENT) {
      console.log('>> 요청: ', JSON.stringify(data), '\n');
      const result = data[2];
      if (data[1] !== this.ip) {
        throw new Error('\nIP 주소가 일치하지 않습니다.\n');
      }
      console.log('\n수신 IP 주소 (일치) => ', data[0]);
      console.log('발신 IP 주소 => ', data[1]);
      return this.Layer4(result);
    }
  }


  Layer2(data) {
    // SYN 을 보내기 위해
    // ACK 를 보내기 위해
    if (this.state === state.CLOSED || this.state === state.ESTABLISHED) {
      console.log('>> 요청: ', JSON.stringify(data), '\n');
      const result = [this.mac, ipToMac[this.destination_ip], data];
      console.log(JSON.stringify(result), '\n');
      return this.Layer1(result);
    }
    // SYN+ACK 를 받기 위해
    if (this.state === state.SENT) {
      console.log('>> 요청: ', JSON.stringify(data), '\n');
      const result = data[2];
      if (data[1] !== this.mac) {
        throw new Error('\nMAC 주소가 일치하지 않습니다.\n');
      }
      console.log('\n수신 MAC 주소 (일치) => ', data[0]);
      console.log('발신 MAC 주소 => ', data[1]);
      return this.Layer3(result);
    }
  }


  Layer1(data) {
    // SYN 을 보내기 위해
    // ACK 를 보내기 위해
    if (this.state === state.CLOSED || this.state === state.ESTABLISHED) {
      console.log('>> 요청: ', JSON.stringify(data), '\n');
      const result = stringToHex(JSON.stringify(data));
      console.log(JSON.stringify(result), '\n');
      return result;
    }
    // SYN+ACK 를 받기 위해
    if (this.state === state.SENT) {
      console.log('>> 전달받은 프레임 값을 다시 문자열로 바꿔서 출력한다.');
      console.log(data);
      const data_arr = hexToString(data).replace(/\[+|\]+|"+/gm, '').split(',');
      const result = [data_arr[0], data_arr[1], [data_arr[2], data_arr[3], data_arr.slice(4)]]
      console.log(JSON.stringify(result), '\n');
      return this.Layer2(result);
    }
  }


  receivePacket(packet) {
    console.log(
      '\n<< Received Packet : ' + packet[0]
      + ',\nSource Port : ' + packet[1]
      + ',\nDestination Port : ' + packet[2]
      + ',\nSequence Number : ' + Number(packet[3])
      + ',\nAck Number : ' + packet[4]
      + ',\nContent-Length : ' + packet[5]
      + ',\n', packet, '\n'
    );
    this.destination_port = packet[1];
    this.seq_num = Number(packet[4]);
    this.ack_num = Number(packet[3]);
    this.length = packet[5];
  }


  sendPacket() {
    let packet = [];
    // SYN 을 보내기 위해
    if (this.state === state.CLOSED) {
      packet = [
        sign.SYN, this.port, '8080', Number(this.seq_num), 
        this.ack_num, 0
      ];
    }
    // ACK 를 보내기 위해
    if (this.state === state.ESTABLISHED) {
      packet = [sign.ACK, this.port, this.destination_port, 
        Number(this.seq_num), Number(this.ack_num) + 1, 0
      ];
    }
    console.log(
      '\n>> Sending Packet : ' + packet[0]
      + ',\nSource Port : ' + packet[1]
      + ',\nDestination Port : ' + packet[2]
      + ',\nSequence Number : ' + packet[3]
      + ',\nAck Number : ' + packet[4]
      + ',\nContent-Length : ' + packet[5]
      + ',\n', packet, '\n'
    );
    return this.Layer3(packet);
  }


  // 본격적인 데이터 전송
  sendDataPacket(segment) {
    this.length = segment.length;
    const packet = [
      sign.DATA, this.port, this.destination_port, 
      Number(this.seq_num) + this.length,
      (this.length == 100), this.length, segment
    ]
    console.log(
      '\n>> Sending Packet : ' + packet[0]
      + ',\nSource Port : ' + packet[1]
      + ',\nDestination Port : ' + packet[2]
      + ',\nSequence Number : ' + packet[3]
      + ',\nSegmentation  : ' + packet[4]
      + ',\nContent-Length  : ' + packet[5]
      + ',\n', segment, '\n'
    );
    return this.Layer3(packet);
  }


  printData(data) {
    console.log('\n');
    console.log(data.map(line => line.replace(/\r\n/gm, '\\r\\n')).join('\n'), '\n');
  }
}