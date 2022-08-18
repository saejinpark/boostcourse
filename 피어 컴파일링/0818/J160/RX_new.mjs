import { 
  state, 
  sign,
  ipToMac
} from './constants.mjs'

import { 
  base64Decoder, 
  hexToString,
  stringToHex,
  getRandomIp,
} from './utils.mjs'



export class RX_new {
  constructor() {
    this.state  = state.LISTEN;
    this.seq_num = 100;
    this.ack_num = 'undefined';
    this.buffer = '';
    this.port = '8080';
    this.ip   = getRandomIp();
    this.mac  = ipToMac[this.ip];
  }


  setDestinationIp(ip) {
    this.destination_ip = ip;
  }


  // SYN+ACK 를 보내기 위해
  sendHandShake() {
    return this.Layer4(null);
  }


  // 본격적인 데이터 수신을 위해
  receiveData(data) {
    return this.Layer1(data);
  }


  // SYN 을 받기 위해
  // ACK 를 받기 위해
  receiveHandShake(packet) {
    return this.Layer1(packet);
  }


  Layer1(data) {
    // SYN 을 받기 위해
    // ACK 를 받기 위해
    // 본격적인 데이터 수신을 위해
    if (this.state === state.LISTEN || this.state === state.RECEIVE || this.state === state.ESTABLISHED) {
      console.log('>> 전달받은 프레임 값을 다시 문자열로 바꿔서 출력한다.');
      const data_arr = hexToString(data).replace(/\[+|\]+|"+/gm, '').replace(/\\+/gm, '\\').split(',');
      const result = [data_arr[0], data_arr[1], [data_arr[2], data_arr[3], data_arr.slice(4)]]
      console.log(JSON.stringify(result), '\n');
      return this.Layer2(result);
    }
    // SYN+ACK 를 보내기 위해
    if (this.state === state.WAIT) {
      console.log('>> 요청: ', JSON.stringify(data), '\n');
      const result = stringToHex(JSON.stringify(data));
      console.log(JSON.stringify(result), '\n');
      return result;
    }
  }
  

  Layer2(data) {
    // SYN 을 받기 위해
    // ACK 를 받기 위해
    // 본격적인 데이터 수신을 위해
    if (this.state === state.LISTEN || this.state === state.RECEIVE || this.state === state.ESTABLISHED) {
      console.log('>> 요청: ', JSON.stringify(data), '\n');
      const result = data[2];
      if (data[1] !== this.mac) {
        throw new Error('\nMAC 주소가 일치하지 않습니다.\n');
      }
      console.log('\n수신 MAC 주소 (일치) => ', data[0]);
      console.log('발신 MAC 주소 => ', data[1]);
      return this.Layer3(result);
    }
    // SYN+ACK 를 보내기 위해
    if (this.state === state.WAIT) {
      console.log('>> 요청: ', JSON.stringify(data), '\n');
      const result = [this.mac, ipToMac[this.destination_ip], data];
      console.log(JSON.stringify(result), '\n');
      return this.Layer1(result);
    }
  }


  Layer3(data) { 
    // SYN 을 받기 위해
    // ACK 를 받기 위해
    // 본격적인 데이터 수신을 위해
    if (this.state === state.LISTEN || this.state === state.RECEIVE || this.state === state.ESTABLISHED) {
      console.log('>> 요청: ', JSON.stringify(data), '\n');
      const result = data[2];
      if (data[1] !== this.ip) {
        throw new Error('\nIP 주소가 일치하지 않습니다.\n');
      }
      console.log('\n수신 IP 주소 (일치) => ', data[0]);
      console.log('발신 IP 주소 => ', data[1]);
      return this.Layer4(result);
    }
    // SYN+ACK 를 보내기 위해
    if (this.state === state.WAIT) {
      console.log('>> 요청: ', JSON.stringify(data), '\n');
      const result = [this.ip, this.destination_ip, data];
      console.log(JSON.stringify(result), '\n');
      return this.Layer2(result);
    }
  }


  Layer4(data) {
    // SYN 을 받기 위해
    if (this.state === state.LISTEN) {
      this.receivePacket(data);
      this.state = state.WAIT;
      return ;
    }
    // SYN+ACK 를 보내기 위해
    if (this.state === state.WAIT && data === null) {
      const packet = this.sendPacket();
      this.state = state.RECEIVE;
      return packet;
    }
    // ACK 를 받기 위해
    if (this.state === state.RECEIVE) {
      this.receivePacket(data);
      this.state = state.ESTABLISHED;
      return ;
    }
    // 본격적인 데이터 수신을 위해
    if (this.state === state.ESTABLISHED) {
      const segment = data.slice(6).join('').replace(/\\{2}/gm, '');
      this.receiveDataPacket(segment);
    }
  }


  Layer5(data) {
    console.log(data)
    const result = data.split(/\\r\\n|r\\n|\\n/gm).map(line => line.replace(/\\+/gm, ''));
    const session_id = result[3];
    console.log('Session-Id : ', session_id);
    return this.Layer6(result);
  }


  Layer6(data) {
    const contents = data[4];
    const decoded_data = base64Decoder(contents);
    console.log('\n디코딩 데이터 파일 : ', decoded_data);
    return this.Layer7(data);
  }


  Layer7(data) {
    const result = data.map((line, index) => {
      return (index !== data.length - 1)
      ? line + '\\r\\n'
      : line;
    });
    result.splice(4, 0, '\\r\\n');
    console.log('\n원본 데이터: ');
    console.log(result.join('\n'));
  }


  // SYN 을 받기 위해
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
    this.ack_num = packet[3];
    this.length = packet[5];
  }


  // 본격적인 데이터 수신을 위해
  receiveDataPacket(segment) {
    this.length = segment.length;
    const packet = [
      sign.DATA, this.port, this.destination_port, 
      Number(this.seq_num) + this.length,
      (this.length >= 100), this.length, segment
    ]
    console.log(
      '\n<< Received Packet : [' + packet + ']'
      + ',\nSource Port : ' + packet[1]
      + ',\nDestination Port : ' + packet[2]
      + ',\nSequence Number : ' + packet[3]
      + ',\nSegmentation  : ' + packet[4]
      + ',\nContent-Length  : ' + packet[5]
      + ',\n', segment, '\n'
    );
    this.seq_num = Number(packet[3]);
    this.ack_num += 1;
    this.buffer += segment;
    // 모든 segment 모으면 5계층으로 전송
    if (packet[4] === false) {
      this.Layer5(this.buffer);
    }
    // ACK 응답 전송
    // return this.sendPacket();
    return null;
  }


  sendPacket() {
    let packet = [];
    // SYN+ACK 를 보내기 위해
    if (this.state === state.WAIT) {
      packet = [
        sign['SYN+ACK'], this.port, this.destination_port, 
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


  printData(data) {
    console.log('\n');
    console.log(data.map(line => line.replace(/\r\n/gm, '\\r\\n')).join('\n'), '\n');
  }
}