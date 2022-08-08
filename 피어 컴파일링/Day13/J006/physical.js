import datalink from "./datalink.js";
import { string_to_utf8_hex_string, utf8_hex_string_to_string } from "./stringtohex.js";
function physicalLayer(data, type) {
  if (type === "send") send(data);
  else receive(data);
}
function send(data) {
  console.log(`--------------------physical Layer--------------------\n`);
  console.log(">> 요청 : ", JSON.stringify(data));
  const dataToHex = string_to_utf8_hex_string(JSON.stringify(data));
  console.log(dataToHex, "\r\n");
  physicalLayer(dataToHex, "receive");
}
function receive(dataToHex) {
  console.log(`--------------------receive physical Layer--------------------\n`);
  console.log(">> 전달받은 프레임 값을 다시 문자열로 바꿔서 출력한다.");
  const HexToData = utf8_hex_string_to_string(dataToHex);
  console.log(HexToData, "\r\n");

  //1계층에서 받은 data를 2계층 receiver로 올려줌
  datalink(HexToData, "receive");
}

export default physicalLayer;
