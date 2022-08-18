function makeEmailData_Layer7(senderEmailAddress, receiverEmailAddress, titleOfEmail, attachmentFile) {
    let emailData = "";
    emailData += "from: " + senderEmailAddress + "\r\n";
    emailData += "to: " + receiverEmailAddress + "\r\n";
    emailData += "Title: " + titleOfEmail + "\r\n";
    emailData += "\r\n" + attachmentFile;

    console.log("--- <This is the result of tx Application Layer> ---");
    console.log(emailData);
    return emailData;
}

function getEmailData(emailObject) {
    let emailData = "";
    emailData += "from: " + emailObject.senderEmailAddress + "\r\n";
    emailData += "to: " + emailObject.receiverEmailAddress + "\r\n";
    emailData += "Title: " + emailObject.titleOfEmail + "\r\n";
    emailData += "\r\n" + emailObject.attachmentFile;
    return emailData;
}

function receiveEmailData_Layer7(decodedEmailData) {
    console.log("--- <This is the result of Rx Application Layer> ---");
    console.log(decodedEmailData);
}

export { makeEmailData_Layer7, receiveEmailData_Layer7 };