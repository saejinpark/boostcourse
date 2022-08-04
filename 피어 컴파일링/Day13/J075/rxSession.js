import { rxPresentation } from "./rxPresentation.js";

/**
 * 세션 계층
 * 전송 계층에서 받은 데이터에 Session-Id 항목을 확인해서 출력
 * @param {*} segment 
 */
export function rxSession(segment){
    console.log("\n=========== Session Layer ===========");
    const arr = segment.split('\\r\\n');
    console.log(">>수신 데이터")
    console.log(segment)
    console.log(`\n${arr[3]}`)

    rxPresentation(segment)
}