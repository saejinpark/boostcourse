import { RX_new } from './RX_new.mjs'
import { TX_new } from './TX_new.mjs'
import getUserInput from './input.mjs'

async function getInput() {
  const from     = await getUserInput('From: ');
  const to       = await getUserInput('To: ');
  const title    = await getUserInput('Title: ');
  const contents = await getUserInput('Contents: ');
  return new Promise((resolve) => {
    resolve({ 'from' : from, 'to' : to, 'title' : title, 'contents' : contents })
  });
}


function _3WayHandShake(client, server) {
  // SYN 을 보내기 위해
  const SYN_packet     = client.sendHandShake();
  server.receiveHandShake(SYN_packet);
  const SYN_ACK_packet = server.sendHandShake();
  client.receiveHandShake(SYN_ACK_packet);
  const ACK_packet     = client.sendHandShake();
  server.receiveHandShake(ACK_packet);
}


(async function () {
  const client = new TX_new();
  const server = new RX_new();

  // 서로의 ip 설정
  client.setDestinationIp(server.ip);
  server.setDestinationIp(client.ip);

  // 입력
  const input = await getInput();

  // 통신 전 3 way handshake 실행
  client.sendData(input);
  _3WayHandShake(client, server);

  // 통신 시작
  let data = client.sendData(input);
  while (data !== undefined) {
    const response = server.receiveData(data);
    if (response === undefined) {
      break;
    }
    data = client.sendData(input);
  }
})();