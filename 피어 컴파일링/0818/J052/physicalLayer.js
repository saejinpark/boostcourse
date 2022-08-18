/* ## Physical Layer
1. Frame을 바이트 단위로 변경한다.
    - Frame 을 문자열로 저장한다.
    - 저장한 문자열을 바이트로 변경한다.
2. 바이트 단위로 변경한 것으로 16진수 문자열을 생성한다. */

import { strToBinary } from "./base64.js"
import { binaryToHex, hexToBinary, binaryToString } from "./util.js"

function makeSignal_Layer1(frame) {
    const frameStr = JSON.stringify(frame);
    const binaryFrameData = strToBinary(frameStr);
    // console.log(binaryFrameData);
    const hexFrameData = binaryToHex(binaryFrameData);
    console.log("\n--- <This is the result of Tx Physical Layer> ---");
    console.log(hexFrameData);

    return hexFrameData;
}

function receiveSignal_Layer1(hexFrameData) {
    // console.log(hexFrameData);
    const restoredBinaryData = hexToBinary(hexFrameData);
    // console.log(restoredBinaryData);
    const restoredFrameStr = binaryToString(restoredBinaryData);
    const restoredFrame = JSON.parse(restoredFrameStr);
    console.log("\n--- <This is the result of Rx Physical Layer> ---");
    console.log(restoredFrameStr);

    return restoredFrame;
}

export { makeSignal_Layer1, receiveSignal_Layer1 };

/* const arr = ["asdf", "efd", ["dsaf", "dsfd", ["djnve", "dkfnla", "dkjfa"]]];

const signal = makeSignal_Layer1(arr);
const restoredFrame = receiveSignal_Layer1(signal);
console.log(restoredFrame); */




/* const arrStr = JSON.stringify(arr);
console.log(arrStr);
const arrRestored = JSON.parse(arrStr);
console.log(arrRestored);
console.log(arr); */