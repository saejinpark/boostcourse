import ip from "ip";
import datalink from "./datalink.js";
import fs from "fs";
import transport from "./Transport.js";
function network(data, type) {
  if (type === "send") {
    send(data);
  } else receive(data);
}

function send(data) {
  console.log(`--------------------Network Layer--------------------\n`);
  console.log(">> 요청 : ", data);
  const myIp = ip.address();

  data = [myIp, "192.168.1.9", data];
  console.log(`{ ${data[0]}, ${data[1]}, [${data[2].join(", ")}] }\r\n`);
  //datalink layer로 데이터 전달
  datalink(data, "send");
}
function receive(data) {
  const receiverIP = fs.readFileSync("./receiverIP.txt", "utf8"); // 이 파일안에 수신자의 IP가 들어있음.

  if (data[1] === receiverIP) {
    console.log(`--------------------receive Network Layer--------------------\n`);
    console.log(">> 요청 : ", JSON.stringify(data));
    console.log(`발신 IP 주소 => ${data[0]}`);
    console.log(`수신 IP 주소 (일치) => ${data[1]}`, "\r\n");
    transport(data[2], "receive");
  } else console.log("수신 IP 주소가 일치하지 않아 해당 패킷을 무시합니다.");
}

export default network;
