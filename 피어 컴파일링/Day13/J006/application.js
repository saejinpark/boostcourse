import fs from "fs";
import presentation from "./presentation.js";
function application(from, to, title, fileName, type) {
  if (type === "send") {
    send(from, to, title, fileName);
  } else receive(from, to, title, fileName);
}

function send(from, to, title, fileName) {
  let data = "";
  data += `From: ${from}\r\n`;
  data += `To: ${to}\r\n`;
  data += `Title: ${title}\r\n\r\n`;
  try {
    //편의상 파일 내용이 아닌 파일크기로 구현함
    // data += fs.statSync(fileName).size;
    data += fs.readFileSync(fileName);
  } catch (e) {
    throw "해당경로에 파일이 없거나, 경로형식이 잘못되었습니다.";
  }
  console.log(`--------------------Application Layer-------------------- \n${data}`);
  //presentation layer로 전송
  presentation(data, "send");
}
function receive(from, to, title, fileName) {
  console.log(`--------------------Receive Application Layer--------------------\n`);
  let data = "";
  data += `From: ${from}\n`;
  data += `To: ${to}\n`;
  data += `Title: ${title}\n`;
  data += `\r\n`;
  data += fileName;
  console.log(data);
}

export default application;
