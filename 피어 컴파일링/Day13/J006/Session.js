import { v4 } from "uuid";
import presentation from "./presentation.js";
import transport from "./Transport.js";

function session(data, type) {
  if (type === "send") {
    send(data);
  } else receive(data);
}

function send(data) {
  data = data.split("\n");
  data = data.slice(0, -2).concat(`Session-ID : ${v4()}\r`).concat(data.slice(-2));
  data = data.join("\n");
  console.log(`--------------------Session Layer--------------------\n${data}`);

  //transport Layer로 데이터 넘김
  transport(data, "send");
}
function receive(data) {
  console.log(`--------------------receive Session Layer--------------------\n`);
  console.log(`>> 수신 데이터\n${JSON.stringify(data)}\n`);
  data = data.split("\n");
  //session 출력
  console.log(data[3].replace("\r", ""), "\n");
  //데이터에서 세션 제외
  data = data.slice(0, 3).concat(data.slice(4));
  presentation(data.join("\n"), "receive");
}

export default session;
