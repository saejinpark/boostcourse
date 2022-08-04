import { txDataLink } from "./txDataLink.js";

/**
 * 네트워크 계층
 * 4계층에서 받은 값과 IP 헤더를 포함해서 데이터링크 계층으로 전달
 * @param {*} segments 
 */
export function txNetwork(segments){
    console.log("\n=========== Network Layer ===========");
    console.log(`>> 요청 "${_segmentsToString(segments)}"`)

    const ipHeader = {
        sourceIP : '192.168.1.5',
        destinationIP : '192.168.1.9'
    }

    const packets = [ipHeader, segments];
    console.log(_packetToString(packets));

    txDataLink(packets);
}

function _segmentsToString(segments){
    return `[${Object.values(segments).join(', ')}]`
}

function _packetToString(packets){
    return `{ ${Object.values(packets[0]).join(', ')}, ${_segmentsToString(packets[1])}}`
}