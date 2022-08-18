/* ## Data Link Layer
1. Mac Address Table을 만든다. +
2. 받은 데이터 배열의 0,1 인덱스에 맞는 Value 값을 저장한다.
3. 빈 배열을 생성한다.
4. 송신측 MAC, 수신측 MAC, packet을 배열에 저장한다.
5. 위의 3가지 정보를 출력한다.
6. 배열을 반환한다. */

const MAC_AddressTable = new Map();
MAC_AddressTable.set("192.168.1.2", "CC:46:D6:A0:41:BB");
MAC_AddressTable.set("192.168.1.3", "3C:5A:B4:00:11:CD");
MAC_AddressTable.set("192.168.1.4", "CC:46:D6:B1:F9:CC");
MAC_AddressTable.set("192.168.1.5", "3C:5A:B4:93:01:4B");
MAC_AddressTable.set("192.168.1.6", "3C:5A:B4:11:7B:B0");
MAC_AddressTable.set("192.168.1.7", "CC:46:D6:B0:CC:EF");
MAC_AddressTable.set("192.168.1.8", "CC:46:D6:A4:3F:F0");
MAC_AddressTable.set("192.168.1.9", "3C:5A:B4:6F:EA:DC");
MAC_AddressTable.set("192.168.1.10", "3C:5A:B4:08:A4:5B");

const txMAC = "CC:46:D6:A0:41:BB";
const rxMAC = "3C:5A:B4:93:01:4B";

function makeFrame_Layer2(packet) {
    /* 
    packet[0] : sourceIP
    packet[1] : destinationIP
    packet[2] : segment
    */
    const sourceMAC = MAC_AddressTable.get(packet[0]);
    const destinationMAC = MAC_AddressTable.get(packet[1]);
    const frame = [sourceMAC, destinationMAC, packet];

    console.log("\n--- <This is the result of Tx Data Link Layer> ---");
    console.log(">> 요청 " + JSON.stringify(packet));
    console.log("Source MAC : " + sourceMAC);
    console.log("Destination MAC : " + destinationMAC);
    console.log("packet : " + JSON.stringify(packet));
    return frame;
}

/* ### 수신 계층
1. 프레임을 받는다.
2. index 1이 도착 MAC 주소
3. 해당 주소가 destination MAC이 아니라면 무시
4. index 2가 packet
5. packet 반환 */

function receiveFrame_Layer2(frame, receiver) {
    const receiverMAC = frame[1];
    if ((receiver === 'tx' && receiverMAC !== txMAC) || (receiver === 'rx' && receiverMAC !== rxMAC)) {
        throw new Error("수신 MAC 주소가 일치하지 않습니다.");
    } 
    console.log("\n--- <This is the result of Rx Data Link Layer> ---");
    console.log(">> 요청 " + JSON.stringify(frame));
    console.log("수신 MAC 주소 (일치) : " + receiverMAC);
    console.log("발신 MAC 주소 : " + frame[0]);

    const packet = frame[2];
    return packet;
}

function hasMACinTable(MAC) {
    for (let value of MAC_AddressTable.values()) {
        if (value === MAC) return true;
    }
    return false;
}

export { makeFrame_Layer2, receiveFrame_Layer2 };

// console.log(hasMACinTable("CC:46:D6:B0:CC:EF"));