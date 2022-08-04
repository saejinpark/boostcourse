import { rxTransport } from "./rxTransport.js";

/**
 * 네트워크 계층
 * IP 헤더를 확인하고 자신의 IP가 맞는지 확인 후 전송 계층으로 전달
 * @param {*} packets 
 */
export function rxNetwork(packets){
    console.log("\n=========== Network Layer ===========");
    console.log(`요청: ${packets}\n`)

    const IPArr = [...packets.match(/(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}/g)];
    
    const sourceIP = IPArr[0];
    const destinationIP = IPArr[1];

    if(sourceIP === '192.168.1.5'){
        console.log(`발신 IP 주소 => ${destinationIP}`)
        console.log(`수신 IP 주소 (일치) => ${sourceIP}`)
        const segments = packets.match(/\[.*\]/)[0];
        rxTransport(segments);
    }else{
        console.log(`발신 IP 주소 => ${destinationIP}`)
        console.log(`수신 IP 주소 (불일치) => ${sourceIP}`)
        console.log(`해당 패킷은 무시됩니다. `)
    }
}