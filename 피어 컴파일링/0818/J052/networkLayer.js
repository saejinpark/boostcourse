/* ## Network Layer
1. 나의 IP를 알아낸다. + 
2. 수신용 IP를 고정한다. + 
3. 빈 배열을 생성한다.
4. 나의 IP, 수신용 IP, 받은 data를 푸쉬한다.
5. 위의 3가지 정보를 출력한다.
6. 배열을 반환한다. */

const txIP = "192.168.1.2";
const rxIP = "192.168.1.5";

function makePacket_Layer3(segment, sender) {
    let packet;
    if (sender === "tx") {
        packet = [txIP, rxIP, segment];
    } else {
        packet = [rxIP, txIP, segment];
    }

    console.log("\n--- <This is the result of Rx Network Layer> ---");
    console.log(">> 요청 " + JSON.stringify(segment));
    console.log("Source IP : " + packet[0]);
    console.log("Destination IP : " + packet[1]);
    console.log("segment : " + JSON.stringify(segment));

    return packet;
}

function receivePacket_Layer3(packet, receiver) {
    const receiverIP = packet[1];
    if ((receiver === 'tx' && receiverIP !== txIP) || (receiver === 'rx' && receiverIP !== rxIP)) {
        throw new Error("수신 IP 주소가 일치하지 않습니다.");
    }
    console.log("\n--- <This is the result of Rx Network Layer> ---");
    console.log(">> 요청 " + JSON.stringify(packet));
    console.log("수신 IP 주소 (일치) : " + receiverIP);
    console.log("발신 IP 주소 : " + packet[0]);

    const segment = packet[2];
    return segment;
}

export { makePacket_Layer3, receivePacket_Layer3 };