import { v4 as uuidv4 } from 'uuid';
import { txTransport } from './txTransport.js';

/**
 * 세션 계층
 * 고유한 UUID를 생성해서 전송하려는 데이터에 Session-Id 항목을 추가 -> 전송계층으로 전달
 * @param {string} data 
 */
export function txSession(data){
    console.log("\n=========== Session Layer ===========");

    data = data.split('\r\n');
    data[3] = `Session-Id: ${uuidv4()}\r\n`;
    data = data.join('\r\n');

    console.log("구성된 데이터 표시 >> ");
    console.log(data.split('\r\n').join('\\r\\n\n'));

    txTransport(data)
}