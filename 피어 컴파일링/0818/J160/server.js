const express  = require("express");
const socketIO = require("socket.io");
const app = express();
const fs = require("fs");
const { util }  = require("./util");
const { STATE, SIGN, IP_TO_MAC } = require("./constant");

class Server {
  constructor(serverIp, serverPort) {
    [this.serverIp, this.serverPort, this.seqNum, this.ackNum] = [serverIp, serverPort, 10, 0];
    this.state = STATE['CLOSED'];
    this.io = socketIO(app.listen(2022), { path: "/socket.io" });
  }


  sendData(data, clientIp, clientPort) {
    this.clientIp   = clientIp;
    this.clientPort = clientPort;
    this.Layer7(data);
  }


  Layer7(data) {
    const result = `From: ${data[0]}\nTo: ${data[1]}\nTitle: ${data[2]}\n${data[3]}`;
    this.Layer6(result);
  }


  Layer6(data) {
    const result   = data.split('\n');
    const contents = util.encodeToBase64(result.pop());
    result.push(contents);
    this.Layer5(result.join('\n'));
  }


  Layer5(data) {
    const result = data.split('\n');
    result.splice(result.length-1, 0, 'SessionId: ' + util.getUUID());
    this.Layer4(result.join('\n'), 'DOWN');
  }


  Layer4(data, sign) {
    // SYN 보냄
    if (this.state === STATE['CLOSED'] && sign === 'DOWN') {
      this.buffer = JSON.stringify(data);
      const result = [SIGN['SYN'], this.serverPort, this.clientPort, this.seqNum, this.ackNum, 0];
      console.log('\n🟢 Send: ', result);
      this.Layer3(result, sign);
    }
    // SYN+ACK 받고 ACK 보냄
    else if (this.state === STATE['SYN_SENT'] && sign === 'UP') {
      console.log('\n🟢 Recieved: ', data);
      [this.seqNum, this.ackNum] = [data[4], data[3] + 1];
      const result = [SIGN['ACK'], this.serverPort, this.clientPort, this.seqNum, this.ackNum, 0];
      console.log('\n🟢 Send: ', result);
      this.Layer3(result, 'DOWN');
    }
    // 데이터 전송
    else if (this.state === STATE['ESTABLISHED']) {
      // ACK 받음
      if (sign === 'UP') {
        console.log('\n🟢 Recieved: ', data);
        this.seqNum = data[3];
        if (this.buffer.length !== 0) sign = 'DOWN';
      }
      // segment 100 단위 데이터 전송
      if (sign === 'DOWN') {
        let result = [];
        if (this.buffer.length > 100) {
          this.seqNum += 100;
          result = [SIGN['DATA'], this.serverPort, this.clientPort, this.seqNum, true, this.buffer.substr(0, 100)];
          this.buffer = this.buffer.substring(100);
        } else {
          this.seqNum += this.buffer.length;
          result = [SIGN['DATA'], this.serverPort, this.clientPort, this.seqNum, false, this.buffer];
          this.buffer = '';
        }
        console.log('\n💬 Send: ', result);
        this.Layer3(result, 'DOWN');
      }
    }
  }


  Layer3(data, sign) {
    if (sign === 'UP') {
      const [_, serverIp, result] = data;
      if (serverIp !== this.serverIp) throw new Error('🔴 주소가 다릅니다.\n');
      this.Layer4(result, sign);
    }
    if (sign === 'DOWN') {
      this.Layer2([this.serverIp, this.clientIp, data], sign);
    }
  }


  Layer2(data, sign) {
    if (sign === 'UP') {
      const [_, serverMac, result] = data;
      if (serverMac !== IP_TO_MAC[this.serverIp]) throw new Error('🔴 주소가 다릅니다.\n');
      this.Layer3(result, sign);
    }
    if (sign === 'DOWN') {
      this.Layer1([IP_TO_MAC[this.serverIp], IP_TO_MAC[this.clientIp], data], sign);
    }
  }


  Layer1(data, sign) {
    if (sign === 'UP') {
      const result = JSON.parse(util.hexToStr(data));
      this.Layer2(result, sign);
    }
    if (sign === 'DOWN') {
      this.setSocket(util.strToHex(JSON.stringify(data)), sign);
    }
  }


  setSocket(data, sign) {
    this.io.on("connect", (socket) => {
      this.socket = socket;
      // SYN 보냄
      if (this.state === STATE['CLOSED'] && sign === 'DOWN') {
        this.state = STATE['SYN_SENT'];
        this.socket.emit(SIGN['SYN'], data);
      }
      // SYN+ACK 받음
      this.socket.on(SIGN['SYN+ACK'], (data) => {
        this.Layer1(data, 'UP');
      });
      // ACK 받음
      this.socket.on(SIGN['ACK'], (data) => {
        this.Layer1(data, 'UP');
      });
    });
    // ACK 보냄
    if (this.state === STATE['SYN_SENT'] && sign === 'DOWN') {
      this.state = STATE['ESTABLISHED'];
      this.socket.emit(SIGN['ACK'], data);
      // 데이터 전송 신호
      this.Layer4(this.buffer, 'DOWN');
    }
    // 데이터 전송
    else if (this.state === STATE['ESTABLISHED'] && sign === 'DOWN') {
      this.socket.emit(SIGN['DATA'], data);
    }
  }
}


module.exports = { Server };