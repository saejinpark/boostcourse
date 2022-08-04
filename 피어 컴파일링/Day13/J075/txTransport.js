import { txNetwork } from "./txNetwork.js";

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

let segmentData; // 세션 계층으로 부터 넘어온 데이터 저장됨

/**
 * 전송 계층
 * 3-way Handshake -> 데이터 세그먼트로 나눠 전송 -> 네트워크 계층으로 전달
 * @param {*} data 
 */
export function txTransport(data){
    segmentData = data;
    console.log("\n=========== Transport Layer ===========");

    console.log("요청 데이터 >> ");
    console.log(data.split('\r\n').join('\\r\\n'));

    // 3-way Handshak 시작
    // 수신 계층의 패킷은 받아왔다고 가정합니다. 전송 계층에서 보내는 패킷만 네트워크 계층으로 전달합니다. 
    // Sending Packet : SYN
    tcpHeader.source += 1;
    tcpHeader.sequenceNumber = 10;
    tcpHeader.packet = "SYN";
    tcpHeader.contentLength = 0;

    console.log(`\n>> Sending ${_tcpHeaderToString(tcpHeader)}`)
    console.log(`${_tcpHeaderToArray(tcpHeader)}`)
    txNetwork(tcpHeader)
    
    // Received Packet : SYN+ACK (수신 측에서 보낸 데이터라고 가정)
    console.log("\n=========== Transport Layer ===========");
    const tempSource = tcpHeader.source
    tcpHeader.packet = "SYN+ACK",
    tcpHeader.source =  tcpHeader.destination,
    tcpHeader.destination = tempSource,
    tcpHeader.ackNumber = Number(tcpHeader.sequenceNumber)+1,
    tcpHeader.sequenceNumber = 100,
    tcpHeader.contentLength = 0
    console.log(`\n>> Received ${_tcpHeaderToString(tcpHeader)}`)
    console.log(`${_tcpHeaderToArray(tcpHeader)}`)

    // Sending Packet : ACK
    console.log("\n=========== Transport Layer ===========");
    const ack = Number(tcpHeader.sequenceNumber)+1;
    const temp = tcpHeader.source;
    tcpHeader.packet = "ACK";
    tcpHeader.source = tcpHeader.destination;
    tcpHeader.destination = temp;
    tcpHeader.sequenceNumber = tcpHeader.ackNumber;
    tcpHeader.ackNumber = ack;
    tcpHeader.contentLength =  tcpHeader.contentLength;
    console.log(`\nSending Packet : ${_tcpHeaderToString(tcpHeader)}`);
    console.log(`${_tcpHeaderToArray(tcpHeader)}`)
    txNetwork(tcpHeader)

    // Sending Packet : DATA
    let idx = 0;
    let len;
    while(true){
        console.log("\n=========== Transport Layer ===========");
        if(idx+100 >= segmentData.length){
            len = segmentData.length-1;
            tcpHeader.segmentation = false;
        }else{
            len = 100;
            tcpHeader.segmentation = true;
        }
        tcpHeader.packet = "DATA"
        tcpHeader.sequenceNumber = Number(tcpHeader.sequenceNumber) + len;
        tcpHeader.contentLength = len;
        let content = segmentData.replaceAll('\r', '\\r');
        content = content.replaceAll('\n', '\\n');
        content = content.replaceAll('\t', '\\t');
        tcpHeader.segment = content.substring(idx, idx+len);
        delete tcpHeader.ackNumber;
        console.log(`Sending Packets: ${_tcpHeaderToString(tcpHeader)}`)
        console.log(`${_tcpHeaderToArray(tcpHeader)}`)
        txNetwork(tcpHeader)
        idx+=100;
        
        // Received Packet : ACK (수신측에서 보낸 데이터라고 가정)
        const segment = JSON.parse(JSON.stringify(tcpHeader));;
        const ack = Number(segment.sequenceNumber);
        const temp = segment.source;
        segment.packet = "ACK";
        segment.source = segment.destination;
        segment.destination = temp;
        segment.sequenceNumber = segment.ackNumber;
        segment.ackNumber = 101 + parseInt(idx/100);
        segment.contentLength =  0;
        delete segment.sequenceNumber;
        delete segment.segment;
        console.log("\n=========== Transport Layer ===========");
        console.log(`\nReceived Packet : ${_tcpHeaderToArray(segment)}`);
        console.log(_tcpHeaderToString(segment))

        if(tcpHeader.segmentation === false) break;
    }
    
}

/**
 * 배열 형식의 스트링으로 리턴
 * @param {Object}} tcpHeader 
 * @returns 
 */
function _tcpHeaderToArray(tcpHeader){
    if(tcpHeader.Packet !== "DATA"){
        return `[${Object.values(tcpHeader).join(', ')}]`
    }
}

/**
 * 오브젝트 형식의 스트링으로 리턴
 * @param {Object} tcpHeader 
 * @returns 
 */
function _tcpHeaderToString(tcpHeader){
    if(tcpHeader.packet === "DATA"){
        return `Packet: ${tcpHeader.packet}\n`+
        `Source Port: ${tcpHeader.source}\n`+
        `Destination Port: ${tcpHeader.destination}\n`+
        `Sequence Number: ${tcpHeader.sequenceNumber}\n`+
        `Segmentation : ${tcpHeader.segmentation}\n`+
        `Content-Length: ${tcpHeader.contentLength}\n`+
        `${tcpHeader.segment}`;
    }
    return `Packet: ${tcpHeader.packet}\n`+
        `Source Port: ${tcpHeader.source}\n`+
        `Destination Port: ${tcpHeader.destination}\n`+
        `Sequence Number: ${tcpHeader.sequenceNumber}\n`+
        `Ack Number: ${tcpHeader.ackNumber ?? "undefined"}\n`+
        `Content-Length: ${tcpHeader.contentLength}`;
}