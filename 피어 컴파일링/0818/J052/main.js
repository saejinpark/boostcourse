import { getInput } from "./getInput.js"
import { makeEmailData_Layer7, receiveEmailData_Layer7 } from "./applicationLayer.js"
import { encodeAttachmentFile_Layer6, decodeAttachmentFile_Layer6 } from "./presentationLayer.js"
import { addSessionID_Layer5, receiveSessionData_Layer5 } from "./sessionLayer.js"
import { threeWayHandShake_Layer4 } from "./transportLayer.js"

async function main() {
    const senderEmailAddress = await getInput("From : ");
    const receiverEmailAddress = await getInput("to : ");
    const titleOfEmail = await getInput("Title : ");
    // 이후에 파일 경로로 선택할 수 있도록 변경하자
    const attachmentFile = await getInput("Attachment File : ");

    const emailData = makeEmailData_Layer7(senderEmailAddress, receiverEmailAddress, titleOfEmail, attachmentFile);

    const encodedEmailData = encodeAttachmentFile_Layer6(emailData);

    const emailSessionData = addSessionID_Layer5(encodedEmailData);

    const receivedemailSessionData = threeWayHandShake_Layer4(emailSessionData, 'tx', 'rx');
    /* console.log("*****received*****");
    console.log(receivedemailSessionData); */

    const receivedEncodedEmailData = receiveSessionData_Layer5(receivedemailSessionData);

    const decodedEmailData = decodeAttachmentFile_Layer6(receivedEncodedEmailData);

    receiveEmailData_Layer7(decodedEmailData);
}

main().catch(console.error);



export { main };