import { rxNetwork } from "./rxNetwork.js";
/**
 * 맥 주소 테이블
 */
const MacAddressTable = {
    "192.168.1.2" : "CC:46:D6:A0:41:BB",
    "192.168.1.3" : "3C:5A:B4:00:11:CD",
    "192.168.1.4" : "CC:46:D6:B1:F9:CC",
    "192.168.1.5" : "3C:5A:B4:93:01:4B",
    "192.168.1.6" : "3C:5A:B4:11:7B:B0",
    "192.168.1.7" : "CC:46:D6:B0:CC:EF",
    "192.168.1.8" : "CC:46:D6:A4:3F:F0",
    "192.168.1.9" : "3C:5A:B4:6F:EA:DC",
    "192.168.1.10" : "3C:5A:B4:08:A4:5B",
}

/**
 * 데이터 링크 계층
 * 헤더를 제거하고 네트워크 계층으로 전달
 * @param {*} frame 
 */
export function rxDataLink(frame){
    console.log("\n=========== DataLink Layer ===========");
    console.log(`요청 "${frame}"\n`);

    const macArr = [...frame.match(/([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/g)];
    const sourceMac = macArr[0];
    const destinationMac = macArr[1];

    const segments = [...frame.match(/\[(.*?)\]/)][1].split(', ');
    if(Object.values(MacAddressTable).includes(destinationMac)){
        const packets = frame.match(/\{.*\}/)[0];
        console.log(`수신 MAC 주소 (일치) => ${destinationMac}`);
        console.log(`발신 MAC 주소 => ${sourceMac}`)
        rxNetwork(packets)
    }else{
        console.log(`수신 MAC 주소 (불일치) => ${destinationMac}`);
        console.log(`발신 MAC 주소 => ${sourceMac}`)
        console.log(`해당 프레임은 무시됩니다. `)
    }
}