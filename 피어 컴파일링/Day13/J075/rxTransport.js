import { rxSession } from "./rxSession.js";
const Ack = 101;

/**
 * tcp header 겸 세그먼트까지 포함하게 되는 변수
 */
const tcpHeader = {
    packet: undefined,
    source : 10000,
    destination: 8080,
    sequenceNumber: undefined,
    ackNumber: undefined,
    contentLength: undefined
}

let AllSegment = ''; // 나눠진 세그먼트를 모으는 변수

/**
 * 전송 계층
 * 3-way Handshake -> 데이터 세그먼트로 나눠진 걸 합침 -> 세션 계층으로 전달
 * @param {*} segments 
 */
export function rxTransport(segments){
    segments = segments.replace('[', '');
    segments = segments.replace(']', '');
    segments = segments.split(', ');
    // 데이터 패킷이 왔을 때
    if(segments[0] === "DATA"){
        console.log("\n=========== Transport Layer ===========");
        tcpHeader.packet = segments[0];
        tcpHeader.source = Number(segments[1]);
        tcpHeader.destination = Number(segments[2]);
        tcpHeader.sequenceNumber = Number(segments[3]);
        tcpHeader.contentLength =  Number(segments[4]);
        tcpHeader.segmentation = segments[5] === 'true' ? true : false;
        tcpHeader.segment = segments[6];
        delete tcpHeader.ackNumber;
        AllSegment += tcpHeader.segment;
        console.log(`\nReceived Packet : ${_tcpHeaderToArray(tcpHeader)}`);
        console.log(_tcpHeaderToString(tcpHeader));
        if(tcpHeader.segmentation === false) rxSession(AllSegment);
    }else{ // 데이터 패킷이 아닐 때
        tcpHeader.packet = segments[0];
        tcpHeader.source = segments[1];
        tcpHeader.destination = segments[2];
        tcpHeader.sequenceNumber = segments[3];
        tcpHeader.ackNumber = segments[4]=='' ?undefined:segments[4];
        tcpHeader.contentLength =  segments[5];
    }
    if(tcpHeader.packet === "SYN") receiveSYN(tcpHeader);
    if(tcpHeader.packet === "ACK") receiveACK(tcpHeader);
}

/**
 * SYN 패킷을 받으면 SYN+ACK를 보낸다.
 * @param {*} segments 
 */
function receiveSYN(segments){
    console.log("\n=========== Transport Layer ===========");
    console.log(`\nReceived Packet : ${_tcpHeaderToArray(segments)}`);
    segments = JSON.parse(JSON.stringify(segments));;
    console.log(_tcpHeaderToString(segments));
    const temp = segments.source;

    // SYN+ACK을 수신 계층으로 보냈다고 가정
    segments.packet = "SYN+ACK";
    segments.source = segments.destination;
    segments.destination = temp;
    segments.ackNumber = Number(segments.sequenceNumber)+1;
    segments.sequenceNumber = 100;
    segments.contentLength =  segments.contentLength;
    console.log(`\nSending Packet : ${_tcpHeaderToString(segments)}`);
    console.log(_tcpHeaderToArray(segments))
}

/**
 * ack를 받았음을 출력
 * @param {Object} segments 
 */
function receiveACK(segments){
    console.log("\n=========== Transport Layer ===========");
    console.log(`\nReceived Packet : ${_tcpHeaderToArray(segments)}`);

    console.log(_tcpHeaderToString(segments))
}

function _tcpHeaderToArray(tcpHeader){
    if(tcpHeader.Packet !== "DATA"){
        return `[${Object.values(tcpHeader).join(', ')}]`
    }
}

function _tcpHeaderToString(tcpHeader){
    if(tcpHeader.packet === "DATA"){
        return `Packet: ${tcpHeader.packet}\n`+
        `Source Port: ${tcpHeader.source}\n`+
        `Destination Port: ${tcpHeader.destination}\n`+
        `Sequence Number: ${tcpHeader.sequenceNumber}\n`+
        `Segmentation : ${tcpHeader.segmentation}\n`+
        `Content-Length: ${tcpHeader.contentLength}\n`+
        `${tcpHeader.segment}`;
    }return `Packet: ${tcpHeader.packet}\n`+
    `Source Port: ${tcpHeader.source}\n`+
    `Destination Port: ${tcpHeader.destination}\n`+
    `Sequence Number: ${tcpHeader.sequenceNumber}\n`+
    `Ack Number: ${tcpHeader.ackNumber ?? "undefined"}\n`+
    `Content-Length: ${tcpHeader.contentLength}`;
}