import { strToBinary, numTo8bitBinary } from "./base64.js"

// strToBinary를 거쳐온 데이터가 들어감
// 해당 함수를 거쳐온 데이터는 길이가 항상 8의 배수
function binaryToHex(binaryData) {
    let hexData = "";
    while(binaryData.length !== 0) {
        hexData += parseInt(binaryData.substring(0,4),2).toString(16);
        binaryData = binaryData.substring(4);
    }
    return hexData;
}

function hexToBinary(hexData) {
    let binaryData = "";
    while(hexData.length !== 0) {
        binaryData = numTo8bitBinary(parseInt(hexData.slice(-2),16)) + binaryData;
        hexData = hexData.slice(0,-2);
    }
    return binaryData
}

function binaryToString(binaryData) {
    let str = "";
    while (binaryData.length !== 0) {
        const asciiCode = parseInt(binaryData.slice(-8), 2);
        str = String.fromCharCode(asciiCode) + str;
        binaryData = binaryData.slice(0, -8);
    }
    return str;
}

export { binaryToHex, hexToBinary, binaryToString };

/* const str = "hello";
const binary = strToBinary(str);
console.log(binary);
const hex = binaryToHex(binary);
console.log(hex);
const returnToBinary = hexToBinary(hex);
console.log(returnToBinary);
const returnToStr = binaryToString(returnToBinary);
console.log(returnToStr); */