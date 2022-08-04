import { txSession } from "./txSession.js";

/**
 * tx 표현 계층
 * 첨부 파일 부분만 BASE64로 인코딩해서 표현 -> 세션 계층으로 전달
 * @param {string} data 
 */
export function txPresentation(data){
    console.log("\n=========== Presentation Layer ===========");

    data = data.split('\r\n');
    data[4] = data[4].replaceAll('\\n', '\n');
    data[4] = data[4].replaceAll('\\r', '\r');
    data[4] = data[4].replaceAll('\\t', '\t');
    data[4] = _base64(data[4]);
    data = data.join('\r\n');

    console.log("구성된 데이터 표시 >> ");
    console.log(data.split('\r\n').join('\\r\\n\n'));

    txSession(data);
}

function _base64(input) {
    const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    const output = [];
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) enc3 = enc4 = 64;
        else if (isNaN(chr3)) enc4 = 64;

        output.push(enc1, enc2, enc3, enc4)
    }
    return output.map((e)=>{ return base64chars.charAt(e); }).join('');;
}