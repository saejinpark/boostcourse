import fs from "fs";
import path from "path";
import { rxApplication } from "./rxApplication.js";

/**
 * 표현 계층
 * 첨부 파일 부분만 BASE64로 디코딩해서 다시 복원해서 파일로 저장
 * @param {*} data 
 */
export function rxPresentation(data){
    console.log("\n=========== Presentation Layer ===========");
    const arr = data.split('\\r\\n');
    console.log(">>수신 데이터")
    console.log(data)
    console.log(data)
    // rxPresentation(data)
    const str = _base64ToString(arr[5]);
    console.log(str)
    fs.writeFileSync(path.join('attachment.file'), str, { flag: 'w+' });
    arr[5] = str;
    rxApplication(arr);
}

/**
 * base64 to string
 * @param {string} input 
 * @returns 
 */
function _base64ToString(input) {
    const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {
        enc1 = base64chars.indexOf(input.charAt(i++));
        enc2 = base64chars.indexOf(input.charAt(i++));
        enc3 = base64chars.indexOf(input.charAt(i++));
        enc4 = base64chars.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }
    return output;
}