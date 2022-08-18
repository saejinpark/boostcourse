import { makeSignal_Layer1, receiveSignal_Layer1 } from "./physicalLayer.js"
import { makeFrame_Layer2, receiveFrame_Layer2 } from "./datalinkLayer.js"
import { makePacket_Layer3, receivePacket_Layer3 } from "./networkLayer.js"


function threeWayHandShake_Layer4(emailSessionData, sender, receiver) {
    const SOURCE = 1;
    const DEST = 2;
    const SEQ = 3;


    console.log("\n---------- Start 3-way HandShake ----------")
    // 1. 송신부가 SYN을 보낸다.
    // 순서대로 패킷종류, SourcePort, DestPort, Seq.Num, Ack.Num, length
    const txPort = 10000;
    const rxPort = 220;
    const packetSYN = ["SYN", txPort, rxPort, 23, undefined, 0];
    displayFlagPacket("send", packetSYN);
    const receivedPacketSYN = transportSegment(packetSYN, 'tx', 'rx');
    displayFlagPacket("receive", receivedPacketSYN);

    // 2. 수신부가 SYN+ACK 패킷을 보낸다.
    const packetSYN_ACK = ["SYN+ACK"];
    packetSYN_ACK.push(receivedPacketSYN[DEST]);
    packetSYN_ACK.push(receivedPacketSYN[SOURCE]);
    packetSYN_ACK.push(121);
    packetSYN_ACK.push(receivedPacketSYN[SEQ]+1);
    packetSYN_ACK.push(0);
    displayFlagPacket("send", packetSYN_ACK);
    const receivedPacketSYN_ACK = transportSegment(packetSYN_ACK, 'rx', 'tx');
    displayFlagPacket("receive", receivedPacketSYN_ACK);

    // 3. 송신부가 ACK 패킷을 보낸다.
    const packetACK = ["ACK"];
    packetACK.push(receivedPacketSYN_ACK[DEST]); // src.P
    packetACK.push(receivedPacketSYN_ACK[SOURCE]); // dest.P
    packetACK.push(receivedPacketSYN_ACK[4]); // Seq
    packetACK.push(receivedPacketSYN_ACK[SEQ]+1); // Ack
    packetACK.push(0); // content-length
    displayFlagPacket("send", packetACK);
    const receivedPacketACK = transportSegment(packetACK, 'tx', 'rx');
    displayFlagPacket("receive", receivedPacketACK);

    // 여기부터는 Data 패킷 전송
    let receivedData = "";
    let seqNum = receivedPacketACK[SEQ];
    let ackNum = receivedPacketACK[4];

    while(emailSessionData.length !== 0) {
        const segmentData = emailSessionData.substring(0,100);
        emailSessionData = emailSessionData.substring(100);
        const dataSize = segmentData.length;

        const packetDATA = ["DATA"];
        packetDATA.push(txPort);
        packetDATA.push(rxPort);
        packetDATA.push(seqNum+dataSize); // seq Num
        packetDATA.push(dataSize===100); // segmentation
        packetDATA.push(ackNum+1); // Ack.num
        packetDATA.push(dataSize); // content-length
        packetDATA.push(segmentData);
        displayDataPacket("send", packetDATA);
        const receivedDataSegment = transportSegment(packetDATA, 'tx', 'rx');
        displayDataPacket("receive", packetDATA);

        receivedData += receivedDataSegment[7];

        const packetDATA_ACK = ["ACK"];
        packetDATA_ACK.push(txPort);
        packetDATA_ACK.push(rxPort);
        packetDATA_ACK.push(receivedDataSegment[5]);
        packetDATA_ACK.push(receivedDataSegment[SEQ]+1);
        packetDATA_ACK.push(0);
        displayFlagPacket("send", packetACK);
        const receivedPacketDATA_ACK = transportSegment(packetDATA_ACK, 'rx', 'tx');
        displayFlagPacket("receive", packetDATA_ACK);

        seqNum = receivedPacketDATA_ACK[4];
        ackNum = receivedPacketDATA_ACK[SEQ];
    }
    return receivedData;
}

function displayFlagPacket (mode, packet) {
    const role = mode === "send" ? "Sending" : "Received";
    console.log("\n>> " + role + " Packet : " + packet[0]);
    console.log("Source Port : " + packet[1]);
    console.log("Destination Port : " + packet[2]);
    console.log("Seq. Number : " + packet[3]);
    console.log("Ack. Number : " + packet[4]);
    console.log("Content Length : " + packet[5]);
    console.log(JSON.stringify(packet));
}

function displayDataPacket (mode, packet) {
    const role = mode === "send" ? "Sending" : "Received";
    console.log("\n>> " + role + " Packet : " + packet[0]);
    console.log("Source Port : " + packet[1]);
    console.log("Destination Port : " + packet[2]);
    console.log("Seq. Number : " + packet[3]);
    console.log("Segmentation : " + packet[4]);
    console.log("Ack. Number : " + packet[5]);
    console.log("Content Length : " + packet[6]);
    console.log(packet[7]);
    console.log(JSON.stringify(packet));
}

function transportSegment(segment, sender, receiver) {
    const hexData = send(segment, sender);
    const receivedSegment = receive(hexData, receiver);
    return receivedSegment;
}

function send(segment, sender) {
    const packet = makePacket_Layer3(segment, sender);
    const frame = makeFrame_Layer2(packet);
    const hexFrameData = makeSignal_Layer1(frame);
    return hexFrameData;
}

function receive(hexFrameData, receiver) {
    const frame = receiveSignal_Layer1(hexFrameData);
    const packet = receiveFrame_Layer2(frame, receiver);
    const segment = receivePacket_Layer3(packet, receiver);
    return segment;
}

// const segment = ["hello", "world!"];
// const receivedSegmentTxToRx = transportSegment(segment, 'tx', 'rx');
// const receivedSegmentRxToTx = transportSegment(segment, 'rx', 'tx');

// console.log(receivedSegmentTxToRx);
// console.log(receivedSegmentRxToTx);

export { threeWayHandShake_Layer4 };