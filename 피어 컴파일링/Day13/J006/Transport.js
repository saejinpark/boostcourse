import fs from "fs";
import network from "./network.js";
import session from "./Session.js";
function transport(data, type) {
  if (type === "send") {
    send(data, "SYN");
  } else receive(data);
}

function send(data, type) {
  if (type === "SYN") {
    try {
      fs.writeFileSync("./requestData", data);
      fs.writeFileSync("./getrequestedData", "");
    } catch (e) {
      console.error("e");
    }
    console.log(`--------------------Transport Layer--------------------\n`);
    console.log(`>> 요청 데이터 \r\n${JSON.stringify(data)}\r\n`);
    //sending packet type
    console.log(`>> Sendig Packet : ${type}`);
    //sourceport
    const Port = fs.readFileSync("./port.txt", "utf8");
    const SourcePort = parseInt(Port.split("\n")[0]);
    const DestinationPort = parseInt(Port.split("\n")[1]);
    console.log(`Source Port : ${SourcePort}`);
    console.log(`Destination Port : ${DestinationPort}`);
    //sequence number
    const sequenceNum = Math.floor(Math.random() * 1000);
    console.log(`Sequence Number : ${sequenceNum}`);
    //ACK number
    const ACKnum = "undefined";
    console.log(`Ack Number : ${ACKnum}`);
    //Content length
    const ContentLen = 0;
    console.log(`Content-Legnth : ${ContentLen}`);
    //data
    data = [type, SourcePort, DestinationPort, sequenceNum, ACKnum, ContentLen];
    console.log(`${data}\r\n`);
    //3계층 Network Layer로 계정 넘김
    network(data, "send");
    //사용한 request Data 삭제
  } else if (type === "SYN+ACK") {
    // const a = fs.readFileSync("./requestData", "utf8");
    // console.log(a);
    const ACKdata = [];
    //Packet Type
    ACKdata.push("ACK");
    console.log(`>> Sending Packet : ${ACKdata[0]}`);
    //Source Port
    ACKdata.push(data[2]);
    console.log(`Source Port :${ACKdata[1]}`);
    //Destination Port
    ACKdata.push(data[1]);
    console.log(`Destination Port : ${ACKdata[2]}`);
    //sequence number
    const sequenceNum = data[data.length - 2];
    ACKdata.push(sequenceNum);
    console.log(`Sequence Number : ${sequenceNum}`);
    //ACK Number
    const ACKnumber = data[3] + 1;
    ACKdata.push(ACKnumber);
    console.log(`ACK Number : ${ACKnumber}`);
    //Content length
    const ContentLen = 0;
    ACKdata.push(ContentLen);
    console.log(`Content-Legnth : ${ContentLen}`);
    console.log(ACKdata, "\r\n");
    //ACK보내기
    //---------------DATA---------------
    // network(ACKdata, "ACK");
    const requestData = fs.readFileSync("./requestData", "utf8");
    let DATAContentLen = requestData.length;
    if (DATAContentLen > 100) DATAContentLen = 100;
    const DATAdata = [];
    //Packet Type
    DATAdata.push("DATA");
    console.log(`>> Sending Packet : ${DATAdata[0]}`);
    //Source Port
    DATAdata.push(ACKdata[1]);
    console.log(`Source Port :${DATAdata[1]}`);
    //Destination Port
    DATAdata.push(ACKdata[2]);
    console.log(`Destination Port : ${DATAdata[2]}`);
    //sequence number
    const sequenceDATA = ACKdata[ACKdata.length - 3] + DATAContentLen + 1;
    DATAdata.push(sequenceDATA);
    console.log(`Sequence Number : ${sequenceDATA}`);
    //Segmentation

    if (requestData.length > 100) {
      DATAdata.push(true);
      console.log(`Segmentation : ${true}`);
    } else {
      DATAdata.push(false);
      console.log(`Segmentation : ${false}`);
    }
    //Content length

    DATAdata.push(DATAContentLen);
    console.log(`Content-Legnth : ${DATAContentLen}`);
    //contents
    DATAdata.push(requestData.slice(0, DATAContentLen));
    console.log(DATAdata, "\r\n");
    fs.writeFileSync("./getrequestedData", requestData.slice(0, DATAContentLen));
    //가져다 쓴만큼 제거
    fs.writeFileSync("./requestData", requestData.slice(DATAContentLen));
    //몰래 data에 ACK넘버 같이 껴서 보내주기
    DATAdata.push(ACKdata[ACKdata.length - 2]);
    network(DATAdata, "send");
  } else if (type === "ACK") {
    //Content length 미리선언하기(sequence계산때문에)
    const requestData = fs.readFileSync("./requestData", "utf8");
    let DATAContentLen = requestData.length;
    if (DATAContentLen > 100) DATAContentLen = 100;
    if (DATAContentLen === 0) {
      console.log("읽기 완료");
      session(fs.readFileSync("./getrequestedData", "utf8"), "received");
      return;
    }
    const DATAdata = [];
    //Packet Type
    DATAdata.push("DATA");
    console.log(`>> Sending Packet : ${DATAdata[0]}`);
    //Source Port
    DATAdata.push(data[2]);
    console.log(`Source Port :${DATAdata[1]}`);
    //Destination Port
    DATAdata.push(data[1]);
    console.log(`Destination Port : ${DATAdata[2]}`);
    //sequence number
    const sequenceDATA = data[data.length - 3] + DATAContentLen + 1;
    DATAdata.push(sequenceDATA);
    console.log(`Sequence Number : ${sequenceDATA}`);
    //Segmentation
    if (requestData.length > 100) {
      DATAdata.push(true);
      console.log(`Segmentation : ${true}`);
    } else {
      DATAdata.push(false);
      console.log(`Segmentation : ${false}`);
    }
    //Content length
    DATAdata.push(DATAContentLen);
    console.log(`Content-Legnth : ${DATAContentLen}`);
    //contents
    DATAdata.push(requestData.slice(0, DATAContentLen));
    const temp = fs.readFileSync("./getrequestedData", "utf8");
    fs.writeFileSync("./getrequestedData", `${temp}${requestData.slice(0, DATAContentLen)}`);
    console.log(DATAdata, "\r\n");
    //가져다 쓴만큼 제거
    fs.writeFileSync("./requestData", requestData.slice(DATAContentLen));
    //몰래 data에 ACK넘버 같이 껴서 보내주기
    DATAdata.push(data[data.length - 2]);
    network(DATAdata, "send");
  }
}
//-------------------------------------------receive-------------------------------------------------------

function receive(data) {
  console.log(`--------------------Receive Transport Layer--------------------\n`);
  if (data[0] === "SYN") {
    const receiveData = [];
    //Packet Type
    receiveData.push("SYN+ACK");
    console.log(`>> Received Packet : ${receiveData[0]}`);
    //Source Port
    receiveData.push(data[2]);
    console.log(`Source Port :${receiveData[1]}`);
    //Destination Port
    receiveData.push(data[1]);
    console.log(`Destination Port : ${receiveData[2]}`);
    //sequence number
    const sequenceNum = Math.floor(Math.random() * 1000);
    receiveData.push(sequenceNum);
    console.log(`Sequence Number : ${sequenceNum}`);
    //ACK Number
    const ACKnumber = data[3] + 1;
    receiveData.push(ACKnumber);
    console.log(`ACK Number : ${ACKnumber}`);
    //Content length
    const ContentLen = 0;
    receiveData.push(ContentLen);
    console.log(`Content-Legnth : ${ContentLen}`);
    console.log(receiveData, "\r\n");
    send(receiveData, "SYN+ACK");
  } else if (data[0] === "DATA") {
    const receiveData = [];
    //Packet Type
    receiveData.push("ACK");
    console.log(`>> Received Packet : ${receiveData[0]}`);
    //Source Port
    receiveData.push(data[2]);
    console.log(`Source Port :${receiveData[1]}`);
    //Destination Port
    receiveData.push(data[1]);
    console.log(`Destination Port : ${receiveData[2]}`);
    //sequence number
    const sequenceNum = data[3];
    receiveData.push(sequenceNum);
    console.log(`Sequence Number : ${sequenceNum}`);
    //ACK Number
    const ACKnumber = data[data.length - 1] + 1;
    receiveData.push(ACKnumber);
    console.log(`ACK Number : ${ACKnumber}`);
    //Content length
    const ContentLen = 0;
    receiveData.push(ContentLen);
    console.log(`Content-Legnth : ${ContentLen}`);
    console.log(receiveData, "\r\n");
    send(receiveData, "ACK");
  }
}
export default transport;
