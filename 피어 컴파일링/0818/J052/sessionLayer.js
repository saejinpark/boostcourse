/* 1. UUID 추가
    - `\r\n` 으로 spilt 배열 생성
    - 해당 배열과 uuid 를 이용해 emailSessionData 생성
    - emailSessionData 반환 */

import { v4 } from "uuid"

function addSessionID_Layer5(encodedEmailData) {
    /* 
    elementsOfData[0] : sender Email Address
    elementsOfData[1] : receiver Email Address
    elementsOfData[2] : Title
    elementsOfData[3] : <EMPTY>
    elementsOfData[4] : encoded attachment File
    */
    const elementsOfData = encodedEmailData.split("\r\n");
    const uuid = v4();
    // console.log(elementsOfData);

    let emailSessionData = "";
    emailSessionData += elementsOfData[0] + "\r\n";
    emailSessionData += elementsOfData[1] + "\r\n";
    emailSessionData += elementsOfData[2] + "\r\n";
    emailSessionData += "Session-Id: " + uuid + "\r\n";
    emailSessionData += "\r\n" + elementsOfData[4];

    console.log("--- <This is the result of Tx Session Layer> ---");
    console.log(emailSessionData);

    return emailSessionData;
}

function receiveSessionData_Layer5(emailSessionData) {
    const elementsOfData = emailSessionData.split("\r\n");
    console.log(elementsOfData);
    const sessionID = elementsOfData[3].substring("Session-Id: ".length);

    console.log("--- <This is the result of Rx Session Layer> ---");
    console.log("Session-Id : "+sessionID);

    let emailEncodedData = "";
    emailEncodedData += elementsOfData[0] + "\r\n";
    emailEncodedData += elementsOfData[1] + "\r\n";
    emailEncodedData += elementsOfData[2] + "\r\n";
    emailEncodedData += "\r\n" + elementsOfData[5];

    return emailEncodedData;
}

export { addSessionID_Layer5, receiveSessionData_Layer5 }; 