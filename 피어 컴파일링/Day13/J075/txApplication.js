import readlineSync from "readline-sync";
import { txPresentation } from "./txPresentation.js";

/**
 * tx 응용 계층
 * from 주소, to 주소, title 제목과 첨부 파일 이름을 입력 -> 표현 계층으로 전달
 */
export function txApplication(){
    console.log("=========== Application Layer ===========");

    const mail = {};
    mail.from = `From: ${_input("From: ")}\r\n`;
    mail.to = `To: ${_input("To: ")}\r\n`;
    mail.title = `Title: ${_input("Title: ")}\r\n`;
    process.stdout.write("첨부파일 내용: ");
    mail.content = `\r\n${_input()}`;
    
    const data = Object.values(mail).join('');
    console.log("\n구성된 데이터 표시 >> ");
    console.log(data.split('\r\n').join('\\r\\n\n'));
    
    txPresentation(data);
}

/**
 * 입력을 위한 함수
 * @param {string} question 
 * @returns 
 */
function _input(question){
    return readlineSync.question(question);
}