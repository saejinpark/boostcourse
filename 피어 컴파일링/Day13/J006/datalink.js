import macaddress from "node-macaddress";
import ipmactable from "./ipmactable.js";
import network from "./network.js";
import physicalLayer from "./physical.js";
function datalink(data, type) {
  if (type === "send") send(data);
  else receive(data);
}
async function send(data) {
  console.log(`--------------------Data Link Layer--------------------\n`);
  console.log(">> 요청 : ", JSON.stringify(data));
  const myMac = await getMACAddress();
  const receivermac = ipmactable(data[1]);
  data = [myMac, receivermac, data];
  console.log(JSON.stringify(data), "\r\n");
  physicalLayer(data, "send");
}
function receive(HexToData) {
  console.log(`--------------------receive Data Link Layer--------------------\n`);
  console.log(">> 요청 : ", HexToData);
  const data = JSON.parse(HexToData);
  const destinationIP = data[2][1];
  const destinationMAC = data[1];

  if (ipmactable(destinationIP) === destinationMAC) {
    console.log(`수신 MAC 주소 (일치) => ${data[1]}`);
    console.log(`발신 MAC 주소 => ${data[0]}`, "\r\n");
    //mac 헤더 제거한 data 를 network layer로 전송
    network(data[2], "receive");
  } else console.log("수신 mac주소와 ip가 맞지않아 프레임을 무시합니다.");
}

function getMACAddress() {
  return new Promise((res, rej) => {
    res(macaddress.one((err, mac) => mac));
  });
}
export default datalink;
