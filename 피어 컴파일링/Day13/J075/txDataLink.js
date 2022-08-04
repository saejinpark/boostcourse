import { txPhysical } from "./txPhysical.js";

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
 * MAC 헤더 붙여서 프레임을 물리 계층으로 전달
 * @param {Array} packets 
 */
export function txDataLink(packets){
    console.log("\n=========== DataLink Layer ===========");
    console.log(`요청 "${_packetsToString(packets)}"\n`);

    const mac = {
        source : MacAddressTable[packets[0].sourceIP],
        destination: MacAddressTable[packets[0].destinationIP],
    };

    const frame = [mac, ...packets];
    console.log(_frameToString(frame));

    txPhysical(frame)
}

function _packetsToString(packets){
    return `{ ${Object.values(packets[0]).join(', ')}, [${Object.values(packets[1]).join(', ')}] }`
}

function _frameToString(frame){
    return `( ${Object.values(frame[0]).join(', ')}, { ${Object.values(frame[1]).join(', ')}, [${Object.values(frame[2]).join(', ')}] } )`
}