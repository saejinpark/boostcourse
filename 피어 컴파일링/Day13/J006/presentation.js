import { encodeBase64, decodeBase64 } from "./Base64.js";
import session from "./Session.js";
import fs from "fs";
import application from "./application.js";
function presentation(data, type) {
  if (type === "send") {
    send(data);
  } else receive(data);
}
function send(data) {
  data = data.split("\n");
  const encodeData = encodeBase64(data.slice(4).join("\n"));
  data.push(encodeData);
  data = `${data.slice(0, 4).join("\n")}\r\n${encodeData}`;
  console.log(`--------------------Presentation Layer--------------------\n${data}`);
  //5계층 세션 레이어로 넘김
  session(data, "send");
}
function receive(data) {
  console.log(`--------------------Receive Presentation Layer--------------------\n`);
  console.log(`>> 수신 데이터`);
  console.log(JSON.stringify(data), "\n");
  data = data.split("\n");
  const decodeData = decodeBase64(data[4]);
  console.log(`디코딩 데이터 파일 : attachment.file\n`);
  fs.writeFileSync("./attachment.file", decodeData);
  if ((fs.readFileSync("./attachment.file", "utf8") === fs.readFileSync("./test.txt"), "utf8")) {
    console.log("온전하게 전송이 완료되었습니다. 파일의 내용이 같습니다.\n");
  } else console.log("온전하게 전송이 완료되지 않았습니다. 파일의 내용이 다릅니다.\n");
  application(data[0].split(" ")[1], data[1].split(" ")[1], data[2].split(" ")[1], decodeData, "receive");
}
export default presentation;
