import { base64Encoder, base64Decoder } from "./base64.js"
import fs from "fs";

/* 2. 첨부파일 부분을 BASE64 로 인코딩한다.
    + data `\r\n` 으로 split 
    + 마지막 부분 저장
    + 해당 부분 인코딩
    - data에서 마지막 부분 길이 만큼 뺀 값 substring
    - 해당 substring에 인코딩된 값 더하고 반환 */

/**
 * 
 * @param {string} emailData 
 */
function encodeAttachmentFile_Layer6(emailData) {
    const elementsOfData = emailData.split("\r\n");
    const attachmentFile = elementsOfData[elementsOfData.length-1];
    const encodedData = base64Encoder(attachmentFile);
    const encodedEmailData = emailData.slice(0,-attachmentFile.length) + encodedData;

    console.log("--- <This is the result of Tx Presentation Layer> ---");
    console.log(encodedEmailData);
    return encodedEmailData;
}

function decodeAttachmentFile_Layer6(encodedEmailData) {
    const elementsOfData = encodedEmailData.split("\r\n");
    const encodedAttachmentFile = elementsOfData[elementsOfData.length-1];
    const decodedData = base64Decoder(encodedAttachmentFile);
    const decodedEmailData = encodedEmailData.slice(0,-encodedAttachmentFile.length) + decodedData;

    console.log("--- <This is the result of Rx Presentation Layer> ---");
    console.log(decodedEmailData);

    fs.writeFileSync("./attachment.file", decodedData);

    return decodedEmailData;
}

export { encodeAttachmentFile_Layer6, decodeAttachmentFile_Layer6 };