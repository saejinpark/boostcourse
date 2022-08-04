import { rxDataLink } from "./rxDataLink.js";

/**
 * 물리 계층
 * 전달받은 16진수 바이트와 문자열로 변환해서 출력하고, 데이터 링크 계층으로 전달
 * @param {string} bits 
 */
export function rxPhysical(bits){
    console.log("\n=========== Physical Layer ===========");
    console.log()
    const frame = HexToASCII(bits);
    console.log(frame)
    rxDataLink(frame);
}

/**
 * 16진수를 아스키로 변환
 * @param {string} str 
 * @returns 
 */
function HexToASCII(str){
	let hex  = str.toString();
	let result = '';
	for (let n = 0; n < hex.length; n += 2) {
		result += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return result;
}