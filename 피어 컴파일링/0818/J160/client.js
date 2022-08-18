const io = require("socket.io-client");
const fs = require("fs");
const { util }  = require("./util");
const { STATE, SIGN, IP_TO_MAC } = require("./constant");

class Client {
  constructor(clientIp, clientPort) {
    [this.clientIp, this.clientPort, this.seqNum, this.ackNum] = [clientIp, clientPort, 0, 0];
    this.state = STATE['LISTEN'];
    this.socket = io.connect("http://127.0.0.1:2022", {
      path: "/socket.io",
      transports: ["websocket"],
      reconnect: true,
    });
    this.setSocket();
    this.buffer = '';
  }


  Layer7(data) {
    console.log("\x1b[35m");
    console.log(data);
    console.log("\x1b[37m");
  }


  Layer6(data) {
    const result = data.split('\\n');
    const contents = util.decodeByBase64(result.pop());
    result.push(contents);
    this.Layer7(result.join('\n'));
  }


  Layer5(data) {
    const result = data.replace(/\'|\"/gm, '');
    console.log('\n🆔 Session Id:', (/SessionId:\s(?<sessionId>.*)\\n/mg).exec(result).groups.sessionId);
    this.Layer6(result);
  }


  Layer4(data, sign) {
    // SYN 받고 SYN+ACK 보냄
    if (this.state === STATE['LISTEN'] && sign === 'UP') {
      console.log('\n🟢 Recieved: ', data);
      [this.serverPort, this.seqNum, this.ackNum] = [data[1], 100, data[3] + 1];
      const result = [SIGN['SYN+ACK'], this.clientPort, this.serverPort, this.seqNum, this.ackNum, 0];
      console.log('\n🟢 Send: ', result);
      this.Layer3(result, 'DOWN');
    }
    // ACK 받음
    else if (this.state === STATE['SYN_RCV'] && sign === 'UP') {
      console.log('\n🟢 Recieved: ', data);
      [this.seqNum, this.ackNum] = [data[3], data[4] + 1];
      this.state = STATE['ESTABLISHED'];
    }
    // DATA 받고 ACK 보냄
    else if (this.state === STATE['ESTABLISHED'] && sign === 'UP') {
      console.log('\n💬 Recieved: ', data);
      [this.seqNum, this.endSign] = [data[3], data[4]];
      this.ackNum += 1;
      this.buffer += data[5];
      const result = [SIGN['ACK'], this.clientPort, this.serverPort, this.seqNum, this.ackNum, 0];
      console.log('\n🟢 Send: ', result);
      this.Layer3(result, 'DOWN');
    }
    // 데이터를 다 받음
    if (this.endSign === false) {
      this.Layer5(this.buffer);
    }
  }


  Layer3(data, sign) {
    if (sign === 'UP') {
      const [serverIp, clientIp, result] = data;
      if (clientIp !== this.clientIp) throw new Error('🔴 주소가 다릅니다.\n');
      this.serverIp = serverIp;
      this.Layer4(result, sign);
    }
    if (sign === 'DOWN') {
      this.Layer2([this.clientIp, this.serverIp, data], sign);
    }
  }


  Layer2(data, sign) {
    if (sign === 'UP') {
      const [_, clientMac, result] = data;
      if (clientMac !== IP_TO_MAC[this.clientIp]) throw new Error('🔴 주소가 다릅니다.\n');
      this.Layer3(result, sign);
    }
    if (sign === 'DOWN') {
      this.Layer1([IP_TO_MAC[this.clientIp], IP_TO_MAC[this.serverIp], data], sign);
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
    if (data === undefined) {
      // SYN 받음
      this.socket.on(SIGN['SYN'], (data) => {
        this.Layer1(data, 'UP');
      });
      // ACK 받음
      this.socket.on(SIGN['ACK'], (data) => {
        this.Layer1(data, 'UP');
      });
      // DATA 받음
      this.socket.on(SIGN['DATA'], (data) => {
        this.Layer1(data, 'UP');
      });
      return ;
    } 
    // SYN+ACK 보냄
    if (this.state === STATE['LISTEN'] && sign === 'DOWN') {
      this.state = STATE['SYN_RCV'];
      this.socket.emit(SIGN['SYN+ACK'], data);
    }
    // ACK 보냄
    if (this.state === STATE['ESTABLISHED'] && sign === 'DOWN') {
      this.socket.emit(SIGN['ACK'], data);
    }
  }
}


module.exports = { Client };